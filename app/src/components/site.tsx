import { Endpoints } from '@/constants/endpoints';
import {
  ChartPieIcon,
  HandCoinsIcon,
  HeartIcon,
  MessageCircleIcon,
  ShoppingBasketIcon,
  ShoppingCartIcon,
  User2Icon,
} from 'lucide-react';

export type TNavItem = {
  icon?: React.ReactNode;
  label: string;
  href: string;
};

export type TSiteConfig = {
  name: string;
  description: string;
  navItems: {
    admin: TNavItem[];
    seller: TNavItem[];
    buyer: TNavItem[];
  };
};

export const siteConfig: TSiteConfig = {
  name: 'Lojita Admin',
  description: 'Gerencie sua loja online com facilidade.',
  navItems: {
    admin: [
      {
        icon: <ChartPieIcon className="w-6 h-6" />,
        label: 'Dashboard',
        href: Endpoints.dashboard,
      },
      {
        icon: <User2Icon className="w-6 h-6" />,
        label: 'Usuários',
        href: Endpoints.users,
      },
      {
        icon: <ShoppingBasketIcon className="w-6 h-6" />,
        label: 'Produtos',
        href: Endpoints.products,
      },
      {
        icon: <HandCoinsIcon className="w-6 h-6" />,
        label: 'Pedidos',
        href: Endpoints.orders,
      },
      {
        icon: <MessageCircleIcon className="w-6 h-6" />,
        label: 'Chats',
        href: Endpoints.chats,
      },
    ],
    seller: [
      {
        icon: <ChartPieIcon className="w-6 h-6" />,
        label: 'Dashboard',
        href: Endpoints.dashboard,
      },
      {
        icon: <ShoppingBasketIcon className="w-6 h-6" />,
        label: 'Produtos',
        href: Endpoints.products,
      },
      {
        icon: <HandCoinsIcon className="w-6 h-6" />,
        label: 'Clientes',
        href: Endpoints.clients,
      },
      {
        icon: <HandCoinsIcon className="w-6 h-6" />,
        label: 'Pedidos',
        href: Endpoints.orders,
      },
      {
        icon: <MessageCircleIcon className="w-6 h-6" />,
        label: 'Chats',
        href: Endpoints.chats,
      },
    ],
    buyer: [
      {
        icon: <ChartPieIcon className="w-6 h-6" />,
        label: 'Dashboard',
        href: Endpoints.dashboard,
      },
      {
        icon: <ShoppingBasketIcon className="w-6 h-6" />,
        label: 'Produtos',
        href: Endpoints.products,
      },
      {
        icon: <HeartIcon className="w-6 h-6" />,
        label: 'Favoritos',
        href: Endpoints.favorites,
      },
      {
        icon: <ShoppingCartIcon className="w-6 h-6" />,
        label: 'Carrinho',
        href: Endpoints.cart,
      },
      {
        icon: <HandCoinsIcon className="w-6 h-6" />,
        label: 'Pedidos',
        href: Endpoints.orders,
      },
      {
        icon: <MessageCircleIcon className="w-6 h-6" />,
        label: 'Chats',
        href: Endpoints.chats,
      },
    ],
  },
};
