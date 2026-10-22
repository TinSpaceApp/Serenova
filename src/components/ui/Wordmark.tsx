import { Link } from "@/i18n/navigation";

type WordmarkProps = {
  className?: string;
  tone?: "ink" | "paper";
};

export function Wordmark({ className = "", tone = "ink" }: WordmarkProps) {
  return (
    <Link
      href="/"
      className={`wordmark inline-block text-[2rem] md:text-[2.15rem] ${
        tone === "paper" ? "text-white" : "text-ink"
      } ${className}`}
      aria-label="Serenova"
    >
      Serenova
    </Link>
  );
}
