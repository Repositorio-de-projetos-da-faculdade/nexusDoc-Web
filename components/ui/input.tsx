import { cn } from "@/lib/utils";
import { type InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, ...props }, ref) => {
    if (icon) {
      return (
        <div className="relative flex items-center">
          <span className="absolute left-3 text-[var(--muted-foreground)] pointer-events-none">
            {icon}
          </span>
          <input
            ref={ref}
            className={cn(
              "h-9 w-full rounded-[var(--radius)] border border-[var(--input)] bg-[var(--card)] pl-9 pr-3 text-sm",
              "text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]",
              "focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-transparent",
              "transition-all duration-150",
              className
            )}
            {...props}
          />
        </div>
      );
    }

    return (
      <input
        ref={ref}
        className={cn(
          "h-9 w-full rounded-[var(--radius)] border border-[var(--input)] bg-[var(--card)] px-3 text-sm",
          "text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]",
          "focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-transparent",
          "transition-all duration-150",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

interface SelectProps {
  children: React.ReactNode;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function Select({ children, className, value, onChange }: SelectProps) {
  return (
    <select
      value={value}
      onChange={onChange}
      className={cn(
        "h-9 rounded-[var(--radius)] border border-[var(--input)] bg-[var(--card)] px-3 text-sm",
        "text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]",
        "transition-all duration-150 cursor-pointer",
        className
      )}
    >
      {children}
    </select>
  );
}
