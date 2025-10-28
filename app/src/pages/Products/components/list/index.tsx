import { ModalDelete } from '@/components/common/ModalDelete';
import { TProduct } from '@/types/TProduct';
import { Card } from '@heroui/card';
import { Divider } from '@heroui/divider';
import { useDisclosure } from '@heroui/modal';
import { Spinner } from '@heroui/spinner';
import { useState } from 'react';
import { CardProduct } from '../card';

export interface ListProducsProps {
  products: TProduct[];
  emptyContent?: string;
  loadingState?: boolean;
  topContent?: React.ReactNode;
  bottomContent?: React.ReactNode;
  removeActions?: boolean;
  // Events
  onOpenEdit?: (product: TProduct) => void;
  remove?: (id: string) => void;
}

export function ListProducts({
  products,
  emptyContent,
  loadingState = false,
  removeActions = false,
  topContent,
  bottomContent,
  onOpenEdit,
  remove,
}: ListProducsProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [product, setProduct] = useState<TProduct | null>(null);

  const handleRemoveProduct = (product: TProduct) => {
    setProduct(product);
    onOpen();
  };

  return (
    <>
      <Card shadow="none" className="w-full lg:w-4/5 gap-4 bg-transparent">
        {topContent}
        <Divider />

        {/* Carregando produtos */}
        {loadingState && (
          <div className="flex justify-center">
            <Spinner
              classNames={{ base: 'opacity-50 p-2 rounded-lg' }}
              color="secondary"
            />
          </div>
        )}

        {/* Produtos carregados */}
        {!loadingState && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((product) => (
              <CardProduct
                key={product.id}
                product={product}
                removeActions={removeActions}
                remove={handleRemoveProduct}
              />
            ))}
          </div>
        ) : (
          <p>{emptyContent}</p>
        )}

        {bottomContent}
      </Card>
      <ModalDelete
        isOpen={isOpen && !!product}
        title="Excluir produto"
        message="Tem certeza que deseja excluir esse produto?"
        onClose={onClose}
        onContinue={() => {
          product && remove?.(product?.id);
        }}
      />
    </>
  );
}
