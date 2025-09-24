import type { SupplierAccount } from "../../types/supplierAccount";
import type { Supplier } from "../../types/supplier";
import { Button } from "../ui/Button";

interface Props {
  accounts: SupplierAccount[];
  suppliers: Supplier[];
  onEdit: (acc: SupplierAccount) => void;
  onDelete: (id: number) => void;
}

export default function SupplierAccountTable({
  accounts,
  suppliers,
  onEdit,
  onDelete,
}: Props) {
  return (
    <>
      {/* Mobile: cards */}
      <div className="grid gap-4 sm:hidden">
        {accounts.map((acc) => {
          const supplier = suppliers.find((s) => s.id === acc.supplierId);
          return (
            <div
              key={acc.id}
              className="bg-gray-100 dark:bg-gray-200 p-4 rounded-xl shadow"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-purple-700 dark:text-purple-800">
                  {supplier?.name ?? "-"}
                </span>
              </div>
              <div className="text-sm space-y-1">
                <p>Balance: {acc.balance}</p>
              </div>
              <div className="flex gap-2 mt-2">
                <Button size="sm" onClick={() => onEdit(acc)}>
                  Editar
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onDelete(acc.id)}
                >
                  Eliminar
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop: table */}
      <div className="hidden sm:block overflow-x-auto rounded-xl">
        <table className="w-full text-left border-collapse rounded-lg shadow-2xl">
          <thead>
            <tr className="bg-purple-900 text-white">
              <th className="p-2">Proveedor</th>
              <th className="p-2">Balance</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((acc) => {
              const supplier = suppliers.find((s) => s.id === acc.supplierId);
              return (
                <tr
                  key={acc.id}
                  className="bg-[#f1f1f1] hover:bg-gray-300 text-gray-900"
                >
                  <td className="p-2 font-semibold">{supplier?.name ?? "-"}</td>
                  <td className="p-2">{acc.balance}</td>
                  <td className="p-2 space-x-2">
                    <Button size="sm" onClick={() => onEdit(acc)}>
                      Editar
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => onDelete(acc.id)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
