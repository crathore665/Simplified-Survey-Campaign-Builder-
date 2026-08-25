import Field from './Field';
export default function TextInput({ id, label, hint, value, onChange, placeholder, multiline = false }) {
  const shared = 'w-full rounded-lg border border-line bg-white px-3 py-2 text-sm text-ink placeholder:text-muted hover:border-muted/60';
  return (
    <Field label={label} hint={hint} htmlFor={id}>
      {multiline ? (
        <textarea id={id} rows={2} className={`${shared} resize-none`} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input id={id} type="text" className={shared} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
      )}
    </Field>
  );
}
