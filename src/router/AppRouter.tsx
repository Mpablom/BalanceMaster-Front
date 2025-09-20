import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "../components/layouts/AdminLayout";
import Dashboard from "../pages/Dashboard";
import ProductsPage from "../pages/ProductsPage";
import CategoriesPage from "../pages/CategoriesPage";
import CustomersPage from "../pages/CustomersPage";
import SuppliersPage from "../pages/SuppliersPage";
import CustomerAccountsPage from "../pages/CustomerAccountPage";
import SupplierAccountsPage from "../pages/SupplierAccountsPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="customers" element={<CustomersPage />} />
        <Route path="suppliers" element={<SuppliersPage />} />
        <Route path="customer-accounts" element={<CustomerAccountsPage />} />
        <Route path="supplier-accounts" element={<SupplierAccountsPage />} />
      </Route>
    </Routes>
  );
}
