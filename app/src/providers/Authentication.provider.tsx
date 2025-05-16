import { User } from 'firebase/auth';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';

interface IContextAuthentication {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  isLoading: boolean;
}

const contextAuthentication = createContext({} as IContextAuthentication);

export function useAuthentication() {
  const authentication = useContext(contextAuthentication);

  return authentication;
}

interface IProviderAuthentication {
  children: React.ReactNode;
}

export function ProviderAuthentication({ children }: IProviderAuthentication) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <contextAuthentication.Provider
      value={{
        user,
        setUser,
        isLoading: false,
      }}
    >
      {children}
    </contextAuthentication.Provider>
  );
}
