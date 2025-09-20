import { useState } from "react";
import type {
  CustomerAccount,
  CustomerAccountRequest,
} from "../types/customerAccount";
import {
  listCustomerAccounts,
  createCustomerAccount,
  editCustomerAccount,
  deleteCustomerAccount,
} from "../api/customerAccounts";

export function useCustomerAccounts() {
  const [accounts, setAccounts] = useState<CustomerAccount[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const data = await listCustomerAccounts();
      setAccounts(data ?? []);
    } finally {
      setLoading(false);
    }
  };

  const addAccount = async (account: CustomerAccountRequest) => {
    const data = await createCustomerAccount(account);
    setAccounts((prev) => [...prev, data]);
  };

  const updateAccount = async (id: number, account: CustomerAccountRequest) => {
    const data = await editCustomerAccount(id, account);
    setAccounts((prev) => prev.map((a) => (a.id === id ? data : a)));
  };

  const removeAccount = async (id: number) => {
    await deleteCustomerAccount(id);
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
