import { usersMock } from '@/mock/users';
import { TCredentials } from '@/types/TCredentials';
import { TUser } from '@/types/TUser';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

export type LoginResponse =
  | {
      user: TUser;
      token: string;
    }
  | undefined;

interface IContextAuthentication {
  user: TUser | null;
  setUser: Dispatch<SetStateAction<TUser | null>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;

  login: (credentials: TCredentials) => Promise<LoginResponse | undefined>;
  logout: () => Promise<boolean>;
}

const contextAuthentication = createContext({} as IContextAuthentication);

export function useAuthentication() {
  const authentication = useContext(contextAuthentication);

  return authentication;
}

interface IProviderAuthentication {
  children: ReactNode;
}

export function ProviderAuthentication({ children }: IProviderAuthentication) {
  const [user, setUser] = useState<TUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async ({
    email,
    password,
  }: TCredentials): Promise<LoginResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user: TUser | undefined = usersMock.find(
          (user) => user.email === email && user.password === password,
        );

        if (user) {
          resolve({ user, token: 'token' });
        } else {
          resolve(undefined);
        }
      }, 2000);
    });
  };

  const logout = async (): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 2000);
    });
  };

  return (
    <contextAuthentication.Provider
      value={{
        user,
        setUser,
        isLoading,
        setIsLoading,
        login,
        logout,
      }}
    >
      {children}
    </contextAuthentication.Provider>
  );
}
