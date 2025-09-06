import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";

interface Props {
  data: { day: string; sales: number }[];
}

export default function SalesChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={100}>
      <BarChart data={data}>
        <XAxis dataKey="day" stroke="#6B21A8" />
        <YAxis stroke="#6B21A8" />
        <Tooltip />
        <Bar dataKey="sales" fill="#A855F7" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
