import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative",
  {
    variants: {
      variant: {
        default:
          "bg-[#1b1938] text-white hover:bg-[#1b1938]",
        destructive:
          "bg-red-500 text-white hover:bg-red-600",
        outline:
          "bg-white text-[#292827] hover:bg-[#fafaf8]",
        secondary:
          "bg-[#fafaf8] text-[#292827] hover:bg-[#e8e4dd]",
        ghost: "hover:bg-[#fafaf8] hover:text-[#292827]",
        link: "text-[#292827] underline-offset-4 hover:underline",
        grid: "bg-white text-[#292827] hover:text-[#1b1938] border-[#e8e4dd] before:absolute before:inset-0 before:opacity-[0.15] before:pointer-events-none before:bg-[radial-gradient(#000_1px,transparent_1px)] before:bg-[size:4px_4px] hover:before:opacity-[0.25]",
      },
      size: {
        default: "h-12 px-6",
        sm: "h-9 px-3 text-xs",
        lg: "h-14 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

