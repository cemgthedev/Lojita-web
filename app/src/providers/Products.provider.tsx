import { productsMock } from '@/mock/products';
import { TProduct } from '@/types/TProduct';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';

interface IContextProducts {
  products: TProduct[];
  setProducts: Dispatch<SetStateAction<TProduct[]>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  filterProducts: IFilterProducts;
  setFilterProducts: Dispatch<SetStateAction<IFilterProducts>>;

  createProduct(Product: TProduct): Promise<TProduct | undefined>;
  searchProduct(filterProducts: IFilterProducts): Promise<TProduct[]>;
  getProduct(id: string): Promise<TProduct | undefined>;
  updateProduct(Product: TProduct, id: string): Promise<TProduct | undefined>;
  deleteProduct(id: string): Promise<boolean>;
}

export const ContextProducts = createContext({} as IContextProducts);

interface IProviderProducts {
  children: ReactNode;
}

export interface IFilterProducts {
  name?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minStock?: number;
  maxStock?: number;
}

export function ProviderProducts({ children }: IProviderProducts) {
  const [products, setProducts] = useState<TProduct[]>(productsMock);
  const [isLoading, setIsLoading] = useState(false);
  const [filterProducts, setFilterProducts] = useState<IFilterProducts>({});

  const createProduct = async (
    product: TProduct,
  ): Promise<TProduct | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setProducts((prevState) => [...prevState, product]);

        resolve(product);
      }, 1000);
    });
  };

  const searchProduct = async (
    filterProducts: IFilterProducts,
  ): Promise<TProduct[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredProducts = productsMock.filter((item) => {
          const hasVariants = item.variants.length > 0;

          const matchesName = filterProducts.name
            ? item.name
                .toLowerCase()
                .includes(filterProducts.name.toLowerCase())
            : true;

          const matchesCategory = filterProducts.category
            ? item.category
                .toLowerCase()
                .includes(filterProducts.category.toLowerCase())
            : true;

          const matchesMinPrice =
            hasVariants && filterProducts.minPrice !== undefined
              ? item.variants.some(
                  (v) => v.price >= (filterProducts.minPrice ?? 0),
                )
              : true;

          const matchesMaxPrice =
            hasVariants && filterProducts.maxPrice !== undefined
              ? item.variants.some(
                  (v) => v.price <= (filterProducts.maxPrice ?? Infinity),
                )
              : true;

          const matchesMinStock =
            hasVariants && filterProducts.minStock !== undefined
              ? item.variants.some(
                  (v) => v.stock >= (filterProducts.minStock ?? 0),
                )
              : true;

          const matchesMaxStock =
            hasVariants && filterProducts.maxStock !== undefined
              ? item.variants.some(
                  (v) => v.stock <= (filterProducts.maxStock ?? Infinity),
                )
              : true;

          return (
            matchesName &&
            matchesCategory &&
            matchesMinPrice &&
            matchesMaxPrice &&
            matchesMinStock &&
            matchesMaxStock
          );
        });

        setProducts(filteredProducts);

        resolve(filteredProducts);
      }, 1000);
    });
  };

  const getProduct = async (id: string): Promise<TProduct | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const product = products.find((item) => item.id === id);

        if (!product) {
          resolve(undefined);
        }

        resolve(product);
      });
    });
  };

  const updateProduct = async (
    product: TProduct,
  ): Promise<TProduct | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const productRegistered = products.find(
          (item) => item.id === product.id,
        );

        if (!productRegistered) {
          resolve(undefined);
        }

        setProducts((prevState) =>
          prevState.map((item) => (item.id === product.id ? product : item)),
        );

        resolve(product);
      }, 1000);
    });
  };

  const deleteProduct = async (id: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const ProductRegistered = products.find((item) => item.id === id);

        if (!ProductRegistered) {
          resolve(false);
        }

        setProducts((prevState) => prevState.filter((item) => item.id !== id));

        resolve(true);
      }, 1000);
    });
  };

  return (
    <ContextProducts.Provider
      value={{
        products,
        setProducts,
        isLoading,
        setIsLoading,
        filterProducts,
        setFilterProducts,
        createProduct,
        updateProduct,
        searchProduct,
        getProduct,
        deleteProduct,
      }}
    >
      {children}
    </ContextProducts.Provider>
  );
}
