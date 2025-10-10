import { Button } from '@heroui/button';
import {
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@heroui/modal';
import { useState } from 'react';
import { ModalCustom } from './ModalCustom';

type ModalDeleteProps = {
  title?: string;
  message: string;
  onContinue?: () => void | Promise<void>;
  isOpen: boolean;
  onClose: () => void;
};

export const ModalDelete = ({
  message,
  onContinue,
  title = 'Excluir',
  isOpen,
  onClose,
}: ModalDeleteProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const onRequestContinue = () => {
    setIsLoading(true);

    try {
      onContinue?.();
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalCustom isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h4 className="text-lg font-semibold">{title}</h4>
            </ModalHeader>
            <ModalBody>
              <p>{message}</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancelar
              </Button>
              <Button
                color="danger"
                isLoading={isLoading}
                onPress={onRequestContinue}
              >
                Confirmar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </ModalCustom>
  );
};
