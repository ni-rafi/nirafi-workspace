import React, { useState } from 'react';
import { SlideTable } from '@/features/presentation/components/elements/SlideTable';
import { ClickHighlight } from '@/features/presentation/components/elements/ClickHighlight';
import { ClickStepsProvider } from '@/features/presentation';
import { Button } from '@/components/ui/button';
import { PlaygroundSection } from './PlaygroundSection';

export const TablesSection: React.FC = () => {
  const [striped, setStriped] = useState(true);
  const [bordered, setBordered] = useState(true);
  const [hoverable, setHoverable] = useState(true);
  const [activeStep, setActiveStep] = useState(1);
  const [highlightVal, setHighlightVal] = useState('12.500');

  const headers = [
    { label: 'Item Code', align: 'left' as const },
    { label: 'Description', align: 'left' as const },
    { label: 'Qty', align: 'right' as const },
    { label: 'Unit', align: 'center' as const }
  ];

  const rows = [
    [
      '1.1',
      'In-situ columns grade C30',
      <ClickHighlight key="c1" at={1} variant="paint">{highlightVal || ' '}</ClickHighlight>,
      'm³'
    ],
    [
      '1.2',
      'Reinforcement bars high yield steel',
      '1,240',
      'kg'
    ]
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
            variant={activeStep >= 1 ? 'default' : 'outline'}
            onClick={() => setActiveStep(1)}
            className="h-6 text-[9px] font-mono cursor-pointer"
          >
            Step 1 (Highlight Cell)
          </Button>
        </div>
      </div>

      <ClickStepsProvider currentClickOverride={activeStep}>
        <SlideTable
          headers={headers}
          rows={rows}
          striped={striped}
          bordered={bordered}
          hoverable={hoverable}
        />
      </ClickStepsProvider>
    </div>
  );

  const codeText = `import { SlideTable, ClickHighlight } from '@/features/presentation';

const headers = [
  { label: 'Item Code', align: 'left' },
  { label: 'Description', align: 'left' },
  { label: 'Qty', align: 'right' },
  { label: 'Unit', align: 'center' }
];

const rows = [
  [
    '1.1',
    'In-situ columns grade C30',
    <ClickHighlight at={1} variant="paint">${highlightVal}</ClickHighlight>,
    'm³'
  ],
  [
    '1.2',
    'Reinforcement bars high yield steel',
    '1,240',
    'kg'
  ]
];

<SlideTable
  headers={headers}
  rows={rows}
  striped={${striped}}
  bordered={${bordered}}
  hoverable={${hoverable}}
/>`;

  const editorContent = (
    <div className="text-slate-300">
      <span className="text-purple-400">import</span> {'{ SlideTable, ClickHighlight }'} <span className="text-purple-400">from</span> <span className="text-amber-300">"@/features/presentation"</span>;{"\n\n"}
      <span className="text-purple-400">const</span> rows = <span className="text-slate-400">[</span>{"\n"}
      {"  "}<span className="text-slate-400">[</span>'1.1', 'In-situ columns', &lt;ClickHighlight at=&#123;1&#125;&gt;
      <input
        type="text"
        value={highlightVal}
        onChange={(e) => setHighlightVal(e.target.value)}
        className="bg-slate-900 border border-white/10 rounded px-1.5 py-0.5 text-slate-100 focus:outline-none focus:border-primary/50 w-20 font-mono text-[11px] inline-block"
      />
      &lt;/ClickHighlight&gt;, 'm³'<span className="text-slate-400">]</span>,{"\n"}
      <span className="text-slate-400">]</span>;{"\n\n"}
      <span className="text-blue-400">&lt;SlideTable</span>{"\n"}
      {"  "}<span className="text-teal-400">headers</span>=<span className="text-pink-400">&#123;</span>headers<span className="text-pink-400">&#125;</span>{"\n"}
      {"  "}<span className="text-teal-400">rows</span>=<span className="text-pink-400">&#123;</span>rows<span className="text-pink-400">&#125;</span>{"\n"}
      {"  "}<span className="text-teal-400">striped</span>=<span className="text-pink-400">&#123;</span>
      <select
        value={String(striped)}
        onChange={(e) => setStriped(e.target.value === 'true')}
        className="bg-slate-900 border border-white/10 rounded px-1.5 py-0.5 text-purple-400 focus:outline-none focus:border-primary/50 font-mono text-[11px] inline-block cursor-pointer"
      >
        <option value="true">true</option>
        <option value="false">false</option>
      </select>
      <span className="text-pink-400">&#125;</span>{"\n"}
      {"  "}<span className="text-teal-400">bordered</span>=<span className="text-pink-400">&#123;</span>
      <select
        value={String(bordered)}
        onChange={(e) => setBordered(e.target.value === 'true')}
        className="bg-slate-900 border border-white/10 rounded px-1.5 py-0.5 text-purple-400 focus:outline-none focus:border-primary/50 font-mono text-[11px] inline-block cursor-pointer"
      >
        <option value="true">true</option>
        <option value="false">false</option>
      </select>
      <span className="text-pink-400">&#125;</span>{"\n"}
      {"  "}<span className="text-teal-400">hoverable</span>=<span className="text-pink-400">&#123;</span>
      <select
        value={String(hoverable)}
        onChange={(e) => setHoverable(e.target.value === 'true')}
        className="bg-slate-900 border border-white/10 rounded px-1.5 py-0.5 text-purple-400 focus:outline-none focus:border-primary/50 font-mono text-[11px] inline-block cursor-pointer"
      >
        <option value="true">true</option>
        <option value="false">false</option>
      </select>
      <span className="text-pink-400">&#125;</span>{"\n"}
      <span className="text-blue-400">/&gt;</span>
    </div>
  );

  return (
    <PlaygroundSection
      title="Tables & Cell-Level Highlights"
      description={
        <span>
          Use <code>&lt;SlideTable&gt;</code> to render grids. Headers accept alignment definitions. Rows accept any React nodes, meaning you can nest <code>&lt;ClickHighlight&gt;</code> directly inside cells to highlight data items.
        </span>
      }
      preview={preview}
      codeText={codeText}
      editorContent={editorContent}
    />
  );
};

export default TablesSection;
