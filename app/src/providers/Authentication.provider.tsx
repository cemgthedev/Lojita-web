import { onAuthStateChanged, User } from 'firebase/auth';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

import { auth } from '@/services/api';

interface IContextAuthentication {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setIsLoading(false); // Sinaliza que a verificação inicial foi concluída
    });

    return unsubscribe;
  }, []);

  return (
    <contextAuthentication.Provider
      value={{
        user,
        setUser,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </contextAuthentication.Provider>
  );
}
