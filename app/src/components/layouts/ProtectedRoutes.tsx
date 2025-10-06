import { CircularProgress } from '@heroui/progress';
import { useEffect } from 'react';
import { useNavigate, useNavigation } from 'react-router-dom';

import DefaultLayout from './DefaultLayout';

import { Endpoints } from '@/constants/frontend/endpoints';
import { ProviderApp } from '@/providers/App.provider';
import { useAuthentication } from '@/providers/Authentication.provider';

export function ProtectedRoutes() {
  const { user, isLoading } = useAuthentication();
  const navigate = useNavigate();
  const { state: navigationState } = useNavigation();

  useEffect(() => {
    if (!user) {
      navigate(Endpoints.login);
    }
  }, [user, navigate]);

  // Exibe loading durante verificação de auth ou navegação
  if (isLoading || navigationState === 'loading') {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress aria-label="Loading..." />
      </div>
    );
  }

  // Renderiza o layout apenas se o usuário estiver autenticado
  return user ? (
    <ProviderApp>
      <DefaultLayout />
    </ProviderApp>
  ) : null;
}
