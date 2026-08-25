import SurveyPopup from './SurveyPopup';
import { useSurvey } from '../../context/SurveyContext';

/**
 * Device frame + dummy host app behind a backdrop, with the survey popup
 * overlaid. All shape/backdrop/radius values come from styling.
 */
export default function PhonePreview() {
  const { config } = useSurvey();
  const s = config.styling;

  const shellStyle = {
    backgroundColor: s.backgroundColor,
    borderTopLeftRadius: s.radiusTL,
    borderTopRightRadius: s.radiusTR,
    borderBottomLeftRadius: s.radiusBL,
    borderBottomRightRadius: s.radiusBR,
    boxShadow: '0 -8px 28px rgba(20,24,31,0.14)',
  };

  const backdropStyle = {
    backgroundColor: s.backdropColor,
    opacity: s.backdropOpacity / 100,
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative h-[600px] w-[300px] rounded-[38px] bg-ink p-2.5 shadow-xl">
        <div className="relative h-full w-full overflow-hidden rounded-[30px] bg-white">
          {/* dummy host app */}
          <div className="absolute inset-0 flex flex-col">
            <div className="flex items-center justify-between px-4 pb-2 pt-3 text-[10px] font-semibold text-ink">
              <span>9:41</span><span className="h-4 w-16 rounded-full bg-ink" /><span>100%</span>
            </div>
            <div className="flex-1 space-y-3 p-4">
              {[0,1,2,3].map((r) => (
                <div key={r} className="flex items-center gap-3">
                  <div className="h-10 w-10 shrink-0 rounded-lg bg-canvas" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-2.5 w-3/4 rounded-full bg-canvas" />
                    <div className="h-2.5 w-1/2 rounded-full bg-canvas" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute inset-0" style={backdropStyle} />

          <div className="absolute inset-x-0 bottom-0 max-h-[90%] overflow-y-auto">
            <div style={shellStyle} className="relative w-full">
              {s.crossEnabled && (
                <button className="absolute right-3 top-3 z-10" aria-label="Close"
                  style={{ color: s.crossColor }}>
                  <svg width={s.crossSize} height={s.crossSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
                </button>
              )}
              <SurveyPopup content={config.content} styling={config.styling} />
            </div>
          </div>
        </div>
      </div>
      <p className="text-[11px] text-muted">Live preview · delay {s.displayDelay}s · updates as you type</p>
    </div>
  );
}
