import WelcomeCard from "../components/dashboard/WelcomeCard";
import SalesChart from "../components/dashboard/SalesChart";
import LowStockList from "../components/dashboard/LowStockList";
import { Card, CardContent } from "../components/ui/card";
import ThemeToggle from "../components/ThemeToggle";
import { useLowStock } from "../hooks/useLowStock";
import { useSalesChart } from "../hooks/useSalesChart";
import { useTotalSales } from "../hooks/useTotalSales";
import { useTotalPurchases } from "../hooks/useTotalPurchase";
import { usePurchasesChart } from "../hooks/usePurchasesChart";

export default function Dashboard() {
  const { items: lowStock, loading: loadingStock } = useLowStock();
  const { data: dailySales, loading: loadingSales } = useSalesChart();
  const { data: dailyPurchases, loading: loadingPurchasesChart } =
    usePurchasesChart();
  const { total: totalSales, loading: loadingTotalSales } = useTotalSales();
  const { total: totalPurchases, loading: loadingPurchases } =
    useTotalPurchases();

  if (
    loadingStock ||
    loadingSales ||
    loadingTotalSales ||
    loadingPurchases ||
    loadingPurchasesChart
  )
    return <p className="text-center mt-20 text-lg">Cargando...</p>;

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4 min-h-screen rounded-lg">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <ThemeToggle />
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <WelcomeCard totalSales={totalSales} totalPurchases={totalPurchases} />

        <Card className="md:col-span-2 shadow-md">
          <CardContent className="p-4 md:p-6">
            <h3 className="text-lg font-semibold mb-4 text-purple-700 dark:text-purple-500">
              📊 Ventas de la semana
            </h3>
            <div className="h-64 md:h-80 w-full">
              <SalesChart data={dailySales} />
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 shadow-md">
          <CardContent className="p-4 md:p-6">
            <h3 className="text-lg font-semibold mb-4 text-purple-700 dark:text-purple-500">
              🛒 Compras de la semana
            </h3>
            <div className="h-64 md:h-80 w-full">
              <SalesChart data={dailyPurchases} />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg md:col-span-3">
          <CardContent className="p-4 md:p-6">
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
