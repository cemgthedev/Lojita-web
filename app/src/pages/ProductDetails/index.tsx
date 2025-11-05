import { InputCustom } from '@/components/common/Inputs/InputCustom';
import { ModalDelete } from '@/components/common/ModalDelete';
import { useProducts } from '@/hooks/use-products.hook';
import { TProduct } from '@/types/TProduct';
import { formatterPrice } from '@/utils/formatter.util';
import { Button } from '@heroui/button';
import { Card } from '@heroui/card';
import { Chip } from '@heroui/chip';
import { Divider } from '@heroui/divider';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@heroui/dropdown';
import { Image } from '@heroui/image';
import { useDisclosure } from '@heroui/modal';
import { cn } from '@heroui/theme';
import { useQuery } from '@tanstack/react-query';
import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowUpIcon,
  EllipsisVertical,
  HeartIcon,
  MessageCircleIcon,
  MinusIcon,
  PlusIcon,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ListProducts } from '../Products/components/list';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  );

  const {
    products,
    getProduct,
    setIsLoading,
    updateProduct,
    deleteProduct,
    isLoading,
  } = useProducts();

  const { data: product, isLoading: isLoadingProduct } = useQuery({
    enabled: !!id,
    queryKey: ['get-product', id],
    queryFn: async () => {
      const response = await getProduct(id!);
      return response;
    },
  });

  const handleDeleteProduct = async (id: string) => {
    setIsLoading(true);
    await deleteProduct(id);
    setIsLoading(false);
  };

  const handleUpdateProduct = async (product: TProduct) => {
    setIsLoading(true);
    await updateProduct(product);
    setIsLoading(false);
  };

  const imagesUrls = product?.variants.reduce<Record<string, string[]>>(
    (acc, item) => {
      if (item?.id && item?.imageUrls?.length) {
        acc[item.id] = item.imageUrls;
        acc['all'] = [...acc['all'], ...item.imageUrls];
      }
      return acc;
    },
    { all: [] },
  );

  // ver mais
  const [viewMore, setViewMore] = useState(false);

  // state de quantidade provisório
  const [quantity, setQuantity] = useState(0);

  return (
    <>
      <section className="flex flex-col items-center gap-4">
        <div className="flex justify-between items-center gap-4 w-full">
          <Button
            variant="light"
            size="md"
            radius="md"
            isIconOnly
            onPress={() => navigate(-1)}
          >
            <ArrowLeftIcon
              size={20}
              className="min-w-5 max-w-5 min-h-5 max-h-5"
            />
          </Button>
          <h1 className="text-xl font-semibold">{product?.name}</h1>
          <Dropdown className="z-10">
            <DropdownTrigger>
              <Button isIconOnly size="sm" variant="light">
                <EllipsisVertical
                  size={20}
                  className="min-w-5 max-w-5 min-h-5 max-h-5"
                />
              </Button>
            </DropdownTrigger>

            <DropdownMenu aria-label="Dynamic Actions" className="z-10">
              <DropdownItem
                key="edit"
                hidden={!product}
                onPress={() => handleUpdateProduct?.(product!)}
              >
                Editar
              </DropdownItem>
              <DropdownItem
                key="remove"
                hidden={!product}
                onPress={() => {
                  setSelectedProductId(product?.id || null);
                  onOpen();
                }}
              >
                Excluir
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>

        <Card shadow="none" className="w-full lg:w-4/5 gap-4 bg-transparent">
          <div className="grid grid-cols-2 gap-4">
            <aside className="hidden gap-3 p-1 md:flex md:flex-col">
              {imagesUrls && imagesUrls['all'].length > 0 && (
                <div className="border-1 border-default-800 overflow-hidden rounded-lg">
                  <Image
                    src={imagesUrls['all'][0]}
                    alt={'imagem do produto'}
                    fallbackSrc="/images/products/not-found.png"
                    width={1024}
                    height={256}
                    isZoomed
                    loading="lazy"
                    radius="none"
                    className="bg-gray-50"
                    classNames={{
                      wrapper:
                        'flex justify-center items-center bg-contain bg-center bg-no-repeat min-w-full min-h-[256px] max-h-[256px]',
                      img: 'min-h-[256px] max-h-[256px] object-contain object-center',
                    }}
                  />
                </div>
              )}
              {imagesUrls &&
                imagesUrls['all'].slice(1, imagesUrls['all'].length).length >
                  0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {imagesUrls['all']
                      .slice(1, imagesUrls['all'].length)
                      .map((imageUrl) => (
                        <Image
                          src={imageUrl}
                          alt={'imagem do produto'}
                          fallbackSrc="/images/products/not-found.png"
                          width={764}
                          height={172}
                          loading="lazy"
                          radius="lg"
                          className="border-1 border-default-800 bg-gray-50"
                          classNames={{
                            wrapper:
                              'flex justify-center items-center bg-contain bg-center bg-no-repeat min-w-full min-h-[172px] max-h-[172px]',
                            img: 'min-h-[172px] max-h-[172px] object-contain object-center',
                          }}
                        />
                      ))}
                  </div>
                )}
            </aside>
            <aside
              className={cn(
                'col-span-2 md:col-span-1 flex flex-col gap-3 p-1',
                imagesUrls &&
                  imagesUrls['all'].length === 0 &&
                  'md:col-span-2 w-full md:w-4/5 mx-auto',
              )}
            >
              <figure className="flex flex-col gap-3">
                <div className="relative ring-1 ring-default-800 overflow-hidden rounded-lg">
                  <Image
                    src={product?.coverUrl}
                    alt={'imagem do produto'}
                    fallbackSrc="/images/products/not-found.png"
                    width={1024}
                    height={256}
                    loading="lazy"
                    radius="none"
                    className="bg-gray-50"
                    classNames={{
                      wrapper:
                        'flex justify-center items-center bg-contain bg-center bg-no-repeat min-w-full min-h-[256px] max-h-[256px]',
                      img: 'min-h-[256px] max-h-[256px] object-contain object-center',
                    }}
                  />
                  <Button
                    variant="light"
                    size="md"
                    radius="md"
                    isIconOnly
                    className="absolute bottom-2 right-2 z-[999] text-red-600 hover:animate-pulse"
                    onPress={() => {}}
                  >
                    <HeartIcon
                      size={32}
                      className="min-w-8 max-w-8 min-h-8 max-h-8"
                    />
                  </Button>
                </div>
                <div className="flex gap-3 md:hidden overflow-auto scrollbar-hide">
                  {imagesUrls && imagesUrls['all'].length > 0 && (
                    <div className="flex gap-3">
                      {imagesUrls['all'].map((imageUrl) => (
                        <Image
                          src={imageUrl}
                          alt={'imagem do produto'}
                          fallbackSrc="/images/products/not-found.png"
                          width={64}
                          height={64}
                          loading="lazy"
                          radius="lg"
                          className="border-1 border-default-800 bg-gray-50"
                          classNames={{
                            wrapper:
                              'flex justify-center items-center bg-contain bg-center bg-no-repeat min-w-[64px] max-w-[64px] min-h-[64px] max-h-[64px]',
                            img: 'min-w-[64px] max-w-[64px] min-h-[64px] max-h-[64px] object-contain object-center',
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
                <figcaption>
                  <p className="text-xl font-normal">
                    {formatterPrice(product?.variants[0].price || 0)}
                  </p>
                  <span className="text-secondary-600 font-medium">
                    {product?.category}
                  </span>
                  <div>
                    <p className={cn(!viewMore && 'line-clamp-4')}>
                      {product?.description}
                    </p>
                    <button
                      className="flex gap-1 items-end hover:text-primary-600"
                      onClick={() => {
                        setViewMore((prevState) => !prevState);
                      }}
                    >
                      <p className="text-medium leading-5">
                        {viewMore ? 'ver menos' : 'ver mais'}
                      </p>
                      {viewMore ? (
                        <ArrowUpIcon size={16} className="min-w-4 max-w-4" />
                      ) : (
                        <ArrowDownIcon size={16} className="min-w-4 max-w-4" />
                      )}
                    </button>
                  </div>
                </figcaption>
              </figure>

              {product?.options?.colors &&
                product?.options.colors.length >= 0 && (
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between gap-4">
                      <h1 className="font-semibold">Cores</h1>
                      <p>
                        {product?.options?.colors.length === 0
                          ? 'nenhuma cor'
                          : product?.options?.colors.length === 1
                            ? `${product?.options?.colors.length} cor`
                            : `${products.length} cores`}
                      </p>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {product?.options?.colors.map((color) => (
                        <Chip
                          variant="bordered"
                          color="secondary"
                          key={color.id}
                          className="hover:opacity-80 cursor-pointer"
                        >
                          {color.name}
                        </Chip>
                      ))}
                    </div>
                  </div>
                )}

              {product?.options?.sizes &&
                product?.options.sizes.length >= 0 && (
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between gap-4">
                      <h1 className="font-semibold">Tamanhos</h1>
                      <p>
                        {product?.options?.sizes.length === 0
                          ? 'nenhum tamanho'
                          : product?.options?.sizes.length === 1
                            ? `${product?.options?.sizes.length} tamanho`
                            : `${products.length} tamanhos`}
                      </p>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {product?.options?.sizes.map((size) => (
                        <Chip
                          title={`${size.value} ${size.unit['value']}`}
                          variant="bordered"
                          color="secondary"
                          key={size.id}
                          className="hover:opacity-80 cursor-pointer"
                        >
                          {size.name}
                        </Chip>
                      ))}
                    </div>
                  </div>
                )}

              <div className="flex flex-col items-center gap-2">
                <div className="w-full flex justify-between gap-4">
                  <h1 className="font-semibold">Quantidade desejada</h1>
                  <p className="text-right">
                    {product?.totalStock === 0
                      ? 'esgotado'
                      : `${product?.totalStock} em estoque`}
                  </p>
                </div>
                <div className="w-full flex flex-col items-center gap-4 pb-1 sm:flex-row sm:justify-between">
                  <div className="w-fit flex items-center gap-2">
                    <Button
                      variant="bordered"
                      radius="full"
                      size="sm"
                      isDisabled={quantity === 0}
                      isIconOnly
                      startContent={
                        <MinusIcon
                          size={20}
                          className="min-w-5 max-w-5 min-h-5 max-h-5"
                        />
                      }
                      onPress={() => setQuantity((prevState) => prevState - 1)}
                    />
                    <InputCustom
                      type="number"
                      min={0}
                      max={product?.totalStock}
                      size="sm"
                      value={String(quantity)}
                      onChange={(e) => {
                        const value = Number(e.target.value) || 0;

                        if (
                          value < 0 ||
                          (product?.totalStock && value > product?.totalStock)
                        ) {
                          setQuantity(quantity);
                          return;
                        }
                        setQuantity(value);
                      }}
                      classNames={{
                        base: 'w-fit',
                        input: 'text-center min-w-12 max-w-12',
                      }}
                    />
                    <Button
                      variant="bordered"
                      radius="full"
                      size="sm"
                      isDisabled={quantity === product?.totalStock}
                      isIconOnly
                      startContent={
                        <PlusIcon
                          size={20}
                          className="min-w-5 max-w-5 min-h-5 max-h-5"
                        />
                      }
                      onPress={() => setQuantity((prevState) => prevState + 1)}
                    />
                  </div>
                  <Button
                    variant="shadow"
                    color="primary"
                    size="md"
                    radius="md"
                    className="shadow-md"
                  >
                    <MessageCircleIcon
                      size={20}
                      className="text-gray-50 min-w-5 max-w-5 min-h-5 max-h-5"
                    />
                    <p className="text-gray-50 font-medium">
                      Estou interessado
                    </p>
                  </Button>
                </div>
              </div>
            </aside>
          </div>

          <Divider />

          <ListProducts
            className="lg:w-full"
            topContent={
              <h1 className="text-2xl font-semibold">
                Você também pode gostar
              </h1>
            }
            products={products.filter(
              (p) =>
                product?.category &&
                p.category
                  .toLowerCase()
                  .includes(product?.category.toLowerCase()),
            )}
            loadingState={isLoading}
            remove={deleteProduct}
            onOpenEdit={() => {}}
          />
        </Card>
      </section>
      <ModalDelete
        isOpen={isOpen && !!selectedProductId}
        title="Excluir produto"
        message="Tem certeza que deseja excluir esse produto?"
        onClose={onClose}
        onContinue={() => {
          selectedProductId && handleDeleteProduct?.(selectedProductId);
        }}
      />
    </>
  );
}
