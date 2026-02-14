import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

/**
 * GlassCard 스타일 variants
 * @description Glassmorphism 디자인의 카드 컴포넌트
 */
const glassCardVariants = cva(
  // Base styles
  'relative rounded-3xl backdrop-blur-md border transition-all duration-300',
  {
    variants: {
      variant: {
        default: [
          'bg-white/70 dark:bg-secondary-800/70',
          'border-white/20 dark:border-secondary-700/20',
          'shadow-glass dark:shadow-glass-dark',
        ],
        primary: [
          'bg-primary-50/80 dark:bg-primary-900/50',
          'border-primary-200/30 dark:border-primary-700/30',
          'shadow-glow',
        ],
        secondary: [
          'bg-secondary-50/80 dark:bg-secondary-900/50',
          'border-secondary-200/30 dark:border-secondary-700/30',
          'shadow-soft-lg',
        ],
        gradient: [
          'bg-gradient-to-br from-white/80 via-primary-50/60 to-white/80',
          'dark:from-secondary-800/80 dark:via-primary-900/40 dark:to-secondary-800/80',
          'border-white/20 dark:border-secondary-700/20',
          'shadow-xl',
        ],
        glass: [
          'bg-white/10 dark:bg-black/10',
          'border-white/20 dark:border-white/10',
          'shadow-glass',
        ],
      },
      size: {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
        xl: 'p-10',
      },
      hover: {
        none: '',
        lift: 'hover:-translate-y-2 hover:shadow-2xl',
        glow: 'hover:shadow-glow-lg',
        scale: 'hover:scale-105',
        tilt: 'hover:rotate-1',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      hover: 'lift',
    },
  }
);

export interface GlassCardProps 
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof glassCardVariants> {
  children: ReactNode;
  className?: string;
  animate?: boolean;
  glow?: boolean;
}

/**
 * GlassCard 컴포넌트
 * @description 글래스모피즘 스타일의 프리미엄 카드
 */
export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ 
    children, 
    variant, 
    size, 
    hover, 
    className, 
    animate = true,
    glow = false,
    ...props 
  }, ref) => {
    const cardClasses = cn(
      glassCardVariants({ variant, size, hover }),
      glow && 'animate-glow-pulse',
      className
    );

    if (!animate) {
      return (
        <div ref={ref} className={cardClasses} {...props}>
          {/* Shine effect overlay */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent" />
          </div>
          
          {/* Content */}
          <div className="relative z-10">
            {children}
          </div>
        </div>
      );
    }

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cardClasses}
        onClick={props.onClick}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
        id={props.id}
        style={props.style}
      >
        {/* Shine effect overlay */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent" />
        </div>
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </motion.div>
    );
  }
);

GlassCard.displayName = 'GlassCard';

export default GlassCard;
