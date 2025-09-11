import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "../components/layouts/AdminLayout";
import Dashboard from "../pages/Dashboard";
import ProductsPage from "../pages/ProductsPage";
import CategoriesPage from "../pages/CategoriesPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="categories" element={<CategoriesPage />} />
      </Route>
    </Routes>
  );
}
