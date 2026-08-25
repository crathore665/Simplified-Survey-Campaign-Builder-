import Field from './Field';
export default function SliderInput({ id, label, value, onChange, min, max, step = 1, unit = 'px' }) {
  return (
    <Field label={label} hint={`${value}${unit}`} htmlFor={id}>
      <input id={id} type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-line accent-brand" />
    </Field>
  );
}
