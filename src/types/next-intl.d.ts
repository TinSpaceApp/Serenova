import type fr from "../messages/fr.json";
import type frContent from "../messages/fr.content.json";
import type { routing } from "../i18n/routing";

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof fr & typeof frContent;
  }
}
