export type JournalGuideRow = { label: string; value: string };

export type JournalBlock =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "figure"; id: string; caption?: string; frame?: "wide" | "portrait" }
  | { type: "guide"; title: string; rows: JournalGuideRow[] }
  | { type: "list"; title?: string; items: string[] }
  | { type: "notice"; text: string }
  | { type: "takeaway"; text: string };

export type JournalSource = { label: string; href: string };

export type JournalRelated = { href: string; label: string };

export type JournalArticle = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  excerpt: string;
  cover: string;
  seoTitle: string;
  seoDescription: string;
  intro: string[];
  blocks: JournalBlock[];
  related: JournalRelated[];
  cta: string;
  lastReviewed?: string;
  sources?: JournalSource[];
  published: boolean;
};

export type JournalCard = {
  slug: string;
  href: string;
  title: string;
  category: string;
  excerpt: string;
  cover: string;
  published: boolean;
};
