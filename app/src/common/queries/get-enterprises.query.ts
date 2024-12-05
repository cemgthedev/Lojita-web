import { TPageProps } from "@/components/ui/Pagination";
import { ENDPOINTS } from "@/constants/endpoints";
import { api } from "@/services/api.service";

import { TEnterprise } from "@/types/TEnterprise";

export interface EnterprisesResponse {
  items: TEnterprise[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
}

export interface EnterpriseResponse extends TPageProps {
  data: TEnterprise[];
}

export interface IFilterEnterprises {
  name?: string;
  document?: string;
}

export const getEnterpriseQuery = async (id: string) => {
  const { data } = await api.get(`${ENDPOINTS.enterprises}/${id}`);
  return data;
};

export const searchEnterpriseQuery = async (
  filterProps?: IFilterEnterprises,
  pageProps?: TPageProps
) => {
  const { data } = await api.get<EnterprisesResponse>(ENDPOINTS.enterprises, {
    params: {
      ...filterProps,
      page: pageProps?.page,
      items_per_page: pageProps?.items_per_page,
    },
  });

  return data;
};

export const queryKeysEnterprise = {
  get_list_enterprises: "get_list_enterprises",
  get_enterprise: "get_enterprise",
};
