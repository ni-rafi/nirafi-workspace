import React, { useState } from 'react';
import { SlideList } from '@/features/presentation/components/elements/SlideList';
import { ClickHighlight, HighlightVariant } from '@/features/presentation/components/elements/ClickHighlight';
import { ClickStepsProvider } from '@/features/presentation';
import { Button } from '@/components/ui/button';
import { PlaygroundSection } from './PlaygroundSection';

export const ListsSection: React.FC = () => {
  const [listTitle, setListTitle] = useState('Measurement Guidelines');
  const [variant, setVariant] = useState<'default' | 'plain'>('default');
  
  // Item 1 variables
  const [item1Title, setItem1Title] = useState('Thickness bounds:');
  const [item1Highlight, setItem1Highlight] = useState<HighlightVariant>('paint');
  const [item1At, setItem1At] = useState(1);
  const [item1HighlightText, setItem1HighlightText] = useState('0.150m minimum');

  // Item 2 variables
  const [item2Title, setItem2Title] = useState('Precision:');
  const [item2Text, setItem2Text] = useState('Round outputs to exactly 3 decimal places.');

  const [activeStep, setActiveStep] = useState(1);

  const items = [
    {
      title: item1Title || undefined,
      text: (
        <span>
          Maintain{' '}
          <ClickHighlight at={item1At} variant={item1Highlight}>
            {item1HighlightText || ' '}
          </ClickHighlight>{' '}
          for all floor slabs.
        </span>
      ),
    },
    {
      title: item2Title || undefined,
      text: item2Text,
    },
  ];

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
            Step 0
          </Button>
          <Button
            size="xs"
            variant={activeStep >= item1At ? 'default' : 'outline'}
            onClick={() => setActiveStep(item1At)}
            className="h-6 text-[9px] font-mono cursor-pointer"
          >
            Step {item1At} (Highlight)
          </Button>
        </div>
      </div>

      <div className="border border-border/40 p-4 rounded-xl bg-card">
        <ClickStepsProvider currentClickOverride={activeStep}>
          <SlideList
            title={listTitle || undefined}
            variant={variant}
            items={items}
          />
        </ClickStepsProvider>
      </div>
    </div>
  );

  const codeText = `import { SlideList, ClickHighlight } from '@/features/presentation';

<SlideList
  title="${listTitle}"
  variant="${variant}"
  items={[
    {
      title: "${item1Title}",
      text: (
        <span>
          Maintain{' '}
          <ClickHighlight at={${item1At}} variant="${item1Highlight}">
            ${item1HighlightText}
          </ClickHighlight>{' '}
          for all floor slabs.
        </span>
      ),
    },
    {
      title: "${item2Title}",
      text: "${item2Text}",
    },
  ]}
/>`;

  const editorContent = (
    <div className="text-slate-300">
      <span className="text-purple-400">import</span> {'{ SlideList, ClickHighlight }'} <span className="text-purple-400">from</span> <span className="text-amber-300">"@/features/presentation"</span>;{"\n\n"}
      <span className="text-blue-400">&lt;SlideList</span>{"\n"}
      {"  "}<span className="text-teal-400">title</span>=<span className="text-amber-300">"</span>
      <input
        type="text"
        value={listTitle}
        onChange={(e) => setListTitle(e.target.value)}
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
        <option value="plain">plain</option>
      </select>
      <span className="text-amber-300">"</span>{"n"}
      {"  "}<span className="text-teal-400">items</span>=<span className="text-pink-400">&#123;</span><span className="text-slate-400">[</span>{"\n"}
      {"    "}<span className="text-slate-400">&#123;</span>{"\n"}
      {"      "}<span className="text-teal-400">title</span>: <span className="text-amber-300">"</span>
      <input
        type="text"
        value={item1Title}
        onChange={(e) => setItem1Title(e.target.value)}
        className="bg-slate-900 border border-white/10 rounded px-1.5 py-0.5 text-amber-300 focus:outline-none focus:border-primary/50 w-32 font-mono text-[11px] inline-block"
      />
      <span className="text-amber-300">"</span>,{"\n"}
      {"      "}<span className="text-teal-400">text</span>: ({"\n"}
      {"        "}<span className="text-blue-400">&lt;span&gt;</span>{"\n"}
      {"          "}Maintain&#123;' '&#125;{"\n"}
      {"          "}<span className="text-blue-400">&lt;ClickHighlight</span> <span className="text-teal-400">at</span>=<span className="text-pink-400">&#123;</span>
      <input
        type="number"
        value={item1At}
        min={0}
        max={10}
        onChange={(e) => setItem1At(parseInt(e.target.value) || 1)}
        className="bg-slate-900 border border-white/10 rounded px-1.5 py-0.5 text-orange-400 focus:outline-none focus:border-primary/50 w-10 font-mono text-[11px] inline-block"
      />
      <span className="text-pink-400">&#125;</span> <span className="text-teal-400">variant</span>=<span className="text-amber-300">"</span>
      <select
        value={item1Highlight}
        onChange={(e) => setItem1Highlight(e.target.value as HighlightVariant)}
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
      {"            "}
      <input
        type="text"
        value={item1HighlightText}
        onChange={(e) => setItem1HighlightText(e.target.value)}
        className="bg-slate-900 border border-white/10 rounded px-1.5 py-0.5 text-slate-100 focus:outline-none focus:border-primary/50 w-36 font-mono text-[11px] inline-block"
      />
      {"\n"}
      {"          "}<span className="text-blue-400">&lt;/ClickHighlight&gt;</span>{"\n"}
      {"          "}&#123;' '&#125;for all floor slabs.{"\n"}
      {"        "}<span className="text-blue-400">&lt;/span&gt;</span>{"\n"}
      {"      "}),{"\n"}
      {"    "}<span className="text-slate-400">&#125;</span>,{"\n"}
      {"    "}<span className="text-slate-400">&#123;</span>{"\n"}
      {"      "}<span className="text-teal-400">title</span>: <span className="text-amber-300">"</span>
      <input
        type="text"
        value={item2Title}
        onChange={(e) => setItem2Title(e.target.value)}
        className="bg-slate-900 border border-white/10 rounded px-1.5 py-0.5 text-amber-300 focus:outline-none focus:border-primary/50 w-24 font-mono text-[11px] inline-block"
      />
      <span className="text-amber-300">"</span>,{"\n"}
      {"      "}<span className="text-teal-400">text</span>: <span className="text-amber-300">"</span>
      <input
        type="text"
        value={item2Text}
        onChange={(e) => setItem2Text(e.target.value)}
        className="bg-slate-900 border border-white/10 rounded px-1.5 py-0.5 text-amber-300 focus:outline-none focus:border-primary/50 w-52 font-mono text-[11px] inline-block"
      />
      <span className="text-amber-300">"</span>,{"\n"}
      {"    "}<span className="text-slate-400">&#125;</span>,{"\n"}
      {"  "}<span className="text-slate-400">]</span><span className="text-pink-400">&#125;</span>{"\n"}
      <span className="text-blue-400">/&gt;</span>
    </div>
  );

  return (
    <PlaygroundSection
      title="Lists & Bullets"
      description={
        <span>
          Use <code>&lt;SlideList&gt;</code> and <code>&lt;SlideBullet&gt;</code> to render lists. Highlight specific markers or details by nesting <code>&lt;ClickHighlight&gt;</code> inside bullet text arrays.
        </span>
      }
      preview={preview}
      codeText={codeText}
      editorContent={editorContent}
    />
  );
};

export default ListsSection;
