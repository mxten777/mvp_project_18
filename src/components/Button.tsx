import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/cn";

const buttonVariants = cva(
  // 기본 스타일
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-medium text-render transition-all duration-300 ease-smooth focus-ring disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group elegant-text",
  {
    variants: {
      variant: {
        primary: [
          "bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-soft",
          "hover:from-primary-700 hover:to-primary-600 hover:shadow-medium hover:scale-105",
          "active:scale-95 active:shadow-soft",
          "dark:from-primary-500 dark:to-primary-600 dark:hover:from-primary-400 dark:hover:to-primary-500"
        ],
        secondary: [
          "bg-white text-secondary-700 border border-secondary-200 shadow-soft",
          "hover:bg-secondary-50 hover:border-secondary-300 hover:shadow-medium hover:scale-105",
          "active:scale-95 active:bg-secondary-100",
          "dark:bg-secondary-800 dark:text-secondary-100 dark:border-secondary-700",
          "dark:hover:bg-secondary-700 dark:hover:border-secondary-600"
        ],
        outline: [
          "border-2 border-primary-500 text-primary-600 bg-transparent shadow-soft",
          "hover:bg-primary-500 hover:text-white hover:shadow-medium hover:scale-105",
          "active:scale-95 active:bg-primary-600",
          "dark:border-primary-400 dark:text-primary-400",
          "dark:hover:bg-primary-400 dark:hover:text-secondary-900"
        ],
        ghost: [
          "text-secondary-600 bg-transparent hover:bg-secondary-100 hover:text-secondary-900",
          "active:bg-secondary-200 hover:scale-105 active:scale-95",
          "dark:text-secondary-400 dark:hover:bg-secondary-800 dark:hover:text-secondary-100"
        ],
        destructive: [
          "bg-gradient-to-r from-accent-600 to-accent-500 text-white shadow-soft",
          "hover:from-accent-700 hover:to-accent-600 hover:shadow-medium hover:scale-105",
          "active:scale-95 active:shadow-soft",
          "dark:from-accent-500 dark:to-accent-600"
        ],
        success: [
          "bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-glow",
          "hover:from-primary-700 hover:to-primary-600 hover:shadow-glow hover:scale-105",
          "active:scale-95",
          "dark:from-primary-400 dark:to-primary-500"
        ],
        warm: [
          "bg-gradient-to-r from-warm-500 to-warm-400 text-white shadow-soft",
          "hover:from-warm-600 hover:to-warm-500 hover:shadow-glow-warm hover:scale-105",
          "active:scale-95",
          "dark:from-warm-400 dark:to-warm-500"
        ]
      },
      size: {
        sm: "h-8 px-3 text-sm rounded-lg",
        md: "h-10 px-4 py-2 text-base rounded-xl",
        lg: "h-12 px-6 py-3 text-lg rounded-xl",
        xl: "h-14 px-8 py-4 text-xl rounded-2xl",
        icon: "h-10 w-10 rounded-xl"
      },
      fullWidth: {
        true: "w-full",
        false: "w-auto"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children?: React.ReactNode;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    fullWidth, 
    children, 
    loading = false, 
    leftIcon, 
    rightIcon, 
    disabled,
    ...props 
  }, ref) => {
    const isDisabled = disabled || loading;

    return (
      <button
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {/* 로딩 스피너 */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        
        {/* 리플 효과 */}
        <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-active:scale-x-100 transition-transform duration-300 origin-left" />
        
        {/* 컨텐츠 */}
        <div className={cn("flex items-center gap-2", loading && "opacity-0")}>
          {leftIcon && !loading && (
            <span className="flex-shrink-0">{leftIcon}</span>
          )}
          {children}
          {rightIcon && !loading && (
            <span className="flex-shrink-0">{rightIcon}</span>
          )}
        </div>
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
