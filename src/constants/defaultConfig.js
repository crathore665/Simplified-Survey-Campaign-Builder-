/**
 * Single source of truth for a survey campaign.
 * content = what the survey says, styling = how it looks.
 * Panels write here, the preview reads here — that is what makes
 * the preview update live with no save button.
 */

let uid = 0;
export const newId = (prefix = 'id') => `${prefix}-${Date.now()}-${uid++}`;

export const makeQuestion = (n) => ({
  id: newId('q'),
  title: `Question ${n}`,
  description: 'Add a short description for this question.',
  options: [
    { id: newId('opt'), label: 'Option 1' },
    { id: newId('opt'), label: 'Option 2' },
  ],
  showComment: false,
});

export const defaultConfig = {
  content: {
    intro: {
      numPages: 2, // number of question pages
    },
    questions: [makeQuestion(1), makeQuestion(2)],
    logic: {
      conditions: [], // mock: [{ id, whenOption, redirect }]
    },
    submitText: 'Submit survey',
    thankYou: {
      enabled: true,
      media: null, // { type:'image'|'lottie', src|data, name }
      title: 'Thank you!',
      subtitle: 'Your response has been recorded.',
      buttonText: 'Done',
      redirectUrl: '',
    },
  },
  styling: {
    backgroundColor: '#ffffff',
    radiusTL: 16,
    radiusTR: 16,
    radiusBL: 0,
    radiusBR: 0,
    displayDelay: 0,
    backdropColor: '#14181f',
    backdropOpacity: 25, // 0-100

    titleColor: '#14181f',
    titleFontSize: 18,
    titleFontWeight: 700,
    titleAlign: 'center',

    subtitleColor: '#6b7280',
    subtitleFontSize: 13,
    subtitleFontWeight: 400,
    subtitleAlign: 'center',

    optionLayout: 'radio', // radio | checkbox | filled
    optionHeight: 44,
    optionSpacing: 8,
    optionRadius: 10,

    selectedBorderColor: '#e8422d',
    selectedTextColor: '#e8422d',
    selectedBgColor: '#fdeeeb',
    unselectedBorderColor: '#dfe3e8',
    unselectedTextColor: '#4a5261',
    unselectedBgColor: '#ffffff',

    ctaFullWidth: true,
    ctaBorderColor: '#e8422d',
    ctaTextColor: '#ffffff',
    ctaBgColor: '#e8422d',
    ctaFontSize: 15,
    ctaHeight: 48,
    ctaRadius: 12,

    crossEnabled: true,
    crossColor: '#8b93a1',
    crossSize: 18,
  },
};

export const OPTION_LAYOUTS = [
  { value: 'radio', label: 'Radio' },
  { value: 'checkbox', label: 'Checkbox' },
  { value: 'filled', label: 'Filled' },
];

export const FONT_WEIGHTS = [
  { value: 400, label: 'Regular' },
  { value: 500, label: 'Medium' },
  { value: 600, label: 'Semibold' },
  { value: 700, label: 'Bold' },
];

export const ALIGNMENTS = [
  { value: 'left', label: 'Left' },
  { value: 'center', label: 'Center' },
  { value: 'right', label: 'Right' },
];

export const ACCEPTED_MEDIA = '.png,.jpg,.jpeg,.gif,.json';
