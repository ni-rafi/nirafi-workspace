import React, { useState } from 'react';
import { PlaygroundSection } from './PlaygroundSection';

type LayoutType = 'title' | 'twocolumn' | 'fullwidth' | 'grid' | 'thankyou';

export const LayoutsSection: React.FC = () => {
  const [layoutType, setLayoutType] = useState<LayoutType>('twocolumn');
  const [title, setTitle] = useState('Reinforcement Estimation');
  const [bgVariant, setBgVariant] = useState<'default' | 'calculation' | 'gallery'>('default');

  const renderWireframe = () => {
    switch (layoutType) {
      case 'title':
        return (
          <div className="w-full aspect-video border border-border/60 bg-muted/10 rounded-lg p-5 flex flex-col justify-between font-mono text-[9px] text-muted-foreground select-none">
            <div className="border border-dashed p-1.5 text-center text-primary font-bold text-xs">Title Header Area</div>
            <div className="flex flex-col gap-2 py-4">
              <div className="border border-dashed p-1 text-center">Subtitle Element</div>
              <div className="border border-dashed p-1 text-center">Description Text block</div>
            </div>
            <div className="flex justify-between border-t border-dashed pt-1.5">
              <span>Presenter Info</span>
              <span>Academic Department</span>
            </div>
          </div>
        );
      case 'twocolumn':
        return (
          <div className="w-full aspect-video border border-border/60 bg-muted/10 rounded-lg p-3 flex flex-col justify-between font-mono text-[9px] text-muted-foreground select-none">
            <div className="border border-dashed p-1 text-primary font-bold text-center mb-2">Slide Title: {title}</div>
            <div className="flex-1 flex gap-2 min-h-0 items-stretch">
              <div className="w-1/2 border border-dashed border-emerald-500/50 bg-emerald-500/5 p-2 flex flex-col items-center justify-center text-center">Left Column Content</div>
              <div className="w-1/2 border border-dashed border-blue-500/50 bg-blue-500/5 p-2 flex flex-col items-center justify-center text-center">Right Column Content</div>
            </div>
            <div className="border-t border-dashed mt-2 pt-1 text-center">Footer info</div>
          </div>
        );
      case 'fullwidth':
        return (
          <div className="w-full aspect-video border border-border/60 bg-muted/10 rounded-lg p-3 flex flex-col justify-between font-mono text-[9px] text-muted-foreground select-none">
            <div className="border border-dashed p-1 text-primary font-bold text-center mb-2">Slide Title: {title}</div>
            <div className="flex-1 border border-dashed border-amber-500/50 bg-amber-500/5 p-2 flex items-center justify-center text-center">
              Full Screen Width Panel
            </div>
            <div className="border-t border-dashed mt-2 pt-1 text-center">Footer info</div>
          </div>
        );
      case 'grid':
        return (
          <div className="w-full aspect-video border border-border/60 bg-muted/10 rounded-lg p-3 flex flex-col justify-between font-mono text-[9px] text-muted-foreground select-none">
            <div className="border border-dashed p-1 text-primary font-bold text-center mb-2">Slide Title: {title}</div>
            <div className="flex-1 grid grid-cols-2 gap-2 min-h-0">
              <div className="border border-dashed border-border/60 p-2 flex items-center justify-center text-center">Card 1</div>
              <div className="border border-dashed border-border/60 p-2 flex items-center justify-center text-center">Card 2</div>
              <div className="border border-dashed border-border/60 p-2 flex items-center justify-center text-center">Card 3</div>
              <div className="border border-dashed border-border/60 p-2 flex items-center justify-center text-center">Card 4</div>
            </div>
            <div className="border-t border-dashed mt-2 pt-1 text-center">Footer info</div>
          </div>
        );
      case 'thankyou':
        return (
          <div className="w-full aspect-video border border-border/60 bg-muted/10 rounded-lg p-5 flex flex-col items-center justify-center font-mono text-[9px] text-muted-foreground select-none text-center gap-2">
            <div className="text-xl font-bold text-primary">THANK YOU</div>
            <div className="border border-dashed p-1 px-4">Q&amp;A Details</div>
          </div>
        );
    }
  };

  const getCodeText = () => {
    switch (layoutType) {
      case 'title':
        return `import { TitleLayout } from '@/shared/layouts/TitleLayout';

<TitleLayout
  title="${title}"
  subtitle="Course Session 2026-27"
  description="Volumetric casting analysis and scheduling methodologies."
  footer="Academic Department"
/>`;
      case 'twocolumn':
        return `import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';

<TwoColumnLayout
  title="${title}"
  bgVariant="${bgVariant}"
  leftWidth="50%"
  leftContent={<p>Left-hand content parameters</p>}
  rightContent={<p>Right-hand visualization output</p>}
  footer="Volumetric Calculator Sandbox"
/>`;
      case 'fullwidth':
        return `import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';

<FullWidthLayout
  title="${title}"
  bgVariant="${bgVariant}"
  footer="Spreadsheet Data View"
>
  <p>Single wide block layout content goes here</p>
</FullWidthLayout>`;
      case 'grid':
        return `import { GridLayout } from '@/shared/layouts/GridLayout';

<GridLayout
  title="${title}"
  cols={2}
  bgVariant="${bgVariant}"
>
  <div>Card A</div>
  <div>Card B</div>
  <div>Card C</div>
  <div>Card D</div>
</GridLayout>`;
      case 'thankyou':
        return `import { ThankYouLayout } from '@/shared/layouts/ThankYouLayout';

<ThankYouLayout
  title="Thank You"
  subtitle="Questions & Answers session"
/>`;
    }
  };

  const editorContent = (
    <div className="text-slate-300">
      <span className="text-purple-400">import</span> <span className="text-teal-400">Layout</span> <span className="text-purple-400">from</span> <span className="text-amber-300">"@/shared/layouts/..."</span>;{"\n\n"}
      <span className="text-muted-foreground">// Choose Layout Type:</span>{"\n"}
      &lt;<span className="text-blue-400">LayoutSelector</span> <span className="text-teal-400">type</span>=<span className="text-amber-300">"</span>
      <select
        value={layoutType}
        onChange={(e) => setLayoutType(e.target.value as LayoutType)}
        className="bg-slate-900 border border-white/10 rounded px-1.5 py-0.5 text-teal-400 focus:outline-none focus:border-primary/50 font-mono text-[11px] inline-block cursor-pointer font-bold"
      >
        <option value="title">TitleLayout</option>
        <option value="twocolumn">TwoColumnLayout</option>
        <option value="fullwidth">FullWidthLayout</option>
        <option value="grid">GridLayout</option>
        <option value="thankyou">ThankYouLayout</option>
      </select>
      <span className="text-amber-300">"</span> /&gt;{"\n\n"}

      <span className="text-muted-foreground">// Tweak Props:</span>{"\n"}
      {"  "}<span className="text-teal-400">title</span>=<span className="text-amber-300">"</span>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="bg-slate-900 border border-white/10 rounded px-1.5 py-0.5 text-slate-100 focus:outline-none focus:border-primary/50 w-40 font-mono text-[11px] inline-block font-bold"
      />
      <span className="text-amber-300">"</span>{"\n"}
      {"  "}<span className="text-teal-400">bgVariant</span>=<span className="text-amber-300">"</span>
      <select
        value={bgVariant}
        onChange={(e) => setBgVariant(e.target.value as any)}
        className="bg-slate-900 border border-white/10 rounded px-1.5 py-0.5 text-teal-400 focus:outline-none focus:border-primary/50 font-mono text-[11px] inline-block cursor-pointer"
      >
        <option value="default">default (grey)</option>
        <option value="calculation">calculation (light primary)</option>
        <option value="gallery">gallery (light slate)</option>
      </select>
      <span className="text-amber-300">"</span>
    </div>
  );

  return (
    <PlaygroundSection
      title="Slide Layouts & Wireframes"
      description={
        <span>
          Layouts under <code>src/shared/layouts/</code> arrange slide grids. They consume the presentation context to automatically switch styling between PowerPoint-style presentations and continuous vertical Blog Articles.
        </span>
      }
      preview={renderWireframe()}
      codeText={getCodeText()}
      editorContent={editorContent}
    />
  );
};

export default LayoutsSection;
