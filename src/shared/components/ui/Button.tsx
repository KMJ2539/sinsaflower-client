import { clsx } from "clsx";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: (() => void) | ((e: React.MouseEvent<HTMLButtonElement>) => void);
  className?: string;
  variant?: ButtonVariant;
  disabled?: boolean;
};

type ButtonVariant = "primary" | "secondary" | "danger" | "default";

const base = "px-4 py-2 rounded-3xl text-sm transition";

const variantMap: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white hover:bg-primary-hover",
  secondary: "bg-secondary text-white hover:bg-secondary-hover",
  danger: "bg-danger text-white hover:bg-danger-hover",
  default: "bg-default text-white hover:bg-danger-hover",
};

export const Button = ({
  children,
  onClick,
  className,
  variant = "default",
  disabled = false,
}: ButtonProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={clsx(
      base,
      variantMap[variant],
      disabled && "opacity-50 cursor-not-allowed pointer-events-none",
      className
    )}
  >
    {children}
  </button>
);
