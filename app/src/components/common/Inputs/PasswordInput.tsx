import { Button } from '@heroui/button';
import { InputProps } from '@heroui/input';
import { Eye, EyeOff, Lock } from 'lucide-react';
import * as React from 'react';

import { InputCustom } from './InputCustom';

export interface PasswordInputProps extends InputProps {}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <InputCustom
        ref={ref}
        className={className}
        endContent={
          <Button
            isIconOnly
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="flex items-center justify-center"
            variant="light"
            onPress={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <Eye className="h-5 w-5 opacity-50" />
            ) : (
              <EyeOff className="h-5 w-5 opacity-50" />
            )}
          </Button>
        }
        label="Senha"
        placeholder="Digite sua senha"
        startContent={<Lock className="h-6 w-6 text-gray-600" />}
        type={showPassword ? 'text' : 'password'}
        {...props}
      />
    );
  },
);

PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
