export const site = {
  name: "Serenova",
  tagline: "Journeys that matter",
  email: "hello@serenova-safari.com",
  phoneDisplay: "+41 76 000 00 00",
  phoneHref: "tel:+41760000000",
  whatsappHref: "https://wa.me/41760000000",
  instagram: "https://instagram.com/serenova.safari",
  tiktok: "https://www.tiktok.com/@serenova.safari",
  linkedin: "https://www.linkedin.com/",
  city: "Lausanne",
  country: "Switzerland",
  hours: "Mon–Fri, 9:00–18:00 CET",
  founder: "Jenny",
  contactsArePlaceholders: true,
} as const;

export const navItems = [
  { href: "/destinations", key: "destinations" },
  { href: "/styles", key: "styles" },
  { href: "/journeys", key: "journeys" },
  { href: "/journal", key: "journal" },
  { href: "/about", key: "about" },
  { href: "/reviews", key: "reviews" },
  { href: "/contact", key: "contact" },
] as const;
