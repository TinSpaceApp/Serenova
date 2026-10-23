export const site = {
  name: "Serenova",
  tagline: "Journeys that matter",
  url: "https://serenovasafari.com",
  email: "jenny@serenovasafari.com",
  phoneDisplay: "+41 79 872 04 84",
  phoneHref: "tel:+41798720484",
  whatsappHref: "https://wa.me/41798720484",
  instagram: "https://www.instagram.com/serenovasafari",
  tiktok: "https://www.tiktok.com/@serenova.safari",
  linkedin: "https://www.linkedin.com/",
  city: "Lausanne",
  country: "Switzerland",
  hours: "Mon–Fri, 9:00–18:00 CET",
  founder: "Jenny",
  contactsArePlaceholders: false,
} as const;

export const navItems = [
  { href: "/destinations", key: "destinations" },
  { href: "/styles", key: "styles" },
  { href: "/journeys", key: "journeys" },
  { href: "/journal", key: "journal" },
  { href: "/about", key: "about" },
  { href: "/why-serenova", key: "why" },
  { href: "/reviews", key: "reviews" },
  { href: "/contact", key: "contact" },
] as const;
