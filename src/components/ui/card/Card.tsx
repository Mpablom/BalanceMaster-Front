import type { ReactNode } from "react";

interface CardProps {
  title: string;
  children: ReactNode;
}

export default function Card({ title, children }: CardProps) {
  return (
    <div className="bg-[#f3f4f6] text-[#e3e3e3] rounded-2xl shadow-md p-6 hover:shadow-lg transition">
      <h3 className="text-lg font-semibold text-[#a78bfa] mb-4">{title}</h3>
      {children}
    </div>
  );
}
