import React, { useState } from 'react';
import { SlideParagraph } from '@/features/presentation/components/elements/SlideParagraph';
import { ClickHighlight, HighlightVariant } from '@/features/presentation/components/elements/ClickHighlight';
import { ClickStepsProvider } from '@/features/presentation';
import { Button } from '@/components/ui/button';
import { PlaygroundSection } from './PlaygroundSection';

export const ParagraphsSection: React.FC = () => {
  const [title, setTitle] = useState('Calculation Principle');
  const [variant, setVariant] = useState<'default' | 'info' | 'warning' | 'error' | 'success' | 'callout' | 'plain'>('default');
  const [at, setAt] = useState(1);
  const [highlightVariant, setHighlightVariant] = useState<HighlightVariant>('paint');
  const [highlightText, setHighlightText] = useState('isolating total volume');
  const [activeStep, setActiveStep] = useState(1);

  const preview = (
    <div className="flex flex-col gap-4 w-full">
      {/* Mini step controller in preview */}
      <div className="flex items-center gap-2 bg-muted/30 border border-border/50 rounded-xl p-2.5 justify-between">
        <span className="text-[10px] font-bold text-muted-foreground uppercase">
          Simulated Step: <span className="text-primary">{activeStep}</span>
        </span>
        <div className="flex gap-1">
          <Button
            size="xs"
            variant={activeStep === 0 ? 'default' : 'outline'}
            onClick={() => setActiveStep(0)}
            className="h-6 text-[9px] font-mono cursor-pointer"
          >
            Step 0 (Normal)
          </Button>
          <Button
            size="xs"
            variant={activeStep >= at ? 'default' : 'outline'}
            onClick={() => setActiveStep(at)}
            className="h-6 text-[9px] font-mono cursor-pointer"
          >
            Step {at} (Active)
          </Button>
        </div>
      </div>

      <div className="border border-border/40 p-4 rounded-xl bg-card">
        <ClickStepsProvider currentClickOverride={activeStep}>
          <SlideParagraph
            title={title || undefined}
            variant={variant}
            text={
              <span>
                Estimating concrete requires{' '}
                <ClickHighlight at={at} variant={highlightVariant}>
                  {highlightText || ' '}
                </ClickHighlight>{' '}
                to prevent shortages.
              </span>
            }
          />
        </ClickStepsProvider>
      </div>
    </div>
  );

  const codeText = `import { SlideParagraph, ClickHighlight } from '@/features/presentation';

<SlideParagraph
  title="${title}"
  variant="${variant}"
  text={
    <span>
      Estimating concrete requires{' '}
      <ClickHighlight at={${at}} variant="${highlightVariant}">
        ${highlightText}
      </ClickHighlight>{' '}
      to prevent shortages.
    </span>
  }
/>`;

  const editorContent = (
    <div className="text-slate-300">
      <span className="text-purple-400">import</span> {'{ SlideParagraph, ClickHighlight }'} <span className="text-purple-400">from</span> <span className="text-amber-300">"@/features/presentation"</span>;{"\n\n"}
      <span className="text-blue-400">&lt;SlideParagraph</span>{"\n"}
      {"  "}<span className="text-teal-400">title</span>=<span className="text-amber-300">"</span>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="bg-slate-900 border border-white/10 rounded px-1.5 py-0.5 text-amber-300 focus:outline-none focus:border-primary/50 w-44 font-mono text-[11px] inline-block font-bold"
      />
      <span className="text-amber-300">"</span>{"\n"}
      {"  "}<span className="text-teal-400">variant</span>=<span className="text-amber-300">"</span>
      <select
        value={variant}
        onChange={(e) => setVariant(e.target.value as any)}
        className="bg-slate-900 border border-white/10 rounded px-1.5 py-0.5 text-teal-400 focus:outline-none focus:border-primary/50 font-mono text-[11px] inline-block cursor-pointer"
      >
        <option value="default">default</option>
        <option value="info">info</option>
        <option value="warning">warning</option>
        <option value="error">error</option>
        <option value="success">success</option>
        <option value="callout">callout</option>
        <option value="plain">plain</option>
      </select>
      <span className="text-amber-300">"</span>{"\n"}
      {"  "}<span className="text-teal-400">text</span>=<span className="text-pink-400">&#123;</span>
      <span className="text-blue-400">&lt;span&gt;</span>{"\n"}
      {"    "}Estimating concrete requires&#123;' '&#125;{"\n"}
      {"    "}<span className="text-blue-400">&lt;ClickHighlight</span> <span className="text-teal-400">at</span>=<span className="text-pink-400">&#123;</span>
      <input
        type="number"
        value={at}
        min={0}
        max={20}
        onChange={(e) => {
          const val = parseInt(e.target.value);
          setAt(isNaN(val) ? 1 : val);
        }}
        className="bg-slate-900 border border-white/10 rounded px-1.5 py-0.5 text-orange-400 focus:outline-none focus:border-primary/50 w-12 font-mono text-[11px] inline-block"
      />
      <span className="text-pink-400">&#125;</span> <span className="text-teal-400">variant</span>=<span className="text-amber-300">"</span>
      <select
        value={highlightVariant}
        onChange={(e) => setHighlightVariant(e.target.value as HighlightVariant)}
        className="bg-slate-900 border border-white/10 rounded px-1.5 py-0.5 text-teal-400 focus:outline-none focus:border-primary/50 font-mono text-[11px] inline-block cursor-pointer"
      >
        <option value="paint">paint</option>
        <option value="marker">marker</option>
        <option value="rect">rect</option>
        <option value="text">text</option>
        <option value="bold">bold</option>
        <option value="strike">strike</option>
        <option value="scale">scale</option>
        <option value="bg">bg</option>
        <option value="all">all</option>
      </select>
      <span className="text-amber-300">"</span><span className="text-blue-400">&gt;</span>{"\n"}
      {"      "}
      <input
        type="text"
        value={highlightText}
        onChange={(e) => setHighlightText(e.target.value)}
        className="bg-slate-900 border border-white/10 rounded px-1.5 py-0.5 text-slate-100 focus:outline-none focus:border-primary/50 w-44 font-mono text-[11px] inline-block"
      />
      {"\n"}
      {"    "}<span className="text-blue-400">&lt;/ClickHighlight&gt;</span>{"\n"}
      {"    "}to prevent shortages.{"\n"}
      {"  "}<span className="text-blue-400">&lt;/span&gt;</span>{"\n"}
      {"  "}<span className="text-pink-400">&#125;</span>{"\n"}
      <span className="text-blue-400">/&gt;</span>
    </div>
  );

  return (
    <PlaygroundSection
      title="Paragraphs & Interactive Highlighting"
      description={
        <span>
          Use <code>&lt;SlideParagraph&gt;</code> to create clean paragraph copy in slides. Nest <code>&lt;ClickHighlight&gt;</code> inside the text structure to emphasize key terms when stepping through a slide sequence.
        </span>
      }
      preview={preview}
      codeText={codeText}
      editorContent={editorContent}
    />
  );
};

export default ParagraphsSection;
