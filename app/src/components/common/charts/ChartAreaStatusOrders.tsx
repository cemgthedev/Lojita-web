'use client';

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

export const description = 'An area chart with axes';

export interface TStatusChartData {
  month: string;
  cancelled: number;
  processing: number;
  delivered: number;
}

export interface TChartAreaStatusOrdersProps {
  quantity?: number;
  chartData: TStatusChartData[];
}

const chartConfig = {
  cancelled: {
    label: 'Cancelados',
    color: 'var(--chart-1)',
  },
  processing: {
    label: 'Processando',
    color: 'var(--chart-2)',
  },
  delivered: {
    label: 'Vendidos',
    color: 'var(--chart-3)',
  },
} satisfies ChartConfig;

export function ChartAreaStatusOrders({
  quantity = 0,
  chartData,
}: TChartAreaStatusOrdersProps) {
  return (
    <Card>
      <CardHeader className="justify-start gap-1">
        <CardTitle>Pedidos</CardTitle>
        <CardDescription>
          {quantity === 0
            ? 'Nenhum pedido'
            : quantity === 1
              ? `${quantity} pedido`
              : `${quantity} pedidos`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: -20,
              right: 20,
            }}
          >
            <CartesianGrid vertical={true} />
            <XAxis
              dataKey="month"
              tickLine={true}
              axisLine={true}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={16}
              allowDecimals={false}
              minTickGap={4}
              domain={[
                0,
                (dataMax: number) => Math.floor(dataMax + dataMax * 0.25),
              ]}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Area
              dataKey="cancelled"
              type="natural"
              fill="var(--color-cancelled)"
              fillOpacity={0}
              dot={{ r: 3 }}
              stroke="var(--color-cancelled)"
            />
            <Area
              dataKey="processing"
              type="natural"
              fillOpacity={0}
              dot={{ r: 3 }}
              stroke="var(--color-processing)"
            />
            <Area
              dataKey="delivered"
              type="natural"
              fillOpacity={0}
              dot={{ r: 3 }}
              stroke="var(--color-delivered)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="grid grid-cols-3 gap-2">
          <div className="font-medium flex items-center gap-1">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: 'var(--chart-1)' }}
            />
            Cancelados
          </div>
          <div className="font-medium flex items-center gap-1">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: 'var(--chart-2)' }}
            />
            Processando
          </div>
          <div className="font-medium flex items-center gap-1">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: 'var(--chart-3)' }}
            />
            Vendidos
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
