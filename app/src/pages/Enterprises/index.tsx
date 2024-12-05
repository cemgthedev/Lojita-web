import { IFilterEnterprises, queryKeysEnterprise, searchEnterpriseQuery } from "@/common/queries/get-enterprises.query";
import { PaginationCustom, TPageProps } from "@/components/ui/Pagination";
import { TEnterprise } from "@/types/TEnterprise";
import { notify } from "@/utils/notify.util";
import { Button } from "@nextui-org/button";
import { Card, CardBody, useDisclosure } from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PlusCircle } from "lucide-react";
import { useCallback, useState } from "react";
import { CreateEnterprise } from "./components/modals/CreateEnterprise";
import { UpdateEnterprise } from "./components/modals/UpdateEnterprise";
import { SearchEnterprise } from "./components/search";
import { TableEnterprises } from "./components/table";
import { deleteEnterpriseMutation } from "./mutations/enterprise.mutation";

export const EnterprisesPage = () => {
  const [filterEnterprises, setFilterEnterprises] =
    useState<IFilterEnterprises>();
  const [pageProps, setPageProps] = useState<TPageProps>({
    items_per_page: 10,
    currentPage: 1,
    totalPages: 1,
  });

  const [editItem, setEditItem] = useState<TEnterprise>();

  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onOpenChange: onOpenEditChange,
  } = useDisclosure();
  const {
    isOpen: isOpenCreate,
    onOpen: onOpenCreate,
    onOpenChange: onOpenCreateChange,
  } = useDisclosure();

  const { data, isLoading, refetch } = useQuery({
    queryKey: [
      queryKeysEnterprise.get_list_enterprises,
      filterEnterprises,
      pageProps?.page,
      pageProps?.items_per_page,
      isOpenCreate,
      isOpenEdit,
    ],
    queryFn: async () => {
      const enterpriseResponse = await searchEnterpriseQuery(filterEnterprises, {
        page: pageProps?.page,
        items_per_page: pageProps?.items_per_page,
      });

      setPageProps((prev) => ({
        ...prev,
        totalPages: enterpriseResponse.totalPages,
        totalItems: enterpriseResponse.totalItems,
        currentPage: enterpriseResponse.currentPage,
      }));

      return Array.isArray(enterpriseResponse.items) ? enterpriseResponse.items : [];
    },
  });

  const mutateEnterpriseDelete = useMutation({
    mutationFn: deleteEnterpriseMutation,
    onSuccess() {
      notify("Empresa deletada com sucesso!", { type: "success" });
      refetch();
    },
    onError() {
      notify("Falha ao deletar", { type: "error" });
    },
  });

  const onChangeItemsPerPage = useCallback((items_per_page: number) => {
    setPageProps((prev) => ({
      ...prev,
      items_per_page,
      page: 1,
    }));
  }, []);

  const onChangeFilterEnterprises = useCallback(
    (filterEnterprises: IFilterEnterprises) => {
      setPageProps((prev) => ({ ...prev, page: 1 }));
      setFilterEnterprises(filterEnterprises);
    },
    []
  );

  const onEditItem = useCallback((enterprise: TEnterprise) => {
    setEditItem(enterprise);
    onOpenEdit();
  }, []);

  const onDeleteItem = useCallback((id: string) => {
    mutateEnterpriseDelete.mutate(id);
  }, []);

  const items = data || [];

  return (
    <Card className="w-full bg-opacity-45">
      <CardBody>
        <TableEnterprises
          topContent={
            <div className="flex flex-col gap-3">
              <div className="flex w-full flex-row items-center justify-between gap-2">
                <h1 className="mx-2">Empresas</h1>
                <div className="flex flex-col justify-end gap-2 sm:flex-row md:flex-row lg:flex-row xl:flex-row">
                  <Button
                    size="md"
                    variant="bordered"
                    title="Cadastrar nova empresa"
                    onClick={onOpenCreate}
                  >
                    <PlusCircle className="h-4 w-4" />
                    Nova Empresa
                  </Button>
                </div>
              </div>
              <SearchEnterprise
                filterEnterprises={filterEnterprises}
                setFilterEnterprises={onChangeFilterEnterprises}
              />
            </div>
          }
          bottomContent={
            <PaginationCustom
              pageProps={pageProps}
              setPageProps={setPageProps}
              setItemsPerPage={onChangeItemsPerPage}
            />
          }
          enterprises={items}
          emptyContent="Nenhuma empresa encontrada"
          loadingState={isLoading}
          onOpenEdit={onEditItem}
          remove={onDeleteItem}
        />
      </CardBody>

      <CreateEnterprise
        isOpen={isOpenCreate}
        onOpenChange={onOpenCreateChange}
      />

      <UpdateEnterprise
        isOpen={isOpenEdit}
        onOpenChange={onOpenEditChange}
        item={editItem as TEnterprise}
      />
    </Card>
  );
};
