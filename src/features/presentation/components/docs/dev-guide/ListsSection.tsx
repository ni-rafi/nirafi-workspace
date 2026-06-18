import React, { useState } from 'react';
import { SlideList } from '@/features/presentation/components/elements/SlideList';
import { ClickStepsProvider } from '@/features/presentation';
import { Button } from '@/components/ui/button';
import { PlaygroundSection } from './PlaygroundSection';

export const ListsSection: React.FC = () => {
  const [listTitle, setListTitle] = useState('Measurement Guidelines');
  const [variant, setVariant] = useState<'default' | 'plain'>('default');
  const [revealMode, setRevealMode] = useState<'each-click' | 'all-click' | 'auto-stagger' | 'none'>('each-click');
  const [delayMs, setDelayMs] = useState(250);
  
  // List items
  const items = [
    {
      title: 'Structural Thickness:',
      text: 'Maintain a 0.150m minimum bound for all floor slabs to resist shear load.',
    },
    {
      title: 'Calculation Precision:',
      text: 'Round intermediate values to 4 decimals, and final outputs to exactly 3 decimals.',
    },
    {
      title: 'Material Grading:',
      text: 'Ensure concrete grade is minimum C25/30 for load-bearing structures.',
    },
  ];

  const [activeStep, setActiveStep] = useState(1);

  const preview = (
    <div className="flex flex-col gap-4 w-full">
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
            Step 0 (Initial)
          </Button>
          <Button
            size="xs"
            variant={activeStep === 1 ? 'default' : 'outline'}
            onClick={() => setActiveStep(1)}
            className="h-6 text-[9px] font-mono cursor-pointer"
          >
            Step 1
          </Button>
          <Button
            size="xs"
            variant={activeStep === 2 ? 'default' : 'outline'}
            onClick={() => setActiveStep(2)}
            className="h-6 text-[9px] font-mono cursor-pointer"
          >
            Step 2
          </Button>
          <Button
            size="xs"
            variant={activeStep === 3 ? 'default' : 'outline'}
            onClick={() => setActiveStep(3)}
            className="h-6 text-[9px] font-mono cursor-pointer"
          >
            Step 3
          </Button>
        </div>
      </div>

      <div className="border border-border/40 p-4 rounded-xl bg-card">
        <ClickStepsProvider currentClickOverride={activeStep}>
          <SlideList
            title={listTitle || undefined}
            variant={variant}
            revealMode={revealMode}
            delayMs={delayMs}
            items={items}
          />
        </ClickStepsProvider>
      </div>
    </div>
  );

  const codeText = `import { SlideList } from '@/features/presentation';

<SlideList
  title="${listTitle}"
  variant="${variant}"
  revealMode="${revealMode}"
  delayMs={${delayMs}}
  items={[
    {
      title: "Structural Thickness:",
      text: "Maintain a 0.150m minimum bound for all floor slabs to resist shear load.",
    },
    {
      title: "Calculation Precision:",
      text: "Round intermediate values to 4 decimals, and final outputs to exactly 3 decimals.",
    },
    {
      title: "Material Grading:",
      text: "Ensure concrete grade is minimum C25/30 for load-bearing structures.",
    },
  ]}
/>`;

  const editorContent = (
    <div className="text-slate-300 space-y-2 text-[11px] font-mono">
      <div>
        <span className="text-purple-400">import</span> {'{ SlideList }'} <span className="text-purple-400">from</span> <span className="text-amber-300">"@/features/presentation"</span>;
      </div>
      <div>
        <span className="text-blue-400">&lt;SlideList</span>
      </div>
      <div className="pl-4">
        <span className="text-teal-400">title</span>=<span className="text-amber-300">"</span>
        <input
          type="text"
          value={listTitle}
          onChange={(e) => setListTitle(e.target.value)}
          className="bg-slate-900 border border-white/10 rounded px-1.5 py-0.5 text-amber-300 focus:outline-none focus:border-primary/50 w-44 font-mono text-[11px] inline-block font-bold"
        />
        <span className="text-amber-300">"</span>
      </div>
      <div className="pl-4">
        <span className="text-teal-400">variant</span>=<span className="text-amber-300">"</span>
        <select
          value={variant}
          onChange={(e) => setVariant(e.target.value as any)}
          className="bg-slate-900 border border-white/10 rounded px-1.5 py-0.5 text-teal-400 focus:outline-none focus:border-primary/50 font-mono text-[11px] inline-block cursor-pointer"
        >
          <option value="default">default</option>
          <option value="plain">plain</option>
        </select>
        <span className="text-amber-300">"</span>
      </div>
      <div className="pl-4">
        <span className="text-teal-400">revealMode</span>=<span className="text-amber-300">"</span>
        <select
          value={revealMode}
          onChange={(e) => {
            const nextMode = e.target.value as any;
            setRevealMode(nextMode);
            setActiveStep(1);
          }}
          className="bg-slate-900 border border-white/10 rounded px-1.5 py-0.5 text-teal-400 focus:outline-none focus:border-primary/50 font-mono text-[11px] inline-block cursor-pointer font-bold"
        >
          <option value="each-click">each-click (default)</option>
          <option value="all-click">all-click</option>
          <option value="auto-stagger">auto-stagger</option>
          <option value="none">none</option>
        </select>
        <span className="text-amber-300">"</span>
      </div>

      {revealMode === 'auto-stagger' && (
        <div className="pl-4">
          <span className="text-teal-400">delayMs</span>=<span className="text-pink-400">&#123;</span>
          <input
            type="number"
            value={delayMs}
            min={100}
            max={2000}
            step={50}
            onChange={(e) => setDelayMs(parseInt(e.target.value) || 250)}
            className="bg-slate-900 border border-white/10 rounded px-1.5 py-0.5 text-orange-400 focus:outline-none focus:border-primary/50 w-16 font-mono text-[11px] inline-block"
          />
          <span className="text-pink-400">&#125;</span>
        </div>
      )}

      <div className="pl-4">
        <span className="text-teal-400">items</span>=<span className="text-pink-400">&#123;</span><span className="text-slate-400">[ ...ItemsData ]</span><span className="text-pink-400">&#125;</span>
      </div>
      <div>
        <span className="text-blue-400">/&gt;</span>
      </div>
    </div>
  );

  return (
    <PlaygroundSection
      title="Lists & Bullets"
      description={
        <span>
          Use <code>&lt;SlideList&gt;</code> and <code>&lt;SlideBullet&gt;</code> to render styled lists in slides. Customize list activation using <code>revealMode</code>: <code>each-click</code> (reveal item-by-item on clicks), <code>all-click</code> (reveal list content all at once), and <code>auto-stagger</code> (reveal items staggered with an inline CSS transition-delay).
        </span>
      }
      preview={preview}
      codeText={codeText}
      editorContent={editorContent}
    />
  );
};

export default ListsSection;
