import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

/**
 * PremiumButton 스타일 variants
 * @description 글로벌 표준 프리미엄 버튼 컴포넌트
 */
const premiumButtonVariants = cva(
  // Base styles
  'inline-flex items-center justify-center rounded-2xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-offset-2',
  {
    variants: {
      variant: {
        primary: [
          'bg-gradient-to-r from-primary-600 to-primary-500',
          'hover:from-primary-700 hover:to-primary-600',
          'text-white shadow-lg hover:shadow-glow',
          'focus:ring-primary-500/50',
          'dark:from-primary-500 dark:to-primary-600',
          'dark:hover:from-primary-600 dark:hover:to-primary-700',
        ],
        secondary: [
          'bg-secondary-600 hover:bg-secondary-700',
          'text-white shadow-md hover:shadow-lg',
          'focus:ring-secondary-500/50',
          'dark:bg-secondary-700 dark:hover:bg-secondary-600',
        ],
        outline: [
          'border-2 border-primary-600 text-primary-600',
          'hover:bg-primary-50 hover:border-primary-700',
          'focus:ring-primary-500/50',
          'dark:border-primary-500 dark:text-primary-400',
          'dark:hover:bg-primary-900/20 dark:hover:border-primary-400',
        ],
        ghost: [
          'text-secondary-600 hover:bg-secondary-100',
          'focus:ring-secondary-500/30',
          'dark:text-secondary-300 dark:hover:bg-secondary-800',
        ],
        glass: [
          'bg-white/20 dark:bg-black/20',
          'backdrop-blur-md border border-white/20',
          'hover:bg-white/30 dark:hover:bg-black/30',
          'text-secondary-900 dark:text-white',
          'shadow-glass hover:shadow-glass-dark',
          'focus:ring-white/50',
        ],
        gradient: [
          'bg-gradient-to-r from-primary-500 via-primary-600 to-primary-500',
          'bg-size-200 bg-pos-0 hover:bg-pos-100',
          'text-white shadow-xl hover:shadow-glow-lg',
          'focus:ring-primary-500/50',
        ],
        success: [
          'bg-gradient-to-r from-success-600 to-success-500',
          'hover:from-success-700 hover:to-success-600',
          'text-white shadow-md',
          'focus:ring-success-500/50',
        ],
        warning: [
          'bg-gradient-to-r from-warning-600 to-warning-500',
          'hover:from-warning-700 hover:to-warning-600',
          'text-white shadow-md',
          'focus:ring-warning-500/50',
        ],
        error: [
          'bg-gradient-to-r from-error-600 to-error-500',
          'hover:from-error-700 hover:to-error-600',
          'text-white shadow-md',
          'focus:ring-error-500/50',
        ],
      },
      size: {
        sm: 'px-4 py-2 text-sm gap-2',
        md: 'px-6 py-3 text-base gap-2',
        lg: 'px-8 py-4 text-lg gap-3',
        xl: 'px-10 py-5 text-xl gap-3',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
);

export interface PremiumButtonProps 
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>,
    VariantProps<typeof premiumButtonVariants> {
  children: ReactNode;
  className?: string;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  animate?: boolean;
}

/**
 * PremiumButton 컴포넌트
 * @description 글로벌 표준 프리미엄 버튼
 */
export const PremiumButton = React.forwardRef<HTMLButtonElement, PremiumButtonProps>(
  ({ 
    children, 
    variant, 
    size, 
    fullWidth,
    className, 
    loading = false,
    leftIcon,
    rightIcon,
    animate = true,
    disabled,
    ...props 
  }, ref) => {
    const buttonClasses = cn(
      premiumButtonVariants({ variant, size, fullWidth }),
      className
    );

    const buttonContent = (
      <>
        {loading && (
          <svg 
            className="animate-spin h-5 w-5" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && leftIcon && <span>{leftIcon}</span>}
        <span>{children}</span>
        {!loading && rightIcon && <span>{rightIcon}</span>}
      </>
    );

    if (!animate) {
      return (
        <button
          ref={ref}
          className={buttonClasses}
          disabled={disabled || loading}
          {...props}
        >
          {buttonContent}
        </button>
      );
    }

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
        transition={{ duration: 0.2 }}
        className={buttonClasses}
        disabled={disabled || loading}
        type={props.type}
        onClick={props.onClick}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        aria-label={props['aria-label']}
        aria-disabled={disabled || loading}
        id={props.id}
        name={props.name}
        value={props.value}
        form={props.form}
        style={props.style}
      >
        {buttonContent}
      </motion.button>
    );
  }
);

PremiumButton.displayName = 'PremiumButton';

export default PremiumButton;
