import { IFilterProducts, queryKeysProduct, searchProductQuery } from "@/common/queries/get-products.query";
import { FilterProducts } from "@/components/ui/FilterProducts";
import { useAuthentication } from "@/hooks/use-authentication.hook";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useQuery } from "@tanstack/react-query";
import { PlusCircle, Search } from "lucide-react";
import { useState } from "react";

export const MyProductsPage = () => {
  const { user } = useAuthentication();
  const [filterProducts, setFilterProducts] = useState<IFilterProducts>({seller_id: user?.id});

  const { data: products, isLoading, refetch } = useQuery({
    queryKey: [
      queryKeysProduct.get_list_products + "my",
      filterProducts,
    ],
    queryFn: async () => {
      const enterpriseResponse = await searchProductQuery(filterProducts);

      return Array.isArray(enterpriseResponse.products) ? enterpriseResponse.products : [];
    },
  });

  const clearSubject = () => {
    setFilterProducts?.({ ...filterProducts, subject: undefined });
  };
  
  return (
    <section className="flex flex-col gap-4 m-4">
      <div className="flex gap-2 justify-between">
        <div className="flex gap-2">
          <Input
            isClearable
            placeholder="Pesquisar por nome"
            startContent={<Search className="h-5 w-5 opacity-50" />}
            variant="bordered"
            type="text"
            aria-label="Pesquisa por produto"
            value={filterProducts?.subject}
            onChange={(e) =>{
              console.log(e.target.value)
              setFilterProducts?.({ ...filterProducts, subject: e.target.value })}
            }
            onClear={clearSubject}
          />
          <FilterProducts 
            filterProducts={filterProducts}
            setFilterProducts={setFilterProducts} 
          />
        </div>
        <Button
          type="button"
          color="success"
          variant="shadow"
          startContent={<PlusCircle className="h-5 w-5" />}
          className="text-white"
        >
          Adicionar Produto
        </Button>
      </div>

      <div className="flex gap-4 flex-wrap">
        {JSON.stringify(products)}
      </div>
    </section>
  );
};
