import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, type HTMLMotionProps } from "framer-motion";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium rounded-xl transition-transform duration-200 ease-out active:scale-95 hover:scale-[1.02] shadow-md hover:shadow-lg focus-visible:shadow-lg disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-ring/60 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-400/50",
        outline: "border border-white/30 bg-white/10 text-white hover:bg-white/20",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "bg-transparent text-white hover:bg-white/10",
        link: "text-pink-500 underline underline-offset-4 hover:text-pink-600",
      },
      size: {
        default: "h-10 px-5",
        sm: "h-8 px-3 text-sm",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// Type-safe props
type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    if (asChild) {
      // Radix Slot (no Framer Motion)
      return (
        <Slot
          ref={ref as React.Ref<any>}
          className={cn(buttonVariants({ variant, size, className }))}
          {...props}
        />
      );
    }

    // Framer Motion button
    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={cn(buttonVariants({ variant, size, className }))}
        {...(props as HTMLMotionProps<"button">)}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
