import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { PerformanceChart } from "./performance-chart";
import { ComparisonCard } from "./comparison-card";
import { TradingResult } from "@/lib/trading-algorithms";

interface TradingResultsProps {
  results: TradingResult[];
}

export function TradingResults({ results }: TradingResultsProps) {
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
    return (ms).toFixed(2) + "ms";
  };

  const getPerformanceColor = (value: number): string => {
    if (value > 0) return "text-profit";
    if (value < 0) return "text-loss";
    return "text-chart-neutral";
  };

  const getActionColor = (action: string): string => {
    if (action === "BUY") return "text-profit";
    if (action === "SELL") return "text-loss";
    return "text-chart-neutral";
  };

  const getDirectionColor = (direction: string): string => {
    if (direction === "UP") return "text-profit";
    if (direction === "DOWN") return "text-loss";
    return "text-chart-neutral";
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <ComparisonCard results={results} />
      {/* Performance Comparison Chart */}
      <PerformanceChart results={results} />
      

      {/* Combined Trading History */}
      {results.length === 2 && (
        <Card className="border border-border">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-lg">
            Algorithm Performance Comparison Table
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="overflow-x-auto">
              <Table className="text-xs">

                <TableHeader>
                  <TableRow className="border-border h-8 hover:bg-transparent">
                    <TableHead className="text-xs py-1 px-2" rowSpan={2}>Time</TableHead>
                    <TableHead className="text-xs py-1 px-2" rowSpan={2}>Price</TableHead>
                    <TableHead className="text-xs py-1 px-2 " rowSpan={2}>Change</TableHead>
                    <TableHead className="text-xs py-1 px-2 text-center border-l border-r border-t border-border" colSpan={4}>Perfect Algorithm</TableHead>
                    <TableHead className="text-xs py-1 px-2 text-center border-t border-r border-border" colSpan={4}>Greedy Algorithm</TableHead>
                  </TableRow>
                  <TableRow className="border-border h-8 hover:bg-transparent">
                    <TableHead className="text-xs py-1 px-2 border-l border-b border-border">Action</TableHead>
                    <TableHead className="text-xs py-1 px-2 border-b border-border">Cash</TableHead>
                    <TableHead className="text-xs py-1 px-2 border-b border-border">Shares</TableHead>
                    <TableHead className="text-xs py-1 px-2 border-r border-b border-border">Net Worth</TableHead>
                    <TableHead className="text-xs py-1 px-2 border-b border-border">Action</TableHead>
                    <TableHead className="text-xs py-1 px-2 border-b border-border">Cash</TableHead>
                    <TableHead className="text-xs py-1 px-2 border-b border-border">Shares</TableHead>
                    <TableHead className="text-xs py-1 px-2 border-r border-b border-border">Net Worth</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results[0].actions.map((perfectAction, index) => {
                    const greedyAction = results[1].actions[index];
                    return (
                      <TableRow key={perfectAction.id} className="text-xs border-border h-7">
                        <TableCell className="font-mono text-xs whitespace-nowrap py-1 px-2">
                          {new Date(perfectAction.timestamp).toLocaleTimeString('en-US', { 
                            hour: '2-digit', 
                            minute: '2-digit',
                            hour12: false
                          })}
                        </TableCell>
                        <TableCell className="font-mono py-1 px-2">
                          {formatCurrency(perfectAction.price)}
                        </TableCell>
                        <TableCell className={`font-mono py-1 px-2 ${getPerformanceColor(perfectAction.difference)}`}>
                          {perfectAction.difference > 0 ? "+" : ""}{perfectAction.difference.toFixed(4)}
                        </TableCell>
                        
                        {/* Perfect Algorithm Columns */}
                        <TableCell className="py-1 px-2 border-l border-border">
                          <Badge 
                            variant="outline" 
                            className={`${getActionColor(perfectAction.action)} border-current text-xs h-5`}
                          >
                            {perfectAction.action}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-mono py-1 px-2">
                          {formatCurrency(perfectAction.cash)}
                        </TableCell>
                        <TableCell className="font-mono py-1 px-2">
                          {perfectAction.shares.toFixed(4)}
                        </TableCell>
                        <TableCell className={`font-mono font-medium py-1 px-2 border-r border-border ${getPerformanceColor(perfectAction.networth - results[0].initialInvestment)}`}>
                          {formatCurrency(perfectAction.networth)}
                        </TableCell>
                        
                        {/* Greedy Algorithm Columns */}
                        <TableCell className="py-1 px-2">
                          <Badge 
                            variant="outline" 
                            className={`${getActionColor(greedyAction.action)} border-current text-xs h-5`}
                          >
                            {greedyAction.action}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-mono py-1 px-2">
                          {formatCurrency(greedyAction.cash)}
                        </TableCell>
                        <TableCell className="font-mono py-1 px-2">
                          {greedyAction.shares.toFixed(4)}
                        </TableCell>
                        <TableCell className={`font-mono font-medium py-1 px-2 ${getPerformanceColor(greedyAction.networth - results[1].initialInvestment)} border-r border-border`}>
                          {formatCurrency(greedyAction.networth)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Individual Trading History (fallback for single algorithm) */}
      {results.length === 1 && results.map((result) => (
        <Card key={`${result.algorithm}-details`} className="border border-border">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-lg capitalize">
              {result.algorithm} Algorithm - Trading History
            </CardTitle>
            <CardDescription>
              Point-by-point trading decisions and market movements
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="overflow-x-auto">
              <Table className="text-xs">
                <TableCaption className="text-xs text-muted-foreground">
                  Trading history for {result.algorithm} algorithm
                </TableCaption>
                <TableHeader>
                  <TableRow className="border-border h-8">
                    <TableHead className="text-xs py-1 px-2">ID</TableHead>
                    <TableHead className="text-xs py-1 px-2">Time</TableHead>
                    <TableHead className="text-xs py-1 px-2">Price</TableHead>
                    <TableHead className="text-xs py-1 px-2">Change</TableHead>
                    <TableHead className="text-xs py-1 px-2">Change %</TableHead>
                    <TableHead className="text-xs py-1 px-2">Direction</TableHead>
                    <TableHead className="text-xs py-1 px-2">Action</TableHead>
                    <TableHead className="text-xs py-1 px-2">Cash</TableHead>
                    <TableHead className="text-xs py-1 px-2">Shares</TableHead>
                    <TableHead className="text-xs py-1 px-2">Net Worth</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {result.actions.map((action) => (
                    <TableRow key={action.id} className="text-xs border-border h-7">
                      <TableCell className="font-mono py-1 px-2">{action.id}</TableCell>
                      <TableCell className="font-mono text-xs whitespace-nowrap py-1 px-2">
                        {new Date(action.timestamp).toLocaleTimeString('en-US', { 
                          hour: '2-digit', 
                          minute: '2-digit',
                          hour12: false
                        })}
                      </TableCell>
                      <TableCell className="font-mono py-1 px-2">
                        {formatCurrency(action.price)}
                      </TableCell>
                      <TableCell className={`font-mono py-1 px-2 ${getPerformanceColor(action.difference)}`}>
                        {action.difference > 0 ? "+" : ""}{action.difference.toFixed(4)}
                      </TableCell>
                      <TableCell className={`font-mono py-1 px-2 ${getPerformanceColor(action.percentDifference)}`}>
                        {formatPercentage(action.percentDifference * 100)}
                      </TableCell>
                      <TableCell className={`font-medium py-1 px-2 ${getDirectionColor(action.direction)}`}>
                        {action.direction}
                      </TableCell>
                      <TableCell className="py-1 px-2">
                        <Badge 
                          variant="outline" 
                          className={`${getActionColor(action.action)} border-current text-xs h-5`}
                        >
                          {action.action}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono py-1 px-2">
                        {formatCurrency(action.cash)}
                      </TableCell>
                      <TableCell className="font-mono py-1 px-2">
                        {action.shares.toFixed(4)}
                      </TableCell>
                      <TableCell className={`font-mono font-medium py-1 px-2 ${getPerformanceColor(action.networth - result.initialInvestment)}`}>
                        {formatCurrency(action.networth)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}