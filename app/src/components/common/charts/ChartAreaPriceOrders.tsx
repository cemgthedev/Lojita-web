'use client';

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

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
  ChartTooltip,
} from '@/components/ui/chart';
import { formatterPrice } from '@/utils/formatter.util';

export const description = 'An area chart with axes';

export interface TPriceChartData {
  month: string;
  price: number;
}

export interface TPriceOrdersChartAreaProps {
  quantity?: number;
  totalPrice?: string;
  chartData: TPriceChartData[];
}

const chartConfig = {
  price: {
    label: 'Total',
    color: 'var(--chart-3)',
  },
} satisfies ChartConfig;

export function ChartAreaPriceOrders({
  quantity = 0,
  totalPrice,
  chartData,
}: TPriceOrdersChartAreaProps) {
  return (
    <Card>
      <CardHeader className="justify-start gap-1">
        <CardTitle>Total de Vendas</CardTitle>
        <CardDescription>
          {quantity === 0
            ? 'Nenhuma venda'
            : quantity === 1
              ? `${quantity} venda com total de ${totalPrice}`
              : `${quantity} vendas com total de ${totalPrice}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 20,
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
              tickFormatter={(value) => formatterPrice(value)}
              domain={[
                0,
                (dataMax: number) => Math.floor(dataMax + dataMax * 0.25),
              ]}
            />
            <ChartTooltip
              cursor={false}
              content={({ payload }) => {
                if (!payload?.length) return null;

                const point = payload[0];
                const month = point.payload.month;
                const price = point.payload.price;

                return (
                  <div className="border-1 w-full flex flex-col gap-1 p-2 bg-background rounded-md">
                    <p className="font-medium">{month}</p>
                    <hr />
                    <div className="flex justify-between gap-2">
                      <p className="font-medium">Total</p>
                      <p>{formatterPrice(price)}</p>
                    </div>
                  </div>
                );
              }}
            />
            <Area
              dataKey="price"
              type="natural"
              fillOpacity={0}
              dot={{ r: 3 }}
              stroke="var(--color-price)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
