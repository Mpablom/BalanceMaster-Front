import { useState } from "react";
import type {
  SupplierAccount,
  SupplierAccountRequest,
} from "../types/supplierAccount";
import {
  listSupplierAccounts,
  createSupplierAccount,
  editSupplierAccount,
  deleteSupplierAccount,
} from "../api/supplierAccounts";

export function useSupplierAccounts() {
  const [accounts, setAccounts] = useState<SupplierAccount[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const data = await listSupplierAccounts();
      setAccounts(data ?? []);
    } finally {
      setLoading(false);
    }
  };

  const addAccount = async (account: SupplierAccountRequest) => {
    const data = await createSupplierAccount(account);
    setAccounts((prev) => [...prev, data]);
  };

  const updateAccount = async (id: number, account: SupplierAccountRequest) => {
    const data = await editSupplierAccount(id, account);
    setAccounts((prev) => prev.map((a) => (a.id === id ? data : a)));
  };

  const removeAccount = async (id: number) => {
    await deleteSupplierAccount(id);
    setAccounts((prev) => prev.filter((a) => a.id !== id));
  };

  return {
    accounts,
    loading,
    fetchAccounts,
    addAccount,
    updateAccount,
    removeAccount,
  };
}
