import { TCreateUser } from '@/common/validations/users/create-user.schema';
import { AutocompleteCustom } from '@/components/common/Inputs/AutocompleteCustom';
import { InputCustom } from '@/components/common/Inputs/InputCustom';
import { InputMaskCustom } from '@/components/common/Inputs/InputMask';
import { genderOptions, rolesOptions } from '@/types/TUser';
import { AutocompleteItem } from '@heroui/autocomplete';
import { Controller, useFormContext } from 'react-hook-form';

export interface IUserFormProps {
  isAdmin?: boolean;
  isCreate?: boolean;
}

export function UserForm({ isAdmin = false, isCreate = true }: IUserFormProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext<TCreateUser>();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <InputCustom
              label="Nome"
              placeholder="Digite o seu nome"
              isRequired
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              isClearable
              onClear={() => {
                onChange('');
              }}
              ref={ref}
              isInvalid={!!errors.name}
              errorMessage={errors.name?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="document"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <InputMaskCustom
              label="CPF"
              placeholder="999.999.999-99"
              isRequired
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              ref={ref}
              isClearable
              onClear={() => {
                onChange('');
              }}
              mask="cpf"
              isInvalid={!!errors.document}
              errorMessage={errors.document?.message}
            />
          )}
        />
      </div>

      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <InputMaskCustom
            label="Telefone"
            placeholder="(99) 99999-9999"
            isRequired
            onChange={onChange}
            onBlur={onBlur}
            value={value || ''}
            ref={ref}
            isClearable
            onClear={() => {
              onChange('');
            }}
            mask="phone"
            isInvalid={!!errors.phone}
            errorMessage={errors.phone?.message}
          />
        )}
      />

      <div className="flex gap-4">
        <Controller
          control={control}
          name="gender"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <AutocompleteCustom
              defaultItems={genderOptions}
              errorMessage={errors.gender?.message}
              isInvalid={!!errors.gender}
              label="Sexo"
              placeholder="Selecione o sexo"
              selectedKey={value}
              onSelectionChange={(key) => onChange(String(key))}
              ref={ref}
              onBlur={onBlur}
            >
              {(item: any) => (
                <AutocompleteItem key={item.value}>
                  {item.label}
                </AutocompleteItem>
              )}
            </AutocompleteCustom>
          )}
        />

        <Controller
          control={control}
          name="age"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <InputCustom
              label="Idade"
              placeholder="Digite a sua idade"
              onChange={(e) => {
                onChange(Number(e.target.value));
              }}
              onBlur={onBlur}
              value={value ? String(value) : ''}
              isClearable
              onClear={() => {
                onChange('');
              }}
              type="number"
              ref={ref}
              isInvalid={!!errors.name}
              errorMessage={errors.name?.message}
            />
          )}
        />
      </div>

      <Controller
        control={control}
        name="address"
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <InputCustom
            label="Link do google maps"
            placeholder="Inserir link do google maps"
            onChange={onChange}
            onBlur={onBlur}
            value={value || ''}
            isClearable
            onClear={() => {
              onChange('');
            }}
            ref={ref}
            isInvalid={!!errors.address}
            errorMessage={errors.address?.message}
          />
        )}
      />

      {!isAdmin && isCreate && (
        <Controller
          control={control}
          name="role"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <AutocompleteCustom
              defaultItems={rolesOptions}
              errorMessage={errors.role?.message}
              isInvalid={!!errors.role}
              isRequired
              label="Atividades no site"
              placeholder="Informe se você é comprador ou vendedor"
              selectedKey={value}
              onSelectionChange={(key) => onChange(String(key))}
              ref={ref}
              onBlur={onBlur}
            >
              {(item: any) => (
                <AutocompleteItem key={item.value}>
                  {item.label}
                </AutocompleteItem>
              )}
            </AutocompleteCustom>
          )}
        />
      )}

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <InputCustom
            label="Email"
            placeholder="Digite seu email"
            isRequired
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            isClearable
            onClear={() => {
              onChange('');
            }}
            ref={ref}
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message}
          />
        )}
      />

      <div className="flex gap-4">
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <InputCustom
              label="Senha"
              placeholder="Digite sua senha"
              isRequired
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              isClearable
              onClear={() => {
                onChange('');
              }}
              type="password"
              ref={ref}
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <InputCustom
              label="Confirmar senha"
              placeholder="Confirme sua senha"
              isRequired
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              isClearable
              onClear={() => {
                onChange('');
              }}
              type="password"
              ref={ref}
              isInvalid={!!errors.confirmPassword}
              errorMessage={errors.confirmPassword?.message}
            />
          )}
        />
      </div>
    </div>
  );
}
