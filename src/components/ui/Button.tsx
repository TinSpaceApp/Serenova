import { Link } from "@/i18n/navigation";

type Variant = "primary" | "light" | "ghost" | "forest";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
};

const variants: Record<Variant, string> = {
  primary: "bg-bronze text-white hover:bg-[#8f5a38] border-transparent",
  forest: "bg-forest text-ivory hover:bg-[#101910] border-transparent",
  light: "bg-ivory text-forest hover:bg-white border-ivory/70",
  ghost: "bg-transparent text-ink border-ink/20 hover:border-ink/50",
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
      className={`inline-flex min-h-12 items-center justify-center rounded-none border px-7 text-[0.76rem] font-medium uppercase tracking-[0.16em] font-sans transition-[background-color,color,border-color,transform,letter-spacing] duration-300 ease-out hover:-translate-y-px hover:tracking-[0.18em] ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
