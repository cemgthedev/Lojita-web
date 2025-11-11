import { Autocomplete, AutocompleteProps } from '@heroui/autocomplete';
import React from 'react';

interface AutocompleteCustomProps extends AutocompleteProps {}

const AutocompleteCustom = React.forwardRef<
  HTMLInputElement,
  AutocompleteCustomProps
>(({ ...props }, ref) => {
  return (
    <Autocomplete
      ref={ref}
      isClearable
      labelPlacement="outside"
      placeholder={String(props.placeholder) || 'Selecione...'}
      size="md"
      variant="bordered"
      {...props}
    />
  );
});

AutocompleteCustom.displayName = 'AutocompleteCustom';

export { AutocompleteCustom };
