// Trading algorithm simulation types and logic

export interface PriceData {
  timestamp: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface TradingAction {
  id: number;
  timestamp: string;
  price: number;
  difference: number;
  percentDifference: number;
  direction: "UP" | "DOWN" | "-";
  action: "BUY" | "SELL" | "HOLD";
  networth: number;
  cash: number;
  shares: number;
}

export interface TradingResult {
  algorithm: "perfect" | "greedy";
  ticker: string;
  initialInvestment: number;
  feePercent: number;
  totalReturn: number;
  totalReturnPercent: number;
  finalNetworth: number;
  actions: TradingAction[];
  computationTime: number;
}

export class TradingSimulator {
  constructor(
    private data: PriceData[],
    private initialInvestment: number,
    private feePercent: number,
    private debug: boolean = false
  ) {}

  private calculateFee(amount: number): number {
    return amount * (this.feePercent / 100);
  }

  perfectAlgorithm(): TradingResult {
    const startTime = performance.now();
    let currentCash = this.initialInvestment;
    let stocksOwned = 0;
    const feeDecimal = this.feePercent / 100;
    const actions: TradingAction[] = [];

    for (let i = 0; i < this.data.length; i++) {
      const currentPrice = this.data[i].close;
      let difference = 0;
      let percentDifference = 0;
      let direction: "UP" | "DOWN" | "-" = "-";
      let action: "BUY" | "SELL" | "HOLD" = "HOLD";

      if (i > 0) {
        difference = currentPrice - this.data[i - 1].close;
        percentDifference = difference / this.data[i - 1].close;
        direction = difference > 0 ? "UP" : "DOWN";

        // Perfect algorithm: look ahead to next price
        if (i < this.data.length - 1) {
          const nextPrice = this.data[i + 1].close;
          
          if (nextPrice > currentPrice && currentCash > 0) {
            // Buy before price goes up
            action = "BUY";
            const stocksToBuy = currentCash / (currentPrice * (1 + feeDecimal));
            stocksOwned += stocksToBuy;
            currentCash = 0;
          } else if (nextPrice < currentPrice && stocksOwned > 0) {
            // Sell before price goes down
            action = "SELL";
            const cashFromSale = stocksOwned * currentPrice * (1 - feeDecimal);
            currentCash = cashFromSale;
            stocksOwned = 0;
          }
        }
      }

      const networth = currentCash + stocksOwned * currentPrice;

      actions.push({
        id: i,
        timestamp: this.data[i].timestamp,
        price: currentPrice,
        difference,
        percentDifference,
        direction,
        action,
        networth,
        cash: currentCash,
        shares: stocksOwned
      });
    }

    const endTime = performance.now();
    const finalPrice = this.data[this.data.length - 1].close;
    const finalNetworth = currentCash + stocksOwned * finalPrice;
    const totalReturn = finalNetworth - this.initialInvestment;
    const totalReturnPercent = (totalReturn / this.initialInvestment) * 100;

    return {
      algorithm: "perfect",
      ticker: "",
      initialInvestment: this.initialInvestment,
      feePercent: this.feePercent,
      totalReturn,
      totalReturnPercent,
      finalNetworth,
      actions,
      computationTime: endTime - startTime
    };
  }

  greedyAlgorithm(): TradingResult {
    const startTime = performance.now();
    let currentCash = this.initialInvestment;
    let stocksOwned = 0;
    const feeDecimal = this.feePercent / 100;
    const actions: TradingAction[] = [];

    for (let i = 0; i < this.data.length; i++) {
      const currentPrice = this.data[i].close;
      let difference = 0;
      let percentDifference = 0;
      let direction: "UP" | "DOWN" | "-" = "-";
      let action: "BUY" | "SELL" | "HOLD" = "HOLD";

      if (i > 1) {
        difference = currentPrice - this.data[i - 1].close;
        percentDifference = difference / this.data[i - 1].close;
        direction = difference > 0 ? "UP" : "DOWN";

        const prevPrice = this.data[i - 1].close;
        const prevPrevPrice = this.data[i - 2].close;

        // Greedy algorithm: buy on upturn, sell on downturn
        if (currentPrice > prevPrice && prevPrice < prevPrevPrice && currentCash > 0) {
          // Buy when price goes up after going down
          action = "BUY";
          const stocksToBuy = currentCash / (currentPrice * (1 + feeDecimal));
          stocksOwned += stocksToBuy;
          currentCash = 0;
        } else if (currentPrice < prevPrice && prevPrice > prevPrevPrice && stocksOwned > 0) {
          // Sell when price goes down after going up
          action = "SELL";
          const cashFromSale = stocksOwned * currentPrice * (1 - feeDecimal);
          currentCash = cashFromSale;
          stocksOwned = 0;
        }
      }

      const networth = currentCash + stocksOwned * currentPrice;

      actions.push({
        id: i,
        timestamp: this.data[i].timestamp,
        price: currentPrice,
        difference,
        percentDifference,
        direction,
        action,
        networth,
        cash: currentCash,
        shares: stocksOwned
      });
    }

    const endTime = performance.now();
    const finalPrice = this.data[this.data.length - 1].close;
    const finalNetworth = currentCash + stocksOwned * finalPrice;
    const totalReturn = finalNetworth - this.initialInvestment;
    const totalReturnPercent = (totalReturn / this.initialInvestment) * 100;

    return {
      algorithm: "greedy",
      ticker: "",
      initialInvestment: this.initialInvestment,
      feePercent: this.feePercent,
      totalReturn,
      totalReturnPercent,
      finalNetworth,
      actions,
      computationTime: endTime - startTime
    };
  }
}

// Mock data generator for demonstration
export function generateMockPriceData(days: number = 1, interval: string = "1m"): PriceData[] {
  const data: PriceData[] = [];
  const pointsPerDay = interval === "1m" ? 390 : interval === "5m" ? 78 : 24; // Trading hours
  const totalPoints = days * pointsPerDay;
  
  let basePrice = 100 + Math.random() * 100; // Start with price between 100-200
  let currentTime = new Date();
  currentTime.setHours(9, 30, 0, 0); // Market open

  for (let i = 0; i < totalPoints; i++) {
    // Simulate realistic price movement
    const volatility = 0.02; // 2% volatility
    const trend = (Math.random() - 0.5) * 0.001; // Small trending component
    const randomWalk = (Math.random() - 0.5) * volatility;
    
    const priceChange = basePrice * (trend + randomWalk);
    const newPrice = Math.max(basePrice + priceChange, 1); // Prevent negative prices
    
    const high = newPrice * (1 + Math.random() * 0.005);
    const low = newPrice * (1 - Math.random() * 0.005);
    const open = basePrice;
    const close = newPrice;
    
    data.push({
      timestamp: new Date(currentTime).toISOString(),
      open,
      high,
      low,
      close,
      volume: Math.floor(Math.random() * 1000000) + 100000
    });

    basePrice = newPrice;
    
    // Increment time based on interval
    const minutesToAdd = interval === "1m" ? 1 : interval === "5m" ? 5 : 60;
    currentTime.setMinutes(currentTime.getMinutes() + minutesToAdd);
  }

  return data;
}