import { createUserSchema } from '@/common/validations/users/create-user.schema';
import { updateUserSchema } from '@/common/validations/users/update-user.schema';
import { USER_LOGGED } from '@/constants/tokens';
import { useUsers } from '@/hooks/use-users.hook';
import { useAuthentication } from '@/providers/Authentication.provider';
import { ERoles } from '@/types/TUser';
import { cache } from '@/utils/cache.util';
import { Button } from '@heroui/button';
import { Card, CardBody, CardFooter, CardHeader } from '@heroui/card';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { XCircleIcon } from 'lucide-react';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import z from 'zod/v3';
import { UserForm } from './form';

export function UpsertUser() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isCreate = !id;

  const userSchema = isCreate ? createUserSchema : updateUserSchema;
  type TFormUser = z.infer<typeof createUserSchema>;

  const methods = useForm<TFormUser>({
    resolver: zodResolver(userSchema),
  });

  useEffect(() => {
    if (methods.formState.errors) {
      console.log(methods.formState.errors);
    }
  }, [methods.formState.errors]);

  const { setUser } = useAuthentication();
  const { createUser, updateUser, getUser } = useUsers();

  const { data: user, isLoading: isLoadingUser } = useQuery({
    enabled: !!id,
    queryKey: ['get-user', id],
    queryFn: () => getUser(id!),
  });

  const mutation = isCreate ? createUser : updateUser;

  useEffect(() => {
    if (user && !isCreate) {
      methods.reset({ ...user });
    }
  }, [user, isLoadingUser, isCreate]);

  const onSubmit = methods.handleSubmit((data) => {
    mutation(data);
    cache.setValue(USER_LOGGED, JSON.stringify(data));
    setUser(data);

    navigate(-1);
  });

  const isAdmin = user?.role === ERoles.admin;

  return (
    <section className="relative flex flex-col justify-center items-center gap-4 px-4 h-screen bg-gradient-to-t from-[#075985] to-[#5B21B6]">
      <span className="absolute inset-0 bg-[url(/blur-background.svg)]" />

      <Card className="w-full sm:w-4/5 md:w-3/5 px-2 py-4">
        <FormProvider {...methods}>
          <form onSubmit={onSubmit}>
            <CardHeader className="relative flex flex-col items-center text-2xl font-semibold">
              {isCreate ? 'Cadastrar Usuário' : 'Atualizar Usuário'}
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
              <UserForm isAdmin />
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
