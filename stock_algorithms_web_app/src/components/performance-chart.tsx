import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { TradingResult } from "@/lib/trading-algorithms";

interface PerformanceChartProps {
  results: TradingResult[];
}

export function PerformanceChart({ results }: PerformanceChartProps) {
  if (!results || results.length === 0) {
    return null;
  }

  // Prepare chart data by combining both algorithms' networth over time
  const chartData = results[0]?.actions.map((action, index) => {
    const dataPoint: any = {
      time: index,
      timeLabel: new Date(action.timestamp).toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
    };

    // Add data for each algorithm
    results.forEach((result) => {
      if (result.actions[index]) {
        dataPoint[`${result.algorithm}Networth`] = result.actions[index].networth;
      }
    });

    return dataPoint;
  }) || [];

  const formatCurrency = (value: number): string => {
    return `$${value.toFixed(2)}`;
  };

  const getAlgorithmColor = (algorithm: string): string => {
    return algorithm === 'perfect' ? '#059669' : '#DC2626'; // Green for perfect, red for greedy
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Algorithm Performance Comparison</CardTitle>
        <CardDescription>
          Real-time networth comparison between Perfect and Greedy algorithms
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <XAxis 
                dataKey="timeLabel" 
                tick={{ fontSize: 12 }}
                interval="preserveStartEnd"
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickFormatter={formatCurrency}
              />
              <Tooltip 
                formatter={(value: number, name: string) => [
                  formatCurrency(value), 
                  name.replace('Networth', ' Algorithm')
                ]}
                labelFormatter={(label) => `Time: ${label}`}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px'
                }}
              />
              <Legend 
                formatter={(value) => value.replace('Networth', ' Algorithm')}
              />
              {results.map((result) => (
                <Line
                  key={result.algorithm}
                  type="monotone"
                  dataKey={`${result.algorithm}Networth`}
                  stroke={getAlgorithmColor(result.algorithm)}
                  strokeWidth={2}
                  dot={false}
                  name={result.algorithm}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}