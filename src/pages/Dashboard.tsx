import { Card, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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
    <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Resumen */}
      <Card className="col-span-1 lg:col-span-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white shadow-lg">
        <CardContent className="p-6 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold">Bienvenido 👋</h2>
            <p className="text-lg opacity-90">BalanceMaster POS</p>
          </div>
          <div className="text-5xl font-extrabold">💰 $12.540</div>
        </CardContent>
      </Card>

      {/* Gráfico de ventas */}
      <Card className="col-span-2 shadow-md">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">📊 Ventas de la semana</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={salesData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#a855f7" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Alertas de stock */}
      <Card className="shadow-md">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-red-500">
            ⚠️ Stock bajo
          </h3>
          <ul className="space-y-2">
            {lowStock.map((p, i) => (
              <li key={i} className="flex justify-between border-b pb-1">
                <span>{p.name}</span>
                <span className="font-bold text-red-600">{p.stock}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
