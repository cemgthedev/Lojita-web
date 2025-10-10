import type { NavigateOptions } from 'react-router-dom';

import { HeroUIProvider } from '@heroui/system';
import { ToastProvider } from '@heroui/toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useTheme } from '@heroui/use-theme';
import { ProviderAuthentication } from './Authentication.provider';

declare module '@react-types/shared' {
  interface RouterConfig {
    routerOptions: NavigateOptions;
  }
}

export function Provider({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  const { theme } = useTheme();

  return (
    <HeroUIProvider>
      <ToastProvider
        placement="top-right"
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
