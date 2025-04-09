import { Endpoints } from "@/constants/frontend/endpoints";
import { ChartPieIcon, HandCoinsIcon, ListOrderedIcon, MessageCircleIcon, ShoppingBasketIcon } from "lucide-react";

export type TNavItem = {
  icon?: React.ReactNode;
  label: string;
  href: string;
}

export type TSiteConfig = {
  name: string;
  description: string;
  navItems: TNavItem[];
}

export const siteConfig: TSiteConfig = {
  name: "Lojita Admin",
  description: "Gerencie sua loja online com facilidade.",
  navItems: [
    {
      icon: <ChartPieIcon className="w-6 h-6" />,
      label: "Dashboard",
      href: Endpoints.dashboard,
    },
    {
      icon: <HandCoinsIcon className="w-6 h-6" />,
      label: "Pedidos",
      href: Endpoints.orders,
    },
    {
      icon: <MessageCircleIcon className="w-6 h-6" />,
      label: "Chats",
      href: Endpoints.chats,
    },
    {
      icon: <ShoppingBasketIcon className="w-6 h-6" />,
      label: "Produtos",
      href: Endpoints.products,
    },
    {
      icon: <ListOrderedIcon className="w-6 h-6" />,
      label: "Variantes",
      href: Endpoints.variants,
    },
  ],
};
