import { InputCustom } from '@/components/common/Inputs/InputCustom';
import { useChats } from '@/hooks/use-chats.hook';
import { IFilterChats } from '@/providers/Chats.provider';
import { Button } from '@heroui/button';
import { DateRangePicker } from '@heroui/date-picker';
import { useDisclosure } from '@heroui/modal';

import { FilterIcon, MessageSquareTextIcon, Search } from 'lucide-react';
import { useEffect, useState } from 'react';

import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from '@heroui/drawer';
import { Textarea } from '@heroui/input';
import { parseDate } from '@internationalized/date';

interface SearchProps {
  // Filters
  filterChats?: IFilterChats;
  setFilterChats?: (filter: IFilterChats) => void;
  searchChats?: (filter: IFilterChats) => void;
}

export const SearchChat = ({
  filterChats,
  setFilterChats = () => {},
  searchChats = () => {},
}: SearchProps) => {
  const { setIsLoading } = useChats();
  const [searchBuyer, setSearchBuyer] = useState(filterChats?.buyerName ?? '');
  const [rangeDate, setRangeDate] = useState(
    filterChats?.startDate && filterChats?.endDate
      ? {
          start: parseDate(filterChats?.startDate),
          end: parseDate(filterChats?.endDate),
        }
      : undefined,
  );
  const [content, setContent] = useState(filterChats?.messageContent ?? '');

  const {
    isOpen: isOpenModalFilters,
    onOpen: onOpenModalFilters,
    onOpenChange: onOpenChangeModalFilters,
  } = useDisclosure();

  const clearBuyerName = () => {
    setSearchBuyer('');
  };

  const clearMessageContent = () => {
    setContent('');
  };

  // debounce effect
  useEffect(() => {
    setIsLoading(true);
    const handler = setTimeout(() => {
      setFilterChats?.({
        ...filterChats,
        buyerName: searchBuyer || undefined,
      });

      searchChats?.({
        ...filterChats,
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
      setFilterChats?.({
        ...filterChats,
        startDate: rangeDate?.start?.toString() || undefined,
        endDate: rangeDate?.end?.toString() || undefined,
      });
    }, 300);
    setIsLoading(false);

    return () => {
      clearTimeout(handler);
    };
  }, [rangeDate]);

  useEffect(() => {
    setIsLoading(true);
    const handler = setTimeout(() => {
      setFilterChats?.({
        ...filterChats,
        messageContent: content || undefined,
      });
    }, 300);
    setIsLoading(false);

    return () => {
      clearTimeout(handler);
    };
  }, [content]);

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
                <DateRangePicker
                  variant="bordered"
                  label="Início e fim da conversa"
                  value={rangeDate}
                  onChange={(value) => {
                    const startDate = value?.start;
                    const endDate = value?.end;

                    setRangeDate(
                      startDate && endDate
                        ? {
                            start: startDate,
                            end: endDate,
                          }
                        : undefined,
                    );
                  }}
                />

                <Textarea
                  isClearable
                  variant="bordered"
                  aria-label="Filtrar por mensagem"
                  classNames={{
                    input: 'text-sm',
                  }}
                  placeholder="Digite o conteúdo da mensagem"
                  radius="full"
                  startContent={
                    <MessageSquareTextIcon
                      className="min-w-5 max-w-5 min-h-5 max-h-5 opacity-50"
                      size={20}
                    />
                  }
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  onClear={clearMessageContent}
                />
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
                    searchChats(filterChats ?? {});
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
