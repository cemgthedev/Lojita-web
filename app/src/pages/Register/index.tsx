import {
  createUserSchema,
  TCreateUser,
} from '@/common/validations/users/create-user.schema';
import { Endpoints } from '@/constants/endpoints';
import { USER_LOGGED } from '@/constants/tokens';
import { useUsers } from '@/hooks/use-users.hook';
import { useAuthentication } from '@/providers/Authentication.provider';
import { TCredentials } from '@/types/TCredentials';
import { cache } from '@/utils/cache.util';
import { Button } from '@heroui/button';
import { Card, CardBody, CardFooter, CardHeader } from '@heroui/card';
import { addToast } from '@heroui/toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { XCircleIcon } from 'lucide-react';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { UserForm } from '../Users/components/form';

export default function RegisterPage() {
  const navigate = useNavigate();

  const { createUser } = useUsers();
  const { login, setUser } = useAuthentication();

  const methods = useForm<TCreateUser>({
    resolver: zodResolver(createUserSchema),
  });

  useEffect(() => {
    if (methods.formState.errors) {
      console.log('Erros no form: ', methods.formState.errors);
    }
  }, [methods.formState.errors]);

  const { mutate: loginMutation, isPending: isPendingLogin } = useMutation({
    mutationFn: async (credentials: TCredentials) => {
      const response = await login(credentials);

      return response;
    },
    onSuccess(data) {
      const { user } = data ?? {};

      if (user) {
        setUser(user);
        cache.setValue(USER_LOGGED, JSON.stringify(user));
        navigate(Endpoints.dashboard);
        addToast({
          title: 'Bem-vindo(a) a Lojita!',
          color: 'success',
        });
      } else {
        addToast({
          title: 'Senha ou e-mail inválidos',
          color: 'danger',
        });
        navigate(Endpoints.login);
      }
    },
    onError() {
      addToast({
        title: 'Senha ou e-mail inválidos',
        color: 'danger',
      });
    },
  });

  const onSubmit = methods.handleSubmit((data) => {
    () => createUser(data);
    const { email, password } = data;
    loginMutation({ email, password });
  });

  return (
    <section className="relative flex flex-col justify-center items-center gap-4 px-4 h-screen bg-gradient-to-t from-[#075985] to-[#5B21B6]">
      <span className="absolute inset-0 bg-[url(/blur-background.svg)]" />

      <Card className="w-full sm:w-4/5 md:w-3/5 px-2 py-4">
        <FormProvider {...methods}>
          <form onSubmit={onSubmit}>
            <CardHeader className="relative flex flex-col items-center text-2xl font-semibold">
              Cadastro de Usuário
              <Button
                variant="light"
                isIconOnly
                disableAnimation
                className="p-0 data-[hover=true]:bg-transparent data-[hover=true]:text-red-600 absolute -top-4 -right-2"
                startContent={
                  <XCircleIcon className="min-w-6 max-w-6 min-h-6 max-h-6" />
                }
                onPress={() => navigate(-1)}
              />
            </CardHeader>
            <CardBody className="gap-4 h-[60vh]">
              <UserForm />
            </CardBody>
            <CardFooter className="justify-end gap-2">
              <Button
                variant="bordered"
                color="danger"
                onPress={() => navigate(-1)}
                className="text-red-600 text-medium font-medium"
              >
                Cancelar
              </Button>
              <Button
                variant="shadow"
                color="success"
                type="submit"
                className="shadow-md text-gray-50 text-medium font-medium"
                isLoading={isPendingLogin}
              >
                Cadastrar
              </Button>
            </CardFooter>
          </form>
        </FormProvider>
      </Card>
    </section>
  );
}
