import React from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { ColorSchemeSelector } from '../ColorSchemeSelector';
import { ThemeToggle } from '../ThemeToggle';
import { SUBJECTS } from '@/config/lectures';
import { useUserContext } from '@/context';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, LogOut } from 'lucide-react';

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

  const { userProfile, logout, isAdmin } = useUserContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

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
        
        {userProfile ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full border bg-primary/10 text-primary font-bold text-xs cursor-pointer select-none"
              >
                {userProfile.name ? userProfile.name.charAt(0).toUpperCase() : <User className="h-4 w-4" />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 p-2 flex flex-col gap-1.5 bg-card mt-2">
              <div className="flex flex-col px-2 py-1.5 text-xs border-b">
                <span className="font-bold text-foreground truncate">{userProfile.name}</span>
                <span className="text-[10px] text-muted-foreground uppercase font-mono tracking-wider mt-0.5">
                  {isAdmin ? 'Logged Admin' : 'Logged Student'}
                </span>
                {userProfile.email && (
                  <span className="text-[10px] text-muted-foreground font-mono mt-1 break-all select-all">{userProfile.email}</span>
                )}
              </div>
              <DropdownMenuItem
                onClick={handleLogout}
                className="flex items-center gap-2 cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive text-xs py-1.5"
              >
                <LogOut className="h-4 w-4 shrink-0" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            variant="outline"
            size="sm"
            asChild
            className="h-8 gap-1.5 px-3 font-semibold text-xs border-border/60 hover:bg-accent cursor-pointer"
          >
            <Link to="/login">
              <User className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Sign In</span>
            </Link>
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
