import { useState } from "react";
import type { CustomerAccount } from "../../types/customerAccount";
import type { Customer } from "../../types/customer";
import { Card, CardContent } from "../ui/card";

interface Props {
  account?: CustomerAccount;
  customers: Customer[];
  loadingCustomers: boolean;
  onSubmit: (data: Omit<CustomerAccount, "id">) => Promise<void>;
  onCancel: () => void;
}

export default function CustomerAccountForm({
  account,
  customers,
  loadingCustomers,
  onSubmit,
  onCancel,
}: Props) {
  const [form, setForm] = useState<Omit<CustomerAccount, "id">>({
    customerId: account?.customerId ?? 0,
    balance: account?.balance ?? 0,
    creditLimit: account?.creditLimit ?? 0,
    dueDate: account?.dueDate ?? "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "balance" || name === "creditLimit"
          ? parseFloat(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.customerId === 0) {
      alert("Debes seleccionar un cliente válido");
      return;
    }
    await onSubmit(form);
  };

  return (
    <Card
      title={account ? "Editar cuenta de cliente" : "Nueva cuenta de cliente"}
    >
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-900 dark:text-gray-700 font-semibold">
              Cliente
            </label>
            <select
              name="customerId"
              value={form.customerId}
              onChange={handleChange}
              disabled={loadingCustomers}
              className="mt-1 block w-full rounded-lg border-2 border-gray-300 dark:border-gray-600
                         focus:ring-2 focus:ring-purple-500 dark:bg-gray-200 dark:text-gray-700 h-10"
              required
            >
              <option value={0}>
                {loadingCustomers
                  ? "Cargando clientes..."
                  : "Seleccionar cliente"}
              </option>
              {customers.length === 0 && !loadingCustomers ? (
                <option disabled>No hay clientes disponibles</option>
              ) : (
                customers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))
              )}
            </select>
          </div>

          <div>
            <label className="block text-gray-900 dark:text-gray-700 font-semibold">
              Balance
            </label>
            <input
              type="number"
              name="balance"
              value={form.balance}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-2 border-gray-300 dark:border-gray-600
                         focus:ring-2 focus:ring-purple-500 dark:bg-gray-200 dark:text-gray-700 h-10"
            />
          </div>

          <div>
            <label className="block text-gray-900 dark:text-gray-700 font-semibold">
              Límite de crédito
            </label>
            <input
              type="number"
              name="creditLimit"
              value={form.creditLimit}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-2 border-gray-300 dark:border-gray-600
                         focus:ring-2 focus:ring-purple-500 dark:bg-gray-200 dark:text-gray-700 h-10"
            />
          </div>

          <div>
            <label className="block text-gray-900 dark:text-gray-700 font-semibold">
              Fecha de vencimiento
            </label>
            <input
              type="date"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-2 border-gray-300 dark:border-gray-600
                         focus:ring-2 focus:ring-purple-500 dark:bg-gray-200 dark:text-gray-700 h-10"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded shadow"
            >
              {account ? "Actualizar" : "Crear"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600
                         text-gray-900 dark:text-white px-4 py-2 rounded shadow"
            >
              Cancelar
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
