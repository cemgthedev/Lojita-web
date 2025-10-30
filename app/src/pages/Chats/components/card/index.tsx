import { InputCustom } from '@/components/common/Inputs/InputCustom';
import { TChat } from '@/types/TChat';
import { formatterDateTime } from '@/utils/formatter.util';
import { Button } from '@heroui/button';
import { Card, CardBody } from '@heroui/card';
import { cn } from '@heroui/theme';
import { ArrowLeftIcon, PencilLineIcon, SendIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface CardChatProps {
  chat: TChat;
  removeActions?: boolean;
  // Events
  remove?: (Chat: TChat) => void;
}

export function CardChat({ chat, removeActions, remove }: CardChatProps) {
  const navigate = useNavigate();
  return (
    <Card shadow="none" radius="md" className="bg-transparent overflow-hidden">
      <CardBody className="p-0">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-2">
              {!removeActions && (
                <>
                  <Button
                    size="md"
                    variant="shadow"
                    color="danger"
                    className="min-w-32 max-w-32 font-medium shadow-sm"
                    hidden={!remove}
                    onPress={remove && (() => remove(chat))}
                  >
                    Excluir
                  </Button>
                  <Button
                    size="md"
                    variant="shadow"
                    color="primary"
                    className="min-w-32 max-w-32 font-medium shadow-sm"
                    onPress={() => {}}
                  >
                    Editar
                  </Button>
                </>
              )}
            </div>
            <Button
              variant="light"
              isIconOnly
              startContent={<ArrowLeftIcon size={20} />}
              onPress={() => navigate(-1)}
            />
          </div>

          {chat?.messages && chat?.messages?.length > 0 && (
            <div className="flex flex-col gap-4 justify-between min-h-[72vh] max-h-[72vh]">
              <div className="flex flex-col gap-4 flex-1 overflow-y-auto">
                {chat.messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      'w-1/2 rounded-lg p-3',
                      chat.buyerId === message.userId
                        ? 'bg-default-100'
                        : 'ml-auto text-right bg-purple-200 dark:bg-secondary',
                    )}
                  >
                    <p className="text-sm text-right">
                      {formatterDateTime(message.createdAt)}
                    </p>
                    <p>{message.content}</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-center gap-4 pb-4">
                <InputCustom
                  startContent={
                    <PencilLineIcon size={20} className="text-default-400" />
                  }
                  placeholder="Escreva a mensagem"
                  className="w-full md:w-3/5 lg:w-1/2"
                />
                <Button
                  variant="shadow"
                  color="success"
                  className="shadow-md"
                  isIconOnly
                  startContent={<SendIcon size={20} className="text-gray-50" />}
                />
              </div>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
