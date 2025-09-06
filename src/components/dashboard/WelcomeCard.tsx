import { Card, CardContent } from "../ui/card";

interface Props {
  total: number;
}

export default function WelcomeCard({ total }: Props) {
  return (
    <Card className="col-span-3 lg:col-span-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white shadow-lg">
      <CardContent className="p-6 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Bienvenido 👋</h2>
          <p className="text-lg opacity-90">BalanceMaster POS</p>
        </div>
        <div className="text-3xl font-extrabold">💰 ${total}</div>
      </CardContent>
    </Card>
  );
}
