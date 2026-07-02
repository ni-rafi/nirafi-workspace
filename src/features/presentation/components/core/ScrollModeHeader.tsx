import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUserContext } from '@/context';
import { useSlideViewerOrchestrator } from '../../hooks/useSlideViewerOrchestrator';
import DesktopHeaderActions from './DesktopHeaderActions';
import MobileHeaderActions from './MobileHeaderActions';

interface ScrollModeHeaderProps {
  orchestrator: ReturnType<typeof useSlideViewerOrchestrator>;
  setIsThemePlaygroundOpen: (open: boolean) => void;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  collapsedSections: Record<string, boolean>;
  setCollapsedSections: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  onPrintTutorial: () => void;
}

export const ScrollModeHeader: React.FC<ScrollModeHeaderProps> = ({
  orchestrator,
  setIsThemePlaygroundOpen,
  scrollContainerRef,
  collapsedSections,
  setCollapsedSections,
  onPrintTutorial,
}) => {
  const navigate = useNavigate();
  const { userProfile } = useUserContext();
  const isAdmin = userProfile?.role === 'admin';

  const { activeSub, activeLec } = orchestrator;

  if (!activeSub || !activeLec) return null;

  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b bg-background/80 px-4 sm:px-6 backdrop-blur-md">
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/')}
          className="flex items-center gap-1 sm:gap-2 text-muted-foreground hover:text-foreground px-2 sm:px-3"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Portal</span>
        </Button>
        <div className="h-4 w-px bg-border" />
        <div className="flex flex-col text-left min-w-0">
          <span className="text-xs font-bold text-foreground truncate max-w-[120px] min-[400px]:max-w-[180px] sm:max-w-[280px] md:max-w-[340px] lg:max-w-[500px] xl:max-w-none">
            {activeLec.title}
          </span>
          <span className="text-[10px] text-muted-foreground truncate max-w-[120px] min-[400px]:max-w-[180px] sm:max-w-[280px] md:max-w-[340px] lg:max-w-[500px] xl:max-w-none">
            {activeSub.courseCode} <span className="hidden sm:inline">• {activeSub.courseTitle}</span>
          </span>
        </div>
      </div>

      <DesktopHeaderActions
        orchestrator={orchestrator}
        setIsThemePlaygroundOpen={setIsThemePlaygroundOpen}
        isAdmin={isAdmin}
        onPrintTutorial={onPrintTutorial}
      />

      <MobileHeaderActions
        orchestrator={orchestrator}
        setIsThemePlaygroundOpen={setIsThemePlaygroundOpen}
        isAdmin={isAdmin}
        scrollContainerRef={scrollContainerRef}
        collapsedSections={collapsedSections}
        setCollapsedSections={setCollapsedSections}
        onPrintTutorial={onPrintTutorial}
      />
    </header>
  );
};

export default ScrollModeHeader;
