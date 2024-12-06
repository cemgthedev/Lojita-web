import { useNavigate } from "react-router-dom";

import { cn } from "@/lib/utils";
import { Button } from "@nextui-org/button";
import { URLS } from "@/constants/urls";

interface GeneralErrorProps extends React.HTMLAttributes<HTMLDivElement> {
  minimal?: boolean;
}

export default function GeneralError({
  className,
  minimal = false,
}: GeneralErrorProps) {
  const navigate = useNavigate();
  return (
    <div className={cn("h-svh w-full", className)}>
      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
        {!minimal && (
          <h1 className="text-[7rem] font-bold leading-tight">500</h1>
        )}
        <span className="font-medium">Oops! Algo deu errado {`:')`}</span>
        <p className="text-center text-muted-foreground">
          Pedimos desculpas pelo inconveniente. <br /> Por favor, tente
          novamente mais tarde.
        </p>
        {!minimal && (
          <div className="mt-6 flex gap-4">
            <Button variant="bordered" onClick={() => navigate(-1)}>
              Voltar
            </Button>
            <Button onClick={() => navigate(URLS.dashboard)}>
              Voltar para Home
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}