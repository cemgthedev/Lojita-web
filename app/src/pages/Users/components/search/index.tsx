import { InputCustom } from '@/components/common/Inputs/InputCustom';
import { useUsers } from '@/hooks/use-users.hook';
import { IFilterUsers } from '@/providers/Users.provider';
import { Button } from '@heroui/button';
import { useDisclosure } from '@heroui/modal';
import {
  ChartBarStackedIcon,
  DollarSignIcon,
  FilterIcon,
  Search,
} from 'lucide-react';
import { useEffect, useState } from 'react';

import {
  EGenders,
  ERoles,
  getGenderOptions,
  getRolesOptions,
} from '@/types/TUser';
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from '@heroui/drawer';

import { Autocomplete, AutocompleteItem } from '@heroui/autocomplete';

interface SearchProps {
  // Filters
  filterUsers?: IFilterUsers;
  setFilterUsers?: (filter: IFilterUsers) => void;
  searchUsers?: (filter: IFilterUsers) => void;
}

export const SearchUser = ({
  filterUsers,
  setFilterUsers = () => {},
  searchUsers = () => {},
}: SearchProps) => {
  const { setIsLoading } = useUsers();
  const [searchUserName, setSearchUserName] = useState(filterUsers?.name ?? '');
  const [role, setRole] = useState(filterUsers?.role ?? '');
  const [gender, setGender] = useState(filterUsers?.gender ?? '');
  const [minAge, setMinAge] = useState(filterUsers?.minAge ?? 0);
  const [maxAge, setMaxAge] = useState(filterUsers?.maxAge ?? 0);

  const rolesOptions = getRolesOptions();

  const genderOptions = getGenderOptions();

  const {
    isOpen: isOpenModalFilters,
    onOpen: onOpenModalFilters,
    onOpenChange: onOpenChangeModalFilters,
  } = useDisclosure();

  const clearUserName = () => {
    setSearchUserName('');
  };

  const clearRole = () => {
    setRole('');
  };

  const clearGender = () => {
    setGender('');
  };

  const clearMinAge = () => {
    setMinAge(0);
  };

  const clearMaxAge = () => {
    setMaxAge(0);
  };

  // debounce effect
  useEffect(() => {
    setIsLoading(true);
    const handler = setTimeout(() => {
      setFilterUsers?.({
        ...filterUsers,
        name: searchUserName || undefined,
      });

      searchUsers?.({
        ...filterUsers,
        name: searchUserName || undefined,
      });
    }, 300);
    setIsLoading(false);

    return () => {
      clearTimeout(handler);
    };
  }, [searchUserName]);

  // debounce effect
  useEffect(() => {
    setIsLoading(true);
    const handler = setTimeout(() => {
      setFilterUsers?.({
        ...filterUsers,
        role: (role as ERoles) || undefined,
      });
    }, 300);
    setIsLoading(false);

    return () => {
      clearTimeout(handler);
    };
  }, [role]);

  // debounce effect
  useEffect(() => {
    setIsLoading(true);
    const handler = setTimeout(() => {
      setFilterUsers?.({
        ...filterUsers,
        gender: (gender as EGenders) || undefined,
      });
    }, 300);
    setIsLoading(false);

    return () => {
      clearTimeout(handler);
    };
  }, [gender]);

  // debounce effect
  useEffect(() => {
    setIsLoading(true);
    const handler = setTimeout(() => {
      setFilterUsers?.({
        ...filterUsers,
        minAge: minAge || undefined,
      });
    }, 300);
    setIsLoading(false);

    return () => {
      clearTimeout(handler);
    };
  }, [minAge]);

  // debounce effect
  useEffect(() => {
    setIsLoading(true);
    const handler = setTimeout(() => {
      setFilterUsers?.({
        ...filterUsers,
        maxAge: maxAge || undefined,
      });
    }, 300);
    setIsLoading(false);

    return () => {
      clearTimeout(handler);
    };
  }, [maxAge]);

  return (
    <>
      <div className="flex gap-2 w-full justify-end">
        <InputCustom
          isClearable
          aria-label="Pesquisa por nome"
          classNames={{
            base: 'w-full md:w-1/2',
            input: 'text-sm',
          }}
          placeholder="Pesquisar por usuário"
          radius="full"
          startContent={
            <Search
              className="min-w-5 max-w-5 min-h-5 max-h-5 opacity-50"
              size={20}
            />
          }
          type="text"
          value={searchUserName}
          onChange={(e) => setSearchUserName(e.target.value)}
          onClear={clearUserName}
        />
        <Button
          isIconOnly
          aria-label="filter"
          variant="bordered"
          startContent={<FilterIcon className="h-5 w-5" />}
          onPress={onOpenModalFilters}
        />
      </div>
      <Drawer
        isOpen={isOpenModalFilters}
        placement="left"
        onOpenChange={onOpenChangeModalFilters}
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                Filtros
              </DrawerHeader>
              <DrawerBody>
                <Autocomplete
                  isClearable
                  aria-label="Filtrar por tipo"
                  radius="full"
                  inputProps={{
                    className: 'text-sm',
                  }}
                  defaultItems={rolesOptions}
                  placeholder="Filtrar por tipo"
                  startContent={
                    <ChartBarStackedIcon
                      className="min-w-5 max-w-5 min-h-5 max-h-5 opacity-50"
                      size={20}
                    />
                  }
                  onClear={clearRole}
                  selectedKey={filterUsers?.role}
                  onSelectionChange={(key) => {
                    const selected = key ? String(key) : '';

                    setRole(selected);
                  }}
                >
                  {(item) => (
                    <AutocompleteItem key={item.key}>
                      {item.label}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
                <Autocomplete
                  isClearable
                  aria-label="Filtrar por gênero"
                  radius="full"
                  inputProps={{
                    className: 'text-sm',
                  }}
                  defaultItems={genderOptions}
                  placeholder="Filtrar por gênero"
                  startContent={
                    <ChartBarStackedIcon
                      className="min-w-5 max-w-5 min-h-5 max-h-5 opacity-50"
                      size={20}
                    />
                  }
                  onClear={clearGender}
                  selectedKey={filterUsers?.gender}
                  onSelectionChange={(key) => {
                    const selected = key ? String(key) : '';

                    setGender(selected);
                  }}
                >
                  {(item) => (
                    <AutocompleteItem key={item.key}>
                      {item.label}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <InputCustom
                    isClearable
                    aria-label="Filtrar por idade mínima"
                    classNames={{
                      input: 'text-sm',
                    }}
                    placeholder="Idade mínima"
                    radius="full"
                    startContent={
                      <DollarSignIcon
                        className="min-w-5 max-w-5 min-h-5 max-h-5 opacity-50"
                        size={20}
                      />
                    }
                    type="number"
                    value={minAge ? String(minAge) : ''}
                    onChange={(e) => setMinAge(Number(e.target.value))}
                    onClear={clearMinAge}
                  />
                  <InputCustom
                    isClearable
                    aria-label="Filtrar por idade máxima"
                    classNames={{
                      input: 'text-sm',
                    }}
                    placeholder="Idade máxima"
                    radius="full"
                    startContent={
                      <DollarSignIcon
                        className="min-w-5 max-w-5 min-h-5 max-h-5 opacity-50"
                        size={20}
                      />
                    }
                    type="number"
                    value={maxAge ? String(maxAge) : ''}
                    onChange={(e) => setMaxAge(Number(e.target.value))}
                    onClear={clearMaxAge}
                  />
                </div>
              </DrawerBody>
              <DrawerFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                  className="text-medium"
                >
                  Fechar
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    searchUsers(filterUsers ?? {});
                    onClose();
                  }}
                  className="text-medium"
                >
                  Filtrar
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};
