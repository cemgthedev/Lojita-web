import { Card, CardBody, CardHeader } from '@heroui/card';

import { Endpoints } from '@/constants/endpoints';
import { Button } from '@heroui/button';
import { ExternalLinkIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from './components/form';

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <section className="relative flex flex-col justify-center items-center gap-4 h-screen bg-gradient-to-t from-[#075985] to-[#5B21B6]">
      <span className="absolute inset-0 bg-[url(/blur-background.svg)]" />

      <Card className="w-1/3 px-2 py-4 max-lg:w-3/5 max-md:w-4/5">
        <CardHeader className="flex flex-col items-center">
          <h1 className="text-2xl font-semibold">Login</h1>
          <p className="text-lg">Seja bem-vindo</p>
        </CardHeader>
        <CardBody className="gap-4">
          <LoginForm />
          <div className="flex gap-2 justify-center items-center">
            <p>Não possui conta ?</p>
            <Button
              variant="light"
              disableAnimation
              className="p-0 h-fit text-base data-[hover=true]:bg-transparent data-[hover=true]:text-primary-600"
              endContent={<ExternalLinkIcon className="w-5 h-5" />}
              onPress={() => navigate(Endpoints.register)}
            >
              Cadastre-se
            </Button>
          </div>
        </CardBody>
      </Card>
    </section>
  );
}
