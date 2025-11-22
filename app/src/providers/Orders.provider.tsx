import {
  TPriceChartData,
  TPriceOrdersChartAreaProps,
} from '@/components/common/charts/ChartAreaPriceOrders';
import {
  TStatusChartData,
  TStatusOrdersChartAreaProps,
} from '@/components/common/charts/ChartAreaStatusOrders';
import {
  TSalesByCategoryChartData,
  TSalesBySegmentChartPieProps,
} from '@/components/common/charts/ChartPieSalesBySegment';
import { ChartConfig } from '@/components/ui/chart';
import { ordersMock } from '@/mock/orders';
import { usersMock } from '@/mock/users';
import { TOrder } from '@/types/TOrder';
import { EGenders, gendersLabels } from '@/types/TUser';
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

  statusChartArea: TStatusOrdersChartAreaProps;
  priceChartArea: TPriceOrdersChartAreaProps;
  salesByCategoryChartPie: TSalesBySegmentChartPieProps;
  salesByGenderChartPie: TSalesBySegmentChartPieProps;
  salesByAgeRangeChartPie: TSalesBySegmentChartPieProps;
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

  const statusChartArea = useMemo((): TStatusOrdersChartAreaProps => {
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

  const priceChartArea = useMemo((): TPriceOrdersChartAreaProps => {
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
    orders
      .filter((order) => order.status === 'delivered')
      .forEach((order) => {
        if (!order.createdAt) return; // cobre undefined, null e string vazia

        const createdAt = new Date(order.createdAt);
        if (isNaN(createdAt.getTime())) return; // data inválida → ignora

        const m = new Date(order.createdAt).getMonth();

        result[m].price += order.price ?? 0;
        quantity += order.quantity ?? 0;
        totalPrice += order.price ?? 0;
      });

    // Retorna somente janeiro a junho se quiser limitar:
    return {
      quantity: quantity,
      totalPrice: formatterPrice(totalPrice),
      chartData: Object.values(result).slice(0, 6),
    };
  }, [orders]);

  const salesByCategoryChartPie = useMemo((): TSalesBySegmentChartPieProps => {
    const categoryTotals: Record<string, number> = {};

    let totalQuantity = 0;
    let totalPrice = 0;

    const deliveredOrders = orders.filter(
      (order) => order.status === 'delivered',
    );

    for (const order of deliveredOrders) {
      if (!order.products?.length || !order.price || !order.quantity) continue;

      totalQuantity += order.quantity ?? 0;
      totalPrice += order.price;

      for (const p of order.products) {
        const proportion = p.quantity / totalQuantity;
        const value = order.price * proportion;

        categoryTotals[p.category] = (categoryTotals[p.category] ?? 0) + value;
      }
    }

    /** Ordenar categorias por maior valor */
    const sorted = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);

    const top4 = sorted.slice(0, 4);
    const rest = sorted.slice(4);

    const chartCategories = top4.map(([category, value]) => ({
      segment: category,
      value,
    }));

    if (rest.length > 0) {
      chartCategories.push({
        segment: 'outros',
        value: rest.reduce((acc, [, v]) => acc + v, 0),
      });
    }

    const overall = chartCategories.reduce((acc, c) => acc + c.value, 0);

    const defaultColors = [
      'var(--chart-4)',
      'var(--chart-5)',
      'var(--chart-6)',
      'var(--chart-7)',
      'var(--chart-8)',
    ];

    const chartData: TSalesByCategoryChartData[] = chartCategories.map(
      (c, i) => ({
        segment: c.segment,
        fill: defaultColors[i % defaultColors.length],
        percentage:
          overall > 0 ? Number(((c.value / overall) * 100).toFixed(2)) : 0,
      }),
    );

    const chartConfig: ChartConfig = {};

    chartData.forEach((c) => {
      chartConfig[c.segment] = {
        label: c.segment,
        color: c.fill,
      };
    });

    const subtitle =
      totalQuantity === 0
        ? 'Nenhuma venda'
        : totalQuantity === 1
          ? `${totalQuantity} venda com total de ${totalPrice}`
          : `${totalQuantity} vendas com total de ${totalPrice}`;

    return {
      title: 'Total de Vendas por Categoria',
      subtitle,
      chartData,
      chartConfig,
    };
  }, [orders]);

  const salesByGenderChartPie = useMemo((): TSalesBySegmentChartPieProps => {
    const genderTotals: Record<string, number> = {};

    let totalQuantity = 0;
    let totalPrice = 0;

    const deliveredOrders = orders.filter(
      (order) => order.status === 'delivered',
    );

    for (const order of deliveredOrders) {
      if (!order.products?.length || !order.price || !order.quantity) continue;

      totalQuantity += order.quantity ?? 0;
      totalPrice += order.price;

      if (!order?.buyer?.gender) continue;

      for (const p of order.products) {
        const proportion = p.quantity / totalQuantity;
        const value = order.price * proportion;

        genderTotals[order?.buyer?.gender] =
          (genderTotals[order?.buyer?.gender] ?? 0) + value;
      }
    }

    /** Ordenar categorias por maior valor */
    const sorted = Object.entries(genderTotals).sort((a, b) => b[1] - a[1]);

    const top4 = sorted.slice(0, 4);
    const rest = sorted.slice(4);

    const chartGenders = top4.map(([gender, value]) => ({
      segment: gender,
      value,
    }));

    if (rest.length > 0) {
      chartGenders.push({
        segment: 'outros',
        value: rest.reduce((acc, [, v]) => acc + v, 0),
      });
    }

    const overall = chartGenders.reduce((acc, c) => acc + c.value, 0);

    const defaultColors = [
      'var(--chart-4)',
      'var(--chart-5)',
      'var(--chart-6)',
      'var(--chart-7)',
      'var(--chart-8)',
    ];

    const chartData: TSalesByCategoryChartData[] = chartGenders.map((c, i) => ({
      segment: c.segment,
      fill: defaultColors[i % defaultColors.length],
      percentage:
        overall > 0 ? Number(((c.value / overall) * 100).toFixed(2)) : 0,
    }));

    const chartConfig: ChartConfig = {};

    chartData.forEach((c) => {
      chartConfig[c.segment] = {
        label: gendersLabels[c.segment as EGenders],
        color: c.fill,
      };
    });

    const subtitle =
      totalQuantity === 0
        ? 'Nenhuma venda'
        : totalQuantity === 1
          ? `${totalQuantity} venda com total de ${totalPrice}`
          : `${totalQuantity} vendas com total de ${totalPrice}`;

    return {
      title: 'Total de Vendas por Gênero',
      subtitle,
      chartData,
      chartConfig,
    };
  }, [orders]);

  const salesByAgeRangeChartPie = useMemo((): TSalesBySegmentChartPieProps => {
    const ageRangeTotals: Record<string, number> = {
      '51+ anos': 0,
      '35 a 50 anos': 0,
      '18 a 34 anos': 0,
    };

    let totalQuantity = 0;
    let totalPrice = 0;

    const deliveredOrders = orders.filter(
      (order) => order.status === 'delivered',
    );

    for (const order of deliveredOrders) {
      if (!order.products?.length || !order.price || !order.quantity) continue;

      const age = order?.buyer?.age;
      if (!age) continue;

      let ageRange: string | null = null;

      if (age >= 51) {
        ageRange = '51+ anos';
      } else if (age >= 35 && age <= 50) {
        ageRange = '35 a 50 anos';
      } else if (age >= 18 && age <= 34) {
        ageRange = '18 a 34 anos';
      } else {
        continue;
      }

      totalQuantity += order.quantity ?? 0;
      totalPrice += order.price;

      for (const p of order.products) {
        const proportion = p.quantity / totalQuantity;
        const value = order.price * proportion;

        ageRangeTotals[ageRange] += value;
      }
    }

    const rangesInOrder = ['51+ anos', '35 a 50 anos', '18 a 34 anos'];

    const chartRanges = rangesInOrder.map((range) => ({
      segment: range,
      value: ageRangeTotals[range] ?? 0,
    }));

    const overall = chartRanges.reduce((acc, c) => acc + c.value, 0);

    const defaultColors = [
      'var(--chart-4)',
      'var(--chart-5)',
      'var(--chart-6)',
    ];

    const chartData: TSalesByCategoryChartData[] = chartRanges.map((c, i) => ({
      segment: c.segment,
      fill: defaultColors[i % defaultColors.length],
      percentage:
        overall > 0 ? Number(((c.value / overall) * 100).toFixed(2)) : 0,
    }));

    const chartConfig: ChartConfig = {};
    chartData.forEach((c) => {
      chartConfig[c.segment] = {
        label: c.segment,
        color: c.fill,
      };
    });

    const subtitle =
      totalQuantity === 0
        ? 'Nenhuma venda'
        : totalQuantity === 1
          ? `${totalQuantity} venda com total de ${totalPrice}`
          : `${totalQuantity} vendas com total de ${totalPrice}`;

    return {
      title: 'Total de Vendas por Faixa Etária',
      subtitle,
      chartData,
      chartConfig,
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
        statusChartArea,
        priceChartArea,
        salesByCategoryChartPie,
        salesByGenderChartPie,
        salesByAgeRangeChartPie,
      }}
    >
      {children}
    </ContextOrders.Provider>
  );
}
