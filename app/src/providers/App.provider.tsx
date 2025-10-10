import { ReactNode } from 'react';
import { ProviderUsers } from './Users.provider';

interface IProviderApp {
  children: ReactNode;
}

export function ProviderApp({ children }: IProviderApp) {
  const providers = [ProviderUsers];

  return providers.reduce(
    (acc, Provider) => <Provider>{acc}</Provider>,
    children,
  );
}
