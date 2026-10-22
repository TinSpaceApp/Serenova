import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { asLocale } from "@/i18n/routing";

export async function pageMeta(
  locale: string,
  namespace: string,
  titleKey = "metaTitle",
  descriptionKey = "metaDescription",
): Promise<Metadata> {
  const t = await getTranslations({ locale: asLocale(locale), namespace });
  return {
    title: t(titleKey),
    description: t(descriptionKey),
  };
}
