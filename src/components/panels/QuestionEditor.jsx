import TextInput from '../ui/TextInput';
import ToggleSwitch from '../ui/ToggleSwitch';
import { useSurvey } from '../../context/SurveyContext';

/**
 * Editor for ONE question. Rendered once per question — the list of these
 * grows and shrinks with the page-count field. Options: min 2, add unlimited,
 * delete allowed only while more than 2 remain.
 */
export default function QuestionEditor({ question, index }) {
  const { updateQuestion, addOption, updateOption, removeOption } = useSurvey();
  const canDelete = question.options.length > 2;

  return (
    <div className="rounded-lg border border-line p-4 space-y-3">
      <p className="text-[12px] font-semibold uppercase tracking-wide text-muted">Question {index + 1}</p>

      <TextInput id={`${question.id}-title`} label="Title" value={question.title}
        onChange={(v) => updateQuestion(question.id, 'title', v)} />
      <TextInput id={`${question.id}-desc`} label="Description" multiline value={question.description}
        onChange={(v) => updateQuestion(question.id, 'description', v)} />

      <div className="space-y-2">
        <div className="flex items-baseline justify-between">
          <span className="text-[13px] font-medium text-body">Options</span>
          <span className="text-[11px] text-muted">min 2</span>
        </div>
        {question.options.map((opt, i) => (
          <div key={opt.id} className="flex items-center gap-2">
            <input type="text" value={opt.label} placeholder={`Option ${i + 1}`}
              onChange={(e) => updateOption(question.id, opt.id, e.target.value)}
              className="w-full rounded-lg border border-line bg-white px-3 py-2 text-sm text-ink placeholder:text-muted" />
            <button type="button" disabled={!canDelete}
              onClick={() => removeOption(question.id, opt.id)}
              aria-label={`Delete option ${i + 1}`}
              className="shrink-0 rounded-lg border border-line px-2.5 py-2 text-muted enabled:hover:border-brand enabled:hover:text-brand disabled:opacity-30">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
          </div>
        ))}
        <button type="button" onClick={() => addOption(question.id)}
          className="w-full rounded-lg border border-dashed border-line py-2 text-[13px] font-medium text-body hover:border-brand hover:text-brand">
          Add option
        </button>
      </div>

      <ToggleSwitch id={`${question.id}-comment`} label="Additional comment field"
        checked={question.showComment} onChange={(v) => updateQuestion(question.id, 'showComment', v)} />
    </div>
  );
}
