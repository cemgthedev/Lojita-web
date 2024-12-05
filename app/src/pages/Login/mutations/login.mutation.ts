import { ENDPOINTS } from "@/constants/endpoints";
import { api } from "@/services/api.service";
import { TUserLogged } from "@/types/TUserLogged";

type Credential = {
  email: string;
  password: string;
};

type AuthenticationResponse = {
  access_token: string;
  data: TUserLogged;
};

export const loginMutation = async (credential: Credential) => {
  const { data } = await api.post<AuthenticationResponse>(ENDPOINTS.login, {
    email: credential.email,
    password: credential.password,
  });
  return data;
};
