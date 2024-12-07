
import { TProduct } from "@/types/TProduct";
import {
    Button,
    Card,
    CardBody,
    Image,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader
} from "@nextui-org/react";
import { MessageCircle, MinusCircle, PlusCircle } from "lucide-react";
import { useState } from "react";

interface InfoProductProps {
  isOpen: boolean;
  onOpenChange: () => void;
  item: TProduct;
}

export const InfoProduct = ({
  isOpen,
  onOpenChange,
  item
}: InfoProductProps) => {
  const [quantity, setQuantity] = useState(1);
  
  return (
    <>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange} 
        size="lg" 
        backdrop="blur"
      >
        <ModalContent>
            <ModalHeader className="flex flex-col gap-1">
                Detalhes de Produto
            </ModalHeader>

            <ModalBody>
                <Card shadow="none" classNames={{body: "bg-none px-0 pt-0 gap-3"}}>
                <CardBody>
                    <div className="border-1 border-default-800 rounded-lg flex justify-center overflow-auto">
                        <Image
                            alt="Imagem do produto"
                            fallbackSrc={"/image-off.svg"}
                            height={216}
                            src={item.image_url}
                            width={256}
                            className="w-[256px] h-[216px]"
                        />
                    </div>
                    <div className="flex flex-col px-4">
                        <div className="flex gap-1 justify-between">
                            <p className="line-clamp-2 text-xl font-semibold">{item.title}</p>
                            <p>{item.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
                        </div>
                        <p className="text-purple-600 font-semibold">{item.category}</p>
                        <p>{item.description}</p>
                    </div>
                    <div className="px-4 flex gap-2 justify-between">
                        <div className="flex flex-col gap-2">
                            <p className="text-lg font-semibold">Quantidade desejada</p>
                            <div className="flex gap-2">
                                <Button
                                    type="button"
                                    variant="flat"
                                    isIconOnly
                                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                                    startContent={<MinusCircle className="h-5 w-5" />}
                                    className="bg-background rounded-full border-1 border-default-800"
                                />
                                <div className="flex items-center py-1 px-2 rounded-md border-1 border-default-800">
                                    <p>{quantity}</p>
                                </div>
                                <Button
                                    type="button"
                                    variant="flat"
                                    isIconOnly
                                    onClick={() => setQuantity(quantity + 1)}
                                    startContent={<PlusCircle className="h-5 w-5" />}
                                    className="bg-background rounded-full border-1 border-default-800"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 items-end">
                            <p>{item.quantity} em estoque</p>
                            <Button
                                fullWidth
                                type="button"
                                color="primary"
                                variant="shadow"
                                startContent={<MessageCircle className="h-5 w-5" />}
                            >
                                Estou interessado
                            </Button>
                        </div>
                    </div>
                </CardBody>
                </Card>
            </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};