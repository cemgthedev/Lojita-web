import { TPageProps } from "@/components/ui/Pagination";
import { ENDPOINTS } from "@/constants/endpoints";
import { api } from "@/services/api.service";
import { TSchoolClass } from "@/types/TSchoolClass";

export interface SchoolClassesResponse {
  items: TSchoolClass[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
}

export interface SchoolClassResponse extends TPageProps {
  data: TSchoolClass[];
}

export interface IFilterSchoolClasses {
  name?: string;
  level?: number;
  enterpriseId?: number;
  institutionId?: number;
}

export const getSchoolClassQuery = async (id: string) => {
  const { data } = await api.get(`${ENDPOINTS.schoolClasses}/${id}`);
  return data;
};

export const searchSchoolClassQuery = async (
  filterProps?: IFilterSchoolClasses,
  pageProps?: TPageProps
) => {
  const { data } = await api.get<SchoolClassesResponse>(ENDPOINTS.schoolClasses, {
    params: {
      ...filterProps,
      page: pageProps?.page,
      items_per_page: pageProps?.items_per_page,
    },
  });

  return data;
};

export const queryKeysSchoolClasses = {
  get_list_school_classes: "get_list_school_classes",
  get_school_classe: "get_school_classe",
};