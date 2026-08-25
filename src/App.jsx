import { useState } from 'react';
import SegmentedControl from './components/ui/SegmentedControl';
import ContentPanel from './components/panels/ContentPanel';
import StylingPanel from './components/panels/StylingPanel';
import PhonePreview from './components/preview/PhonePreview';
import { useSurvey } from './context/SurveyContext';

const TABS = [
  { value: 'content', label: 'Content' },
  { value: 'styling', label: 'Styling' },
];

export default function App() {
  const [tab, setTab] = useState('content');
  const { resetConfig } = useSurvey();

  return (
    <div className="min-h-full">
      <header className="border-b border-line bg-panel">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-4 px-5 py-4">
          <div>
            <h1 className="text-[15px] font-semibold text-ink">Survey Campaign Builder</h1>
            <p className="text-[12px] text-muted">Configure the survey and watch it update live.</p>
          </div>
          <button type="button" onClick={resetConfig}
            className="rounded-lg border border-line px-3 py-1.5 text-[12px] font-medium text-body hover:border-brand hover:text-brand">
            Reset
          </button>
        </div>
      </header>

      <main className="mx-auto grid max-w-[1180px] gap-6 px-5 py-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <section className="order-2 lg:order-1">
          <div className="mb-4"><SegmentedControl options={TABS} value={tab} onChange={setTab} /></div>
          {tab === 'content' ? <ContentPanel /> : <StylingPanel />}
        </section>
        <aside className="order-1 lg:order-2">
          <div className="lg:sticky lg:top-6"><PhonePreview /></div>
        </aside>
      </main>
    </div>
  );
}
