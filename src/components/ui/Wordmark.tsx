import { Link } from "@/i18n/navigation";

type WordmarkProps = {
  className?: string;
  tone?: "ink" | "paper";
};

export function Wordmark({ className = "", tone = "ink" }: WordmarkProps) {
  return (
    <Link
      href="/"
      className={`wordmark inline-block text-[2rem] transition-opacity duration-300 hover:opacity-70 md:text-[2.15rem] ${
        tone === "paper" ? "text-white" : "text-ink"
      } ${className}`}
      aria-label="Serenova"
    >
      Serenova
    </Link>
  );
}
