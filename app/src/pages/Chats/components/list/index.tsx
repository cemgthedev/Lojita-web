import { ModalDelete } from '@/components/common/ModalDelete';
import { TChat } from '@/types/TChat';
import { Avatar } from '@heroui/avatar';
import { Card } from '@heroui/card';
import { Divider } from '@heroui/divider';
import { useDisclosure } from '@heroui/modal';
import { Spinner } from '@heroui/spinner';
import { Tab, Tabs } from '@heroui/tabs';
import { useState } from 'react';
import { CardChat } from '../card';

export interface ListChatsProps {
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

export function ListChats({
  chats,
  emptyContent,
  loadingState = false,
  removeActions = false,
  topContent,
  bottomContent,
  remove,
}: ListChatsProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [chat, setChat] = useState<TChat | null>(null);

  const handleRemoveChat = (chat: TChat) => {
    setChat(chat);
    onOpen();
  };

  return (
    <>
      <Card shadow="none" className="w-full gap-4 bg-transparent">
        {topContent}
        <Divider />

        {/* Carregando produtos */}
        {loadingState && (
          <div className="flex justify-center">
            <Spinner
              classNames={{ base: 'opacity-50 p-2 rounded-lg' }}
              color="secondary"
            />
          </div>
        )}

        {/* Produtos carregados */}
        {!loadingState && chats.length > 0 ? (
          <Tabs
            isVertical
            disableCursorAnimation
            classNames={{
              tabList:
                'p-4 bg-default-100 rounded-lg min-h-[80vh] max-h-[80vh]',
              tab: 'h-fit px-4 py-2 rounded-md data-[selected=true]:bg-purple-200 data-[hover=true]:opacity-80 dark:data-[selected=true]:bg-secondary dark:data-[hover=true]:opacity-80',
            }}
          >
            {chats.map((chat) => (
              <Tab
                key={chat.id}
                title={
                  <div className="flex flex-row items-center gap-2">
                    <Avatar
                      alt={chat.buyer?.name || 'Comprador'}
                      className="min-w-16 max-w-16 min-h-16 max-h-16 rounded-full border-1 border-gray-300"
                      src={chat.buyer?.avatarUrl || undefined}
                      color="secondary"
                      showFallback
                      fallback={
                        <p className="font-semibold text-lg">
                          {chat?.buyer?.name
                            ?.split(' ')
                            .map((n) => n[0].toUpperCase())}
                        </p>
                      }
                      title={chat?.buyer?.name || '—'}
                    />
                    <div className="hidden md:flex-col md:text-left md:flex">
                      <p className="font-semibold">
                        {chat?.buyer?.name || '—'}
                      </p>
                      <p className="text-sm text-default-600">
                        {chat?.buyer?.email || ''}
                      </p>
                    </div>
                  </div>
                }
                className="w-full"
              >
                <CardChat
                  chat={chat}
                  removeActions={removeActions}
                  remove={handleRemoveChat}
                />
              </Tab>
            ))}
          </Tabs>
        ) : (
          <p>{emptyContent}</p>
        )}

        {bottomContent}
      </Card>
      <ModalDelete
        isOpen={isOpen && !!chat}
        title="Excluir conversa"
        message="Tem certeza que deseja excluir essa conversa?"
        onClose={onClose}
        onContinue={() => {
          chat && remove?.(chat?.id);
        }}
      />
    </>
  );
}
