export type MediaKind = "image" | "video";
export type MediaStatus = "provisional" | "placeholder" | "missing" | "official";

export type MediaAsset = {
  id: string;
  kind: MediaKind;
  src: string;
  poster?: string;
  alt: string;
  title?: string;
  credit?: string;
  status: MediaStatus;
  note?: string;
  width?: number;
  height?: number;
};

export type Place = {
  slug: string;
  name: string;
  region: "northern" | "wider";
  country: "tanzania";
  tags: string[];
  summary: string;
  body?: string[];
  cover: string;
  gallery: string[];
  video?: string;
  documented: boolean;
};

export type Destination = {
  slug: "tanzania" | "zanzibar" | "kenya" | "uganda";
  name: string;
  filter: "tanzania" | "zanzibar" | "kenya" | "uganda";
  eyebrow: string;
  lede: string;
  body: string[];
  cta: "explore" | "contact";
  cover: string;
  video?: string;
};

export type SafariStyle = {
  slug: string;
  name: string;
  summary: string;
  cover: string;
  video?: string;
};

export type PackagePrice = {
  people: number;
  usd: number;
};

export type PackageStay = {
  name: string;
  role: string;
  stars?: number;
  photo: string;
};

export type PackageDay = {
  title: string;
  text: string;
};

export type SafariPackage = {
  slug: string;
  name: string;
  subtitle: string;
  days: number;
  category: string;
  audience: string;
  overview: string;
  itinerary: PackageDay[];
  highlights: string[];
  stays: PackageStay[];
  prices: PackagePrice[];
  includes: string[];
  excludes: string[];
  mapPoints: string[];
  cover: string;
  gallery: string[];
  video?: string;
  pricesPending: boolean;
};

export type JournalArticle = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  cover: string;
  body?: string[];
  published: boolean;
};

export type KiliRoute = {
  slug: string;
  name: string;
  summary: string;
  cover: string;
};
