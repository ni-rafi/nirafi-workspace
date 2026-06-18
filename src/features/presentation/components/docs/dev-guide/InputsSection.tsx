import React, { useState } from 'react';
import { InteractiveCard } from '@/features/presentation/components/elements/InteractiveCard';
import { ParameterSlider } from '@/features/presentation/components/elements/ParameterSlider';
import { CalculationOutput } from '@/features/presentation/components/elements/CalculationOutput';
import { PlaygroundSection } from './PlaygroundSection';

export const InputsSection: React.FC = () => {
  // Playground state
  const [cardTitle, setCardTitle] = useState('Slab Volume Estimator');
  const [sliderLabel, setSliderLabel] = useState('Slab Length');
  const [unit, setUnit] = useState('m');
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(12);
  const [step, setStep] = useState(0.5);
  const [showInput, setShowInput] = useState(true);
  const [showSlider, setShowSlider] = useState(true);
  const [outputTitle, setOutputTitle] = useState('Total Slab Volume');

  // Interactive value
  const [length, setLength] = useState(6.0);
  const calculatedVolume = parseFloat((length * 2.4 * 0.15).toFixed(3));

  const preview = (
    <div className="flex flex-col gap-4 w-full">
      <InteractiveCard title={cardTitle || undefined}>
        <ParameterSlider
          label={sliderLabel}
          value={length}
          unit={unit}
          min={min}
          max={max}
          step={step}
          showInput={showInput}
          showSlider={showSlider}
          onChange={setLength}
        />
        <div className="text-[10px] text-muted-foreground/80 leading-relaxed italic px-1 select-none">
          Formula: Volume = Length × 2.4m (Width) × 0.15m (Thickness)
        </div>
        <CalculationOutput
          title={outputTitle}
          value={calculatedVolume}
          unit={`${unit}³`}
        />
      </InteractiveCard>
    </div>
  );

  const codeText = `import { InteractiveCard, ParameterSlider, CalculationOutput } from '@/features/presentation';

// Inside your react component:
const [length, setLength] = useState(6.0);
const volume = (length * 2.4 * 0.15).toFixed(3);

return (
  <InteractiveCard title="${cardTitle}">
    <ParameterSlider
      label="${sliderLabel}"
      value={length}
      min={${min}}
      max={${max}}
      step={${step}}
      unit="${unit}"
      showInput={${showInput}}
      showSlider={${showSlider}}
      onChange={setLength}
    />
    <CalculationOutput
      title="${outputTitle}"
      value={volume}
      unit="${unit}³"
    />
  </InteractiveCard>
);`;

  const editorContent = (
    <div className="text-slate-300">
      <span className="text-purple-400">import</span> {'{ InteractiveCard, ParameterSlider, CalculationOutput }'} <span className="text-purple-400">from</span> <span className="text-amber-300">"@/features/presentation"</span>;{"\n\n"}
      <span className="text-blue-400">&lt;InteractiveCard</span> <span className="text-teal-400">title</span>=<span className="text-amber-300">"</span>
      <input
        type="text"
        value={cardTitle}
        onChange={(e) => setCardTitle(e.target.value)}
        className="bg-slate-900 border border-white/10 rounded px-1.5 py-0.5 text-amber-300 focus:outline-none focus:border-primary/50 w-44 font-mono text-[11px] inline-block font-bold"
      />
      <span className="text-amber-300">"</span><span className="text-blue-400">&gt;</span>{"\n"}
      {"  "}<span className="text-blue-400">&lt;ParameterSlider</span>{"\n"}
      {"    "}<span className="text-teal-400">label</span>=<span className="text-amber-300">"</span>
      <input
        type="text"
        value={sliderLabel}
        onChange={(e) => setSliderLabel(e.target.value)}
        className="bg-slate-900 border border-white/10 rounded px-1.5 py-0.5 text-amber-300 focus:outline-none focus:border-primary/50 w-32 font-mono text-[11px] inline-block"
      />
      <span className="text-amber-300">"</span>{"\n"}
      {"    "}<span className="text-teal-400">value</span>=<span className="text-pink-400">&#123;</span><span className="text-slate-100">{length}</span><span className="text-pink-400">&#125;</span>{"\n"}
      {"    "}<span className="text-teal-400">min</span>=<span className="text-pink-400">&#123;</span>
      <input
        type="number"
        value={min}
        onChange={(e) => setMin(parseFloat(e.target.value) || 0)}
        className="bg-slate-900 border border-white/10 rounded px-1.5 py-0.5 text-orange-400 focus:outline-none focus:border-primary/50 w-12 font-mono text-[11px] inline-block"
      />
      <span className="text-pink-400">&#125;</span>{"\n"}
      {"    "}<span className="text-teal-400">max</span>=<span className="text-pink-400">&#123;</span>
      <input
        type="number"
        value={max}
        onChange={(e) => setMax(parseFloat(e.target.value) || 100)}
        className="bg-slate-900 border border-white/10 rounded px-1.5 py-0.5 text-orange-400 focus:outline-none focus:border-primary/50 w-12 font-mono text-[11px] inline-block"
      />
      <span className="text-pink-400">&#125;</span>{"\n"}
      {"    "}<span className="text-teal-400">step</span>=<span className="text-pink-400">&#123;</span>
      <input
        type="number"
        value={step}
        onChange={(e) => setStep(parseFloat(e.target.value) || 1)}
        className="bg-slate-900 border border-white/10 rounded px-1.5 py-0.5 text-orange-400 focus:outline-none focus:border-primary/50 w-12 font-mono text-[11px] inline-block"
      />
      <span className="text-pink-400">&#125;</span>{"\n"}
      {"    "}<span className="text-teal-400">unit</span>=<span className="text-amber-300">"</span>
      <input
        type="text"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
        className="bg-slate-900 border border-white/10 rounded px-1.5 py-0.5 text-amber-300 focus:outline-none focus:border-primary/50 w-10 font-mono text-[11px] inline-block"
      />
      <span className="text-amber-300">"</span>{"\n"}
      {"    "}<span className="text-teal-400">showInput</span>=<span className="text-pink-400">&#123;</span>
      <select
        value={String(showInput)}
        onChange={(e) => setShowInput(e.target.value === 'true')}
        className="bg-slate-900 border border-white/10 rounded px-1.5 py-0.5 text-purple-400 focus:outline-none focus:border-primary/50 font-mono text-[11px] inline-block cursor-pointer"
      >
        <option value="true">true</option>
        <option value="false">false</option>
      </select>
      <span className="text-pink-400">&#125;</span>{"\n"}
      {"    "}<span className="text-teal-400">showSlider</span>=<span className="text-pink-400">&#123;</span>
      <select
        value={String(showSlider)}
        onChange={(e) => setShowSlider(e.target.value === 'true')}
        className="bg-slate-900 border border-white/10 rounded px-1.5 py-0.5 text-purple-400 focus:outline-none focus:border-primary/50 font-mono text-[11px] inline-block cursor-pointer"
      >
        <option value="true">true</option>
        <option value="false">false</option>
      </select>
      <span className="text-pink-400">&#125;</span>{"\n"}
      {"    "}<span className="text-teal-400">onChange</span>=<span className="text-pink-400">&#123;</span>setLength<span className="text-pink-400">&#125;</span>{"\n"}
      {"  "}<span className="text-blue-400">/&gt;</span>{"\n"}
      {"  "}<span className="text-blue-400">&lt;CalculationOutput</span>{"\n"}
      {"    "}<span className="text-teal-400">title</span>=<span className="text-amber-300">"</span>
      <input
        type="text"
        value={outputTitle}
        onChange={(e) => setOutputTitle(e.target.value)}
        className="bg-slate-900 border border-white/10 rounded px-1.5 py-0.5 text-amber-300 focus:outline-none focus:border-primary/50 w-36 font-mono text-[11px] inline-block"
      />
      <span className="text-amber-300">"</span>{"n"}
      {"    "}<span className="text-teal-400">value</span>=<span className="text-pink-400">&#123;</span><span className="text-slate-100">{calculatedVolume}</span><span className="text-pink-400">&#125;</span>{"\n"}
      {"    "}<span className="text-teal-400">unit</span>=<span className="text-amber-300">"</span><span className="text-amber-300">{unit}³</span><span className="text-amber-300">"</span>{"\n"}
      {"  "}<span className="text-blue-400">/&gt;</span>{"\n"}
      <span className="text-blue-400">&lt;/InteractiveCard&gt;</span>
    </div>
  );

  return (
    <PlaygroundSection
      title="Parameter Panels & Slider Inputs"
      description={
        <span>
          Build interactive estimate calculator blocks in slides using a synced group: <code>&lt;InteractiveCard&gt;</code>, <code>&lt;ParameterSlider&gt;</code>, and <code>&lt;CalculationOutput&gt;</code>. Ensure the slider uses the new <code>showInput</code> and <code>showSlider</code> props to adapt to different interaction styles.
        </span>
      }
      preview={preview}
      codeText={codeText}
      editorContent={editorContent}
    />
  );
};

export default InputsSection;
