import Field from './Field';
export default function NumberInput({ id, label, hint, value, onChange, min, max }) {
  return (
    <Field label={label} hint={hint} htmlFor={id} inline>
      <input id={id} type="number" min={min} max={max} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-20 rounded-lg border border-line bg-white px-2.5 py-1.5 text-sm text-ink" />
    </Field>
  );
}
