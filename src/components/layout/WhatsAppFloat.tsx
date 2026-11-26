import { getTranslations } from "next-intl/server";
import { site } from "@/lib/site";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M12.04 2C6.58 2 2.15 6.43 2.15 11.89c0 1.99.58 3.85 1.59 5.44L2 22l4.82-1.63a9.86 9.86 0 0 0 5.22 1.48h.01c5.46 0 9.89-4.43 9.89-9.89C21.94 6.43 17.5 2 12.04 2zm5.77 14.03c-.24.68-1.4 1.25-1.94 1.33-.5.07-1.13.1-1.82-.11-.42-.13-.96-.31-1.66-.61-2.92-1.26-4.82-4.2-4.97-4.39-.14-.19-1.18-1.57-1.18-3 0-1.42.74-2.12 1.01-2.41.26-.29.58-.36.77-.36h.56c.18 0 .42-.05.66.5.24.57.82 1.99.89 2.14.07.14.12.31.02.5-.1.19-.14.31-.28.48-.14.17-.3.37-.43.5-.14.14-.29.29-.12.56.16.28.73 1.2 1.57 1.95 1.08.96 1.99 1.26 2.27 1.4.28.14.44.12.61-.07.16-.19.71-.83.9-1.11.19-.28.38-.23.64-.14.26.1 1.66.78 1.95.92.28.14.47.21.54.33.07.12.07.68-.17 1.36z"
      />
    </svg>
  );
}

export async function WhatsAppFloat() {
  const t = await getTranslations("ui");

  return (
    <a
      href={site.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label={t("whatsappCta")}
      title={t("whatsappCta")}
    >
      <WhatsAppIcon className="h-[1.65rem] w-[1.65rem]" />
      <span className="sr-only">{t("whatsappCta")}</span>
    </a>
  );
}
