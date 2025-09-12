import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
}

export default function Card({ title, children }: CardProps) {
  return (
    <div className="bg-[#f3f4f6] text-[#e3e3e3] rounded-2xl p-6 hover: transition shadow-2xl">
      <h3 className="text-lg font-semibold text-purple-600 mb-4 text-center">
        {title}
      </h3>
      {children}
    </div>
  );
}
