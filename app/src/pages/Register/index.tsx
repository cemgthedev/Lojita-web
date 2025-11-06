import { Button } from '@heroui/button';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { XCircleIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { UserForm } from '../Users/components/form';

export default function RegisterPage() {
  const navigate = useNavigate();

  return (
    <section className="relative flex flex-col justify-center items-center gap-4 px-4 h-screen bg-gradient-to-t from-[#075985] to-[#5B21B6]">
      <span className="absolute inset-0 bg-[url(/blur-background.svg)]" />

      <Card className="w-full sm:w-4/5 md:w-3/5 px-2 py-4">
        <>
          <form onSubmit={() => {}}>
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
            <CardBody className="gap-4">
              <UserForm />
            </CardBody>
          </form>
        </>
      </Card>
    </section>
  );
}
