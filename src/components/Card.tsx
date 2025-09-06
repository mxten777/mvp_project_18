import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = "" }) => (
  <div
    className={`bg-white/90 dark:bg-gray-800/90 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-[0_2px_16px_0_rgba(0,0,0,0.06)] dark:shadow-[0_2px_16px_0_rgba(0,0,0,0.30)] p-6 md:p-8 my-8 md:my-12 mx-4 md:mx-8 hover:shadow-[0_4px_24px_0_rgba(0,200,83,0.10)] dark:hover:shadow-[0_4px_24px_0_rgba(16,185,129,0.10)] hover:border-green-200 dark:hover:border-green-700 transition-all duration-200 relative ${className}`}
  >
    {children}
  </div>
);

export default Card;
