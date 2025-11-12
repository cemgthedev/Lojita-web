import { TableCustom } from '@/components/common/TableCustom';
import { StatusLabels, TOrder } from '@/types/TOrder';
import {
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/table';

import { Chip } from '@heroui/chip';

import { formatterPrice } from '@/utils/formatter.util';

import { ModalDelete } from '@/components/common/ModalDelete';
import { Avatar } from '@heroui/avatar';
import { Button } from '@heroui/button';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@heroui/dropdown';
import { useDisclosure } from '@heroui/modal';
import { Spinner } from '@heroui/spinner';
import { cn } from '@heroui/theme';
import { EllipsisVertical, User2Icon } from 'lucide-react';
import { Key, useCallback, useState } from 'react';

export interface TableOrdersProps {
  orders: TOrder[];
  emptyContent?: string;
  loadingState?: boolean;
  topContent?: React.ReactNode;
  bottomContent?: React.ReactNode;
  removeActions?: boolean;
  // Events
  onOpenEdit?: (order: TOrder) => void;
  remove?: (id: string) => void;
}

// Função auxiliar para colorir status
function getStatusColor(status: TOrder['status']) {
  switch (status) {
    case 'pending':
      return {
        bg: 'bg-yellow-200 dark:opacity-90',
        text: 'text-yellow-800',
      };
    case 'processing':
      return {
        bg: 'bg-sky-200 dark:opacity-90',
        text: 'text-sky-800',
      };
    case 'delivered':
      return {
        bg: 'bg-green-200 dark:opacity-90',
        text: 'text-green-800',
      };
    case 'cancelled':
      return {
        bg: 'bg-red-200 dark:opacity-90',
        text: 'text-red-800',
      };
    default:
      return {
        bg: 'bg-gray-300 dark:opacity-90',
        text: 'text-gray-600',
      };
  }
}

export function TableOrders({
  orders,
  emptyContent,
  loadingState = false,
  removeActions = false,
  topContent,
  bottomContent,
  onOpenEdit,
  remove,
}: TableOrdersProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [order, setOrder] = useState<TOrder | null>(null);

  const columns = [
    { uid: 'id', name: 'ID' },
    { uid: 'buyer', name: 'COMPRADOR' },
    { uid: 'products', name: 'PRODUTOS' },
    { uid: 'quantity', name: 'QUANTIDADE' },
    { uid: 'price', name: 'VALOR FINAL' },
    { uid: 'status', name: 'STATUS' },
  ];

  if (!removeActions) {
    columns.push({
      uid: 'actions',
      name: 'AÇÕES',
    });
  }

  const renderCell = useCallback((order: TOrder, columnKey: Key) => {
    switch (columnKey) {
      case 'id':
        return <p>{order.id}</p>;
      case 'buyer':
        return (
          <div className="flex flex-row items-center gap-2">
            <Avatar
              alt={order.buyer?.name || 'Comprador'}
              className="min-w-16 max-w-16 min-h-16 max-h-16 rounded-full"
              src={order.buyer?.avatarUrl || undefined}
              color="secondary"
              showFallback
              fallback={
                <User2Icon
                  className="text-gray-50 min-w-8 max-w-8 min-h-8 max-h-8"
                  size={32}
                />
              }
            />
            <div className="flex flex-col">
              <p className="font-semibold">{order.buyer?.name || '—'}</p>
              <p className="text-sm text-default-400">
                {order.buyer?.email || ''}
              </p>
            </div>
          </div>
        );
      case 'products':
        const products = order?.products
          ? order.products.map((p) => p.name).join(', ')
          : '-';
        return <p className="line-clamp-2">{products}</p>;
      case 'status':
        const statusColors = getStatusColor(order.status);
        return (
          <Chip
            classNames={{
              base: cn(statusColors.bg),
              content: cn('font-medium', statusColors.text),
            }}
          >
            {StatusLabels[order.status]}
          </Chip>
        );
      case 'quantity':
        return <p>{order.quantity}</p>;
      case 'price':
        return <p>{formatterPrice(order.price ?? 0)}</p>;
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
                onPress={() => onOpenEdit?.(order)}
              >
                Editar
              </DropdownItem>
              <DropdownItem
                key="remove"
                hidden={!remove}
                onPress={() => {
                  setOrder(order);
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
        aria-label="Table orders"
        bottomContent={bottomContent}
        topContent={topContent}
        className="w-full lg:w-4/5"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={
                column.uid === 'actions' || column.uid === 'quantity'
                  ? 'center'
                  : 'start'
              }
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={orders}
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
        isOpen={isOpen && !!order}
        title="Excluir pedido"
        message="Tem certeza que deseja excluir este pedido?"
        onClose={onClose}
        onContinue={() => {
          order && remove?.(order?.id);
        }}
      />
    </>
  );
}
