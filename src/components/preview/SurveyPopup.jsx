import { useState, useEffect } from 'react';
import Lottie from 'lottie-react';

/**
 * The survey popup. Pure presentation: everything comes from props,
 * so it repaints instantly when the config changes.
 * Shows one question at a time; a Next/Submit button walks through them,
 * then an optional thank-you screen.
 */
export default function SurveyPopup({ content, styling }) {
  const { questions, submitText, thankYou } = content;
  const [step, setStep] = useState(0);          // which question
  const [finished, setFinished] = useState(false);
  const [selected, setSelected] = useState({});  // { [questionId]: optionId }

  // If questions shrink below the current step, clamp back into range.
  useEffect(() => {
    if (step > questions.length - 1) setStep(Math.max(0, questions.length - 1));
  }, [questions.length, step]);

  const q = questions[step];
  const isLast = step === questions.length - 1;

  const titleStyle = {
    color: styling.titleColor, fontSize: styling.titleFontSize,
    fontWeight: styling.titleFontWeight, textAlign: styling.titleAlign, lineHeight: 1.3,
  };
  const subStyle = {
    color: styling.subtitleColor, fontSize: styling.subtitleFontSize,
    fontWeight: styling.subtitleFontWeight, textAlign: styling.subtitleAlign, lineHeight: 1.45,
  };
  const ctaStyle = {
    backgroundColor: styling.ctaBgColor, color: styling.ctaTextColor,
    border: `1px solid ${styling.ctaBorderColor}`, width: styling.ctaFullWidth ? '100%' : 'auto',
    height: styling.ctaHeight, fontSize: styling.ctaFontSize,
    borderRadius: styling.ctaRadius, padding: styling.ctaFullWidth ? 0 : '0 24px',
  };

  const optStyle = (isSel) => ({
    minHeight: styling.optionHeight,
    borderRadius: styling.optionRadius,
    border: `1px solid ${isSel ? styling.selectedBorderColor : styling.unselectedBorderColor}`,
    color: isSel ? styling.selectedTextColor : styling.unselectedTextColor,
    backgroundColor: isSel
      ? (styling.optionLayout === 'filled' ? styling.selectedBgColor : styling.selectedBgColor)
      : styling.unselectedBgColor,
  });

  if (finished && thankYou.enabled) {
    return (
      <div className="px-5 pb-6 pt-5 text-center space-y-2">
        {thankYou.media && (
          <div className="mx-auto mb-2 flex h-24 w-24 items-center justify-center overflow-hidden">
            {thankYou.media.type === 'image'
              ? <img src={thankYou.media.src} alt="" className="max-h-full max-w-full object-contain" />
              : <Lottie animationData={thankYou.media.data} loop style={{ width: 96, height: 96 }} />}
          </div>
        )}
        <h4 style={titleStyle}>{thankYou.title}</h4>
        <p style={subStyle}>{thankYou.subtitle}</p>
        <div className="pt-3" style={{ display: 'flex', justifyContent: styling.ctaFullWidth ? 'stretch' : 'center' }}>
          <button style={ctaStyle} className="font-semibold" onClick={() => { setFinished(false); setStep(0); }}>
            {thankYou.buttonText}
          </button>
        </div>
      </div>
    );
  }

  if (!q) return <div className="p-6 text-center text-sm text-muted">Add a question to preview it.</div>;

  const chosen = selected[q.id];

  const next = () => {
    if (isLast) { if (thankYou.enabled) setFinished(true); }
    else setStep((s) => s + 1);
  };

  return (
    <div className="px-5 pb-6 pt-5">
      <div className="mb-2 text-[11px] font-medium text-muted" style={{ textAlign: 'right' }}>
        {step + 1} / {questions.length}
      </div>

      <div className="space-y-1 mb-4">
        <h4 style={titleStyle}>{q.title || 'Untitled'}</h4>
        <p style={subStyle}>{q.description}</p>
      </div>

      <div className="flex flex-col" style={{ gap: styling.optionSpacing }}>
        {q.options.map((opt) => {
          const isSel = chosen === opt.id;
          return (
            <button key={opt.id} type="button"
              onClick={() => setSelected((prev) => ({ ...prev, [q.id]: opt.id }))}
              className="flex items-center gap-2 px-3 text-left text-sm transition-colors"
              style={optStyle(isSel)}>
              <span
                className="flex h-4 w-4 shrink-0 items-center justify-center border"
                style={{
                  borderColor: isSel ? styling.selectedBorderColor : styling.unselectedBorderColor,
                  borderRadius: styling.optionLayout === 'checkbox' ? 4 : 999,
                }}>
                {isSel && <span className="h-2 w-2" style={{ backgroundColor: styling.selectedBorderColor, borderRadius: styling.optionLayout === 'checkbox' ? 2 : 999 }} />}
              </span>
              {opt.label || 'Untitled option'}
            </button>
          );
        })}
      </div>

      {q.showComment && (
        <textarea rows={2} placeholder="Additional comments"
          className="mt-3 w-full resize-none rounded-lg border px-3 py-2 text-[13px] outline-none"
          style={{ borderColor: styling.unselectedBorderColor, color: styling.titleColor }} />
      )}

      <div className="mt-4" style={{ display: 'flex', justifyContent: styling.ctaFullWidth ? 'stretch' : 'center' }}>
        <button style={ctaStyle} className="font-semibold" onClick={next}>
          {isLast ? submitText : 'Next'}
        </button>
      </div>
    </div>
  );
}
