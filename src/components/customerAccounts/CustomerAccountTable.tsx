import type { CustomerAccount } from "../../types/customerAccount";
import type { Customer } from "../../types/customer";

interface Props {
  accounts: CustomerAccount[];
  customers: Customer[];
  onEdit: (account: CustomerAccount) => void;
  onDelete: (id: number) => void;
}

export default function CustomerAccountTable({
  accounts,
  customers,
  onEdit,
  onDelete,
}: Props) {
  return (
    <>
      <div className="grid gap-4 sm:hidden">
        {accounts.map((a) => (
          <div
            key={a.id}
            className="bg-gray-100 dark:bg-gray-200 p-4 rounded-xl shadow"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-purple-700 dark:text-purple-800">
                {customers.find((c) => c.id === a.customerId)?.name ?? "-"}
              </span>
            </div>
            <div className="text-sm space-y-1">
              <p>Balance: {a.balance}</p>
              <p>Crédito disponible: {a.availableCredit}</p>
            </div>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => onEdit(a)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
              >
                Editar
              </button>
              <button
                onClick={() => onDelete(a.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden sm:block overflow-x-auto rounded-xl">
        <table className="w-full text-left border-collapse rounded-lg shadow-2xl">
          <thead>
            <tr className="bg-purple-900 text-white">
              <th className="p-2">Cliente</th>
              <th className="p-2">Balance</th>
              <th className="p-2">Crédito disponible</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((a) => (
              <tr
                key={a.id}
                className="bg-[#f1f1f1] hover:bg-gray-300 text-gray-900"
              >
                <td className="p-2 font-semibold">
                  {customers.find((c) => c.id === a.customerId)?.name ?? "-"}
                </td>
                <td className="p-2">{a.balance}</td>
                <td className="p-2">{a.availableCredit}</td>
                <td className="p-2 space-x-2">
                  <button
                    onClick={() => onEdit(a)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onDelete(a.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
