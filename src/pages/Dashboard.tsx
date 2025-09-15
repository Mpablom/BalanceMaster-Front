import { Card } from "../components/ui/card";
import CardContent from "../components/ui/card/CardContent";
import { useLowStock } from "../hooks/useLowStock";
import { useTotalSales } from "../hooks/useTotalSales";
import { useTotalPurchases } from "../hooks/useTotalPurchase";
import { useSalesChart } from "../hooks/useSalesChart";
import { usePurchasesChart } from "../hooks/usePurchasesChart";
import { useCategories } from "../hooks/useCategories";
import { useProducts } from "../hooks/useProducts";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useEffect } from "react";

const COLORS = ["#6366F1", "#10B981", "#F59E0B", "#F43F5E"];

export default function Dashboard() {
  const { items: lowStockItems } = useLowStock();
  const { products, fetchProducts } = useProducts();
  const { total: totalSales } = useTotalSales();
  const { total: totalPurchases } = useTotalPurchases();
  const { data: salesData } = useSalesChart();
  const { data: purchaseData } = usePurchasesChart();
  const { categories, fetchCategories } = useCategories();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const daysMap: Record<string, string> = {
    Mon: "Lun",
    Tue: "Mar",
    Wed: "Mié",
    Thu: "Jue",
    Fri: "Vie",
    Sat: "Sáb",
    Sun: "Dom",
  };

  const salesVsPurchases =
    salesData?.map((s) => {
      const compra = purchaseData?.find((p) => p.day === s.day)?.sales || 0;
      return {
        name: daysMap[s.day] || s.day,
        ventas: s.sales,
        compras: compra,
      };
    }) || [];

  const stockByCategory =
    categories?.map((c) => ({
      name: c.name,
      value: products
        .filter((p) => p.category?.id === c.id)
        .reduce((acc, p) => acc + (p.inventory?.quantity ?? 0), 0),
    })) || [];

  return (
    <div
      className="space-y-6 px-4 py-6 bg-transparent min-h-screen
"
    >
      {/*  Bienvenida */}
      <div>
        <h1 className="text-2xl font-bold">Bienvenido 👋</h1>
        <p className="text-gray-400">
          Revisa tus ventas, compras y productos críticos de un vistazo.
        </p>
        <p className="text-sm text-gray-500">
          {new Date().toLocaleDateString("es-AR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="p-4">
          <h3 className="text-slate-600 text-lg font-semibold mb-2">
            💰 Ventas del mes
          </h3>
          <CardContent className="text-green-500 text-2xl font-bold">
            ${totalSales}
          </CardContent>
        </Card>

        <Card className="p-4">
          <h3 className="text-slate-600 text-lg font-semibold mb-2">
            🛒 Compras del mes
          </h3>
          <CardContent className="text-blue-500 text-2xl font-bold">
            ${totalPurchases}
          </CardContent>
        </Card>

        <Card className="p-4">
          <h3 className="text-slate-600 text-lg font-semibold mb-2">
            ⚠️ Productos críticos
          </h3>
          <CardContent className="text-red-500 text-2xl font-bold">
            {lowStockItems.length}
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Ventas vs Compras */}
        <Card className="p-4">
          <h3 className="text-center text-slate-600 text-lg font-semibold mb-4">
            Compras y ventas semanales
          </h3>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesVsPurchases}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="ventas" fill="#10B981" />
                <Bar dataKey="compras" fill="#6366F1" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Stock por categoría */}

        <Card className="p-4">
          <h3 className="text-center text-slate-600 text-lg font-semibold mb-4">
            Stock por categoría
          </h3>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stockByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={
                    window.innerWidth >= 640
                      ? ({ name, percent = 0 }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                      : undefined
                  }
                  outerRadius={window.innerWidth < 640 ? 100 : 100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {stockByCategory.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            {window.innerWidth < 920 && (
              <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm text-gray-700">
                {stockByCategory.map((c, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1 px-2 py-1 rounded-xl"
                    style={{
                      backgroundColor: COLORS[i % COLORS.length],
                      color: "#fff",
                    }}
                  >
                    <span className="text-gray-300 font-semibold">
                      {c.name}
                    </span>
                    <span className="text-gray-300 font-semibold">
                      {(
                        (c.value /
                          stockByCategory.reduce((a, p) => a + p.value, 0)) *
                        100
                      ).toFixed(0)}
                      %
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Productos críticos */}
      <Card className="p-4">
        <h3 className="text-red-400 text-lg font-semibold mb-4">
          Productos críticos
        </h3>
        <CardContent>
          {lowStockItems.length === 0 ? (
            <p className="text-sm text-gray-800">
              No hay productos críticos 🎉
            </p>
          ) : (
            <ul className="divide-y">
              {lowStockItems.slice(0, 5).map((item, i) => (
                <li
                  key={i}
                  className="flex justify-between py-2 text-red-600 font-medium"
                >
                  <span className="font-semibold text-gray-600">
                    {item.name}
                  </span>
                  <span className="font-semibold text-gray-600">
                    {item.stock} en stock
                  </span>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-2 text-right">
            <a
              href="/products"
              className="text-sm text-purple-600 hover:underline"
            >
              Ver todos los productos
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
