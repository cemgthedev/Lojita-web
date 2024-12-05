import { ENDPOINTS } from "@/constants/endpoints";

import { api } from "@/services/api.service";
import { CreateEnterpriseFormData } from "../validations/create-form.schema";
import { UpdateEnterpriseFormData } from "../validations/update-form.schema";

type TypeFormCreate = CreateEnterpriseFormData;
type TypeFormUpdate = UpdateEnterpriseFormData;

export const createEnterpriseMutation = async (enterprise: TypeFormCreate) => {
  const { data } = await api.post(ENDPOINTS.enterprises, {
    ...enterprise,
  });

  return data;
};

export const updateEnterpriseMutation = async (enterprise: TypeFormUpdate) => {
  const { data } = await api.put(`${ENDPOINTS.enterprises}/${enterprise.id}`, {
    ...enterprise,
  });

  return data;
};

export const deleteEnterpriseMutation = async (id: string) => {
  const { data } = await api.delete(`${ENDPOINTS.enterprises}/${id}`);

  return data;
};
