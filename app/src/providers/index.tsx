import type { NavigateOptions } from 'react-router-dom';

import { HeroUIProvider } from '@heroui/system';
import { ToastProvider } from '@heroui/toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ProviderAuthentication } from './Authentication.provider';

declare module '@react-types/shared' {
  interface RouterConfig {
    routerOptions: NavigateOptions;
  }
}

export function Provider({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <HeroUIProvider>
      <ToastProvider
        placement="bottom-right"
        toastProps={{
          variant: 'bordered',
          radius: 'md',
          shouldShowTimeoutProgress: true,
          color: 'primary',
        }}
      />
      <QueryClientProvider client={queryClient}>
        <ProviderAuthentication>{children}</ProviderAuthentication>
      </QueryClientProvider>
    </HeroUIProvider>
  );
}
