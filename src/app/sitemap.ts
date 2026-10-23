import type { MetadataRoute } from "next";
import { articles, packages, places, styles } from "@/content/catalog";
import { site } from "@/lib/site";

const origin = site.url;

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
      url: `${origin}/${locale}${path}`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${origin}/en${path}`,
          fr: `${origin}/fr${path}`,
          "x-default": `${origin}/en${path}`,
        },
      },
    })),
  );
}
