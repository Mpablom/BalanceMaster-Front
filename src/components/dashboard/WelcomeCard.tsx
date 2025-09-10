import { Card, CardContent } from "../ui/card";

interface Props {
  totalSales: number;
  totalPurchases: number;
}

export default function WelcomeCard({ totalSales, totalPurchases }: Props) {
  return (
    <Card className="col-span-3 lg:col-span-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white shadow-lg">
      <CardContent className="p-6 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Bienvenido 👋</h2>
          <p className="text-lg opacity-90 text-black">BalanceMaster POS</p>
        </div>
        <div className="flex flex-col items-end text-gray-500">
          <span className="text-3xl font-extrabold">
            Ventas 💰 ${totalSales}
          </span>
          <span className="text-2xl font-semibold mt-1">
            Compras 🛒 ${totalPurchases}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
