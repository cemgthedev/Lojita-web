import { ChartAreaPriceOrders } from '@/components/common/charts/ChartAreaPriceOrders';
import { ChartAreaStatusOrders } from '@/components/common/charts/ChartAreaStatusOrders';
import { useOrders } from '@/hooks/use-orders.hook';

export default function DashboardPage() {
  const { statusChart, priceChart } = useOrders();

  return (
    <section className="flex flex-col items-center gap-4 purple-dark:bg-red-500 p-6">
      <div className="w-full lg:w-4/5 flex flex-col gap-4">
        <h1 className="text-xl font-semibold">Análise de Vendas</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ChartAreaStatusOrders {...statusChart} />
          <ChartAreaPriceOrders {...priceChart} />
        </div>
      </div>
    </section>
  );
}
