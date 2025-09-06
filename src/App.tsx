import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/layouts/Sidebar";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/ProductsPage";
import ThemeToggle from "./components/ThemeToggle";

export default function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-background dark:bg-background-darx text-foreground-light dark:text-foreground-dark transition-colors duration-300">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-[#e4e4e4]">
          <ThemeToggle />
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
