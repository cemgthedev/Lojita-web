import { usersMock } from '@/mock/users';
import { TUser } from '@/types/TUser';
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

  createUser(user: TUser): void;
  searchUser(): Promise<TUser[]>;
  getUser(id: string): Promise<TUser | undefined>;
  updateUser(user: TUser, id: string): Promise<TUser | undefined>;
  deleteUser(id: string): Promise<boolean>;
}

export const ContextUsers = createContext({} as IContextUsers);

interface IProviderUsers {
  children: ReactNode;
}

export function ProviderUsers({ children }: IProviderUsers) {
  const [users, setUsers] = useState<TUser[]>(usersMock);
  const [isLoading, setIsLoading] = useState(false);

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

  const searchUser = async (): Promise<TUser[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(users);
      }, 2000);
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
        createUser: createUserMutation,
        updateUser,
        searchUser,
        getUser,
        deleteUser,
      }}
    >
      {children}
    </ContextUsers.Provider>
  );
}
