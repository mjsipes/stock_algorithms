import { useState } from "react";
import { TradingForm } from "@/components/trading-form";
import { TradingResults } from "@/components/trading-results";
import { TradingSimulator, generateMockPriceData, TradingResult } from "@/lib/trading-algorithms";

const Index = () => {
  const [results, setResults] = useState<TradingResult[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleSimulate = async (params: {
    ticker: string;
    initialInvestment: number;
    interval: string;
    feePercent: number;
  }) => {
    setIsSimulating(true);

    // Simulate with a slight delay to show loading state
    setTimeout(() => {
      try {
        // Generate mock data for demonstration
        const mockData = generateMockPriceData(1, params.interval);
        
        // Create simulator
        const simulator = new TradingSimulator(
          mockData,
          params.initialInvestment,
          params.feePercent,
          false
        );

        const newResults: TradingResult[] = [];

        // Always run both algorithms
        const perfectResult = simulator.perfectAlgorithm();
        perfectResult.ticker = params.ticker;
        newResults.push(perfectResult);

        const greedyResult = simulator.greedyAlgorithm();
        greedyResult.ticker = params.ticker;
        newResults.push(greedyResult);

        setResults(newResults);
      } finally {
        setIsSimulating(false);
      }
    }, 500);
  };

  const handleReset = () => {
    setResults([]);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Left sidebar */}
      <div className="w-72 border-r border-border bg-background p-4">
        <TradingForm
          onSimulate={handleSimulate}
          isSimulating={isSimulating}
          onReset={handleReset}
        />
      </div>
      
      {/* Main content area */}
      <div className="flex-1 overflow-auto p-6">
        <div className=" mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Trading Algorithm Simulator
            </h1>
            {/* <p className="text-lg text-muted-foreground">
              Compare perfect vs greedy trading strategies with real-time market simulation
            </p> */}
          </div>
          
          {isSimulating ? (
            <div className="flex items-center justify-center h-[50vh]">
              <div className="text-center space-y-4">
                <p className="text-lg text-muted-foreground">Running trading simulation...</p>
                <img src="/favicon.ico" alt="Loading" className="h-12 w-12 mx-auto" />
              </div>
            </div>
          ) : results.length > 0 ? (
            <TradingResults results={results} />
          ) : (
            <div className="flex items-center justify-center h-[50vh] text-muted-foreground">
              <div className="text-center space-y-4">
                <p className="text-xl mb-2">No simulated results yet.</p>
                <p className="text-base">Use the form on the left to set parameters and start a simulation.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
