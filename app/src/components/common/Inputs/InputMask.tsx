import { Input, InputProps } from '@heroui/input';
import type { MaskitoOptions } from '@maskito/core';
import { useMaskito } from '@maskito/react';
import React, { RefObject } from 'react';

export type MaskType = 'cpf' | 'cnpj' | 'phone';

interface InputMaskCustomProps extends InputProps {
  mask?: MaskType;
}

const maskOptionsMap: Record<MaskType, MaskitoOptions> = {
  cpf: {
    mask: [
      /\d/,
      /\d/,
      /\d/,
      '.',
      /\d/,
      /\d/,
      /\d/,
      '.',
      /\d/,
      /\d/,
      /\d/,
      '-',
      /\d/,
      /\d/,
    ],
  },
  cnpj: {
    mask: [
      /\d/,
      /\d/,
      '.',
      /\d/,
      /\d/,
      /\d/,
      '.',
      /\d/,
      /\d/,
      /\d/,
      '/',
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      '-',
      /\d/,
      /\d/,
    ],
  },
  phone: {
    mask: [
      '(',
      /\d/,
      /\d/,
      ')',
      ' ',
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      '-',
      /\d/,
      /\d/,
      /\d/,
      /\d/,
    ],
  },
};

const InputMaskCustom = React.forwardRef<
  HTMLInputElement,
  InputMaskCustomProps
>(({ mask, ...props }, ref) => {
  const options = mask ? maskOptionsMap[mask] : undefined;
  const maskedRef = useMaskito({ options });

  return (
    <Input
      {...props}
      ref={(el) => {
        // aplica a máscara
        maskedRef(el || null);

        // repassa o ref externo
        if (typeof ref === 'function') {
          ref(el);
        } else if (ref) {
          (ref as RefObject<HTMLInputElement | null>).current = el;
        }
      }}
      labelPlacement="outside"
      placeholder={props.placeholder || 'Digite a informação...'}
      size="md"
      variant="bordered"
    />
  );
});

InputMaskCustom.displayName = 'InputMaskCustom';

export { InputMaskCustom };
