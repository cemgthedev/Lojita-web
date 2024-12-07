
import { TUser } from "@/types/TUser";
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
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { updateUserMutation } from "../mutations/user.mutation";
import { UserForm } from "../UserForm";
import { UpdateUserFormData, updateUserFormSchema } from "../validations/update-user.schema";

interface UpdateUserProps {
  isOpen: boolean;
  onOpenChange: () => void;
  item: TUser;
}

export const UpdateUser = ({
  isOpen,
  onOpenChange,
  item,
}: UpdateUserProps) => {
  const methods = useForm<UpdateUserFormData>({
    defaultValues: {
      id: item.id,
      name: item.name,
      cpf: item.cpf,
      age: item.age,
      gender: item.gender,
      phone_number: item.phone_number,
      email: item.email,
      password: item.password,
    },
    resolver: zodResolver(updateUserFormSchema),
  });

  useEffect(() => {
    console.log(methods.formState.errors);
  }, [methods.formState.errors]);

  const mutateUserUpdate = useMutation({
    mutationFn: updateUserMutation,
    onSuccess() {
      methods.reset();
      notify("Perfil atualizado com sucesso!", { type: "success" });
      onOpenChange();
    },
    onError() {
      notify("Atualização falhou.", { type: "error" });
    },
  });

  useEffect(() => {
    if (!item) return;

    methods.reset({ 
        id: item.id,
        name: item.name,
        cpf: item.cpf,
        age: item.age,
        gender: item.gender,
        phone_number: item.phone_number,
        email: item.email,
        password: item.password,
    });
  }, [item, methods]);

  const onHandleSubmitUpdate = methods.handleSubmit((data) => {
    mutateUserUpdate.mutate(data);
  });

  return (
    <>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange} 
        size="3xl" 
        classNames={{
          body: "max-h-[63vh] overflow-y-scroll",
          backdrop: "bg-gradient-to-t from-[#075985] to-[#5B21B6]"
        }}
      >
        <ModalContent>
          {(onClose) => (
            <FormProvider {...methods}>
              <form onSubmit={onHandleSubmitUpdate}>
                <ModalHeader className="flex flex-col gap-1">
                  Atualização de Perfil
                </ModalHeader>

                <ModalBody>
                  <UserForm />
                </ModalBody>

                <ModalFooter>
                  <Button
                    type="button"
                    color="danger"
                    variant="shadow"
                    onPress={onClose}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    color="primary"
                    variant="shadow"
                    isLoading={mutateUserUpdate.isPending}
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