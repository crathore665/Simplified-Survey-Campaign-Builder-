export default function Field({ label, hint, htmlFor, children, inline = false }) {
  return (
    <div className={inline ? 'flex items-center justify-between gap-4 py-1' : 'space-y-1.5'}>
      <div className={inline ? '' : 'flex items-baseline justify-between gap-3'}>
        <label htmlFor={htmlFor} className="text-[13px] font-medium text-body">{label}</label>
        {hint && <span className="text-[11px] text-muted">{hint}</span>}
      </div>
      {children}
    </div>
  );
}
