import { InputCustom } from '@/components/common/Inputs/InputCustom';
import { useProducts } from '@/hooks/use-products.hook';
import { IFilterProducts } from '@/providers/Products.provider';
import { Button } from '@heroui/button';
import { useDisclosure } from '@heroui/modal';
import {
  ChartBarStackedIcon,
  DollarSignIcon,
  FilterIcon,
  PackageIcon,
  Search,
} from 'lucide-react';
import { useEffect, useState } from 'react';

import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from '@heroui/drawer';

interface SearchProps {
  // Filters
  filterProducts?: IFilterProducts;
  setFilterProducts?: (filter: IFilterProducts) => void;
  searchProduct?: (filter: IFilterProducts) => void;
}

export const SearchProduct = ({
  filterProducts,
  setFilterProducts = () => {},
  searchProduct = () => {},
}: SearchProps) => {
  const { setIsLoading } = useProducts();
  const [search, setSearch] = useState(filterProducts?.name ?? '');
  const [category, setCategory] = useState(filterProducts?.category ?? '');
  const [minPrice, setMinPrice] = useState(filterProducts?.minPrice ?? 0);
  const [maxPrice, setMaxPrice] = useState(filterProducts?.maxPrice ?? 0);
  const [minStock, setMinStock] = useState(filterProducts?.minStock ?? 0);
  const [maxStock, setMaxStock] = useState(filterProducts?.maxStock ?? 0);

  const {
    isOpen: isOpenModalFilters,
    onOpen: onOpenModalFilters,
    onOpenChange: onOpenChangeModalFilters,
  } = useDisclosure();

  const clearName = () => {
    setSearch('');
  };

  const clearCategory = () => {
    setCategory('');
  };

  const clearMinPrice = () => {
    setMinPrice(0);
  };

  const clearMaxPrice = () => {
    setMaxPrice(0);
  };

  const clearMinStock = () => {
    setMinStock(0);
  };

  const clearMaxStock = () => {
    setMaxStock(0);
  };

  // debounce effect
  useEffect(() => {
    setIsLoading(true);
    const handler = setTimeout(() => {
      setFilterProducts?.({
        ...filterProducts,
        name: search || undefined,
      });
    }, 300);
    setIsLoading(false);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  // debounce effect
  useEffect(() => {
    setIsLoading(true);
    const handler = setTimeout(() => {
      setFilterProducts?.({
        ...filterProducts,
        category: category || undefined,
      });
    }, 300);
    setIsLoading(false);

    return () => {
      clearTimeout(handler);
    };
  }, [category]);

  // debounce effect
  useEffect(() => {
    setIsLoading(true);
    const handler = setTimeout(() => {
      setFilterProducts?.({
        ...filterProducts,
        minPrice: minPrice || undefined,
      });
    }, 300);
    setIsLoading(false);

    return () => {
      clearTimeout(handler);
    };
  }, [minPrice]);

  // debounce effect
  useEffect(() => {
    setIsLoading(true);
    const handler = setTimeout(() => {
      setFilterProducts?.({
        ...filterProducts,
        maxPrice: maxPrice || undefined,
      });
    }, 300);
    setIsLoading(false);

    return () => {
      clearTimeout(handler);
    };
  }, [maxPrice]);

  // debounce effect
  useEffect(() => {
    setIsLoading(true);
    const handler = setTimeout(() => {
      setFilterProducts?.({
        ...filterProducts,
        minStock: minStock || undefined,
      });
    }, 300);
    setIsLoading(false);

    return () => {
      clearTimeout(handler);
    };
  }, [minStock]);

  // debounce effect
  useEffect(() => {
    setIsLoading(true);
    const handler = setTimeout(() => {
      setFilterProducts?.({
        ...filterProducts,
        maxStock: maxStock || undefined,
      });
    }, 300);
    setIsLoading(false);

    return () => {
      clearTimeout(handler);
    };
  }, [maxStock]);

  return (
    <>
      <div className="flex gap-2 w-full justify-end">
        <InputCustom
          isClearable
          aria-label="Pesquisa por nome"
          classNames={{
            base: 'w-full md:w-1/2',
            input: 'text-sm',
          }}
          placeholder="Pesquisar por nome"
          radius="full"
          startContent={
            <Search
              className="min-w-5 max-w-5 min-h-5 max-h-5 opacity-50"
              size={20}
            />
          }
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClear={clearName}
        />
        <Button
          isIconOnly
          aria-label="filter"
          variant="bordered"
          startContent={<FilterIcon className="h-5 w-5" />}
          onPress={onOpenModalFilters}
        />
      </div>
      <Drawer
        isOpen={isOpenModalFilters}
        placement="left"
        onOpenChange={onOpenChangeModalFilters}
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                Filtros
              </DrawerHeader>
              <DrawerBody>
                <InputCustom
                  isClearable
                  aria-label="Filtrar por categoria"
                  classNames={{
                    input: 'text-sm',
                  }}
                  placeholder="Filtrar por categoria"
                  radius="full"
                  startContent={
                    <ChartBarStackedIcon
                      className="min-w-5 max-w-5 min-h-5 max-h-5 opacity-50"
                      size={20}
                    />
                  }
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  onClear={clearCategory}
                />
                <div className="flex flex-col gap-2 sm:flex-row">
                  <InputCustom
                    isClearable
                    aria-label="Filtrar por preço mínimo"
                    classNames={{
                      input: 'text-sm',
                    }}
                    placeholder="Preço mínimo"
                    radius="full"
                    startContent={
                      <DollarSignIcon
                        className="min-w-5 max-w-5 min-h-5 max-h-5 opacity-50"
                        size={20}
                      />
                    }
                    type="number"
                    value={minPrice ? String(minPrice) : ''}
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                    onClear={clearMinPrice}
                  />
                  <InputCustom
                    isClearable
                    aria-label="Filtrar por preço máximo"
                    classNames={{
                      input: 'text-sm',
                    }}
                    placeholder="Preço máximo"
                    radius="full"
                    startContent={
                      <DollarSignIcon
                        className="min-w-5 max-w-5 min-h-5 max-h-5 opacity-50"
                        size={20}
                      />
                    }
                    type="number"
                    value={maxPrice ? String(maxPrice) : ''}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    onClear={clearMaxPrice}
                  />
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <InputCustom
                    isClearable
                    aria-label="Filtrar por estoque mínimo"
                    classNames={{
                      input: 'text-sm',
                    }}
                    placeholder="Estoque mínimo"
                    radius="full"
                    startContent={
                      <PackageIcon
                        className="min-w-5 max-w-5 min-h-5 max-h-5 opacity-50"
                        size={20}
                      />
                    }
                    type="number"
                    value={minStock ? String(minStock) : ''}
                    onChange={(e) => setMinStock(Number(e.target.value))}
                    onClear={clearMinStock}
                  />
                  <InputCustom
                    isClearable
                    aria-label="Filtrar por estoque máximo"
                    classNames={{
                      input: 'text-sm',
                    }}
                    placeholder="Estoque máximo"
                    radius="full"
                    startContent={
                      <PackageIcon
                        className="min-w-5 max-w-5 min-h-5 max-h-5 opacity-50"
                        size={20}
                      />
                    }
                    type="number"
                    value={maxStock ? String(maxStock) : ''}
                    onChange={(e) => setMaxStock(Number(e.target.value))}
                    onClear={clearMaxStock}
                  />
                </div>
              </DrawerBody>
              <DrawerFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                  className="text-medium"
                >
                  Fechar
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    searchProduct(filterProducts ?? {});
                    onClose();
                  }}
                  className="text-medium"
                >
                  Filtrar
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};
