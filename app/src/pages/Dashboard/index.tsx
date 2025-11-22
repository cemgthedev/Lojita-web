import { ChartAreaPriceOrders } from '@/components/common/charts/ChartAreaPriceOrders';
import { ChartAreaStatusOrders } from '@/components/common/charts/ChartAreaStatusOrders';
import { ChartPieSalesBySegment } from '@/components/common/charts/ChartPieSalesBySegment';
import { useOrders } from '@/hooks/use-orders.hook';
import { Divider } from '@heroui/divider';

export default function DashboardPage() {
  const {
    statusChartArea,
    priceChartArea,
    salesByCategoryChartPie,
    salesByGenderChartPie,
    salesByAgeRangeChartPie,
  } = useOrders();

  return (
    <section className="flex flex-col items-center gap-4 purple-dark:bg-red-500 p-6">
      <div className="w-full lg:w-4/5 flex flex-col gap-4">
        <h1 className="text-xl font-semibold">Análise de Vendas</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ChartAreaStatusOrders {...statusChartArea} />
          <ChartAreaPriceOrders {...priceChartArea} />
        </div>
        <Divider />
        <h1 className="text-xl font-semibold">Análise de Segmentos</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ChartPieSalesBySegment {...salesByCategoryChartPie} />
          <ChartPieSalesBySegment {...salesByGenderChartPie} />
          <ChartPieSalesBySegment {...salesByAgeRangeChartPie} />
        </div>
      </div>
    </section>
  );
}
