import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
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
    <Card className="border border-border">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg">Algorithm Performance Comparison Summary</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="overflow-x-auto">
          <Table className="text-xs">
            <TableHeader>
              <TableRow className="border-border h-8 hover:bg-transparent">
                <TableHead className="text-xs py-1 px-2">Algorithm</TableHead>
                <TableHead className="text-xs py-1 px-2">Initial</TableHead>
                <TableHead className="text-xs py-1 px-2">Final</TableHead>
                <TableHead className="text-xs py-1 px-2">Return</TableHead>
                <TableHead className="text-xs py-1 px-2">Return %</TableHead>
                <TableHead className="text-xs py-1 px-2">BUY</TableHead>
                <TableHead className="text-xs py-1 px-2">SELL</TableHead>
                <TableHead className="text-xs py-1 px-2">HOLD</TableHead>
                <TableHead className="text-xs py-1 px-2">Steps</TableHead>
                <TableHead className="text-xs py-1 px-2">Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedResults.map((result) => {
                const buyCount = result.actions.filter(a => a.action === 'BUY').length;
                const sellCount = result.actions.filter(a => a.action === 'SELL').length;
                const holdCount = result.actions.filter(a => a.action === 'HOLD').length;
                return (
                  <TableRow key={result.algorithm} className="text-xs border-border h-7">
                    <TableCell className="capitalize py-1 px-2">{result.algorithm}</TableCell>
                    <TableCell className="font-mono py-1 px-2">{formatCurrency(result.initialInvestment)}</TableCell>
                    <TableCell className={`font-mono py-1 px-2 ${getPerformanceColor(result.totalReturn)}`}>{formatCurrency(result.finalNetworth)}</TableCell>
                    <TableCell className={`font-mono py-1 px-2 ${getPerformanceColor(result.totalReturn)}`}>{formatCurrency(result.totalReturn)}</TableCell>
                    <TableCell className={`font-mono py-1 px-2 ${getPerformanceColor(result.totalReturnPercent)}`}>{result.totalReturnPercent > 0 ? "+" : ""}{formatPercentage(result.totalReturnPercent)}</TableCell>
                    <TableCell className="py-1 px-2">{buyCount}</TableCell>
                    <TableCell className="py-1 px-2">{sellCount}</TableCell>
                    <TableCell className="py-1 px-2">{holdCount}</TableCell>
                    <TableCell className="py-1 px-2">{result.actions.length}</TableCell>
                    <TableCell className="py-1 px-2">{formatTime(result.computationTime)}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}