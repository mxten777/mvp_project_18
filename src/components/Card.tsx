import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = "" }) => (
  <div
  className={`bg-gradient-to-br from-[#fdf6e3]/90 to-[#e0e7ff]/90 rounded-3xl shadow-2xl border-4 border-[#b4b4e6] p-6 md:p-8 my-8 md:my-12 mx-4 md:mx-8 hover:scale-[1.03] hover:z-20 hover:shadow-[0_12px_36px_0_rgba(60,60,120,0.16)] hover:border-[#a3a3d1] transition-all duration-200 relative ${className}`}
  >
    {children}
  </div>
);

export default Card;
