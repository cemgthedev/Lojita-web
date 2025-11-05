import { Link } from '@heroui/link';
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@heroui/navbar';
import { link as linkStyles } from '@heroui/theme';
import clsx from 'clsx';

import { siteConfig } from '@/components/site';
import { ThemeSwitch } from '@/components/theme-switch';
import { useAuthentication } from '@/providers/Authentication.provider';
import { Avatar } from '@heroui/avatar';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@heroui/dropdown';
import { LogOutIcon, UserCogIcon } from 'lucide-react';
import { Endpoints } from '@/constants/endpoints';

export const Navbar = () => {
  const { user, logout } = useAuthentication();

  return (
    <HeroUINavbar maxWidth="xl" position="sticky" className="bg-transparent">
      <NavbarContent className="md:hidden">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent justify="center">
        <NavbarBrand>
          <Link
            className="flex justify-start items-center gap-1"
            color="foreground"
            href="/"
          >
            <p className="text-purple-600 text-xl font-bold">Lojita</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="center" className="hidden md:flex w-full">
        <div className="flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <Link
                className={clsx(
                  linkStyles({ color: 'foreground' }),
                  'flex items-center gap-1 data-[active=true]:text-secondary data-[active=true]:font-bold dark:text-gray-50',
                )}
                color="foreground"
                href={item.href}
              >
                {item.icon}
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </div>
      </NavbarContent>

      <NavbarContent justify="end">
        <ThemeSwitch />
        <Dropdown placement="bottom-start">
          <DropdownTrigger>
            <Avatar isBordered color="secondary" src={user?.avatarUrl} />
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem
              key="configs"
              href={Endpoints.profile}
              color="default"
              className="flex items-center gap-2"
              startContent={
                <UserCogIcon
                  size={20}
                  className="min-w-5 max-w-5 min-h-5 max-h-5"
                />
              }
            >
              Perfil
            </DropdownItem>
            <DropdownItem
              key="logout"
              onClick={() => logout()}
              color="danger"
              className="flex items-center gap-2"
              startContent={
                <LogOutIcon
                  size={20}
                  className="min-w-5 max-w-5 min-h-5 max-h-5"
                />
              }
            >
              Sair
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      <NavbarMenu className="mt-4">
        <div className="px-6 py-4 flex flex-col gap-2">
          {siteConfig.navItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className={clsx(
                  linkStyles({ color: 'foreground' }),
                  'flex items-center gap-1',
                )}
                color="foreground"
                href={item.href}
              >
                {item.icon}
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
