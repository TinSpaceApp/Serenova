type AdminWordmarkProps = {
  href?: string;
  tone?: "ink" | "paper";
  className?: string;
};

export function AdminWordmark({
  href = "/en",
  tone = "paper",
  className = "",
}: AdminWordmarkProps) {
  return (
    <a
      href={href}
      className={`wordmark inline-block text-[2rem] transition-opacity duration-300 hover:opacity-70 md:text-[2.15rem] ${
        tone === "paper" ? "text-white" : "text-ink"
      } ${className}`}
      aria-label="Serenova"
    >
      Serenova
    </a>
  );
}
