import { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { defaultConfig, makeQuestion, newId } from '../constants/defaultConfig';

/**
 * Holds the whole survey config. Panels write via the update functions,
 * the preview reads `config`. One state object = the live-preview guarantee.
 */
const SurveyContext = createContext(null);

export function SurveyProvider({ children }) {
  const [config, setConfig] = useState(defaultConfig);

  const updateStyling = useCallback((key, value) => {
    setConfig((prev) => ({ ...prev, styling: { ...prev.styling, [key]: value } }));
  }, []);

  const updateContentField = useCallback((key, value) => {
    setConfig((prev) => ({ ...prev, content: { ...prev.content, [key]: value } }));
  }, []);

  const updateThankYou = useCallback((key, value) => {
    setConfig((prev) => ({
      ...prev,
      content: { ...prev.content, thankYou: { ...prev.content.thankYou, [key]: value } },
    }));
  }, []);

  /**
   * Changing the page count adds or removes question sections to match.
   * Existing questions are kept; only the tail is added or trimmed.
   */
  const setNumPages = useCallback((rawCount) => {
    setConfig((prev) => {
      const count = Math.max(1, Math.min(20, Number(rawCount) || 1)); // clamp 1..20
      const current = prev.content.questions;
      let questions;
      if (count > current.length) {
        const extra = [];
        for (let i = current.length; i < count; i++) extra.push(makeQuestion(i + 1));
        questions = [...current, ...extra];
      } else {
        questions = current.slice(0, count);
      }
      return {
        ...prev,
        content: { ...prev.content, intro: { ...prev.content.intro, numPages: count }, questions },
      };
    });
  }, []);

  const updateQuestion = useCallback((qId, key, value) => {
    setConfig((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        questions: prev.content.questions.map((q) =>
          q.id === qId ? { ...q, [key]: value } : q
        ),
      },
    }));
  }, []);

  const addOption = useCallback((qId) => {
    setConfig((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        questions: prev.content.questions.map((q) => {
  if (q.id !== qId) return q;
  if (q.options.length >= 5) return q;   // already at max, add nothing
  return { ...q, options: [...q.options, { id: newId('opt'), label: '' }] };
}),
      },
    }));
  }, []);

  const updateOption = useCallback((qId, optId, label) => {
    setConfig((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        questions: prev.content.questions.map((q) =>
          q.id === qId
            ? { ...q, options: q.options.map((o) => (o.id === optId ? { ...o, label } : o)) }
            : q
        ),
      },
    }));
  }, []);

  const removeOption = useCallback((qId, optId) => {
    setConfig((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        questions: prev.content.questions.map((q) =>
          q.id === qId ? { ...q, options: q.options.filter((o) => o.id !== optId) } : q
        ),
      },
    }));
  }, []);

  // ---- mock conditional logic ----
  const addCondition = useCallback(() => {
    setConfig((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        logic: {
          conditions: [
            ...prev.content.logic.conditions,
            { id: newId('cond'), whenOption: '', redirect: '' },
          ],
        },
      },
    }));
  }, []);

  const updateCondition = useCallback((cId, key, value) => {
    setConfig((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        logic: {
          conditions: prev.content.logic.conditions.map((c) =>
            c.id === cId ? { ...c, [key]: value } : c
          ),
        },
      },
    }));
  }, []);

  const removeCondition = useCallback((cId) => {
    setConfig((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        logic: { conditions: prev.content.logic.conditions.filter((c) => c.id !== cId) },
      },
    }));
  }, []);

  const resetConfig = useCallback(() => setConfig(defaultConfig), []);

  const value = useMemo(
    () => ({
      config,
      updateStyling,
      updateContentField,
      updateThankYou,
      setNumPages,
      updateQuestion,
      addOption,
      updateOption,
      removeOption,
      addCondition,
      updateCondition,
      removeCondition,
      resetConfig,
    }),
    [config, updateStyling, updateContentField, updateThankYou, setNumPages, updateQuestion,
     addOption, updateOption, removeOption, addCondition, updateCondition, removeCondition, resetConfig]
  );

  return <SurveyContext.Provider value={value}>{children}</SurveyContext.Provider>;
}

export function useSurvey() {
  const ctx = useContext(SurveyContext);
  if (!ctx) throw new Error('useSurvey must be used inside a SurveyProvider');
  return ctx;
}
