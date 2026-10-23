import type { Metadata } from "next";
import { site } from "@/lib/site";

export function localeAlternates(path: string, locale: string): Metadata["alternates"] {
  const suffix = path === "/" ? "" : path;
  return {
    canonical: `/${locale}${suffix}`,
    languages: {
      en: `/en${suffix}`,
      fr: `/fr${suffix}`,
      "x-default": `/en${suffix}`,
    },
  };
}

export function shareMeta(title: string, description: string, locale: string, path: string): Pick<Metadata, "openGraph" | "twitter"> {
  const suffix = path === "/" ? "" : path;
  return {
    openGraph: {
      title,
      description,
      locale: locale === "fr" ? "fr_FR" : "en_GB",
      alternateLocale: locale === "fr" ? ["en_GB"] : ["fr_FR"],
      type: "website",
      siteName: site.name,
      url: `/${locale}${suffix}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TravelAgency",
        "@id": `${site.url}/#house`,
        name: site.name,
        url: site.url,
        email: site.email,
        telephone: site.phoneHref.replace("tel:", ""),
        image: `${site.url}/opengraph-image`,
        address: {
          "@type": "PostalAddress",
          addressLocality: site.city,
          addressCountry: "CH",
        },
        founder: {
          "@type": "Person",
          name: site.founder,
        },
        sameAs: [site.instagram],
        areaServed: [
          { "@type": "Country", name: "Tanzania" },
          { "@type": "Place", name: "Zanzibar" },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#site`,
        url: site.url,
        name: site.name,
        inLanguage: ["en", "fr"],
        publisher: { "@id": `${site.url}/#house` },
      },
    ],
  };
}
