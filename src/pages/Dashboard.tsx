import WelcomeCard from "../components/dashboard/WelcomeCard";
import SalesChart from "../components/dashboard/SalesChart";
import LowStockList from "../components/dashboard/LowStockList";
import { Card, CardContent } from "../components/ui/card";
import ThemeToggle from "../components/ThemeToggle";

const salesData = [
  { day: "Lun", sales: 120 },
  { day: "Mar", sales: 200 },
  { day: "Mié", sales: 150 },
  { day: "Jue", sales: 300 },
  { day: "Vie", sales: 250 },
];

const lowStock = [
  { name: "Coca Cola 500ml", stock: 3 },
  { name: "Fideos Spaghetti", stock: 1 },
  { name: "Aceite Girasol", stock: 2 },
];

export default function Dashboard() {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4 min-h-screen">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <ThemeToggle />
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Welcome Card */}
        <WelcomeCard total={12540} />

        {/* Ventas de la semana */}
        <Card className="md:col-span-2 shadow-md">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-purple-700 dark:text-purple-300">
              📊 Ventas de la semana
            </h3>
            <div className="h-64">
              {" "}
              {/* Altura fija para Recharts */}
              <SalesChart data={salesData} />
            </div>
          </CardContent>
        </Card>

        {/* Stock bajo */}
        <Card className="shadow-md">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-red-500">
              ⚠️ Stock bajo
            </h3>
            <LowStockList items={lowStock} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
