export default function SegmentedControl({ options, value, onChange, size = 'md' }) {
  const padding = size === 'sm' ? 'px-3 py-1.5 text-[12px]' : 'px-4 py-2 text-[13px]';
  return (
    <div role="tablist" className="inline-flex rounded-lg bg-canvas p-1 ring-1 ring-line">
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button key={o.value} role="tab" aria-selected={active} type="button"
            onClick={() => onChange(o.value)}
            className={`${padding} rounded-md font-medium transition-colors ${active ? 'bg-white text-ink shadow-sm' : 'text-muted hover:text-body'}`}>
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
