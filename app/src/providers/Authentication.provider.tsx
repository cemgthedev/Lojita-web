import { USER_LOGGED } from '@/constants/tokens';
import { usersMock } from '@/mock/users';
import { TCredentials } from '@/types/TCredentials';
import { TUser } from '@/types/TUser';
import { cache } from '@/utils/cache.util';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = cache.getValue(USER_LOGGED);

    if (user) setUser(JSON.parse(user) as TUser);

    setIsLoading(false);
  }, []);

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
        cache.clearValue(USER_LOGGED);
        setUser(null);
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
