import type { ReactNode, FC } from "react";

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

const CardContent: FC<CardContentProps> = ({ children, className = "" }) => {
  return <div className={`p-2 ${className}`}>{children}</div>;
};

export default CardContent;
