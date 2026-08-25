import Field from './Field';
export default function SelectInput({ id, label, value, onChange, options }) {
  return (
    <Field label={label} htmlFor={id} inline>
      <select id={id} value={value}
        onChange={(e) => {
          const raw = e.target.value;
          const match = options.find((o) => String(o.value) === raw);
          onChange(match ? match.value : raw);
        }}
        className="rounded-lg border border-line bg-white px-2.5 py-1.5 text-[13px] text-ink">
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </Field>
  );
}
