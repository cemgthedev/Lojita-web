import { ENDPOINTS } from "@/constants/endpoints";

import { CreateUserFormData } from "@/common/validations/register-user.schema";
import { api } from "@/services/api.service";
import { formatAddress } from "@/utils/formated-address";

type TypeFormCreate = CreateUserFormData;

export const createUserMutation = async (user: TypeFormCreate) => {
  const formated = {
    ...user,
    address: user.address ? formatAddress(user.address) : undefined,
  }  

  const { data } = await api.post(ENDPOINTS.users, {
    ...formated,
  });

  return data;
};