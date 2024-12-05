import { queryKeysEnterprise } from "@/common/queries/get-enterprises.query";
import { TEnterprise } from "@/types/TEnterprise";
import { notify } from "@/utils/notify.util";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { updateEnterpriseMutation } from "../../mutations/enterprise.mutation";
import {
  UpdateEnterpriseFormData,
  updateEnterpriseFormSchema,
} from "../../validations/update-form.schema";
import { EnterpriseForm } from "../forms";

interface UpdateEnterpriseProps {
  isOpen: boolean;
  onOpenChange: () => void;
  item: TEnterprise;
}

export const UpdateEnterprise = ({
  isOpen,
  onOpenChange,
  item,
}: UpdateEnterpriseProps) => {
  const queryClient = useQueryClient();
  const methods = useForm<UpdateEnterpriseFormData>({
    defaultValues: {
      ...item,
    },
    resolver: zodResolver(updateEnterpriseFormSchema),
  });

  const mutateEnterpriseUpdate = useMutation({
    mutationFn: updateEnterpriseMutation,
    onSuccess() {
      methods.reset();
      notify("Empresa atualizada com sucesso!", { type: "success" });
      queryClient.invalidateQueries({
        queryKey: [queryKeysEnterprise.get_list_enterprises],
      });
      onOpenChange();
    },
    onError() {
      notify("Atualização falhou.", { type: "error" });
    },
  });

  useEffect(() => {
    if (!item) return;

    methods.reset({ ...item });
  }, [item, methods]);

  const onHandleSubmitUpdate = methods.handleSubmit((data) => {
    console.log(data);
    mutateEnterpriseUpdate.mutate(data);
  });

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
        <ModalContent>
          {(onClose) => (
            <FormProvider {...methods}>
              <form onSubmit={onHandleSubmitUpdate}>
                <ModalHeader className="flex flex-col gap-1">
                  Editar das empresas
                </ModalHeader>

                <ModalBody>
                  <EnterpriseForm />
                </ModalBody>

                <ModalFooter>
                  <Button
                    type="button"
                    color="danger"
                    variant="flat"
                    onPress={onClose}
                  >
                    Fechar
                  </Button>
                  <Button
                    type="submit"
                    color="success"
                    variant="flat"
                    isLoading={mutateEnterpriseUpdate.isPending}
                  >
                    Salvar
                  </Button>
                </ModalFooter>
              </form>
            </FormProvider>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
