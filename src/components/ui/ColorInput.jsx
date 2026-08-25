import Field from './Field';
export default function ColorInput({ id, label, value, onChange }) {
  return (
    <Field label={label} htmlFor={id} inline>
      <div className="flex items-center gap-2">
        <span className="font-mono text-[11px] uppercase text-muted">{value}</span>
        <input id={id} type="color" value={value} onChange={(e) => onChange(e.target.value)}
          className="h-8 w-10 cursor-pointer rounded-md ring-1 ring-line" aria-label={label} />
      </div>
    </Field>
  );
}
