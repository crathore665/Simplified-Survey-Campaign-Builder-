import Section from '../ui/Section';
import ColorInput from '../ui/ColorInput';
import SliderInput from '../ui/SliderInput';
import SelectInput from '../ui/SelectInput';
import ToggleSwitch from '../ui/ToggleSwitch';
import { useSurvey } from '../../context/SurveyContext';
import { OPTION_LAYOUTS, FONT_WEIGHTS, ALIGNMENTS } from '../../constants/defaultConfig';

export default function StylingPanel() {
  const { config, updateStyling } = useSurvey();
  const s = config.styling;
  const set = updateStyling;

  return (
    <div className="space-y-4">
      <Section title="Appearance">
        <ColorInput id="bg" label="Background" value={s.backgroundColor} onChange={(v) => set('backgroundColor', v)} />
        <SliderInput id="rtl" label="Radius top-left" value={s.radiusTL} onChange={(v) => set('radiusTL', v)} min={0} max={40} />
        <SliderInput id="rtr" label="Radius top-right" value={s.radiusTR} onChange={(v) => set('radiusTR', v)} min={0} max={40} />
        <SliderInput id="rbl" label="Radius bottom-left" value={s.radiusBL} onChange={(v) => set('radiusBL', v)} min={0} max={40} />
        <SliderInput id="rbr" label="Radius bottom-right" value={s.radiusBR} onChange={(v) => set('radiusBR', v)} min={0} max={40} />
        <SliderInput id="delay" label="Display delay" value={s.displayDelay} onChange={(v) => set('displayDelay', v)} min={0} max={10} unit="s" />
      </Section>

      <Section title="Backdrop">
        <ColorInput id="bd-color" label="Backdrop color" value={s.backdropColor} onChange={(v) => set('backdropColor', v)} />
        <SliderInput id="bd-op" label="Backdrop opacity" value={s.backdropOpacity} onChange={(v) => set('backdropOpacity', v)} min={0} max={100} unit="%" />
      </Section>

      <Section title="Question title">
        <ColorInput id="t-color" label="Color" value={s.titleColor} onChange={(v) => set('titleColor', v)} />
        <SliderInput id="t-size" label="Font size" value={s.titleFontSize} onChange={(v) => set('titleFontSize', v)} min={12} max={32} />
        <SelectInput id="t-weight" label="Font weight" value={s.titleFontWeight} onChange={(v) => set('titleFontWeight', v)} options={FONT_WEIGHTS} />
        <SelectInput id="t-align" label="Alignment" value={s.titleAlign} onChange={(v) => set('titleAlign', v)} options={ALIGNMENTS} />
      </Section>

      <Section title="Subtitle">
        <ColorInput id="st-color" label="Color" value={s.subtitleColor} onChange={(v) => set('subtitleColor', v)} />
        <SliderInput id="st-size" label="Font size" value={s.subtitleFontSize} onChange={(v) => set('subtitleFontSize', v)} min={10} max={20} />
        <SelectInput id="st-weight" label="Font weight" value={s.subtitleFontWeight} onChange={(v) => set('subtitleFontWeight', v)} options={FONT_WEIGHTS} />
        <SelectInput id="st-align" label="Alignment" value={s.subtitleAlign} onChange={(v) => set('subtitleAlign', v)} options={ALIGNMENTS} />
      </Section>

      <Section title="Options">
        <SelectInput id="opt-layout" label="Layout" value={s.optionLayout} onChange={(v) => set('optionLayout', v)} options={OPTION_LAYOUTS} />
        <SliderInput id="opt-h" label="Option height" value={s.optionHeight} onChange={(v) => set('optionHeight', v)} min={32} max={64} />
        <SliderInput id="opt-sp" label="Option spacing" value={s.optionSpacing} onChange={(v) => set('optionSpacing', v)} min={0} max={24} />
        <SliderInput id="opt-r" label="Corner radius" value={s.optionRadius} onChange={(v) => set('optionRadius', v)} min={0} max={32} />
      </Section>

      <Section title="Selected option">
        <ColorInput id="sel-b" label="Border" value={s.selectedBorderColor} onChange={(v) => set('selectedBorderColor', v)} />
        <ColorInput id="sel-t" label="Text" value={s.selectedTextColor} onChange={(v) => set('selectedTextColor', v)} />
        <ColorInput id="sel-bg" label="Background" value={s.selectedBgColor} onChange={(v) => set('selectedBgColor', v)} />
      </Section>

      <Section title="Unselected option">
        <ColorInput id="un-b" label="Border" value={s.unselectedBorderColor} onChange={(v) => set('unselectedBorderColor', v)} />
        <ColorInput id="un-t" label="Text" value={s.unselectedTextColor} onChange={(v) => set('unselectedTextColor', v)} />
        <ColorInput id="un-bg" label="Background" value={s.unselectedBgColor} onChange={(v) => set('unselectedBgColor', v)} />
      </Section>

      <Section title="CTA button">
        <ToggleSwitch id="cta-fw" label="Occupy full width" checked={s.ctaFullWidth} onChange={(v) => set('ctaFullWidth', v)} />
        <ColorInput id="cta-b" label="Border" value={s.ctaBorderColor} onChange={(v) => set('ctaBorderColor', v)} />
        <ColorInput id="cta-t" label="Text" value={s.ctaTextColor} onChange={(v) => set('ctaTextColor', v)} />
        <ColorInput id="cta-bg" label="Background" value={s.ctaBgColor} onChange={(v) => set('ctaBgColor', v)} />
        <SliderInput id="cta-fs" label="Font size" value={s.ctaFontSize} onChange={(v) => set('ctaFontSize', v)} min={12} max={20} />
        <SliderInput id="cta-h" label="Height" value={s.ctaHeight} onChange={(v) => set('ctaHeight', v)} min={36} max={64} />
        <SliderInput id="cta-r" label="Corner radius" value={s.ctaRadius} onChange={(v) => set('ctaRadius', v)} min={0} max={32} />
      </Section>

      <Section title="Cross button">
        <ToggleSwitch id="x-en" label="Enable cross button" checked={s.crossEnabled} onChange={(v) => set('crossEnabled', v)} />
        <ColorInput id="x-color" label="Cross color" value={s.crossColor} onChange={(v) => set('crossColor', v)} />
        <SliderInput id="x-size" label="Size" value={s.crossSize} onChange={(v) => set('crossSize', v)} min={12} max={32} />
      </Section>
    </div>
  );
}
