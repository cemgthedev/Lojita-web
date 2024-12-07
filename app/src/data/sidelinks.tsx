import { URLS } from "@/constants/urls";
import {
  CircleDollarSign,
  HandCoins,
  Heart,
  LayoutDashboardIcon,
  MessageCircle,
  ShoppingBasket
} from "lucide-react";

export interface NavLink {
  title: string;
  label?: string;
  permission?: string; //PermissionNameType;
  href: string;
  icon: JSX.Element;
  sub?: NavLink[];
}

export interface SideLink extends NavLink {
  sub?: NavLink[];
}

export const sidelinks: SideLink[] = [
  {
    title: "Dashboard",
    label: "",
    href: URLS.dashboard,
    icon: <LayoutDashboardIcon size={18} />,
  },
  {
    title: "Meus Produtos",
    label: "",
    href: URLS.my_products,
    icon: <ShoppingBasket size={18} />,
  },
  {
    title: "Vendas",
    label: "",
    href: URLS.sales,
    icon: <HandCoins size={18} />,
  },
  {
    title: "Compras",
    label: "",
    href: URLS.cart,
    icon: <CircleDollarSign size={18} />,
  },
  {
    title: "Favoritos",
    label: "",
    href: URLS.favorites,
    icon: <Heart size={18} />,
  },
  {
    title: "Chats",
    label: "",
    href: URLS.chats,
    icon: <MessageCircle size={18} />,
  },
];
