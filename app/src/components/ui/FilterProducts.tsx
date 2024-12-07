import { IFilterProducts } from "@/common/queries/get-products.query";
import { Autocomplete, AutocompleteItem, Button, Input, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { Box, ChartBar, DollarSign, Filter } from "lucide-react";

interface FilterProductsProps {
    filterProducts: IFilterProducts;
    setFilterProducts: (filter: IFilterProducts) => void;
}

export function FilterProducts({ filterProducts, setFilterProducts }: FilterProductsProps) {
    return (
        <Popover showArrow offset={10} placement="bottom">
            <PopoverTrigger>
                <Button
                    variant="flat"
                    isIconOnly
                    startContent={<Filter className="h-5 w-5" />}
                    className="bg-default-900 text-default-50"
                />
            </PopoverTrigger>
            <PopoverContent className="w-[400px] max-md:w-full">
                {(titleProps) => (
                    <div className="px-1 py-2 w-full">
                        <p className="text-small font-bold text-foreground" {...titleProps}>
                            Filtros
                        </p>
                        <div className="mt-2 flex flex-col gap-2 w-full">
                            <Autocomplete 
                                size="sm" 
                                label="Selecione uma categoria" 
                                startContent={<ChartBar className="h-5 w-5" />}
                                defaultSelectedKey={filterProducts?.category}
                                onSelectionChange={(category) => {
                                    console.log(category)
                                    setFilterProducts?.({ ...filterProducts, category: category?.toString() })
                                }}
                            >
                                <AutocompleteItem key={"Moda Masculina"} value={"Moda Masculina"}>Moda Masculina</AutocompleteItem>
                                <AutocompleteItem key={"Moda Feminina"} value={"Moda Feminina"}>Moda Feminina</AutocompleteItem>
                                <AutocompleteItem key={"Esporte"} value={"Esporte"}>Esporte</AutocompleteItem>
                                <AutocompleteItem key={"Tecnologia"} value={"Tecnologia"}>Tecnologia</AutocompleteItem>
                                <AutocompleteItem key={"Veículos"} value={"Veículos"}>Veículos</AutocompleteItem>
                                <AutocompleteItem key={"Mobília"} value={"Mobília"}>Mobília</AutocompleteItem>
                            </Autocomplete>
                            <div className="flex gap-2">
                                <Input
                                    size="sm"
                                    type="number"
                                    variant="bordered"
                                    label="Preço mínimo"
                                    min={0}
                                    startContent={<DollarSign className="h-5 w-5" />}
                                    value={filterProducts?.min_price?.toString()}
                                    onChange={(e) => {
                                        const value = Number(e.target.value);
                                        setFilterProducts?.({ ...filterProducts, min_price: value > 0 ? value : undefined });
                                    }}
                                />
                                <Input
                                    size="sm"
                                    type="number"
                                    variant="bordered"
                                    label="Preço máximo"
                                    min={0}
                                    startContent={<DollarSign className="h-5 w-5" />}
                                    value={filterProducts?.max_price?.toString()}
                                    onChange={(e) => {
                                        const value = Number(e.target.value);
                                        setFilterProducts?.({ ...filterProducts, max_price: value > 0 ? value : undefined });
                                    }}
                                />
                            </div>
                            <div className="flex gap-2">
                                <Input
                                    size="sm"
                                    type="number"
                                    variant="bordered"
                                    label="Quantidade mínima"
                                    min={0}
                                    startContent={<Box className="h-5 w-5" />}
                                    value={filterProducts?.min_quantity?.toString()}
                                    onChange={(e) => {
                                        const value = Number(e.target.value);
                                        setFilterProducts?.({ ...filterProducts, min_quantity: value > 0 ? value : undefined });
                                    }}
                                />
                                <Input
                                    size="sm"
                                    type="number"
                                    variant="bordered"
                                    label="Quantidade máxima"
                                    min={0}
                                    startContent={<Box className="h-5 w-5" />}
                                    value={filterProducts?.max_quantity?.toString()}
                                    onChange={(e) => {
                                        const value = Number(e.target.value);
                                        setFilterProducts?.({ ...filterProducts, max_quantity: value > 0 ? value : undefined });
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    );
}