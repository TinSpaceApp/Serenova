export function EditorialQuote({ text }: { text: string }) {
  return (
    <div className="article-shell">
      <blockquote className="article-quote">
        <p>{text}</p>
      </blockquote>
    </div>
  );
}
