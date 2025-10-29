import { ReactNode } from 'react';
import { ProviderOrders } from './Orders.provider';
import { ProviderProducts } from './Products.provider';
import { ProviderUsers } from './Users.provider';

interface IProviderApp {
  children: ReactNode;
}

export function ProviderApp({ children }: IProviderApp) {
  const providers = [ProviderUsers, ProviderProducts, ProviderOrders];

  return providers.reduce(
    (acc, Provider) => <Provider>{acc}</Provider>,
    children,
  );
}
