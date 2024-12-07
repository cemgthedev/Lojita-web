import { ENDPOINTS } from "@/constants/endpoints";

import { CreateUserFormData } from "@/common/forms/user/validations/register-user.schema";
import { api } from "@/services/api.service";
import { formatAddress } from "@/utils/formated-address";
import { UpdateUserFormData } from "../validations/update-user.schema";

type TypeFormCreate = CreateUserFormData;
type TypeFormUpdate = UpdateUserFormData;

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

export const updateUserMutation = async (user: TypeFormUpdate) => {
  console.log(user);
  const { data } = await api.put(`${ENDPOINTS.users}/${user.id}`, {
    ...user,
    address: user.address ? formatAddress(user.address) : undefined,
  });

  return data;
};

export const deleteUserMutation = async (id: string) => {
  const { data } = await api.delete(`${ENDPOINTS.users}/${id}`);

  return data;
};
