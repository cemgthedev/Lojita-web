import { ModalDelete } from '@/components/common/ModalDelete';
import { ThemeSwitch } from '@/components/theme-switch';
import { Endpoints } from '@/constants/endpoints';
import { useUsers } from '@/hooks/use-users.hook';
import { useAuthentication } from '@/providers/Authentication.provider';
import { EGenders } from '@/types/TUser';
import { Avatar } from '@heroui/avatar';
import { Button } from '@heroui/button';
import { Card, CardBody } from '@heroui/card';
import { Divider } from '@heroui/divider';
import { useDisclosure } from '@heroui/modal';
import {
  ArrowLeftIcon,
  CalendarClockIcon,
  IdCardIcon,
  LogOutIcon,
  MapPinHouseIcon,
  PhoneIcon,
  SquarePenIcon,
  Trash2Icon,
  User2Icon,
  VenusAndMarsIcon,
} from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Profile() {
  const { user, logout } = useAuthentication();
  const { deleteUser } = useUsers();
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  return (
    <>
      <section className="flex flex-col items-center gap-4 p-6">
        <div className="flex justify-between items-center gap-4 w-full">
          <Button
            variant="light"
            size="md"
            radius="md"
            isIconOnly
            onPress={() => navigate(-1)}
          >
            <ArrowLeftIcon
              size={20}
              className="min-w-5 max-w-5 min-h-5 max-h-5"
            />
          </Button>
          <h1 className="text-2xl font-semibold">Perfil do Usuário</h1>
          <ThemeSwitch />
        </div>

        <Card
          shadow="none"
          className="w-full md:w-4/5 lg:w-3/5 gap-4 bg-transparent"
        >
          <CardBody className="gap-4">
            <div className="flex gap-4 items-center">
              <Avatar
                isBordered
                color="secondary"
                src={user?.avatarUrl || undefined}
                alt={'imagem do usuário'}
                fallback={
                  <User2Icon
                    size={80}
                    className="min-w-20 max-w-20 min-h-20 max-h-20"
                  />
                }
                className="border-1 border-default-800 min-w-[128px] max-w-[128px] min-h-[128px] max-h-[128px]"
              />
              <div className="flex flex-col gap-3">
                <div>
                  <h1 className="text-lg font-semibold">{user?.name}</h1>
                  <p>{user?.email}</p>
                </div>
                <Button
                  variant="ghost"
                  color="danger"
                  size="md"
                  radius="md"
                  className="w-full shadow-sm text-red-600"
                  onPress={() => logout()}
                >
                  <LogOutIcon
                    size={20}
                    className="min-w-5 max-w-5 min-h-5 max-h-5"
                  />
                  <p className="font-medium">Sair</p>
                </Button>
              </div>
            </div>

            <Divider />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {user?.document && (
                <div className="flex gap-1 items-center">
                  <IdCardIcon
                    size={24}
                    className="min-w-6 max-w-6 min-h-6 max-h-6"
                  />
                  <p>
                    <span className="font-semibold">CPF:</span> {user.document}
                  </p>
                </div>
              )}

              {user?.phone && (
                <div className="flex gap-1 items-center">
                  <PhoneIcon
                    size={24}
                    className="min-w-6 max-w-6 min-h-6 max-h-6"
                  />
                  <p>
                    <span className="font-semibold">Telefone:</span>{' '}
                    {user.phone}
                  </p>
                </div>
              )}

              {user?.gender && (
                <div className="flex gap-1 items-center">
                  <VenusAndMarsIcon
                    size={24}
                    className="min-w-6 max-w-6 min-h-6 max-h-6"
                  />
                  <p>
                    <span className="font-semibold">Sexo:</span>{' '}
                    {EGenders[user.gender]}
                  </p>
                </div>
              )}

              {user?.age && (
                <div className="flex gap-1 items-center">
                  <CalendarClockIcon
                    size={24}
                    className="min-w-6 max-w-6 min-h-6 max-h-6"
                  />
                  <p>
                    <span className="font-semibold">Idade:</span> {user.age}
                  </p>
                </div>
              )}

              {user?.address && (
                <div className="flex gap-1 items-center">
                  <MapPinHouseIcon
                    size={24}
                    className="min-w-6 max-w-6 min-h-6 max-h-6"
                  />
                  <p>
                    <span className="font-semibold">Endereço:</span>{' '}
                    {user.address}
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-between gap-4">
              <h1 className="text-lg font-semibold">
                Deseja atualizar o perfil ?
              </h1>
              <Button
                variant="shadow"
                color="primary"
                size="md"
                radius="md"
                className="min-w-fit shadow-sm"
                as={Link}
                to={user?.id ? `${Endpoints.update}/${user.id}` : ''}
              >
                <SquarePenIcon
                  size={20}
                  className="text-gray-50 min-w-5 max-w-5 min-h-5 max-h-5"
                />
                <p className="text-gray-50 font-medium">Atualizar</p>
              </Button>
            </div>

            <div className="flex justify-between gap-4">
              <div className="flex flex-col w-full md:w-1/2">
                <h1 className="text-lg font-semibold">
                  Deseja apagar o perfil ?
                </h1>
                <p>
                  Obs: esta ação irá apagar permanentemente os dados de sua
                  conta incluindo perfil e produtos. Contudo, as mensagens com
                  outros usuários não serão apagadas.
                </p>
              </div>
              <Button
                variant="shadow"
                color="danger"
                size="md"
                radius="md"
                className="min-w-fit shadow-sm"
                onPress={() => {
                  if (user?.id) {
                    setSelectedUserId(user?.id);
                    onOpen();
                  }
                }}
              >
                <Trash2Icon
                  size={20}
                  className="text-gray-50 min-w-5 max-w-5 min-h-5 max-h-5"
                />
                <p className="text-red-50 font-medium">Remover</p>
              </Button>
            </div>
          </CardBody>
        </Card>
      </section>
      <ModalDelete
        isOpen={isOpen && !!selectedUserId}
        title="Excluir perfil"
        message="Tem certeza que deseja excluir seu perfil?"
        onClose={onClose}
        onContinue={() => {
          if (selectedUserId) {
            deleteUser?.(selectedUserId);
            logout?.();
          }
        }}
      />
    </>
  );
}
