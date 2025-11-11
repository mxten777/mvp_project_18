import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const cardVariants = cva(
  // 기본 스타일
  "relative overflow-hidden transition-all duration-300 ease-smooth group",
  {
    variants: {
      variant: {
        default: [
          "glass shadow-soft border border-secondary-200/50 dark:border-secondary-700/50",
          "hover:shadow-medium hover:scale-[1.02] hover:border-primary-300/50 dark:hover:border-primary-600/50"
        ],
        elevated: [
          "bg-white dark:bg-secondary-800 shadow-medium border-0",
          "hover:shadow-large hover:scale-[1.02]"
        ],
        outlined: [
          "bg-transparent border-2 border-secondary-200 dark:border-secondary-700",
          "hover:border-primary-300 dark:hover:border-primary-600 hover:bg-secondary-50/50 dark:hover:bg-secondary-800/50"
        ],
        gradient: [
          "bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-secondary-900 dark:via-secondary-800 dark:to-primary-900",
          "border border-primary-200/50 dark:border-primary-700/50 shadow-soft",
          "hover:shadow-glow hover:scale-[1.02]"
        ],
        glass: [
          "glass shadow-soft",
          "hover:shadow-medium hover:scale-[1.02] hover:backdrop-blur-2xl"
        ],
        warm: [
          "bg-gradient-to-br from-warm-50 via-white to-warm-100 dark:from-secondary-900 dark:via-secondary-800 dark:to-warm-900",
          "border border-warm-200/50 dark:border-warm-700/50 shadow-soft",
          "hover:shadow-glow-warm hover:scale-[1.02]"
        ]
      },
      size: {
        sm: "p-4 rounded-lg",
        md: "p-6 rounded-xl",
        lg: "p-8 rounded-2xl",
        xl: "p-10 rounded-2xl"
      },
      spacing: {
        none: "m-0",
        sm: "m-2",
        md: "m-4 md:m-6",
        lg: "m-6 md:m-8",
        xl: "m-8 md:m-12"
      },
      hover: {
        none: "",
        lift: "hover:scale-[1.02]",
        glow: "hover:shadow-glow",
        bounce: "hover:scale-105 active:scale-95"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      spacing: "md",
      hover: "lift"
    }
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  children: React.ReactNode;
  interactive?: boolean;
  loading?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className, 
    variant, 
    size, 
    spacing, 
    hover, 
    children, 
    interactive = false,
    loading = false,
    ...props 
  }, ref) => {
    return (
      <div
        className={cn(
          cardVariants({ variant, size, spacing, hover }),
          interactive && "cursor-pointer",
          loading && "animate-pulse",
          className
        )}
        ref={ref}
        {...props}
      >
        {/* 로딩 오버레이 */}
        {loading && (
          <div className="absolute inset-0 bg-white/50 dark:bg-secondary-900/50 backdrop-blur-sm flex items-center justify-center z-10">
            <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* 호버 시 빛나는 효과 */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-smooth" />
        
        {/* 메인 컨텐츠 */}
        <div className={cn("relative z-[1]", loading && "opacity-50")}>
          {children}
        </div>
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;
