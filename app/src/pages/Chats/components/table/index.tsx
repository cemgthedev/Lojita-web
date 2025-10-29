import { TableCustom } from '@/components/common/TableCustom';
import { TChat } from '@/types/TChat';
import {
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/table';

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
import { EllipsisVertical, User2Icon } from 'lucide-react';
import { Key, useCallback, useState } from 'react';

export interface TableChatsProps {
  chats: TChat[];
  emptyContent?: string;
  loadingState?: boolean;
  topContent?: React.ReactNode;
  bottomContent?: React.ReactNode;
  removeActions?: boolean;
  // Events
  onOpenEdit?: (chat: TChat) => void;
  remove?: (id: string) => void;
}

export function TableChats({
  chats,
  emptyContent,
  loadingState = false,
  removeActions = false,
  topContent,
  bottomContent,
  onOpenEdit,
  remove,
}: TableChatsProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [chat, setChat] = useState<TChat | null>(null);

  const columns = [
    { uid: 'name', name: 'COMPRADOR' },
    { uid: 'address', name: 'ENDEREÇO' },
    { uid: 'age', name: 'IDADE' },
    { uid: 'phone', name: 'TELEFONE' },
  ];

  if (!removeActions) {
    columns.push({
      uid: 'actions',
      name: 'AÇÕES',
    });
  }

  const renderCell = useCallback((chat: TChat, columnKey: Key) => {
    switch (columnKey) {
      case 'name':
        return (
          <div className="flex flex-row items-center gap-2">
            <Avatar
              alt={chat.buyer?.name || 'Comprador'}
              className="min-w-16 max-w-16 min-h-16 max-h-16 rounded-full"
              src={chat.buyer?.avatarUrl}
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
              <p className="font-semibold">{chat?.buyer?.name || '—'}</p>
              <p className="text-sm text-default-400">
                {chat?.buyer?.email || ''}
              </p>
            </div>
          </div>
        );
      case 'address':
        return <p className="line-clamp-2">{chat?.buyer?.address || '—'}</p>;
      case 'age':
        return <p>{chat?.buyer?.age || '—'}</p>;
      case 'phone':
        return <p>{chat?.buyer?.phone || '—'}</p>;
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
                onPress={() => onOpenEdit?.(chat)}
              >
                Editar
              </DropdownItem>
              <DropdownItem
                key="remove"
                hidden={!remove}
                onPress={() => {
                  setChat(chat);
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
        aria-label="Table Chats"
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
          items={chats}
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
        isOpen={isOpen && !!chat}
        title="Excluir conversa"
        message="Tem certeza que deseja excluir esta conversa?"
        onClose={onClose}
        onContinue={() => {
          chat && remove?.(chat.id);
        }}
      />
    </>
  );
}
