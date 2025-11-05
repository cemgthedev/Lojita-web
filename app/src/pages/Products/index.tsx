import { useProducts } from '@/hooks/use-products.hook';
import { IFilterProducts } from '@/providers/Products.provider';
import { Button } from '@heroui/button';
import { Divider } from '@heroui/divider';
import { Tab, Tabs } from '@heroui/tabs';
import { CirclePlusIcon } from 'lucide-react';
import { ListProducts } from './components/list';
import { SearchProduct } from './components/search';
import { TableProducts } from './components/table';

export default function ProductsPage() {
  const {
    products,
    searchProduct,
    filterProducts,
    setFilterProducts,
    isLoading,
    setIsLoading,
    deleteProduct,
  } = useProducts();

  const handleFilterProduct = async (filterProducts: IFilterProducts) => {
    setIsLoading(true);
    await searchProduct(filterProducts);
    setIsLoading(false);
  };

  return (
    <section className="flex flex-col items-center gap-4">
      <div className="relative w-full flex flex-col">
        <Button
          variant="shadow"
          color="success"
          size="md"
          radius="md"
          className="w-fit hidden mb-4 ml-auto shadow-sm sm:flex sm:absolute sm:top-0 sm:right-0"
        >
          <CirclePlusIcon
            size={20}
            className="text-gray-50 min-w-5 max-w-5 min-h-5 max-h-5"
          />
          <p className="text-gray-50 font-medium">Adicionar Produto</p>
        </Button>
        <Tabs aria-label="Options" color="secondary">
          <Tab title="Visualização em Tabela" key="table-view">
            <div className="w-full flex flex-col items-center">
              <TableProducts
                topContent={
                  <div className="flex flex-col md:flex-row gap-4 justify-between md:items-end">
                    <Button
                      variant="shadow"
                      color="success"
                      size="md"
                      radius="md"
                      className="w-full shadow-sm sm:hidden"
                    >
                      <CirclePlusIcon
                        size={20}
                        className="text-gray-50 min-w-5 max-w-5 min-h-5 max-h-5"
                      />
                      <p className="text-gray-50 font-medium">
                        Adicionar Produto
                      </p>
                    </Button>
                    <div className="flex flex-col min-w-56">
                      <h1 className="text-xl font-semibold">Produtos</h1>
                      <p>
                        {products.length === 0
                          ? 'Nenhum produto encontrado'
                          : products.length === 1
                            ? `${products.length} produto encontrado`
                            : `${products.length} produtos encontrados`}
                      </p>
                    </div>
                    <SearchProduct
                      filterProducts={filterProducts}
                      setFilterProducts={setFilterProducts}
                      searchProduct={handleFilterProduct}
                    />
                  </div>
                }
                products={products}
                loadingState={isLoading}
                remove={deleteProduct}
                onOpenEdit={() => {}}
              />
            </div>
          </Tab>
          <Tab title="Visualização em Lista" key="list-view">
            <div className="w-full flex flex-col items-center">
              <ListProducts
                topContent={
                  <>
                    <div className="flex flex-col md:flex-row gap-4 justify-between md:items-end">
                      <Button
                        variant="shadow"
                        color="success"
                        size="md"
                        radius="md"
                        className="w-full shadow-sm sm:hidden"
                      >
                        <CirclePlusIcon
                          size={20}
                          className="text-gray-50 min-w-5 max-w-5 min-h-5 max-h-5"
                        />
                        <p className="text-gray-50 font-medium">
                          Adicionar Produto
                        </p>
                      </Button>
                      <div className="flex flex-col min-w-56">
                        <h1 className="text-xl font-semibold">Produtos</h1>
                        <p>
                          {products.length === 1
                            ? `${products.length} produto encontrado`
                            : products.length === 0
                              ? 'Nenhum produto encontrado'
                              : `${products.length} produtos encontrados`}
                        </p>
                      </div>
                      <SearchProduct
                        filterProducts={filterProducts}
                        setFilterProducts={setFilterProducts}
                        searchProduct={handleFilterProduct}
                      />
                    </div>
                    <Divider />
                  </>
                }
                products={products}
                loadingState={isLoading}
                remove={deleteProduct}
                onOpenEdit={() => {}}
              />
            </div>
          </Tab>
        </Tabs>
      </div>
    </section>
  );
}
