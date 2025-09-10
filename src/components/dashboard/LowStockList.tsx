import { Card, CardContent } from "../ui/card";

interface Props {
  items: { name: string; stock: number }[];
}

export default function LowStockList({ items }: Props) {
  return (
    <Card className="shadow-none">
      <CardContent className="p-6">
        <ul className="space-y-2">
          {items.map((p, i) => (
            <li
              key={i}
              className="flex justify-between border-b pb-1 dark:border-gray-900"
            >
              <span className="font-bold dark:text-red-600">{p.name}</span>
              <span className="font-bold text-red-600">{p.stock}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
