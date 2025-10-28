import { TProduct } from '@/types/TProduct';
import { formatterPrice } from '@/utils/formatter.util';
import { Button } from '@heroui/button';
import { Card, CardBody } from '@heroui/card';
import { Image } from '@heroui/image';

export interface CardProducProps {
  product: TProduct;
  removeActions?: boolean;
  // Events
  remove?: (product: TProduct) => void;
}

export function CardProduct({
  product,
  removeActions,
  remove,
}: CardProducProps) {
  const minPrice = Math.min(...product.variants.map((v) => v.price));
  const maxPrice = Math.max(...product.variants.map((v) => v.price));

  return (
    <Card
      shadow="none"
      radius="md"
      className="bg-purple-200 dark:bg-zinc-800 border-1.5 border-default-800 overflow-hidden"
    >
      <CardBody className="p-0">
        <div className="bg-white">
          <Image
            src={product?.coverUrl}
            alt={product.name}
            fallbackSrc="/images/products/not-found.png"
            isZoomed
            width={800}
            height={256}
            loading="lazy"
            radius="none"
            classNames={{
              wrapper:
                'flex justify-center bg-contain bg-center bg-no-repeat min-w-full min-h-[256px] max-h-[256px]',
              img: 'min-w-full min-h-[256px] max-h-[256px]',
            }}
          />
        </div>
        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-col gap-1">
            <h5 className="line-clamp-2 font-semibold text-xl">
              {product.name}
            </h5>
            <p className="line-clamp-2 text-medium">{product.description}</p>
            {minPrice === maxPrice ? (
              <p className="text-medium">{formatterPrice(minPrice)}</p>
            ) : (
              <p className="text-medium">{`${formatterPrice(minPrice)} - ${formatterPrice(maxPrice)}`}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            {!removeActions && (
              <>
                <Button
                  size="md"
                  variant="shadow"
                  color="primary"
                  className="w-full font-medium"
                >
                  Editar
                </Button>
                <Button
                  size="md"
                  variant="shadow"
                  color="danger"
                  className="w-full font-medium"
                  hidden={!remove}
                  onPress={remove && (() => remove(product))}
                >
                  Excluir
                </Button>
              </>
            )}

            <Button
              size="md"
              variant="shadow"
              color="secondary"
              className="col-span-2 font-medium"
            >
              Ver detalhes
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
