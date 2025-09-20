import { useState, useEffect } from "react";
import SupplierAccountForm from "../components/supplierAccounts/SupplierAccountForm";
import SupplierAccountTable from "../components/supplierAccounts/SupplierAccountTable";
import { useSupplierAccounts } from "../hooks/useSupplierAccounts";
import type { SupplierAccount } from "../types/supplierAccount";
import { useSuppliers } from "../hooks/useSuppliers";

export default function SupplierAccountsPage() {
  const {
    accounts,
    fetchAccounts,
    addAccount,
    updateAccount,
    removeAccount,
    loading,
  } = useSupplierAccounts();
  const { suppliers, loading: loadingSuppliers } = useSuppliers();

  const [showForm, setShowForm] = useState(false);
  const [editingAccount, setEditingAccount] = useState<SupplierAccount | null>(
    null,
  );

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleAdd = () => {
    setEditingAccount(null);
    setShowForm(true);
  };

  const handleEdit = (account: SupplierAccount) => {
    setEditingAccount(account);
    setShowForm(true);
  };

  const handleSubmit = async (data: Omit<SupplierAccount, "id">) => {
    if (editingAccount) {
      await updateAccount(editingAccount.id, data);
    } else {
      await addAccount(data);
    }
    setShowForm(false);
    setEditingAccount(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingAccount(null);
  };

  if (loading || loadingSuppliers) return <p>Cargando...</p>;

  return (
    <div className="rounded-lg px-4 py-6 min-h-screen bg-transparent">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-purple-700 dark:text-purple-400">
          Cuentas de Proveedores
        </h1>
        {!showForm && (
          <button
            onClick={handleAdd}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
          >
            + Nueva Cuenta
          </button>
        )}
      </header>

      {showForm ? (
        <SupplierAccountForm
          account={editingAccount ?? undefined}
          suppliers={suppliers}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      ) : (
        <SupplierAccountTable
          accounts={accounts}
          suppliers={suppliers}
          onEdit={handleEdit}
          onDelete={removeAccount}
        />
      )}
    </div>
  );
}
