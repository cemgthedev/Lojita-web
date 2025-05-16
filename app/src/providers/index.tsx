import type { NavigateOptions } from 'react-router-dom';

import { HeroUIProvider } from '@heroui/system';

import { ProviderAuthentication } from './Authentication.provider';

declare module '@react-types/shared' {
  interface RouterConfig {
    routerOptions: NavigateOptions;
  }
}

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <ProviderAuthentication>{children}</ProviderAuthentication>
    </HeroUIProvider>
  );
}
