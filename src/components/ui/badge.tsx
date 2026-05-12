import type { ReactNode } from "react";

type BadgeProps = Readonly<{
  children: ReactNode;
}>;

export function Badge({ children }: BadgeProps) {
  return (
    <span className="inline-flex w-fit items-center rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-sm font-medium text-teal-800">
      {children}
    </span>
  );
}
