import { usersMock } from '@/mock/users';
import { EGenders, ERoles, TUser } from '@/types/TUser';
import { addToast } from '@heroui/toast';
import { useMutation } from '@tanstack/react-query';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';

interface IContextUsers {
  users: TUser[];
  setUsers: Dispatch<SetStateAction<TUser[]>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  filterUsers: IFilterUsers;
  setFilterUsers: Dispatch<SetStateAction<IFilterUsers>>;

  createUser(user: TUser): void;
  searchUsers(filterUsers: IFilterUsers): Promise<TUser[]>;
  getUser(id: string): Promise<TUser | undefined>;
  updateUser(user: TUser): void;
  deleteUser(id: string): Promise<boolean>;
}

export const ContextUsers = createContext({} as IContextUsers);

interface IProviderUsers {
  children: ReactNode;
}

export interface IFilterUsers {
  name?: string;
  role?: ERoles;
  gender?: EGenders;
  minAge?: number;
  maxAge?: number;
}

export function ProviderUsers({ children }: IProviderUsers) {
  const [users, setUsers] = useState<TUser[]>(usersMock);
  const [isLoading, setIsLoading] = useState(false);
  const [filterUsers, setFilterUsers] = useState<IFilterUsers>({});

  const createUser = async (user: TUser): Promise<TUser | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const emailRegistered = users.find((item) => item.email === user.email);

        if (emailRegistered) {
          resolve(undefined);
        }

        setUsers((prevState) => [...prevState, user]);

        resolve(user);
      }, 2000);
    });
  };

  const { mutate: createUserMutation } = useMutation({
    mutationFn: async (user: TUser) => {
      setIsLoading(true);
      await createUser(user);
      setIsLoading(false);
    },
    onSuccess: () => {
      addToast({
        title: 'Usuário cadastrado com sucesso',
        color: 'success',
      });
    },
    onError: () => {
      addToast({
        title: 'Erro ao cadastrar usuário',
        color: 'danger',
      });
    },
  });

  const searchUsers = async (filterUsers: IFilterUsers): Promise<TUser[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredUsers = usersMock.filter((item) => {
          const matchesName = filterUsers.name
            ? item.name.toLowerCase().includes(filterUsers.name.toLowerCase())
            : true;

          const matchesGender = filterUsers?.gender
            ? item.gender === filterUsers.gender
            : true;

          const matchesRole = filterUsers?.role
            ? item.role === filterUsers.role
            : true;

          const matchesMinAge =
            filterUsers.minAge !== undefined
              ? (item.age ?? 0) >= filterUsers.minAge
              : true;

          const matchesMaxAge =
            filterUsers.maxAge !== undefined
              ? (item.age ?? 0) <= filterUsers.maxAge
              : true;

          return (
            matchesName &&
            matchesGender &&
            matchesRole &&
            matchesMinAge &&
            matchesMaxAge
          );
        });

        setUsers(filteredUsers);
        resolve(filteredUsers);
      }, 1000);
    });
  };

  const getUser = async (id: string): Promise<TUser | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = users.find((item) => item.id === id);

        if (!user) {
          resolve(undefined);
        }

        resolve(user);
      });
    });
  };

  const updateUser = async (user: TUser): Promise<TUser | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const userRegistered = users.find((item) => item.id === user.id);

        if (!userRegistered) {
          resolve(undefined);
        }

        setUsers((prevState) =>
          prevState.map((item) => (item.id === user.id ? user : item)),
        );

        resolve(user);
      }, 2000);
    });
  };

  const { mutate: updateUserMutation } = useMutation({
    mutationFn: async (user: TUser) => {
      setIsLoading(true);
      await updateUser(user);
      setIsLoading(false);
    },
    onSuccess: () => {
      console.log('onSuccess');
      addToast({
        title: 'Usuário atualizado com sucesso',
        color: 'success',
      });
    },
    onError: () => {
      addToast({
        title: 'Erro ao atualizar usuário',
        color: 'danger',
      });
    },
  });

  const deleteUser = async (id: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const userRegistered = users.find((item) => item.id === id);

        if (!userRegistered) {
          resolve(false);
        }

        setUsers((prevState) => prevState.filter((item) => item.id !== id));

        resolve(true);
      }, 2000);
    });
  };

  return (
    <ContextUsers.Provider
      value={{
        users,
        setUsers,
        isLoading,
        setIsLoading,
        filterUsers,
        setFilterUsers,
        createUser: createUserMutation,
        updateUser: updateUserMutation,
        searchUsers,
        getUser,
        deleteUser,
      }}
    >
      {children}
    </ContextUsers.Provider>
  );
}
