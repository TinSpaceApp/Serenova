import type { JournalArticle, JournalBlock, JournalGuideRow } from "./types";

export type FigureData = {
  id: string;
  caption?: string;
  frame?: "wide" | "portrait";
};

export type TocItem = { id: string; label: string };

export type ComposedNode =
  | {
      kind: "split";
      heading: string;
      headingId: string;
      paragraphs: string[];
      figure: FigureData;
      imageSide: "left" | "right";
    }
  | {
      kind: "prose";
      heading?: string;
      headingId?: string;
      paragraphs: string[];
    }
  | {
      kind: "gallery";
      heading?: string;
      headingId?: string;
      paragraphs: string[];
      figures: FigureData[];
    }
  | { kind: "image"; figure: FigureData }
  | { kind: "guide"; title: string; rows: JournalGuideRow[] }
  | { kind: "list"; title?: string; items: string[] }
  | { kind: "notice"; text: string }
  | { kind: "quote"; text: string };

export type ComposedArticle = {
  toc: TocItem[];
  seasons: TocItem[];
  nodes: ComposedNode[];
};

function headingId(text: string, used: Set<string>) {
  const base =
    text
      .normalize("NFD")
      .replace(/\p{M}/gu, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 64) || "section";
  let id = base;
  let n = 2;
  while (used.has(id)) {
    id = `${base}-${n++}`;
  }
  used.add(id);
  return id;
}

function asFigure(block: Extract<JournalBlock, { type: "figure" }>): FigureData {
  return { id: block.id, caption: block.caption, frame: block.frame };
}

function seasonRank(label: string) {
  const value = label.toLowerCase();
  if (/janv|january/.test(value)) return 0;
  if (/mars|march/.test(value)) return 1;
  if (/juin|june/.test(value)) return 2;
  if (/nov/.test(value)) return 3;
  return 99;
}

export function composeJournal(article: JournalArticle): ComposedArticle {
  const usedIds = new Set<string>();
  const toc: TocItem[] = [];
  const nodes: ComposedNode[] = [];
  const blocks = article.blocks;
  let index = 0;
  let splitCount = 0;
  let lastVisual: ComposedNode["kind"] | null = null;
  let pendingFigures: FigureData[] = [];

  const takeFigures = () => {
    const figures: FigureData[] = [];
    while (index < blocks.length && blocks[index]?.type === "figure") {
      figures.push(asFigure(blocks[index] as Extract<JournalBlock, { type: "figure" }>));
      index += 1;
    }
    return figures;
  };

  const takeParagraphs = () => {
    const paragraphs: string[] = [];
    while (index < blocks.length && blocks[index]?.type === "p") {
      paragraphs.push((blocks[index] as Extract<JournalBlock, { type: "p" }>).text);
      index += 1;
    }
    return paragraphs;
  };

  const emitSection = (heading: string, headingIdValue: string, preFigures: FigureData[]) => {
    const paragraphs: string[] = [];
    const figures = [...preFigures];

    while (index < blocks.length) {
      const current = blocks[index];
      if (!current || current.type === "h2") break;
      if (current.type === "guide" || current.type === "list" || current.type === "notice" || current.type === "takeaway") {
        break;
      }
      if (current.type === "p") {
        paragraphs.push(...takeParagraphs());
        continue;
      }
      if (current.type === "figure") {
        let peek = index;
        while (peek < blocks.length && blocks[peek]?.type === "figure") peek += 1;
        if (blocks[peek]?.type === "h2") break;
        figures.push(...takeFigures());
        continue;
      }
      index += 1;
    }

    if (figures.length >= 2) {
      nodes.push({
        kind: "gallery",
        heading,
        headingId: headingIdValue,
        paragraphs,
        figures: figures.slice(0, 2),
      });
      figures.slice(2).forEach((figure) => nodes.push({ kind: "image", figure }));
      lastVisual = "gallery";
      return;
    }

    if (figures.length === 1 && paragraphs.length) {
      const useSplit = lastVisual !== "split" || splitCount % 3 !== 2;
      if (useSplit) {
        nodes.push({
          kind: "split",
          heading,
          headingId: headingIdValue,
          paragraphs,
          figure: figures[0],
          imageSide: splitCount % 2 === 0 ? "right" : "left",
        });
        splitCount += 1;
        lastVisual = "split";
        return;
      }
      nodes.push({ kind: "prose", heading, headingId: headingIdValue, paragraphs });
      nodes.push({ kind: "image", figure: figures[0] });
      lastVisual = "image";
      return;
    }

    if (figures.length === 1) {
      nodes.push({ kind: "prose", heading, headingId: headingIdValue, paragraphs });
      nodes.push({ kind: "image", figure: figures[0] });
      lastVisual = "image";
      return;
    }

    nodes.push({ kind: "prose", heading, headingId: headingIdValue, paragraphs });
    lastVisual = "prose";
  };

  while (index < blocks.length) {
    const block = blocks[index];
    if (!block) break;

    if (block.type === "figure") {
      const figures = takeFigures();
      const next = blocks[index];
      if (next?.type === "h2") {
        pendingFigures = figures;
        continue;
      }
      if (figures.length >= 2) {
        nodes.push({ kind: "gallery", paragraphs: [], figures: figures.slice(0, 2) });
        figures.slice(2).forEach((figure) => nodes.push({ kind: "image", figure }));
        lastVisual = "gallery";
      } else if (figures[0]) {
        nodes.push({ kind: "image", figure: figures[0] });
        lastVisual = "image";
      }
      continue;
    }

    if (block.type === "h2") {
      const id = headingId(block.text, usedIds);
      toc.push({ id, label: block.text });
      index += 1;
      const attached = pendingFigures;
      pendingFigures = [];
      emitSection(block.text, id, attached);
      continue;
    }

    if (block.type === "p") {
      nodes.push({ kind: "prose", paragraphs: takeParagraphs() });
      lastVisual = "prose";
      continue;
    }

    if (block.type === "guide") {
      nodes.push({ kind: "guide", title: block.title, rows: block.rows });
      lastVisual = "guide";
      index += 1;
      continue;
    }

    if (block.type === "list") {
      nodes.push({ kind: "list", title: block.title, items: block.items });
      lastVisual = "list";
      index += 1;
      continue;
    }

    if (block.type === "notice") {
      nodes.push({ kind: "notice", text: block.text });
      lastVisual = "notice";
      index += 1;
      continue;
    }

    if (block.type === "takeaway") {
      nodes.push({ kind: "quote", text: block.text });
      lastVisual = "quote";
      index += 1;
      continue;
    }

    index += 1;
  }

  const seasons =
    article.slug === "best-time-tanzania"
      ? toc.filter((item) => seasonRank(item.label) < 99).sort((a, b) => seasonRank(a.label) - seasonRank(b.label))
      : [];

  return { toc, seasons, nodes };
}
