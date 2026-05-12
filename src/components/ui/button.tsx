import Link from "next/link";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = Readonly<{
  children: ReactNode;
  href: string;
  variant?: ButtonVariant;
}>;

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-teal-700 text-white hover:bg-teal-800",
  secondary:
    "border border-teal-700 bg-white text-teal-800 hover:bg-teal-50",
};

export function Button({ children, href, variant = "primary" }: ButtonProps) {
  return (
    <Link
      className={`inline-flex min-h-11 items-center justify-center rounded-md px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-teal-700 ${variantClasses[variant]}`}
      href={href}
    >
      {children}
    </Link>
  );
}
