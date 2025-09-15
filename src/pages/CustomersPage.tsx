import { useEffect, useState } from "react";
import CustomerForm from "../components/customers/CustomerForm";
import CustomerTable from "../components/customers/CustomerTable";
import { useCustomers } from "../hooks/useCustomers";
import type { Customer } from "../types/customer";

export default function CustomersPage() {
  const {
    customers,
    fetchCustomers,
    addCustomer,
    editCustomer,
    removeCustomer,
    loading,
  } = useCustomers();

  const [showForm, setShowForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleAdd = () => {
    setEditingCustomer(null);
    setShowForm(true);
  };

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer);
    setShowForm(true);
  };

  const handleSubmit = async (data: Omit<Customer, "id">) => {
    if (editingCustomer) {
      await editCustomer(editingCustomer.id, data);
    } else {
      await addCustomer(data);
    }
    setShowForm(false);
    setEditingCustomer(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingCustomer(null);
  };

  if (loading) return <p className="text-center mt-8">Cargando...</p>;

  return (
    <div className="rounded-lg px-4 py-6 min-h-screen bg-transparent">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-purple-700 dark:text-purple-400">
          Clientes
        </h1>
        {!showForm && (
          <button
            onClick={handleAdd}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
          >
            + Nuevo cliente
          </button>
        )}
      </header>
      {showForm ? (
        <CustomerForm
          customer={editingCustomer ?? undefined}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      ) : (
        <CustomerTable
          customers={customers}
          onEdit={handleEdit}
          onDelete={removeCustomer}
        />
      )}
    </div>
  );
}
