import React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { ColorSchemeSelector } from '../ColorSchemeSelector';
import { ThemeToggle } from '../ThemeToggle';
import { SUBJECTS } from '@/config/lectures';

/**
 * Header renders the top navbar including breadcrumbs, sidebar trigger, and theme adjusters.
 */
export const Header: React.FC = () => {
  const location = useLocation();
  const { state, isMobile } = useSidebar();
  const { subjectId, sessionId, lectureId, slideNo } = useParams<{
    subjectId?: string;
    sessionId?: string;
    lectureId?: string;
    slideNo?: string;
  }>();

  const currentSubject = SUBJECTS.find((sub) => sub.id === subjectId);
  const currentSession = currentSubject?.sessions.find((sess) => sess.id === sessionId);
  const currentLecture = currentSession?.lectures.find((lec) => lec.id === lectureId);

  const showFullBrandInHeader = state === 'collapsed' || isMobile;

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full shrink-0 items-center justify-between border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4 bg-border/50 data-vertical:self-center" />
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center text-xs font-medium text-muted-foreground animate-in fade-in duration-300">
          <Link to="/" className="hover:text-foreground transition-colors font-bold text-foreground">
            {showFullBrandInHeader ? (
              <>
                <span className="hidden sm:inline">Rafi's Workspace</span>
                <span className="sm:hidden">Workspace</span>
              </>
            ) : (
              <span>Workspace</span>
            )}
          </Link>

          {location.pathname === '/docs' && (
            <>
              <span className="mx-2 font-mono text-[10px]">&gt;</span>
              <span className="text-foreground font-semibold">Documentation</span>
            </>
          )}
          
          {subjectId && (
            <>
              <span className="mx-2 font-mono text-[10px]">&gt;</span>
              <span className="uppercase text-foreground font-semibold">
                {currentSubject?.courseCode || subjectId.replace('-', ' ')}
              </span>
              {currentSubject?.courseTitle && (
                <span className="hidden md:inline ml-1 text-muted-foreground font-normal">
                  ({currentSubject.courseTitle})
                </span>
              )}
            </>
          )}

          {location.pathname.endsWith('/admin') && (
            <>
              <span className="mx-2 font-mono text-[10px]">&gt;</span>
              <span className="text-foreground font-semibold">Admin Panel</span>
            </>
          )}

          {lectureId && (
            <>
              <span className="mx-2 font-mono text-[10px]">&gt;</span>
              <span className="truncate max-w-[120px] sm:max-w-[200px] md:max-w-[300px] lg:max-w-none text-foreground font-semibold">
                {currentLecture?.title || lectureId.replace('-', ' ')}
              </span>
            </>
          )}

          {slideNo && (
            <>
              <span className="mx-2 font-mono text-[10px]">&gt;</span>
              <span className="font-mono text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                Slide {slideNo}
              </span>
            </>
          )}
        </nav>
      </div>

      {/* Global Actions */}
      <div className="flex items-center gap-1.5">
        <ColorSchemeSelector />
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
