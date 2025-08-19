import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = "" }) => (
  <div
    className={`bg-white/90 rounded-3xl shadow-xl border-2 border-blue-100 p-6 md:p-8 hover:scale-105 hover:shadow-2xl transition-all duration-200 ${className}`}
  >
    {children}
  </div>
);

export default Card;
