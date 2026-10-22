import { Link } from "@/i18n/navigation";

type Variant = "primary" | "light" | "ghost";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
};

const variants: Record<Variant, string> = {
  primary:
    "bg-bronze text-white hover:bg-bronze-soft border-transparent",
  light:
    "bg-white/95 text-ink hover:bg-white border-white/80 shadow-sm",
  ghost:
    "bg-transparent text-ink border-ink/15 hover:border-ink/40",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-11 items-center justify-center rounded-full border px-5 text-[0.8rem] font-medium tracking-[0.04em] transition-colors font-sans ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
