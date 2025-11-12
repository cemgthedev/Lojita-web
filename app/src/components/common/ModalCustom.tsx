import { Modal, ModalProps } from '@heroui/modal';

interface ModalCustomProps extends ModalProps {}

export const ModalCustom = ({ ...props }: ModalCustomProps) => {
  return (
    <Modal
      placement="center"
      size="3xl"
      classNames={{ body: 'max-h-[63vh] overflow-y-scroll' }}
      {...props}
    />
  );
};
