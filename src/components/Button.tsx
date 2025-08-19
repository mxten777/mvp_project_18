import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "lg" | "md" | "sm";
}

const base =
  "inline-flex items-center justify-center font-bold rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-150 select-none shadow-md hover:shadow-xl border-2";
const variants = {
  primary: "bg-gradient-to-br from-[#b4b4e6] to-[#fdf6e3] text-[#3b3b6d] border-[#b4b4e6] hover:from-[#a3a3d1] hover:to-[#fef9c3] hover:text-[#22224c] hover:border-[#a3a3d1]",
  secondary: "bg-white text-[#3b3b6d] border-[#b4b4e6] hover:bg-[#fdf6e3] hover:text-[#22224c] hover:border-[#a3a3d1]",
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
