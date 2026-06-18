import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlaygroundSection } from './PlaygroundSection';

export const ComposingSection: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState<1 | 2 | 3>(1);

  const renderSlidePreview = () => {
    switch (activeSlide) {
      case 1:
        return (
          <div className="w-full aspect-video border-2 border-primary/50 bg-slate-900 rounded-lg p-5 flex flex-col justify-between text-slate-200 select-none">
            <span className="text-[8px] font-mono text-muted-foreground uppercase">Slide 1: Cover Page</span>
            <div className="flex flex-col items-center gap-1.5 py-4 text-center">
              <h2 className="text-sm font-extrabold text-primary uppercase">Brickwork Calculations</h2>
              <p className="text-[10px] text-muted-foreground">Session 2026-27 • Lecture 2</p>
            </div>
            <div className="text-[9px] text-right font-mono text-muted-foreground/60">CE-QS Academic Department</div>
          </div>
        );
      case 2:
        return (
          <div className="w-full aspect-video border-2 border-primary/50 bg-slate-900 rounded-lg p-4 flex flex-col justify-between text-slate-200 select-none">
            <span className="text-[8px] font-mono text-muted-foreground uppercase">Slide 2: Sandbox</span>
            <div className="grid grid-cols-2 gap-3 flex-1 min-h-0 pt-2 items-center">
              <div className="border border-dashed p-1.5 text-[9px] text-center text-emerald-400 bg-emerald-500/5">Interactive Slider Panel</div>
              <div className="border border-dashed p-1.5 text-[9px] text-center text-blue-400 bg-blue-500/5">Live Computation Badge</div>
            </div>
            <div className="text-[8px] text-center font-mono text-muted-foreground/60">Parameters (SI Meters)</div>
          </div>
        );
      case 3:
        return (
          <div className="w-full aspect-video border-2 border-primary/50 bg-slate-900 rounded-lg p-5 flex flex-col justify-between text-slate-200 select-none">
            <span className="text-[8px] font-mono text-muted-foreground uppercase">Slide 3: Quiz</span>
            <div className="flex flex-col items-center justify-center flex-1 gap-2 text-center py-2">
              <div className="text-[10px] font-bold text-amber-400">Classroom Poll Question:</div>
              <div className="border border-dashed p-2 text-[9px] w-full max-w-[200px]">Numeric input quiz gate</div>
            </div>
            <div className="text-[8px] text-center font-mono text-muted-foreground/60">Real-Time Quiz Gateway</div>
          </div>
        );
    }
  };

  const codeText = `import React from 'react';
import { TitleLayout, TwoColumnLayout, FullWidthLayout } from '@/shared/layouts';
import { SlideContent, ParameterSlider, QuizCardOrchestrator } from '@/features/presentation';

// Slide 1: Cover
const Slide1 = () => (
  <TitleLayout title="Brickwork Lecture" subtitle="Session 2026" />
);

// Slide 2: Estimator Sandbox
const Slide2 = () => (
  <TwoColumnLayout
    title="Interactive Sandbox"
    leftContent={<p>Sliders parameters</p>}
    rightContent={<p>Volume output</p>}
  />
);

// Slide 3: Live Quiz Gate
const Slide3 = () => (
  <FullWidthLayout title="Brickwork Quiz">
    <QuizCardOrchestrator quizId="brick_lec2_q1" quizType="numeric-input" />
  </FullWidthLayout>
);

// Group slides inside the Registry
export const slides: Record<number, React.ComponentType<any>> = {
  1: Slide1,
  2: Slide2,
  3: Slide3,
};

// Add navigation titles to the slides selector list
export const slideMetadata: Record<number, { title: string; type: string; section: string }> = {
  1: { title: 'Cover Slide', type: 'Cover', section: 'Introduction' },
  2: { title: 'Sandbox', type: 'Live Simulator', section: 'Calculations' },
  3: { title: 'Quiz Gate', type: 'Numeric Quiz', section: 'Check' },
};`;

  const editorContent = (
    <div className="text-slate-300">
      <span className="text-purple-400">const</span> Slide1 = () =&gt; &lt;<span className="text-teal-400">TitleLayout</span> ... /&gt;;{"\n"}
      <span className="text-purple-400">const</span> Slide2 = () =&gt; &lt;<span className="text-teal-400">TwoColumnLayout</span> ... /&gt;;{"\n"}
      <span className="text-purple-400">const</span> Slide3 = () =&gt; &lt;<span className="text-teal-400">FullWidthLayout</span> ... /&gt;;{"\n\n"}
      
      <span className="text-muted-foreground">// Slide Registry:</span>{"\n"}
      <span className="text-purple-400">export const</span> slides: <span className="text-teal-400">Record</span>&lt;<span className="text-teal-400">number</span>, React.FC&gt; = <span className="text-pink-400">&#123;</span>{"\n"}
      {"  "}1: Slide1, <span className="text-muted-foreground">// active cover slide</span>{"\n"}
      {"  "}2: Slide2, <span className="text-muted-foreground">// active sandbox slider slide</span>{"\n"}
      {"  "}3: Slide3, <span className="text-muted-foreground">// active quiz slide</span>{"\n"}
      <span className="text-pink-400">&#125;</span>;{"\n\n"}

      <span className="text-muted-foreground">// Active Selector Index (Click to simulate):</span>{"\n"}
      <div className="flex gap-1.5 mt-2">
        <Button
          size="xs"
          variant={activeSlide === 1 ? 'default' : 'secondary'}
          onClick={() => setActiveSlide(1)}
          className="h-6 text-[10px] font-mono cursor-pointer"
        >
          slides[1]
        </Button>
        <Button
          size="xs"
          variant={activeSlide === 2 ? 'default' : 'secondary'}
          onClick={() => setActiveSlide(2)}
          className="h-6 text-[10px] font-mono cursor-pointer"
        >
          slides[2]
        </Button>
        <Button
          size="xs"
          variant={activeSlide === 3 ? 'default' : 'secondary'}
          onClick={() => setActiveSlide(3)}
          className="h-6 text-[10px] font-mono cursor-pointer"
        >
          slides[3]
        </Button>
      </div>
    </div>
  );

  return (
    <PlaygroundSection
      title="Lecture Deck Composition"
      description={
        <span>
          Slide decks are grouped inside a single <code>lecture.tsx</code> registration file. Set up each slide as a standalone component, then register them in the exported <code>slides</code> and <code>slideMetadata</code> lists.
        </span>
      }
      preview={
        <div className="flex flex-col gap-4 w-full">
          <div className="flex items-center gap-1.5 bg-muted/30 border border-border/50 rounded-xl p-2.5 justify-between select-none">
            <span className="text-[10px] font-bold text-muted-foreground uppercase">Slide Navigator Simulator</span>
            <span className="text-[10px] font-mono text-primary font-bold">{activeSlide} / 3</span>
          </div>
          {renderSlidePreview()}
        </div>
      }
      codeText={codeText}
      editorContent={editorContent}
    />
  );
};

export default ComposingSection;
