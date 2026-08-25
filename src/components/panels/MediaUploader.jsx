import { useRef, useState } from 'react';
import Lottie from 'lottie-react';
import { useSurvey } from '../../context/SurveyContext';
import { ACCEPTED_MEDIA } from '../../constants/defaultConfig';

export default function MediaUploader() {
  const { config, updateThankYou } = useSurvey();
  const inputRef = useRef(null);
  const [error, setError] = useState('');
  const media = config.content.thankYou.media;

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError('');
    const isLottie = file.type === 'application/json' || file.name.endsWith('.json');
    const reader = new FileReader();
    reader.onerror = () => setError('Could not read that file.');
    reader.onload = () => {
      if (isLottie) {
        try { updateThankYou('media', { type: 'lottie', data: JSON.parse(reader.result), name: file.name }); }
        catch { setError('Not a valid Lottie JSON.'); }
      } else {
        updateThankYou('media', { type: 'image', src: reader.result, name: file.name });
      }
    };
    if (isLottie) reader.readAsText(file); else reader.readAsDataURL(file);
  };

  const clear = () => { updateThankYou('media', null); if (inputRef.current) inputRef.current.value = ''; };

  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <span className="text-[13px] font-medium text-body">Media</span>
        <span className="text-[11px] text-muted">PNG, JPG, GIF, Lottie</span>
      </div>
      {media ? (
        <div className="flex items-center gap-3 rounded-lg border border-line bg-white p-2.5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md bg-canvas">
            {media.type === 'image'
              ? <img src={media.src} alt="" className="h-full w-full object-cover" />
              : <Lottie animationData={media.data} loop style={{ width: 44, height: 44 }} />}
          </div>
          <p className="min-w-0 flex-1 truncate text-[12px] text-body">{media.name}</p>
          <button type="button" onClick={clear} className="shrink-0 rounded-md px-2 py-1 text-[12px] font-medium text-muted hover:text-brand">Remove</button>
        </div>
      ) : (
        <label className="flex cursor-pointer items-center justify-center rounded-lg border border-dashed border-line py-4 text-[13px] font-medium text-body hover:border-brand hover:text-brand">
          Choose a file
          <input ref={inputRef} type="file" accept={ACCEPTED_MEDIA} onChange={handleFile} className="sr-only" />
        </label>
      )}
      {error && <p className="text-[12px] text-brand">{error}</p>}
    </div>
  );
}
