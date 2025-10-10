import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import DefaultLayout from './DefaultLayout';

import { Endpoints } from '@/constants/endpoints';
import { ProviderApp } from '@/providers/App.provider';
import { useAuthentication } from '@/providers/Authentication.provider';
import { Spinner } from '@heroui/spinner';
import { addToast } from '@heroui/toast';

export function ProtectedRoutes() {
  const { user, isLoading } = useAuthentication();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !isLoading) {
      navigate(Endpoints.login);
      addToast({
        title: 'Por favor, efetue o login...',
        color: 'primary',
      });
    }
  }, [user, isLoading, navigate]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );

  // Renderiza o layout apenas se o usuário estiver autenticado
  return user ? (
    <ProviderApp>
      <DefaultLayout />
    </ProviderApp>
  ) : null;
}
