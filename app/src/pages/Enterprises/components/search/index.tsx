import { IFilterEnterprises } from "@/common/queries/get-enterprises.query";
import { Input } from "@nextui-org/react";
import { Search } from "lucide-react";

interface SearchProps {
  // Filters
  filterEnterprises?: IFilterEnterprises;
  setFilterEnterprises?: (filter: IFilterEnterprises) => void;
}

export const SearchEnterprise = ({ filterEnterprises, setFilterEnterprises }: SearchProps) => {
  const clearName = () => {
    setFilterEnterprises?.({ ...filterEnterprises, name: undefined });
  };

  const clearDocument = () => {
    setFilterEnterprises?.({ ...filterEnterprises, document: undefined });
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex gap-2 max-md:flex-wrap">
        <Input
          isClearable
          placeholder="Pesquisar por nome"
          startContent={<Search className="h-5 w-5 opacity-50" />}
          variant="bordered"
          type="text"
          aria-label="Pesquisa por nome"
          value={filterEnterprises?.name}
          onChange={(e) =>{
            console.log(e.target.value)
            setFilterEnterprises?.({ ...filterEnterprises, name: e.target.value })}
          }
          onClear={clearName}
        />
        <Input
          isClearable
          placeholder="Pesquisar por CPF/CNPJ"
          startContent={<Search className="h-5 w-5 opacity-50" />}
          variant="bordered"
          type="text"
          aria-label="Pesquisar por CPF/CNPJ"
          value={filterEnterprises?.document}
          onChange={(e) =>
            setFilterEnterprises?.({ ...filterEnterprises, document: e.target.value })
          }
          onClear={clearDocument}
        />
      </div>
    </div>
  );
};