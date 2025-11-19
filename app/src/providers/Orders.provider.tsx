import {
  TChartAreaPriceOrdersProps,
  TPriceChartData,
} from '@/components/common/charts/ChartAreaPriceOrders';
import {
  TChartAreaStatusOrdersProps,
  TStatusChartData,
} from '@/components/common/charts/ChartAreaStatusOrders';
import { ordersMock } from '@/mock/orders';
import { usersMock } from '@/mock/users';
import { TOrder } from '@/types/TOrder';
import { formatterPrice } from '@/utils/formatter.util';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useMemo,
  useState,
} from 'react';

interface IContextOrders {
  orders: TOrder[];
  setOrders: Dispatch<SetStateAction<TOrder[]>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  filterOrders: IFilterOrders;
  setFilterOrders: Dispatch<SetStateAction<IFilterOrders>>;

  createOrder(order: TOrder): Promise<TOrder | undefined>;
  searchOrders(filterOrders: IFilterOrders): Promise<TOrder[]>;
  getOrder(id: string): Promise<TOrder | undefined>;
  updateOrder(order: TOrder, id?: string): Promise<TOrder | undefined>;
  deleteOrder(id: string): Promise<boolean>;

  statusChart: TChartAreaStatusOrdersProps;
  priceChart: TChartAreaPriceOrdersProps;
}

export const ContextOrders = createContext({} as IContextOrders);

interface IProviderOrders {
  children: ReactNode;
}

export interface IFilterOrders {
  sellerName?: string;
  buyerName?: string;
  status?: TOrder['status'];
  minPrice?: number;
  maxPrice?: number;
  minQuantity?: number;
  maxQuantity?: number;
}

export function ProviderOrders({ children }: IProviderOrders) {
  const [orders, setOrders] = useState<TOrder[]>(ordersMock);
  const [isLoading, setIsLoading] = useState(false);
  const [filterOrders, setFilterOrders] = useState<IFilterOrders>({});

  const createOrder = async (order: TOrder): Promise<TOrder | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setOrders((prevState) => [...prevState, order]);
        resolve(order);
      }, 1000);
    });
  };

  const searchOrders = async (
    filterOrders: IFilterOrders,
  ): Promise<TOrder[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredOrders = ordersMock.filter((item) => {
          const matchesSellerName = filterOrders?.sellerName
            ? usersMock.some((u) =>
                u.name
                  .toLowerCase()
                  .includes(filterOrders.sellerName!.toLowerCase()),
              )
            : true;

          const matchesBuyerName = filterOrders.buyerName
            ? usersMock.some((u) =>
                u.name
                  .toLowerCase()
                  .includes(filterOrders.buyerName!.toLowerCase()),
              )
            : true;

          const matchesStatus = filterOrders.status
            ? item.status === filterOrders.status
            : true;

          const matchesMinPrice =
            filterOrders.minPrice !== undefined
              ? (item.price ?? 0) >= filterOrders.minPrice
              : true;

          const matchesMaxPrice =
            filterOrders.maxPrice !== undefined
              ? (item.price ?? 0) <= filterOrders.maxPrice
              : true;

          const matchesMinQuantity =
            filterOrders.minQuantity !== undefined
              ? (item.quantity ?? 0) >= filterOrders.minQuantity
              : true;

          const matchesMaxQuantity =
            filterOrders.maxQuantity !== undefined
              ? (item.quantity ?? 0) <= filterOrders.maxQuantity
              : true;

          return (
            matchesSellerName &&
            matchesBuyerName &&
            matchesStatus &&
            matchesMinPrice &&
            matchesMaxPrice &&
            matchesMinQuantity &&
            matchesMaxQuantity
          );
        });

        setOrders(filteredOrders);
        resolve(filteredOrders);
      }, 1000);
    });
  };

  const getOrder = async (id: string): Promise<TOrder | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const order = orders.find((item) => item.id === id);
        resolve(order);
      }, 500);
    });
  };

  const updateOrder = async (order: TOrder): Promise<TOrder | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const orderRegistered = orders.find((item) => item.id === order.id);
        if (!orderRegistered) {
          resolve(undefined);
          return;
        }

        setOrders((prevState) =>
          prevState.map((item) => (item.id === order.id ? order : item)),
        );

        resolve(order);
      }, 1000);
    });
  };

  const deleteOrder = async (id: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const orderRegistered = orders.find((item) => item.id === id);
        if (!orderRegistered) {
          resolve(false);
          return;
        }

        setOrders((prevState) => prevState.filter((item) => item.id !== id));
        resolve(true);
      }, 1000);
    });
  };

  const monthNames = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  const statusChart = useMemo((): TChartAreaStatusOrdersProps => {
    const result: Record<number, TStatusChartData> = {};

    // Inicializa todos os meses do ano
    for (let i = 0; i < 12; i++) {
      result[i] = {
        month: monthNames[i],
        cancelled: 0,
        processing: 0,
        delivered: 0,
      };
    }

    // Percorre os pedidos e soma
    orders.forEach((order) => {
      if (!order.createdAt) return; // cobre undefined, null e string vazia

      const createdAt = new Date(order.createdAt);
      if (isNaN(createdAt.getTime())) return; // data inválida → ignora

      const m = new Date(order.createdAt).getMonth();

      if (order.status === 'cancelled') result[m].cancelled++;
      if (order.status === 'processing') result[m].processing++;
      if (order.status === 'delivered') result[m].delivered++;
    });

    // Retorna somente janeiro a junho se quiser limitar:
    return {
      quantity: orders.length,
      chartData: Object.values(result).slice(0, 6),
    };
  }, [orders]);

  const priceChart = useMemo((): TChartAreaPriceOrdersProps => {
    const result: Record<number, TPriceChartData> = {};
    let quantity = 0;
    let totalPrice = 0;

    // Inicializa todos os meses do ano
    for (let i = 0; i < 12; i++) {
      result[i] = {
        month: monthNames[i],
        price: 0,
      };
    }

    // Percorre os pedidos e soma
    orders.forEach((order) => {
      if (!order.createdAt) return; // cobre undefined, null e string vazia

      const createdAt = new Date(order.createdAt);
      if (isNaN(createdAt.getTime())) return; // data inválida → ignora

      const m = new Date(order.createdAt).getMonth();

      if (order.status === 'delivered') {
        result[m].price += order.price ?? 0;
        quantity++;
        totalPrice += order.price ?? 0;
      }
    });

    // Retorna somente janeiro a junho se quiser limitar:
    return {
      quantity: quantity,
      totalPrice: formatterPrice(totalPrice),
      chartData: Object.values(result).slice(0, 6),
    };
  }, [orders]);

  return (
    <ContextOrders.Provider
      value={{
        orders,
        setOrders,
        isLoading,
        setIsLoading,
        filterOrders,
        setFilterOrders,
        createOrder,
        updateOrder,
        searchOrders,
        getOrder,
        deleteOrder,
        statusChart,
        priceChart,
      }}
    >
      {children}
    </ContextOrders.Provider>
  );
}
