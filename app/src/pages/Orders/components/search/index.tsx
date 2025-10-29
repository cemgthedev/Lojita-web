import { InputCustom } from '@/components/common/Inputs/InputCustom';
import { useOrders } from '@/hooks/use-orders.hook';
import { IFilterOrders } from '@/providers/Orders.provider';
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

import { getStatusOptions, TOrder } from '@/types/TOrder';
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from '@heroui/drawer';

import { Autocomplete, AutocompleteItem } from '@heroui/autocomplete';

interface SearchProps {
  // Filters
  filterOrders?: IFilterOrders;
  setFilterOrders?: (filter: IFilterOrders) => void;
  searchOrders?: (filter: IFilterOrders) => void;
}

export const SearchOrder = ({
  filterOrders,
  setFilterOrders = () => {},
  searchOrders = () => {},
}: SearchProps) => {
  const { setIsLoading } = useOrders();
  const [searchBuyer, setSearchBuyer] = useState(filterOrders?.buyerName ?? '');
  const [status, setStatus] = useState(filterOrders?.status ?? '');
  const [minPrice, setMinPrice] = useState(filterOrders?.minPrice ?? 0);
  const [maxPrice, setMaxPrice] = useState(filterOrders?.maxPrice ?? 0);
  const [minQuantity, setMinQuantity] = useState(
    filterOrders?.minQuantity ?? 0,
  );
  const [maxQuantity, setMaxQuantity] = useState(
    filterOrders?.maxQuantity ?? 0,
  );

  const statusOptions = getStatusOptions();

  const {
    isOpen: isOpenModalFilters,
    onOpen: onOpenModalFilters,
    onOpenChange: onOpenChangeModalFilters,
  } = useDisclosure();

  const clearBuyerName = () => {
    setSearchBuyer('');
  };

  const clearstatus = () => {
    setStatus('');
  };

  const clearMinPrice = () => {
    setMinPrice(0);
  };

  const clearMaxPrice = () => {
    setMaxPrice(0);
  };

  const clearminQuantity = () => {
    setMinQuantity(0);
  };

  const clearmaxQuantity = () => {
    setMaxQuantity(0);
  };

  // debounce effect
  useEffect(() => {
    setIsLoading(true);
    const handler = setTimeout(() => {
      setFilterOrders?.({
        ...filterOrders,
        buyerName: searchBuyer || undefined,
      });

      searchOrders?.({
        ...filterOrders,
        buyerName: searchBuyer || undefined,
      });
    }, 300);
    setIsLoading(false);

    return () => {
      clearTimeout(handler);
    };
  }, [searchBuyer]);

  // debounce effect
  useEffect(() => {
    setIsLoading(true);
    const handler = setTimeout(() => {
      setFilterOrders?.({
        ...filterOrders,
        status: (status as TOrder['status']) || undefined,
      });
    }, 300);
    setIsLoading(false);

    return () => {
      clearTimeout(handler);
    };
  }, [status]);

  // debounce effect
  useEffect(() => {
    setIsLoading(true);
    const handler = setTimeout(() => {
      setFilterOrders?.({
        ...filterOrders,
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
      setFilterOrders?.({
        ...filterOrders,
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
      setFilterOrders?.({
        ...filterOrders,
        minQuantity: minQuantity || undefined,
      });
    }, 300);
    setIsLoading(false);

    return () => {
      clearTimeout(handler);
    };
  }, [minQuantity]);

  // debounce effect
  useEffect(() => {
    setIsLoading(true);
    const handler = setTimeout(() => {
      setFilterOrders?.({
        ...filterOrders,
        maxQuantity: maxQuantity || undefined,
      });
    }, 300);
    setIsLoading(false);

    return () => {
      clearTimeout(handler);
    };
  }, [maxQuantity]);

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
          placeholder="Pesquisar por comprador"
          radius="full"
          startContent={
            <Search
              className="min-w-5 max-w-5 min-h-5 max-h-5 opacity-50"
              size={20}
            />
          }
          type="text"
          value={searchBuyer}
          onChange={(e) => setSearchBuyer(e.target.value)}
          onClear={clearBuyerName}
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
                <Autocomplete
                  isClearable
                  aria-label="Filtrar por categoria"
                  radius="full"
                  inputProps={{
                    className: 'text-sm',
                  }}
                  defaultItems={statusOptions}
                  placeholder="Filtrar por categoria"
                  startContent={
                    <ChartBarStackedIcon
                      className="min-w-5 max-w-5 min-h-5 max-h-5 opacity-50"
                      size={20}
                    />
                  }
                  onClear={clearstatus}
                  selectedKey={filterOrders?.status}
                  onSelectionChange={(key) => {
                    const selected = key ? String(key) : '';

                    setStatus(selected);
                  }}
                >
                  {(item) => (
                    <AutocompleteItem key={item.key}>
                      {item.label}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
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
                    aria-label="Filtrar por quantidade mínima"
                    classNames={{
                      input: 'text-sm',
                    }}
                    placeholder="Quantidade mínima"
                    radius="full"
                    startContent={
                      <PackageIcon
                        className="min-w-5 max-w-5 min-h-5 max-h-5 opacity-50"
                        size={20}
                      />
                    }
                    type="number"
                    value={minQuantity ? String(minQuantity) : ''}
                    onChange={(e) => setMinQuantity(Number(e.target.value))}
                    onClear={clearminQuantity}
                  />
                  <InputCustom
                    isClearable
                    aria-label="Filtrar por quantidade máxima"
                    classNames={{
                      input: 'text-sm',
                    }}
                    placeholder="Quantidade máxima"
                    radius="full"
                    startContent={
                      <PackageIcon
                        className="min-w-5 max-w-5 min-h-5 max-h-5 opacity-50"
                        size={20}
                      />
                    }
                    type="number"
                    value={maxQuantity ? String(maxQuantity) : ''}
                    onChange={(e) => setMaxQuantity(Number(e.target.value))}
                    onClear={clearmaxQuantity}
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
                    searchOrders(filterOrders ?? {});
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
