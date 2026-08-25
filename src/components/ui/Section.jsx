export default function Section({ title, description, children }) {
  return (
    <section className="rounded-xl border border-line bg-panel p-5">
      <header className="mb-4">
        <h3 className="text-sm font-semibold text-ink">{title}</h3>
        {description && <p className="mt-0.5 text-[12px] text-muted">{description}</p>}
      </header>
      <div className="space-y-4">{children}</div>
    </section>
  );
}
