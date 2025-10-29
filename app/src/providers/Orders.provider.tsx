import { ordersMock } from '@/mock/orders';
import { usersMock } from '@/mock/users';
import { TOrder } from '@/types/TOrder';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
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
      }}
    >
      {children}
    </ContextOrders.Provider>
  );
}
