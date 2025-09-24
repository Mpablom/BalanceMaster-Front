import { useState, useEffect } from "react";
import CustomerAccountForm from "../components/customerAccounts/CustomerAccountForm";
import CustomerAccountTable from "../components/customerAccounts/CustomerAccountTable";
import { useCustomerAccounts } from "../hooks/useCustomerAccounts";
import { useCustomers } from "../hooks/useCustomers";
import type { CustomerAccount } from "../types/customerAccount";

export default function CustomerAccountPage() {
  const {
    accounts,
    loading,
    fetchAccounts,
    addAccount,
    updateAccount,
    removeAccount,
  } = useCustomerAccounts();
  const {
    customers,
    loading: loadingCustomers,
    fetchCustomers,
  } = useCustomers();

  const [showForm, setShowForm] = useState(false);
  const [editingAccount, setEditingAccount] = useState<CustomerAccount | null>(
    null,
  );

  useEffect(() => {
    fetchAccounts();
    fetchCustomers();
  }, []);

  const handleAdd = () => {
    setEditingAccount(null);
    setShowForm(true);
  };
  const handleEdit = (account: CustomerAccount) => {
    setEditingAccount(account);
    setShowForm(true);
  };
  const handleCancel = () => {
    setShowForm(false);
    setEditingAccount(null);
  };

  const handleSubmit = async (data: Omit<CustomerAccount, "id">) => {
    if (editingAccount) await updateAccount(editingAccount.id, data);
    else await addAccount(data);
    setShowForm(false);
    setEditingAccount(null);
  };

  if (loading || loadingCustomers) return <p>Cargando...</p>;

  return (
    <div className="rounded-lg px-4 py-6 min-h-screen bg-transparent">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-purple-700 dark:text-purple-400">
          Cuentas de Clientes
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
        <CustomerAccountForm
          account={editingAccount ?? undefined}
          customers={customers}
          loadingCustomers={loadingCustomers}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      ) : (
        <CustomerAccountTable
          accounts={accounts}
          customers={customers}
          onEdit={handleEdit}
          onDelete={removeAccount}
        />
      )}
    </div>
  );
}
