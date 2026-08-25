# Survey Campaign Builder

Configure a survey campaign from **Content** and **Styling** tabs and see every change
reflected instantly in a live mobile preview — no save button, no refresh.

**Live demo:** https://simplified-survey-campaign-builder.vercel.app/
**Repository:** https://github.com/crathore665/Simplified-Survey-Campaign-Builder

## Features
- Real-time preview — panels and preview read the same state object.
- Dynamic questions — the page-count field adds/removes Question sections; existing questions are preserved.
- Per-question options — minimum 2, add unlimited, delete when more than 2 remain.
- Additional comment toggle per question.
- Mock conditional logic — add/remove redirect conditions.
- Configurable submit button and optional thank-you page (media upload: PNG/JPG/GIF/Lottie, title, subtitle, CTA, redirect).
- Full styling: background, four independent corner radii, backdrop colour/opacity, title & subtitle typography and alignment, option layout (radio/checkbox/filled), sizing and spacing, selected/unselected option colours, CTA button, cross button.
- Responsive — two-column workspace on desktop with a sticky preview; single column on mobile with the preview first.
- Accessible baseline — labelled controls, `role="switch"` toggles, visible focus, reduced-motion respected.

## Tech stack
React 18, Vite 6, Tailwind CSS 4, React Context + useState, lottie-react, JavaScript (ES modules).

## Setup
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build -> /dist
npm run preview  # serve the build
```

## Folder structure
```
src/
├── main.jsx                     entry; wraps app in SurveyProvider
├── App.jsx                      layout + Content/Styling tab switch
├── index.css                    Tailwind import + design tokens
├── constants/
│   └── defaultConfig.js         default survey shape, id + question factories
├── context/
│   └── SurveyContext.jsx        survey state + every update function
└── components/
    ├── ui/                      presentational building blocks (Field, TextInput,
    │                            NumberInput, ColorInput, SliderInput, SelectInput,
    │                            ToggleSwitch, SegmentedControl, Section)
    ├── panels/
    │   ├── ContentPanel.jsx     intro, questions, logic, submit, thank-you
    │   ├── StylingPanel.jsx     appearance, backdrop, typography, options, CTA, cross
    │   ├── QuestionEditor.jsx   one question: title, description, options, comment
    │   └── MediaUploader.jsx    image + Lottie file handling
    └── preview/
        ├── PhonePreview.jsx     device frame, backdrop, cross button
        └── SurveyPopup.jsx      the survey; pure function of content + styling
```

## How the live preview works
All state lives in one object in `SurveyContext`:
`{ content: { intro, questions, logic, submitText, thankYou }, styling: {...} }`.
The panels are the only writers; `SurveyPopup` is the only reader. An input's `onChange`
calls `setConfig` with a new immutable object, React re-renders both sides, and the popup
repaints. One source of truth means the preview cannot drift out of sync, so no save step
is needed.

### Dynamic questions
The page-count field calls `setNumPages`, which grows or trims the `questions` array to
match while keeping existing questions. Each question and option carries a stable generated
id used as its React key, so adding or deleting in the middle never corrupts sibling rows.

## Deployment
Static build. On Vercel: import the repo, framework preset **Vite**, build `npm run build`,
output `dist`.
