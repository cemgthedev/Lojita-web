'use client';

import { LabelList, Pie, PieChart } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
} from '@/components/ui/chart';

export interface TSalesByCategoryChartData {
  segment: string;
  fill: string;
  percentage: number;
}

export interface TSalesBySegmentChartPieProps {
  title?: string;
  subtitle?: string;
  chartData: TSalesByCategoryChartData[];
  chartConfig: ChartConfig;
}

export function ChartPieSalesBySegment({
  title,
  subtitle,
  chartData,
  chartConfig,
}: TSalesBySegmentChartPieProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="justify-start gap-1">
        <CardTitle>{title ?? ''}</CardTitle>
        <CardDescription>{subtitle ?? ''}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={({ payload }) => {
                if (!payload?.length) return null;

                const point = payload[0];
                const segment = point.payload.segment;
                const value = point.payload.percentage;

                return (
                  <div className="border-1 w-full flex flex-col gap-1 p-2 bg-background rounded-md">
                    <p className="font-medium">
                      {chartConfig[segment]?.label ?? segment}
                    </p>
                    <hr />
                    <div className="flex justify-between gap-2">
                      <p className="font-medium">Porcentagem</p>
                      <p>{value} %</p>
                    </div>
                  </div>
                );
              }}
            />

            <Pie data={chartData} dataKey="percentage">
              <LabelList
                dataKey="segment"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof chartConfig) => {
                  const item = chartData.find(
                    (item) => item.segment === value && item.percentage > 0,
                  );

                  return item ? `${item.percentage} %` : '';
                }}
              />
            </Pie>

            <ChartLegend
              content={(props) => (
                <ChartLegendContent
                  className={props.className}
                  payload={chartData.map((item) => ({
                    value: item.segment,
                    label: chartConfig[item.segment]?.label ?? item.segment,
                    color: item.fill,
                    type: 'square',
                  }))}
                />
              )}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
