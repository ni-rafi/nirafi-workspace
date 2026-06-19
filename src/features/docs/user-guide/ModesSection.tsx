import React from 'react';
import { Monitor, BookOpen, HelpCircle } from 'lucide-react';

export const ModesSection: React.FC = () => {
  const modesList = [
    {
      icon: Monitor,
      title: "Presentation Mode",
      useCase: "Active Lecturing",
      desc: "An immersive fullscreen presentation canvas. Standard keyboard navigation, live step-by-step click revealing, drawing pen overrides, and live timer analytics are fully active."
    },
    {
      icon: BookOpen,
      title: "Slide View (Scroll)",
      useCase: "Desktop Review",
      desc: "Renders deck slides as vertically stacked items inside cards. Perfect for desk study, jumping to specific slides using the sidebar, and editing values inside interactive sandbox widgets."
    },
    {
      icon: HelpCircle,
      title: "Blog Mode",
      useCase: "Reading & Mobile",
      desc: "Transforms slide contents into a responsive single-article structure (removing frames, layout headers, and footers). Simplifies lists and inline highlights for mobile-friendly study."
    }
  ];

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-200 text-left">
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-extrabold text-foreground tracking-tight">Adaptive View Modes</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Switch display modes inside the slide viewer toolbar depending on your study device or presenting objective.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
        {modesList.map((mode, i) => (
          <div key={i} className="flex flex-col gap-2.5 p-4 border border-border bg-card rounded-2xl shadow-xs hover:shadow-sm transition-shadow">
            <div className="p-2 bg-primary/10 rounded-lg w-fit text-primary">
              <mode.icon className="h-4.5 w-4.5" />
            </div>
            <div className="flex flex-col gap-0.5">
              <h4 className="text-xs font-bold text-foreground">{mode.title}</h4>
              <span className="text-[10px] uppercase font-mono font-bold text-primary tracking-wider">{mode.useCase}</span>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              {mode.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModesSection;
