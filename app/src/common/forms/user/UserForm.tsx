import { CreateUserFormData } from "@/common/forms/user/validations/register-user.schema";
import { getGenderOptions } from "@/data/getGenderOptions";
import {
  Accordion,
  AccordionItem,
  Autocomplete,
  AutocompleteItem,
  Input
} from "@nextui-org/react";
import { Controller, useFormContext } from "react-hook-form";

export const UserForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateUserFormData>();
  
  const genders = getGenderOptions();

  return (
    <>
      <Accordion defaultExpandedKeys={["dados-pessoais"]} itemClasses={{ title: "text-lg font-semibold" }}>
        <AccordionItem key="dados-pessoais" aria-label="Dados pessoais" title="Dados pessoais">
          <div className="flex flex-col gap-2">
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
                    label="Informe seu nome"
                    isRequired
                    isInvalid={!!errors.name}
                    errorMessage={errors.name?.message}
                  />
                </>
              )}
            />
            <Controller
              control={control}
              name="cpf"
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
                    label="CPF do usuário"
                    isRequired
                    isInvalid={!!errors.cpf}
                    errorMessage={errors.cpf?.message}
                  />
                </>
              )}
            />
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
                    label="Informe seu email"
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
            <div className="flex gap-2">
              <Controller
                control={control}
                name="gender"
                render={({ field: { onChange, onBlur, ref, value } }) => (
                  <>
                    <Autocomplete
                      size="sm"
                      ref={ref}
                      onBlur={onBlur}
                      value={value as any}
                      label="Informe seu sexo"
                      items={genders}
                      defaultSelectedKey={value}
                      inputValue={genders.find((option) => option.value === value)?.label}
                      onSelectionChange={onChange}
                      isRequired
                      isInvalid={!!errors.gender}
                      errorMessage={errors.gender?.message}
                    >
                      {(item) => (
                        <AutocompleteItem key={item.value} value={item.label}>
                          {item.label}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>

                  </>
                )}
              />
              <Controller
                control={control}
                name="age"
                render={({ field: { onChange, onBlur, ref, value } }) => (
                  <>
                    <Input
                      size="sm"
                      ref={ref}
                      type="number"
                      min={1}
                      onBlur={onBlur}
                      variant="bordered"
                      onChange={(ageValue) => {
                        const age = Number(ageValue.target.value);
                        
                        onChange(age);
                      }}
                      value={value as any}
                      label="Informe sua idade"
                      isInvalid={!!errors.age}
                      errorMessage={errors.age?.message}
                    />
                  </>
                )}
              />
            </div>
            <Controller
              control={control}
              name="phone_number"
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
                    isInvalid={!!errors.phone_number}
                    errorMessage={errors.phone_number?.message}
                  />
                </>
              )}
            />
          </div>
        </AccordionItem>
        <AccordionItem key="dados-de-localizacao" aria-label="Dados de localização" title="Dados de localização">
          <div className="flex flex-col gap-2">
            <Controller
              control={control}
              name="address.name"
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
                    label="Título do endereço"
                    isRequired
                    isInvalid={!!errors.address?.name}
                    errorMessage={errors.address?.name?.message}
                  />
                </>
              )}
            />
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
                      isRequired
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
                      isRequired
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
                      isRequired
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
            </div>
          </div>
        </AccordionItem>
      </Accordion>
    </>
  );
};