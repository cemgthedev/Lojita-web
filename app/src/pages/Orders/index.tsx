import { useOrders } from '@/hooks/use-orders.hook';
import { IFilterOrders } from '@/providers/Orders.provider';
import { SearchOrder } from './components/search';
import { TableOrders } from './components/table';

export default function OrdersPage() {
  const {
    orders,
    searchOrders,
    filterOrders,
    setFilterOrders,
    isLoading,
    setIsLoading,
    deleteOrder,
  } = useOrders();

  const handleDeleteOrder = async (id: string) => {
    setIsLoading(true);
    await deleteOrder(id);
    setIsLoading(false);
  };

  const handleFilterOrder = async (filterOrders: IFilterOrders) => {
    setIsLoading(true);
    await searchOrders(filterOrders);
    setIsLoading(false);
  };

  return (
    <section className="flex flex-col items-center gap-4">
      <div className="relative w-full flex flex-col">
        <div className="w-full flex flex-col items-center">
          <TableOrders
            topContent={
              <div className="flex flex-col md:flex-row gap-4 justify-between md:items-end">
                <div className="flex flex-col min-w-56">
                  <h1 className="text-xl font-semibold">Pedidos</h1>
                  <p>
                    {orders.length === 0
                      ? 'Nenhum pedido encontrado'
                      : orders.length === 1
                        ? `${orders.length} pedido encontrado`
                        : `${orders.length} pedidos encontrados`}
                  </p>
                </div>
                <SearchOrder
                  filterOrders={filterOrders}
                  setFilterOrders={setFilterOrders}
                  searchOrders={handleFilterOrder}
                />
              </div>
            }
            orders={orders}
            loadingState={isLoading}
            remove={handleDeleteOrder}
          />
        </div>
      </div>
    </section>
  );
}
