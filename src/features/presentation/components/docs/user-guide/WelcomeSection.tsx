import React from 'react';
import { BookOpen, GraduationCap, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WelcomeSectionProps {
  onNavigateToSection: (section: string) => void;
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({ onNavigateToSection }) => {
  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-200 text-left">
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-extrabold text-foreground tracking-tight">Welcome to the Lecture Workspace</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          This workspace is a highly interactive, real-time academic presentation platform designed for delivering slides, conducting live student quizzes, and running real-time calculations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2 p-4 bg-muted/20 border border-border/60 rounded-xl">
          <div className="p-2 bg-primary/10 rounded-lg w-fit text-primary">
            <GraduationCap className="h-5 w-5" />
          </div>
          <h4 className="text-xs font-bold text-foreground mt-1">For Students</h4>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Participate in live classes, answer interactive questions and math quizzes in real-time, customize theme layouts, and export study handouts.
          </p>
        </div>

        <div className="flex flex-col gap-2 p-4 bg-muted/20 border border-border/60 rounded-xl">
          <div className="p-2 bg-primary/10 rounded-lg w-fit text-primary">
            <BookOpen className="h-5 w-5" />
          </div>
          <h4 className="text-xs font-bold text-foreground mt-1">For Presenters & Creators</h4>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Customize slide layouts, author interactive templates, activate live synchronized questions, and capture class response analytics.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 p-4 bg-primary/5 border border-primary/10 rounded-xl">
        <h4 className="text-xs font-bold text-foreground">Getting Started</h4>
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          Explore the user guide sections using the navigation menu. Learn how to navigate decks, toggle responsive modes, answer live quizzes, and export slides.
        </p>
        <div className="flex flex-wrap gap-2.5 mt-1">
          <Button 
            size="sm" 
            variant="default" 
            onClick={() => onNavigateToSection('shortcuts')}
            className="h-8 text-xs cursor-pointer"
          >
            Keyboard Navigation <ChevronRight className="h-3.5 w-3.5 ml-1" />
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => onNavigateToSection('quizzes')}
            className="h-8 text-xs cursor-pointer"
          >
            Live Quizzes Guide
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
