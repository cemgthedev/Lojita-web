import { CircularProgress } from '@heroui/progress';
import { useEffect } from 'react';
import { useNavigate, useNavigation } from 'react-router-dom';

import DefaultLayout from './DefaultLayout';

import { Endpoints } from '@/constants/frontend/endpoints';
import { useAuthentication } from '@/providers/Authentication.provider';

export function ProtectedRoutes() {
  const { user, isLoading } = useAuthentication();
  const navigate = useNavigate();
  const { state: navigationState } = useNavigation();

  useEffect(() => {
    if (!isLoading && !user) {
      // Redireciona substituindo o histórico para evitar voltar para esta rota
      navigate(Endpoints.login, { replace: true });
    }
  }, [isLoading, user, navigate]);

  // Exibe loading durante verificação de auth ou navegação
  if (isLoading || navigationState === 'loading') {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress aria-label="Loading..." />
      </div>
    );
  }

  // Renderiza o layout apenas se o usuário estiver autenticado
  return user ? <DefaultLayout /> : null;
}
