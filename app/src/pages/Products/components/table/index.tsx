import { TableCustom } from '@/components/common/TableCustom';
import { TProduct } from '@/types/TProduct';
import {
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/table';

import { formatterPrice } from '@/utils/formatter.util';

import { Key, useCallback, useState } from 'react';

import { useDisclosure } from '@heroui/modal';

import { ModalDelete } from '@/components/common/ModalDelete';
import { Avatar } from '@heroui/avatar';
import { Button } from '@heroui/button';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@heroui/dropdown';
import { Spinner } from '@heroui/spinner';
import { EllipsisVertical, ShoppingBasketIcon } from 'lucide-react';

export interface TableProducsProps {
  products: TProduct[];
  emptyContent?: string;
  loadingState?: boolean;
  topContent?: React.ReactNode;
  bottomContent?: React.ReactNode;
  removeActions?: boolean;
  // Events
  onOpenEdit?: (product: TProduct) => void;
  remove?: (id: string) => void;
}

export function TableProducts({
  products,
  emptyContent,
  loadingState = false,
  removeActions = false,
  topContent,
  bottomContent,
  onOpenEdit,
  remove,
}: TableProducsProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [product, setProduct] = useState<TProduct | null>(null);

  const columns = [
    { uid: 'name', name: 'NOME' },
    { uid: 'description', name: 'DESCRIÇÃO' },
    { uid: 'price', name: 'PREÇO' },
  ];

  if (!removeActions) {
    columns.push({
      uid: 'actions',
      name: 'AÇÕES',
    });
  }

  const renderCell = useCallback((product: TProduct, columnKey: Key) => {
    switch (columnKey) {
      case 'name':
        return (
          <div className="flex flex-row items-center gap-2">
            <Avatar
              alt={product?.name}
              className="min-w-16 max-w-16 min-h-16 max-h-16 rounded-full"
              src={product?.coverUrl}
              color="secondary"
              showFallback
              fallback={
                <ShoppingBasketIcon
                  className="text-gray-50 min-w-8 max-w-8 min-h-8 max-h-8"
                  size={32}
                />
              }
            />
            <div className="flex flex-col">
              <p className="font-semibold">{product?.name}</p>
              <p className="text-sm text-default-400">{product?.category}</p>
              <p className="text-sm text-default-400">
                {product?.totalStock} em estoque
              </p>
            </div>
          </div>
        );
      case 'description':
        return <p>{product.description}</p>;
      case 'price':
        const minPrice = Math.min(...product.variants.map((v) => v.price));
        const maxPrice = Math.max(...product.variants.map((v) => v.price));
        return minPrice === maxPrice ? (
          <p>{formatterPrice(minPrice)}</p>
        ) : (
          <p>{`${formatterPrice(minPrice)} - ${formatterPrice(maxPrice)}`}</p>
        );
      case 'actions':
        return (
          <Dropdown className="z-10">
            <DropdownTrigger>
              <Button isIconOnly size="sm" variant="light">
                <EllipsisVertical className="text-default-300" />
              </Button>
            </DropdownTrigger>

            <DropdownMenu aria-label="Dynamic Actions" className="z-10">
              <DropdownItem
                key="edit"
                hidden={!onOpenEdit}
                onPress={() => onOpenEdit?.(product)}
              >
                Editar
              </DropdownItem>
              <DropdownItem
                key="remove"
                hidden={!remove}
                onPress={() => {
                  setProduct(product);
                  onOpen();
                }}
              >
                Excluir
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        );
    }
  }, []);

  return (
    <>
      <TableCustom
        aria-label="Table products"
        bottomContent={bottomContent}
        topContent={topContent}
        className="w-full lg:w-4/5"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === 'actions' ? 'center' : 'start'}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={products}
          emptyContent={emptyContent}
          isLoading={loadingState}
          loadingContent={
            <Spinner
              classNames={{ base: 'opacity-50 p-2 rounded-lg' }}
              color="secondary"
            />
          }
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </TableCustom>
      <ModalDelete
        isOpen={isOpen && !!product}
        title="Excluir produto"
        message="Tem certeza que deseja excluir esse produto?"
        onClose={onClose}
        onContinue={() => {
          product && remove?.(product?.id);
        }}
      />
    </>
  );
}
