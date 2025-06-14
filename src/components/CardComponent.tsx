import React from "react";

interface CardComponentProps {
  title: string;
  children: React.ReactNode;
}

export const CardComponent: React.FC<CardComponentProps> = ({
  title,
  children,
}) => (
  <div className="bg-white rounded-2xl shadow-md p-6 max-w-md">
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    <div>{children}</div>
  </div>
);
