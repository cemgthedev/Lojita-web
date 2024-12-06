import { ENDPOINTS } from "@/constants/endpoints";
import { api } from "@/services/api.service";
import { TCredential } from "@/types/TCredential";
import { TUser } from "@/types/TUser";

type AuthenticationResponse = {
  users: TUser[];
};

export const loginMutation = async (credential: TCredential) => {
  const { data } = await api.get<AuthenticationResponse>(ENDPOINTS.login, {
    params: credential,
  });

  return data.users[0];
};
