import { Button } from '@heroui/button';
import { useNavigate } from 'react-router-dom';

import { Endpoints } from '@/constants/endpoints';

export default function GeneralError() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen">
      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
        <h1 className="text-[7rem] font-bold leading-tight">404</h1>
        <span className="font-medium">Oops! Algo deu errado {`:')`}</span>
        <p className="text-center text-muted-foreground">
          Pedimos desculpas pelo inconveniente. <br /> Por favor, tente
          novamente mais tarde.
        </p>
        <div className="mt-6 flex gap-4">
          <Button variant="bordered" onPress={() => navigate(-1)}>
            Voltar
          </Button>
          <Button onPress={() => navigate(Endpoints.dashboard)}>
            Voltar para Home
          </Button>
        </div>
      </div>
    </div>
  );
}
