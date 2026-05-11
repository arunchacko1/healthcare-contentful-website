import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Everwell Family Clinic",
    template: "%s | Everwell Family Clinic",
  },
  description:
    "A fictional healthcare clinic website built with Next.js, TypeScript, Tailwind CSS, and Contentful.",
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
