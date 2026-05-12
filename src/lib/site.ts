export type NavItem = Readonly<{
  label: string;
  href: string;
}>;

export const siteConfig = {
  name: "Everwell Family Clinic",
  description:
    "A fictional family clinic offering thoughtful primary care, preventive visits, and patient resources.",
  phone: "(555) 014-2840",
  email: "hello@everwell.example",
  address: "1200 Harbor Way, Suite 210, Brookside, CA",
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Providers", href: "/providers" },
  { label: "Resources", href: "/patient-resources" },
  { label: "Articles", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];
