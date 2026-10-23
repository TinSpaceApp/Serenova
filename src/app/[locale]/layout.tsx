import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { LightboxProvider } from "@/components/media/Lightbox";
import { fontClassName } from "@/lib/fonts";
import { routing, type Locale } from "@/i18n/routing";
import { site } from "@/lib/site";
import { localeAlternates, organizationJsonLd, shareMeta } from "@/lib/seo";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "meta" });

  const title = t("title");
  const description = t("description");

  return {
    metadataBase: new URL(site.url),
    title: {
      default: title,
      template: "%s — Serenova",
    },
    description,
    applicationName: site.name,
    authors: [{ name: `${site.founder} · ${site.name}` }],
    creator: site.founder,
    publisher: site.name,
    category: "travel",
    keywords: [
      "Serenova",
      "Tanzania safari",
      "Zanzibar",
      "Lausanne",
      "tailor-made safari",
      "Jenny",
    ],
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
    alternates: localeAlternates("/", locale),
    ...shareMeta(title, description, locale, "/"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale as Locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${fontClassName} h-full antialiased`}
    >
      <body className="min-h-full bg-ivory text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <NextIntlClientProvider locale={locale as Locale} messages={messages}>
          <LightboxProvider>
            <SiteHeader transparent />
            <main>{children}</main>
            <SiteFooter />
          </LightboxProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
