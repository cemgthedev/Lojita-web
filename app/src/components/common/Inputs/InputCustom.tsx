import { Input, InputProps } from '@heroui/input';
import React from 'react';

interface InputCustomProps extends InputProps {}

const InputCustom = React.forwardRef<HTMLInputElement, InputCustomProps>(
  ({ ...props }, ref) => {
    return (
      <Input
        ref={ref}
        labelPlacement="outside"
        placeholder={String(props.label) || 'Digite aqui...'}
        size="md"
        variant="bordered"
        {...props}
      />
    );
  },
);

InputCustom.displayName = 'InputCustom';

export { InputCustom };
