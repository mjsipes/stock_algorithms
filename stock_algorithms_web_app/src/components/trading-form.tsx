import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

export interface TradingFormProps {
  onSimulate: (params: {
    ticker: string;
    initialInvestment: number;
    interval: string;
    feePercent: number;
  }) => void;
  isSimulating: boolean;
  onReset: () => void;
}

export function TradingForm({ onSimulate, isSimulating, onReset }: TradingFormProps) {
  const [ticker, setTicker] = useState<string>('AAPL');
  const [initialInvestment, setInitialInvestment] = useState<string>('100');
  const [interval, setInterval] = useState<string>('1m');
  const [feePercent, setFeePercent] = useState<string>('0.1');

  const handleSimulate = () => {
    onSimulate({
      ticker,
      initialInvestment: parseFloat(initialInvestment),
      interval,
      feePercent: parseFloat(feePercent)
    });
  };

  const popularTickers = [
    'AAPL', 'GOOGL', 'MSFT', 'NVDA', 'TSLA', 
    'BTC-USD', 'ETH-USD', 'DOGE-USD'
  ];

  return (
    <div className="h-full bg-card p-4 shadow-md rounded-lg flex flex-col justify-between">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold">Simulation Parameters</h2>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ticker" className="text-sm">
              Stock Ticker
            </Label>
            <Select value={ticker} onValueChange={setTicker}>
              <SelectTrigger className="bg-background border-border text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {popularTickers.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="investment" className="text-sm">
              Initial Investment ($)
            </Label>
            <Input
              id="investment"
              type="number"
              step="10"
              min="10"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(e.target.value)}
              placeholder="100"
              className="bg-background border-border text-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="interval" className="text-sm">
              Time Interval
            </Label>
            <Select value={interval} onValueChange={setInterval}>
              <SelectTrigger className="bg-background border-border text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1m">1 Minute</SelectItem>
                <SelectItem value="5m">5 Minutes</SelectItem>
                <SelectItem value="1h">1 Hour</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fee" className="text-sm">
              Trading Fee (%)
            </Label>
            <Input
              id="fee"
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={feePercent}
              onChange={(e) => setFeePercent(e.target.value)}
              placeholder="0.1"
              className="bg-background border-border text-sm"
            />
            <p className="text-xs text-muted-foreground">
              Typically set to 0% (no fees) or 0.1% (realistic broker fees)
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2 mt-6">
        <Button 
          onClick={handleSimulate} 
          className="w-full" 
          disabled={isSimulating}
          size="sm"
        >
          {isSimulating ? 'Simulating...' : 'Run Simulation'}
        </Button>
        <Button 
          onClick={onReset} 
          variant="outline" 
          className="w-full"
          disabled={isSimulating}
          size="sm"
        >
          Reset
        </Button>
      </div>
    </div>
  );
}