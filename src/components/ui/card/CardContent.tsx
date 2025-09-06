import React, { FC, ReactNode } from "react";

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export const CardContent: FC<CardContentProps> = ({
  children,
  className = "",
}) => {
  return <div className={`p-2 ${className}`}>{children}</div>;
};
