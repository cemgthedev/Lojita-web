import { PopoverDelete } from "@/components/ui/PopoverDelete";
import { TableCustom } from "@/components/ui/TableCustom";
import { TEnterprise } from "@/types/TEnterprise";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spinner,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  User
} from "@nextui-org/react";

import { EllipsisVertical, User2 } from "lucide-react";
import { Key } from "react";

interface TableProps {
  enterprises?: TEnterprise[];
  emptyContent?: string;
  loadingState?: boolean;
  topContent?: React.ReactNode;
  bottomContent?: React.ReactNode;
  // Events
  onOpenEdit?: (enterprise: TEnterprise) => void;
  remove?: (id: string) => void;
}

export const TableEnterprises = ({
  enterprises = [],
  emptyContent,
  loadingState = false,
  topContent,
  bottomContent,
  onOpenEdit,
  remove,
}: TableProps) => {
  const headerColumns = [
    {
      id: "name",
      label: "Empresa",
    },
    {
      id: "address",
      label: "Endereço",
    },
    {
      id: "permissionGroupId",
      label: "Função",
    },
    {
      id: "actions",
      label: "Ações",
    }
  ];

  const renderCell = (enterprise: TEnterprise, columnKey: Key) => {
    switch (columnKey) {
      case "name":
        return (
          <User
            name={enterprise.name}
            description={enterprise.email}
            avatarProps={{
              src: enterprise.avatarUrl,
              showFallback: true,
              fallback: <User2 className="h-5 w-5 text-default-700" />,
            }}
          />
        );
      case "address":
        return <p>{enterprise?.address?.name}</p>;
      case "actions":
        return (
          <div className="relative flex items-center justify-end gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <EllipsisVertical className="text-default-300" />
                </Button>
              </DropdownTrigger>

              <DropdownMenu aria-label="Dynamic Actions">
                <DropdownItem
                  key="edit"
                  hidden={!onOpenEdit}
                  onClick={() => onOpenEdit?.(enterprise)}
                >
                  Editar
                </DropdownItem>
                <DropdownItem isReadOnly key="remove" hidden={!remove}>
                  <PopoverDelete
                    onContinue={() => {remove?.(enterprise.id.toString())}}
                    message="Tem certeza de que deseja excluir? Deseja continuar?"
                  />
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
    }
  };

  return (
    <TableCustom
      aria-label="Table of users"
      topContent={topContent}
      bottomContent={bottomContent}
      isVirtualized
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.id}
            align={column.id === "actions" ? "center" : "start"}
            width={column.id === "actions" ? 10 : undefined}
            className="uppercase"
          >
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        emptyContent={emptyContent}
        isLoading={loadingState}
        loadingContent={
          <Spinner
            size="sm"
            classNames={{ base: "opacity-50 p-2 rounded-lg" }}
          />
        }
        items={enterprises}
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </TableCustom>
  );
};
