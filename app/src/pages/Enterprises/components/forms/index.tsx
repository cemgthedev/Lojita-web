import { InputImage } from "@/components/ui/InputImage";
import {
  Accordion,
  AccordionItem,
  Input
} from "@nextui-org/react";
import { Controller, useFormContext } from "react-hook-form";
import { CreateEnterpriseFormData } from "../../validations/create-form.schema";

export const EnterpriseForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateEnterpriseFormData>();

  return (
    <>
      <Accordion defaultExpandedKeys={["dados-da-empresa"]} itemClasses={{ title: "text-lg font-semibold" }}>
        <AccordionItem key="dados-da-empresa" aria-label="Dados da empresa" title="Dados da empresa">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <InputImage
                name="avatarUrl"
                label="Selecione uma imagem"
                control={control}
              />
              <div className="w-full flex flex-col gap-2">
                <Controller
                  control={control}
                  name="name"
                  render={({ field: { onChange, onBlur, ref, value } }) => (
                    <>
                      <Input
                        size="sm"
                        ref={ref}
                        type="text"
                        onBlur={onBlur}
                        variant="bordered"
                        onChange={onChange}
                        value={value as any}
                        label="Nome da empresa"
                        isRequired
                        isInvalid={!!errors.name}
                        errorMessage={errors.name?.message}
                      />
                    </>
                  )}
                />
                <Controller
                  control={control}
                  name="document"
                  render={({ field: { onChange, onBlur, ref, value } }) => (
                    <>
                      <Input
                        size="sm"
                        ref={ref}
                        type="text"
                        onBlur={onBlur}
                        variant="bordered"
                        onChange={onChange}
                        value={value as any}
                        label="CPF/CNPJ da empresa"
                        isRequired
                        isInvalid={!!errors.document}
                        errorMessage={errors.document?.message}
                      />
                    </>
                  )}
                />
              </div>
            </div>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, ref, value } }) => (
                <>
                  <Input
                    size="sm"
                    ref={ref}
                    type="email"
                    onBlur={onBlur}
                    variant="bordered"
                    onChange={onChange}
                    value={value as any}
                    label="Email da empresa"
                    isRequired
                    isInvalid={!!errors.email}
                    errorMessage={errors.email?.message}
                  />
                </>
              )}
            />
            <div className="flex gap-2">
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, ref, value } }) => (
                  <>
                    <Input
                      size="sm"
                      ref={ref}
                      type="password"
                      onBlur={onBlur}
                      variant="bordered"
                      onChange={onChange}
                      value={value as any}
                      label="Senha da conta"
                      isRequired
                      isInvalid={!!errors.password}
                      errorMessage={errors.password?.message}
                    />
                  </>
                )}
              />
              <Controller
                control={control}
                name="passwordConfirmation"
                render={({ field: { onChange, onBlur, ref, value } }) => (
                  <>
                    <Input
                      size="sm"
                      ref={ref}
                      type="password"
                      onBlur={onBlur}
                      variant="bordered"
                      onChange={onChange}
                      value={value as any}
                      label="Confirme a senha"
                      isRequired
                      isInvalid={!!errors.passwordConfirmation}
                      errorMessage={errors.passwordConfirmation?.message}
                    />
                  </>
                )}
              />
            </div>
            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, onBlur, ref, value } }) => (
                <>
                  <Input
                    size="sm"
                    ref={ref}
                    type="text"
                    onBlur={onBlur}
                    variant="bordered"
                    onChange={onChange}
                    value={value as any}
                    label="Telefone de contato"
                    isInvalid={!!errors.phone}
                    errorMessage={errors.phone?.message}
                  />
                </>
              )}
            />
          </div>
        </AccordionItem>
        <AccordionItem key="dados-de-localizacao" aria-label="Dados de localização" title="Dados de localização">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Controller
                control={control}
                name="address.cep"
                render={({ field: { onChange, onBlur, ref, value } }) => (
                  <>
                    <Input
                      size="sm"
                      ref={ref}
                      type="text"
                      onBlur={onBlur}
                      variant="bordered"
                      onChange={onChange}
                      value={value as any}
                      label="CEP"
                      isInvalid={!!errors.address?.cep}
                      errorMessage={errors.address?.cep?.message}
                    />
                  </>
                )}
              />
              <Controller
                control={control}
                name="address.city"
                render={({ field: { onChange, onBlur, ref, value } }) => (
                  <>
                    <Input
                      size="sm"
                      ref={ref}
                      type="text"
                      onBlur={onBlur}
                      variant="bordered"
                      onChange={onChange}
                      value={value as any}
                      label="Cidade"
                      isInvalid={!!errors.address?.city}
                      errorMessage={errors.address?.city?.message}
                    />
                  </>
                )}
              />
              <Controller
                control={control}
                name="address.uf"
                render={({ field: { onChange, onBlur, ref, value } }) => (
                  <>
                    <Input
                      size="sm"
                      ref={ref}
                      type="text"
                      onBlur={onBlur}
                      variant="bordered"
                      onChange={onChange}
                      value={value as any}
                      label="UF"
                      isInvalid={!!errors.address?.uf}
                      errorMessage={errors.address?.uf?.message}
                      className="w-42"
                    />
                  </>
                )}
              />
            </div>
            <div className="flex gap-2">
              <Controller
                control={control}
                name="address.neighborhood"
                render={({ field: { onChange, onBlur, ref, value } }) => (
                  <>
                    <Input
                      size="sm"
                      ref={ref}
                      type="text"
                      onBlur={onBlur}
                      variant="bordered"
                      onChange={onChange}
                      value={value as any}
                      label="Bairro"
                      isInvalid={!!errors.address?.neighborhood}
                      errorMessage={errors.address?.neighborhood?.message}
                    />
                  </>
                )}
              />
              <Controller
                control={control}
                name="address.street"
                render={({ field: { onChange, onBlur, ref, value } }) => (
                  <>
                    <Input
                      size="sm"
                      ref={ref}
                      type="text"
                      onBlur={onBlur}
                      variant="bordered"
                      onChange={onChange}
                      value={value as any}
                      label="Nome da rua/avenida"
                      isInvalid={!!errors.address?.street}
                      errorMessage={errors.address?.street?.message}
                    />
                  </>
                )}
              />
              <Controller
                control={control}
                name="address.number"
                render={({ field: { onChange, onBlur, ref, value } }) => (
                  <>
                    <Input
                      size="sm"
                      ref={ref}
                      type="text"
                      onBlur={onBlur}
                      variant="bordered"
                      onChange={onChange}
                      value={value as any}
                      label="Número"
                      isInvalid={!!errors.address?.number}
                      errorMessage={errors.address?.number?.message}
                      className="w-42"
                    />
                  </>
                )}
              />
            </div>
            <div className="flex gap-2">
              <Controller
                control={control}
                name="address.complement"
                render={({ field: { onChange, onBlur, ref, value } }) => (
                  <>
                    <Input
                      size="sm"
                      ref={ref}
                      type="text"
                      onBlur={onBlur}
                      variant="bordered"
                      onChange={onChange}
                      value={value as any}
                      label="Complemento (Ap, casa etc.)"
                      isInvalid={!!errors.address?.complement}
                      errorMessage={errors.address?.complement?.message}
                    />
                  </>
                )}
              />
              <Controller
                control={control}
                name="address.linkMap"
                render={({ field: { onChange, onBlur, ref, value } }) => (
                  <>
                    <Input
                      size="sm"
                      ref={ref}
                      type="text"
                      onBlur={onBlur}
                      variant="bordered"
                      onChange={onChange}
                      value={value as any}
                      label="Link do google maps"
                      isInvalid={!!errors.address?.linkMap}
                      errorMessage={errors.address?.linkMap?.message}
                    />
                  </>
                )}
              />
            </div>
          </div>
        </AccordionItem>
      </Accordion>
    </>
  );
};