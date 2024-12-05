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
import { useMutation } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { createEnterpriseMutation } from "../../mutations/enterprise.mutation";
import {
  CreateEnterpriseFormData,
  createEnterpriseFormSchema,
} from "../../validations/create-form.schema";
import { EnterpriseForm } from "../forms";

interface CreateEnterpriseProps {
  isOpen: boolean;
  onOpenChange: () => void;
}

export const CreateEnterprise = ({ isOpen, onOpenChange }: CreateEnterpriseProps) => {
  const methods = useForm<CreateEnterpriseFormData>({
    resolver: zodResolver(createEnterpriseFormSchema),
  });

  const mutateEnterpriseCreate = useMutation({
    mutationFn: createEnterpriseMutation,
    onSuccess() {
      methods.reset();
      notify("Empresa cadastrada com sucesso!", { type: "success" });
      onOpenChange();
    },
    onError() {
      notify("Cadastramento falhou.", { type: "error" });
    },
  });

  const onHandleSubmitCreate = methods.handleSubmit((data) => {
    mutateEnterpriseCreate.mutate(data);
  });

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl" classNames={{body: "max-h-[63vh] overflow-y-scroll"}}>
        <ModalContent>
          {(onClose) => (
            <FormProvider {...methods}>
              <form onSubmit={onHandleSubmitCreate}>
                <ModalHeader className="flex flex-col gap-1">
                  Cadastro de empresas
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
                    isLoading={mutateEnterpriseCreate.isPending}
                  >
                    Cadastrar
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