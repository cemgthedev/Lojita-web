import { ReactNode } from 'react';
import { ProviderProducts } from './Products.provider';
import { ProviderUsers } from './Users.provider';

interface IProviderApp {
  children: ReactNode;
}

export function ProviderApp({ children }: IProviderApp) {
  const providers = [ProviderUsers, ProviderProducts];

  return providers.reduce(
    (acc, Provider) => <Provider>{acc}</Provider>,
    children,
  );
}
