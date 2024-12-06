import { UserForm } from "@/common/forms/UserForm";
import { CreateUserFormData, createUserFormSchema } from "@/common/validations/register-user.schema";
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
import { createUserMutation } from "../../mutations/register.mutation";

interface CreateUserProps {
  isOpen: boolean;
  onOpenChange: () => void;
}

export const CreateUser = ({ isOpen, onOpenChange }: CreateUserProps) => {
  const methods = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  });

  const mutateUserCreate = useMutation({
    mutationFn: createUserMutation,
    onSuccess() {
      methods.reset();
      notify("Usuário cadastrado com sucesso!", { type: "success" });
      onOpenChange();
    },
    onError() {
      notify("Cadastramento falhou.", { type: "error" });
    },
  });

  const onHandleSubmitCreate = methods.handleSubmit((data) => {
    mutateUserCreate.mutate(data);
  });

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl" classNames={{body: "max-h-[63vh] overflow-y-scroll"}}>
        <ModalContent>
          {(onClose) => (
            <FormProvider {...methods}>
              <form onSubmit={onHandleSubmitCreate}>
                <ModalHeader className="flex flex-col gap-1">
                  Cadastro de Usuário
                </ModalHeader>

                <ModalBody>
                  <UserForm />
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
                    isLoading={mutateUserCreate.isPending}
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