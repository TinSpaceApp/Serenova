import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import {
  Cormorant_Garamond,
  Manrope,
  Mrs_Saint_Delafield,
  Source_Serif_4,
} from "next/font/google";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { LightboxProvider } from "@/components/media/Lightbox";
import { routing, type Locale } from "@/i18n/routing";
import "../globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const serif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-source",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const script = Mrs_Saint_Delafield({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script-face",
  display: "swap",
});

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

  return {
    metadataBase: new URL("https://serenova-gilt.vercel.app"),
    title: {
      default: t("title"),
      template: "%s — Serenova",
    },
    description: t("description"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        fr: "/fr",
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      locale: locale === "fr" ? "fr_FR" : "en_GB",
      type: "website",
      siteName: "Serenova",
    },
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
      className={`${display.variable} ${serif.variable} ${sans.variable} ${script.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-ivory text-ink">
        <NextIntlClientProvider locale={locale} messages={messages}>
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
