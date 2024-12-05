import { ENDPOINTS } from "@/constants/endpoints";
import { USER_PERMISSIONS } from "@/constants/tokens";
import { api } from "@/services/api.service";
import { TUserLogged } from "@/types/TUserLogged";
import { cache } from "@/utils/cache.util";

export const getUserInformationQuery = async (): Promise<TUserLogged> => {
  const { data } = await api.get<TUserLogged>(ENDPOINTS.userInfo);

  cache.setValue(
    USER_PERMISSIONS,
    JSON.stringify(data.permissionGroup.permissions)
  );

  return data;
};
