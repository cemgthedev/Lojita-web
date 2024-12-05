import { URLS } from "@/constants/urls";

import { logout } from "@/utils/logout.util";
import { notify } from "@/utils/notify.util";

import { RefetchOptions, useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";

import { getUserInformationQuery } from "@/common/queries/get-user-information.query";
import { TUserLogged } from "@/types/TUserLogged";
import { PropsWithChildren, createContext, useState } from "react";

interface AuthenticationContext {
  user: TUserLogged | null | undefined;
  isLoading: boolean;

  setIsLoading(value: boolean): void;
  refetchUserInformation: (options?: RefetchOptions | undefined) => void;
}

export const AuthenticationContext = createContext<AuthenticationContext>(
  {} as AuthenticationContext
);

export const AuthenticationProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const userData = useQuery({
    queryFn: async () => {
      try {
        setIsLoading(true);
        const userInfo: TUserLogged = await getUserInformationQuery();
        return userInfo;
      } catch (error) {
        if (isAxiosError(error)) {
          if (error.response?.status === 401) {
            notify(error.response.data.message, { type: "error" });
            logout();
            notify("Sua sessão foi encerrada", { type: "error" });
            navigate(URLS.login);
          }
        }
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    queryKey: [location.pathname],
    refetchOnWindowFocus: false,
  });

  const { data: user } = userData;

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        isLoading,
        setIsLoading,
        refetchUserInformation: userData.refetch,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
