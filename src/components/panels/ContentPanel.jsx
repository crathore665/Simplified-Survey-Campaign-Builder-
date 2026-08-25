import Section from '../ui/Section';
import NumberInput from '../ui/NumberInput';
import TextInput from '../ui/TextInput';
import ToggleSwitch from '../ui/ToggleSwitch';
import QuestionEditor from './QuestionEditor';
import MediaUploader from './MediaUploader';
import { useSurvey } from '../../context/SurveyContext';

export default function ContentPanel() {
  const {
    config, setNumPages, updateContentField, updateThankYou,
    addCondition, updateCondition, removeCondition,
  } = useSurvey();
  const { intro, questions, logic, submitText, thankYou } = config.content;

  return (
    <div className="space-y-4">
      <Section title="Introduction" description="Set how many question pages the survey has.">
        <NumberInput id="num-pages" label="Number of survey pages" hint="1–20"
          value={intro.numPages} onChange={setNumPages} min={1} max={20} />
      </Section>

      <Section title="Questions" description="One section per survey page. Options: min 2, add unlimited.">
        <div className="space-y-3">
          {questions.map((q, i) => <QuestionEditor key={q.id} question={q} index={i} />)}
        </div>
      </Section>

      <Section title="Conditional logic" description="Mock — redirect based on a selected option.">
        {logic.conditions.length === 0 && (
          <p className="text-[12px] text-muted">No conditions yet.</p>
        )}
        {logic.conditions.map((c) => (
          <div key={c.id} className="flex items-center gap-2">
            <input type="text" placeholder="When option…" value={c.whenOption}
              onChange={(e) => updateCondition(c.id, 'whenOption', e.target.value)}
              className="w-full rounded-lg border border-line bg-white px-3 py-2 text-sm" />
            <input type="text" placeholder="Redirect to…" value={c.redirect}
              onChange={(e) => updateCondition(c.id, 'redirect', e.target.value)}
              className="w-full rounded-lg border border-line bg-white px-3 py-2 text-sm" />
            <button type="button" onClick={() => removeCondition(c.id)}
              className="shrink-0 rounded-lg border border-line px-2.5 py-2 text-muted hover:border-brand hover:text-brand">✕</button>
          </div>
        ))}
        <button type="button" onClick={addCondition}
          className="w-full rounded-lg border border-dashed border-line py-2 text-[13px] font-medium text-body hover:border-brand hover:text-brand">
          Add condition
        </button>
      </Section>

      <Section title="Submit button">
        <TextInput id="submit-text" label="Button text" value={submitText}
          onChange={(v) => updateContentField('submitText', v)} />
      </Section>

      <Section title="Thank you page" description="Optional — shown after submit.">
        <ToggleSwitch id="ty-enabled" label="Enable thank you page"
          checked={thankYou.enabled} onChange={(v) => updateThankYou('enabled', v)} />
        {thankYou.enabled && (
          <>
            <MediaUploader />
            <TextInput id="ty-title" label="Title" value={thankYou.title} onChange={(v) => updateThankYou('title', v)} />
            <TextInput id="ty-sub" label="Subtitle" multiline value={thankYou.subtitle} onChange={(v) => updateThankYou('subtitle', v)} />
            <TextInput id="ty-btn" label="CTA button text" value={thankYou.buttonText} onChange={(v) => updateThankYou('buttonText', v)} />
            <TextInput id="ty-redirect" label="Redirect URL" value={thankYou.redirectUrl} onChange={(v) => updateThankYou('redirectUrl', v)} placeholder="https://…" />
          </>
        )}
      </Section>
    </div>
  );
}
