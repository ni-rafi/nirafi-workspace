import React from 'react';
import { Play, Sun, Moon, ChevronDown, Printer, FileDown, Palette, BookOpen, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSlideViewerOrchestrator } from '../../hooks/useSlideViewerOrchestrator';

interface DesktopHeaderActionsProps {
  orchestrator: ReturnType<typeof useSlideViewerOrchestrator>;
  setIsThemePlaygroundOpen: (open: boolean) => void;
  isAdmin: boolean;
  onPrintTutorial: () => void;
}

export const DesktopHeaderActions: React.FC<DesktopHeaderActionsProps> = ({
  orchestrator,
  setIsThemePlaygroundOpen,
  isAdmin,
  onPrintTutorial,
}) => {
  const {
    subjectId,
    sessionId,
    lectureId,
    presenterFeatures,
    navigateWithTransition,
  } = orchestrator;

  return (
    <div className="hidden xl:flex items-center gap-3">
      {/* Theme customizer button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsThemePlaygroundOpen(true)}
        className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground"
        title="Customize Theme"
      >
        <Palette className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={presenterFeatures.handleToggleDark}
        className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground"
      >
        {presenterFeatures.isDark ? <Sun className="h-4 w-4 text-amber-500" /> : <Moon className="h-4 w-4" />}
      </Button>

      {/* Blog Mode Toggle */}
      <Button
        variant={orchestrator.viewMode === 'blog' ? 'default' : 'outline'}
        size="sm"
        onClick={() => {
          if (orchestrator.viewMode === 'blog') {
            navigateWithTransition(`/${subjectId}/${sessionId}/${lectureId}`);
          } else {
            navigateWithTransition(`/${subjectId}/${sessionId}/${lectureId}/blog`);
          }
        }}
        className="flex items-center gap-1.5 font-semibold shadow-xs"
        title={orchestrator.viewMode === 'blog' ? 'Switch to Slide View' : 'Switch to Blog Mode'}
      >
        <BookOpen className="h-3.5 w-3.5" />
        <span>
          {orchestrator.viewMode === 'blog' ? 'Slide View' : 'Blog Mode'}
        </span>
      </Button>

      {/* PDF export — tutorials use react-to-print; lectures use the existing print URL */}
      {orchestrator.activeLec?.type === 'tutorial' ? (
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1.5 font-semibold shadow-xs"
          onClick={onPrintTutorial}
        >
          <FileDown className="h-3.5 w-3.5 text-muted-foreground" />
          <span>Download PDF</span>
        </Button>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1.5 font-semibold shadow-xs"
            >
              <span>Export PDF</span>
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem asChild>
              <a
                href={`/${subjectId}/${sessionId}/${lectureId}?print=true`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 cursor-pointer w-full text-xs"
              >
                <Printer className="h-3.5 w-3.5 text-muted-foreground" />
                <span>Export PDF (Normal)</span>
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a
                href={`/${subjectId}/${sessionId}/${lectureId}?print=true&annotations=true`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 cursor-pointer w-full text-xs"
              >
                <FileDown className="h-3.5 w-3.5 text-muted-foreground" />
                <span>Export with Annotations</span>
              </a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {isAdmin && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            orchestrator.navigateWithTransition(`/playground/${subjectId}/${sessionId}/${lectureId}/shapes`);
          }}
          className="flex items-center gap-1.5 font-semibold shadow-xs border-primary/30 hover:bg-primary/5 hover:text-primary text-foreground"
        >
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <span>Canvas Designer</span>
        </Button>
      )}

      <Button
        size="sm"
        onClick={() => {
          navigateWithTransition(`/${subjectId}/${sessionId}/${lectureId}/1`);
        }}
        className="flex items-center gap-1.5 font-semibold shadow-xs"
      >
        <Play className="h-3.5 w-3.5 fill-current" />
        <span>Start Presentation</span>
      </Button>
    </div>
  );
};

export default DesktopHeaderActions;
