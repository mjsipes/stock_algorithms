import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { TradingResult } from "@/lib/trading-algorithms";


interface ComparisonCardProps {
  results: TradingResult[];
}

export function ComparisonCard({ results }: ComparisonCardProps) {
  if (!results || results.length === 0) {
    return null;
  }

  const formatPercentage = (value: number): string => {
    return (value).toFixed(2) + "%";
  };

  const formatCurrency = (value: number): string => {
    return "$" + value.toFixed(2);
  };

  const formatTime = (ms: number): string => {
    return (ms).toFixed(1) + "ms";
  };

  const getPerformanceColor = (value: number): string => {
    if (value > 0) return "text-profit";
    if (value < 0) return "text-loss";
    return "text-muted-foreground";
  };

  // Sort results to show perfect first, then greedy
  const sortedResults = [...results].sort((a, b) => {
    if (a.algorithm === 'perfect') return -1;
    if (b.algorithm === 'perfect') return 1;
    return 0;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {sortedResults.map((result) => (
        <Card key={result.algorithm} className="border border-border">
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold capitalize">
                {result.algorithm} Algorithm
              </CardTitle>
              <Badge 
                variant={result.totalReturnPercent > 0 ? "default" : "secondary"}
                className={`text-sm font-semibold ${
                  result.totalReturnPercent > 0 
                    ? "bg-profit text-white hover:bg-profit/90" 
                    : "bg-loss text-white hover:bg-loss/90"
                }`}
              >
                {result.totalReturnPercent > 0 ? "+" : ""}{formatPercentage(result.totalReturnPercent)}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="p-4 pt-0 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Initial Investment</p>
                <p className="text-lg font-semibold">{formatCurrency(result.initialInvestment)}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Final Value</p>
                <p className={`text-lg font-semibold ${getPerformanceColor(result.totalReturn)}`}>
                  {formatCurrency(result.finalNetworth)}
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-border">
              <p className="text-sm text-muted-foreground mb-3">Trading Activity Summary</p>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-profit font-medium">BUY Orders:</span>
                  <span className="text-sm font-semibold">{result.actions.filter(a => a.action === 'BUY').length} trades</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-loss font-medium">SELL Orders:</span>
                  <span className="text-sm font-semibold">{result.actions.filter(a => a.action === 'SELL').length} trades</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">HOLD Periods:</span>
                  <span className="text-sm font-semibold">{result.actions.filter(a => a.action === 'HOLD').length} intervals</span>
                </div>
                <div className="mt-2 pt-2 border-t border-border/50">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Total Market Moves:</span>
                    <span className="text-xs font-medium">{result.actions.length} periods</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}