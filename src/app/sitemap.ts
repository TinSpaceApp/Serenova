import type { MetadataRoute } from "next";
import { articles, packages, places, styles } from "@/content/catalog";

const site = "https://serenova-gilt.vercel.app";

const staticPaths = [
  "",
  "/destinations",
  "/tanzania",
  "/zanzibar",
  "/kenya",
  "/uganda",
  "/kilimanjaro",
  "/styles",
  "/journeys",
  "/journal",
  "/about",
  "/why-serenova",
  "/reviews",
  "/contact",
  "/plan",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["en", "fr"] as const;
  const dynamicPaths = [
    ...places.map((item) => `/tanzania/${item.slug}`),
    ...styles.map((item) => `/styles/${item.slug}`),
    ...packages.map((item) => `/journeys/${item.slug}`),
    ...articles.filter((item) => item.published).map((item) => `/journal/${item.slug}`),
  ];

  return [...staticPaths, ...dynamicPaths].flatMap((path) =>
    locales.map((locale) => ({
      url: `${site}/${locale}${path}`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${site}/en${path}`,
          fr: `${site}/fr${path}`,
        },
      },
    })),
  );
}
