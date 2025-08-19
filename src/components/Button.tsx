import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "lg" | "md" | "sm";
}

const base =
  "inline-flex items-center justify-center font-bold rounded-2xl shadow-lg transition-all duration-150 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-60 disabled:cursor-not-allowed";
const variants = {
  primary:
    "bg-gradient-to-r from-blue-400 to-yellow-200 text-blue-900 hover:from-blue-500 hover:to-yellow-300 active:scale-95",
  secondary:
    "bg-gradient-to-r from-yellow-200 to-blue-100 text-blue-800 hover:from-yellow-300 hover:to-blue-200 active:scale-95 border border-blue-200",
};
const sizes = {
  lg: "px-8 py-4 text-lg",
  md: "px-6 py-3 text-base",
  sm: "px-4 py-2 text-sm",
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) => (
  <button
    className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;
