import React from 'react';
import { Play, Sun, Moon, Printer, FileDown, Palette, BookOpen, Sparkles, MoreVertical, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import OnThisPage from '../layers/OnThisPage';
import { useSlideViewerOrchestrator } from '../../hooks/useSlideViewerOrchestrator';

interface MobileHeaderActionsProps {
  orchestrator: ReturnType<typeof useSlideViewerOrchestrator>;
  setIsThemePlaygroundOpen: (open: boolean) => void;
  isAdmin: boolean;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  collapsedSections: Record<string, boolean>;
  setCollapsedSections: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  onPrintTutorial: () => void;
}

export const MobileHeaderActions: React.FC<MobileHeaderActionsProps> = ({
  orchestrator,
  setIsThemePlaygroundOpen,
  isAdmin,
  scrollContainerRef,
  collapsedSections,
  setCollapsedSections,
  onPrintTutorial,
}) => {
  const [isMobileOutlineOpen, setIsMobileOutlineOpen] = React.useState(false);

  const {
    activeSub,
    activeSession,
    activeLec,
    activeSlide,
    subjectId,
    sessionId,
    lectureId,
    presenterFeatures,
    navigateWithTransition,
    visibleSlideNumbers,
  } = orchestrator;

  return (
    <div className="flex xl:hidden items-center gap-1.5">
      {/* Mobile Table of Slides Outline */}
      <Sheet open={isMobileOutlineOpen} onOpenChange={setIsMobileOutlineOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="h-8 w-8 rounded-md" title="Table of Slides">
            <List className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] sm:w-[360px] p-0 flex flex-col bg-card">
          <SheetHeader className="border-b px-6 py-4 flex flex-row items-center justify-between">
            <SheetTitle className="text-sm font-bold text-foreground">Table of Slides</SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto p-6">
            <OnThisPage
              subject={activeSub!}
              lecture={activeLec!}
              session={activeSession}
              visibleSlideNumbers={visibleSlideNumbers}
              activeSlide={activeSlide}
              scrollContainerRef={scrollContainerRef}
              collapsedSections={collapsedSections}
              setCollapsedSections={setCollapsedSections}
              viewMode={orchestrator.viewMode}
              onItemClick={() => setIsMobileOutlineOpen(false)}
            />
          </div>
        </SheetContent>
      </Sheet>

      {/* Blog/Slide View Mode Toggle */}
      <Button
        variant={orchestrator.viewMode === 'blog' ? 'default' : 'outline'}
        size="icon"
        onClick={() => {
          if (orchestrator.viewMode === 'blog') {
            navigateWithTransition(`/${subjectId}/${sessionId}/${lectureId}`);
          } else {
            navigateWithTransition(`/${subjectId}/${sessionId}/${lectureId}/blog`);
          }
        }}
        className="h-8 w-8 rounded-md"
        title={orchestrator.viewMode === 'blog' ? 'Switch to Slide View' : 'Switch to Blog Mode'}
      >
        <BookOpen className="h-4 w-4" />
      </Button>

      {/* Start Presentation */}
      <Button
        size="icon"
        onClick={() => navigateWithTransition(`/${subjectId}/${sessionId}/${lectureId}/1`)}
        className="h-8 w-8 rounded-md"
        title="Start Presentation"
      >
        <Play className="h-4 w-4 fill-current" />
      </Button>

      {/* More Actions */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => setIsThemePlaygroundOpen(true)} className="flex items-center gap-2 cursor-pointer text-xs">
            <Palette className="h-3.5 w-3.5 text-muted-foreground" />
            <span>Customize Theme</span>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={presenterFeatures.handleToggleDark} className="flex items-center gap-2 cursor-pointer text-xs">
            {presenterFeatures.isDark ? (
              <><Sun className="h-3.5 w-3.5 text-amber-500" /><span>Light Mode</span></>
            ) : (
              <><Moon className="h-3.5 w-3.5 text-muted-foreground" /><span>Dark Mode</span></>
            )}
          </DropdownMenuItem>

          {/* PDF — tutorials use react-to-print; lectures use print URL */}
          {activeLec?.type === 'tutorial' ? (
            <DropdownMenuItem onClick={onPrintTutorial} className="flex items-center gap-2 cursor-pointer text-xs">
              <FileDown className="h-3.5 w-3.5 text-muted-foreground" />
              <span>Download PDF</span>
            </DropdownMenuItem>
          ) : (
            <>
              <DropdownMenuItem asChild className="flex items-center gap-2 cursor-pointer text-xs">
                <a href={`/${subjectId}/${sessionId}/${lectureId}?print=true`} target="_blank" rel="noopener noreferrer">
                  <Printer className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>Export PDF (Normal)</span>
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="flex items-center gap-2 cursor-pointer text-xs">
                <a href={`/${subjectId}/${sessionId}/${lectureId}?print=true&annotations=true`} target="_blank" rel="noopener noreferrer">
                  <FileDown className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>Export with Annotations</span>
                </a>
              </DropdownMenuItem>
            </>
          )}

          {isAdmin && (
            <DropdownMenuItem
              onClick={() => orchestrator.navigateWithTransition(`/playground/${subjectId}/${sessionId}/${lectureId}/shapes`)}
              className="flex items-center gap-2 cursor-pointer text-xs"
            >
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span>Canvas Designer</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MobileHeaderActions;
