import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Lock, Play, ChevronDown, Printer, FileDown, Loader2, EyeOff, FileText, BarChart2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { type Lecture } from '@/config/lectures';
import { useUserContext, useLectureStatus } from '@/context';

interface LectureCardProps {
  lecture: Lecture;
  deckUrl: string;
  subjectColor: string;
  subjectId: string;
  sessionId: string;
}

/**
 * LectureCard renders a single lecture item on the dashboard with body padding,
 * and a theme-tinted colored actions footer.
 */
export const LectureCard: React.FC<LectureCardProps> = ({
  lecture,
  deckUrl,
  subjectColor,
  subjectId,
  sessionId,
}) => {
  const { isLectureLocked, isLectureHidden, setLectureStatus, getLectureActiveRange } = useLectureStatus();
  const { userProfile } = useUserContext();
  const isLocked = isLectureLocked(subjectId, sessionId, lecture.id);
  const isHidden = isLectureHidden(subjectId, sessionId, lecture.id);
  const isAdmin = userProfile?.role === 'admin';
  const [isTogglingLock, setIsTogglingLock] = React.useState(false);
  const [isTogglingHide, setIsTogglingHide] = React.useState(false);

  const [showSchedule, setShowSchedule] = React.useState(false);
  const { activeFrom = 0, activeUntil = 0 } = getLectureActiveRange(subjectId, sessionId, lecture.id) || {};
  const [fromInput, setFromInput] = React.useState('');
  const [untilInput, setUntilInput] = React.useState('');
  const [isSavingSchedule, setIsSavingSchedule] = React.useState(false);

  const [currentTime, setCurrentTime] = React.useState(Date.now());

  React.useEffect(() => {
    if (lecture.type !== 'tutorial') return;
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, [lecture.type]);

  const formatRemaining = (totalSecs: number): string => {
    if (totalSecs <= 0) return '0s';
    const d = Math.floor(totalSecs / 86400);
    const h = Math.floor((totalSecs % 86400) / 3600);
    const m = Math.floor((totalSecs % 3600) / 60);
    const s = totalSecs % 60;

    const parts: string[] = [];
    if (d > 0) parts.push(`${d}d`);
    if (h > 0) parts.push(`${h}h`);
    if (m > 0) parts.push(`${m}m`);
    if (d === 0 && h === 0) parts.push(`${s}s`);

    return parts.slice(0, 2).join(' ');
  };

  const timingStatus = React.useMemo(() => {
    if (lecture.type !== 'tutorial') return null;

    const fromMs = activeFrom || 0;
    const untilMs = activeUntil || 0;

    if (fromMs === 0 && untilMs === 0) {
      return {
        label: 'Continuous',
        colorClass: 'text-muted-foreground bg-muted border-transparent',
        detail: 'No submission deadline',
      };
    }

    if (fromMs > 0 && currentTime < fromMs) {
      const diffSecs = Math.floor((fromMs - currentTime) / 1000);
      return {
        label: 'Scheduled',
        colorClass: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
        detail: `Opens in: ${formatRemaining(diffSecs)}`,
      };
    }

    if (untilMs > 0 && currentTime > untilMs) {
      return {
        label: 'Closed',
        colorClass: 'text-destructive bg-destructive/10 border-destructive/20',
        detail: `Deadline passed: ${new Date(untilMs).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}`,
      };
    }

    const diffSecs = Math.floor((untilMs - currentTime) / 1000);
    return {
      label: 'Open',
      colorClass: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
      detail: `Closes in: ${formatRemaining(diffSecs)}`,
    };
  }, [lecture.type, activeFrom, activeUntil, currentTime]);

  // Sync inputs with metadata values when expanded
  React.useEffect(() => {
    if (showSchedule) {
      setFromInput(activeFrom ? timestampToDatetimeLocal(activeFrom) : '');
      setUntilInput(activeUntil ? timestampToDatetimeLocal(activeUntil) : '');
    }
  }, [showSchedule, activeFrom, activeUntil]);

  const handleSaveSchedule = async () => {
    setIsSavingSchedule(true);
    try {
      const fromMs = fromInput ? new Date(fromInput).getTime() : 0;
      const untilMs = untilInput ? new Date(untilInput).getTime() : 0;
      await setLectureStatus(subjectId, sessionId, lecture.id, {
        activeFrom: fromMs,
        activeUntil: untilMs,
      });
      setShowSchedule(false);
    } catch (err) {
      console.error('Failed to save tutorial schedule:', err);
    } finally {
      setIsSavingSchedule(false);
    }
  };

  const handleToggleLock = async () => {
    if (isTogglingLock || isTogglingHide) return;
    setIsTogglingLock(true);
    try {
      await setLectureStatus(subjectId, sessionId, lecture.id, { locked: !isLocked });
    } catch (err) {
      console.error('Failed to toggle lecture lock status:', err);
    } finally {
      setIsTogglingLock(false);
    }
  };

  const handleToggleHide = async () => {
    if (isTogglingLock || isTogglingHide) return;
    setIsTogglingHide(true);
    try {
      await setLectureStatus(subjectId, sessionId, lecture.id, { hidden: !isHidden });
    } catch (err) {
      console.error('Failed to toggle lecture hide status:', err);
    } finally {
      setIsTogglingHide(false);
    }
  };

  return (
    <div
      className={`group relative flex flex-col justify-between overflow-hidden rounded-lg border bg-card shadow-xs transition-all duration-300 ${
        isHidden
          ? 'opacity-65 border-dashed border-muted-foreground/45 bg-muted/10'
          : isLocked
          ? 'opacity-75 border-muted bg-muted/20'
          : 'hover:border-primary/25'
      }`}
    >
      {/* Subject Top Theme Accent border */}
      <div
        className="absolute top-0 left-0 h-1 w-full"
        style={{ backgroundColor: subjectColor }}
      />

      {/* Lecture Meta info */}
      <div className="p-5 flex-1 flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1 flex-1">
            {lecture.lectureNumber !== undefined && (
              <span
                className="text-[10px] font-bold tracking-wider uppercase opacity-90"
                style={{ color: subjectColor }}
              >
                {lecture.type === 'tutorial'
                  ? `Tutorial ${lecture.lectureNumber}`
                  : typeof lecture.lectureNumber === 'number'
                  ? `Lecture ${lecture.lectureNumber}`
                  : lecture.lectureNumber}
              </span>
            )}
            <h4 className="font-bold text-sm leading-tight text-foreground group-hover:text-primary transition-colors">
              {lecture.title}
            </h4>
          </div>
          <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
            {isHidden && (
              <span className="inline-flex items-center gap-0.5 rounded-full bg-destructive/10 px-1.5 py-0.5 text-[9px] font-bold text-destructive">
                <EyeOff className="h-2.5 w-2.5" />
                <span>Hidden</span>
              </span>
            )}
            {isLocked && (
              <Lock className="h-3.5 w-3.5 text-muted-foreground" />
            )}
          </div>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {lecture.description}
        </p>

        {/* Sessional Timer / Countdown for Tutorials */}
        {timingStatus && (
          <div className="mt-2.5 pt-2.5 border-t border-border/20 flex flex-col gap-1.5 font-sans select-none">
            <div className="flex items-center gap-1.5">
              <span className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[9px] font-black tracking-wider uppercase border ${timingStatus.colorClass}`}>
                {timingStatus.label}
              </span>
              <span className="text-[10px] font-extrabold text-foreground font-mono">
                {timingStatus.detail}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Card bottom actions/tags */}
      <div className="px-5 py-3 bg-primary/[0.04] dark:bg-primary/[0.08] flex flex-wrap items-center justify-between gap-2.5 mt-auto">
        {/* Duration Badge */}
        <span className="flex items-center gap-1 text-[10px] text-muted-foreground font-medium">
          <Clock className="h-3.5 w-3.5 shrink-0" />
          <span>{lecture.durationMins} mins</span>
        </span>

        {/* Action Button & Toggles */}
        {isAdmin ? (
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            <div className="flex items-center gap-1.5 bg-background border rounded-md px-2 h-8 shadow-xs">
              <span className={`text-[9px] sm:text-[10px] font-bold tracking-wider uppercase select-none transition-colors ${
                isLocked ? 'text-muted-foreground' : 'text-primary'
              }`}>
                {isLocked ? 'Locked' : 'Active'}
              </span>
              <button
                type="button"
                onClick={handleToggleLock}
                disabled={isTogglingLock || isTogglingHide}
                className={`relative inline-flex h-4.5 w-8 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden disabled:opacity-50 ${
                  isLocked ? 'bg-muted' : 'bg-primary'
                }`}
                role="switch"
                aria-checked={!isLocked}
              >
                {isTogglingLock ? (
                  <Loader2 className="h-2.5 w-2.5 animate-spin text-muted-foreground mx-auto" />
                ) : (
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none inline-block h-3.5 w-3.5 transform rounded-full bg-background shadow-xs ring-0 transition duration-200 ease-in-out ${
                      isLocked ? 'translate-x-0' : 'translate-x-3.5'
                    }`}
                  />
                )}
              </button>
            </div>

            {/* Inline Hide Toggle for Admins */}
            <div className="flex items-center gap-1.5 bg-background border rounded-md px-2 h-8 shadow-xs">
              <span className={`text-[9px] sm:text-[10px] font-bold tracking-wider uppercase select-none transition-colors ${
                isHidden ? 'text-destructive font-extrabold' : 'text-muted-foreground'
              }`}>
                {isHidden ? 'Hidden' : 'Visible'}
              </span>
              <button
                type="button"
                onClick={handleToggleHide}
                disabled={isTogglingLock || isTogglingHide}
                className={`relative inline-flex h-4.5 w-8 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden disabled:opacity-50 ${
                  isHidden ? 'bg-destructive' : 'bg-muted'
                }`}
                role="switch"
                aria-checked={isHidden}
              >
                {isTogglingHide ? (
                  <Loader2 className="h-2.5 w-2.5 animate-spin text-muted-foreground mx-auto" />
                ) : (
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none inline-block h-3.5 w-3.5 transform rounded-full bg-background shadow-xs ring-0 transition duration-200 ease-in-out ${
                      isHidden ? 'translate-x-3.5' : 'translate-x-0'
                    }`}
                  />
                )}
              </button>
            </div>

            {/* Launch Button for Admin Preview */}
            {lecture.type === 'tutorial' ? (
              <div className="flex items-center gap-2">
                {/* Schedule / Deadline Button */}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSchedule(!showSchedule)}
                  className={`h-8 text-[11px] font-bold gap-1 px-2.5 rounded-md shadow-xs ${
                    showSchedule || activeFrom > 0 || activeUntil > 0
                      ? 'bg-primary/10 border-primary/20 text-primary hover:bg-primary/20'
                      : 'bg-background hover:bg-muted text-muted-foreground'
                  }`}
                  title="Configure Schedule / Deadline"
                >
                  <Clock className="h-3 w-3 shrink-0" />
                  <span>Schedule</span>
                </Button>

                <Button
                  asChild
                  size="sm"
                  variant="ghost"
                  className="h-8 text-[11px] font-bold gap-1 px-2.5 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 no-underline hover:no-underline rounded-md"
                >
                  <Link to={`/${subjectId}/${sessionId}/${lecture.id}/admin/tutorial`} className="no-underline hover:no-underline flex items-center gap-1">
                    <BarChart2 className="h-3 w-3 shrink-0" />
                    <span>Scoreboard</span>
                  </Link>
                </Button>

                <Button
                  asChild
                  size="sm"
                  variant="ghost"
                  className="h-8 text-[11px] font-bold gap-1 px-2 bg-muted hover:bg-muted/80 text-foreground border rounded-md no-underline hover:no-underline"
                >
                  <Link to={deckUrl} className="no-underline hover:no-underline flex items-center gap-1">
                    <Play className="h-2.5 w-2.5 fill-current shrink-0" />
                    <span>Slides</span>
                  </Link>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 px-1.5 bg-muted hover:bg-muted/80 text-foreground border rounded-md"
                    >
                      <ChevronDown className="h-3.5 w-3.5" />
                      <span className="sr-only">Options</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem
                      onClick={() => setShowSchedule(true)}
                      className="flex items-center gap-2 cursor-pointer w-full text-xs font-bold text-primary"
                    >
                      <Clock className="h-3.5 w-3.5 text-primary shrink-0" />
                      <span>Set Deadline</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to={`/${subjectId}/${sessionId}/${lecture.id}/tutorial`} className="flex items-center gap-2 cursor-pointer w-full text-xs">
                        <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>Solve Workspace</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <a
                        href={`${deckUrl}?print=true`}
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
                        href={`${deckUrl}?print=true&annotations=true`}
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
              </div>
            ) : (
              <div className="flex items-center">
                <Button
                  asChild
                  size="sm"
                  variant="ghost"
                  className="h-8 text-[11px] font-bold gap-1 px-2.5 rounded-r-none bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 border-r-0 no-underline hover:no-underline"
                >
                  <Link to={deckUrl} className="no-underline hover:no-underline flex items-center gap-1">
                    <Play className="h-2.5 w-2.5 fill-current shrink-0" />
                    <span>Preview</span>
                  </Link>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 px-1.5 rounded-l-none bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20"
                    >
                      <ChevronDown className="h-3.5 w-3.5" />
                      <span className="sr-only">Export Options</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <a
                        href={`${deckUrl}?print=true`}
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
                        href={`${deckUrl}?print=true&annotations=true`}
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
              </div>
            )}
          </div>
        ) : isLocked ? (
          <span className="inline-flex items-center gap-1 rounded bg-muted-foreground/10 px-2 py-1 text-[10px] font-semibold text-muted-foreground font-mono">
            LOCKED
          </span>
        ) : lecture.type === 'tutorial' ? (
          <Button
            asChild
            size="sm"
            variant="ghost"
            className="h-8 text-[11px] font-bold gap-1 px-3 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 no-underline hover:no-underline rounded-md"
          >
            <Link to={`/${subjectId}/${sessionId}/${lecture.id}/tutorial`} className="no-underline hover:no-underline flex items-center gap-1">
              <FileText className="h-3.5 w-3.5 shrink-0" />
              <span>Solve Tutorial</span>
            </Link>
          </Button>
        ) : (
          <div className="flex items-center">
            {/* Main Launch Button */}
            <Button
              asChild
              size="sm"
              variant="ghost"
              className="h-8 text-[11px] font-bold gap-1 px-2.5 rounded-r-none bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 border-r-0 no-underline hover:no-underline"
            >
              <Link to={deckUrl} className="no-underline hover:no-underline flex items-center gap-1">
                <Play className="h-2.5 w-2.5 fill-current shrink-0" />
                <span>Launch Slides</span>
              </Link>
            </Button>
            {/* Dropdown Menu Trigger Button */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 px-1.5 rounded-l-none bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20"
                >
                  <ChevronDown className="h-3.5 w-3.5" />
                  <span className="sr-only">Export Options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <a
                    href={`${deckUrl}?print=true`}
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
                    href={`${deckUrl}?print=true&annotations=true`}
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
          </div>
        )}
      </div>

      {/* Collapsible Schedule Config Panel for Admins */}
      {showSchedule && (
        <div className="border-t border-border/40 p-4 bg-muted/20 flex flex-col gap-3 font-sans animate-in slide-in-from-bottom duration-200">
          <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
            <Clock className="h-3.5 w-3.5 text-primary shrink-0" />
            <span>Tutorial Schedule Control</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-muted-foreground uppercase">Starts:</label>
              <input
                type="datetime-local"
                value={fromInput}
                onChange={(e) => setFromInput(e.target.value)}
                className="px-2 py-1 bg-background border border-border/60 rounded-md text-xs font-medium text-foreground focus:outline-hidden focus:border-primary w-full"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-muted-foreground uppercase">Ends (Deadline):</label>
              <input
                type="datetime-local"
                value={untilInput}
                onChange={(e) => setUntilInput(e.target.value)}
                className="px-2 py-1 bg-background border border-border/60 rounded-md text-xs font-medium text-foreground focus:outline-hidden focus:border-primary w-full"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 text-xs font-bold mt-1">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowSchedule(false)}
              className="h-7 text-[11px] px-2.5"
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleSaveSchedule}
              disabled={isSavingSchedule}
              className="h-7 text-[11px] px-3 bg-primary hover:bg-primary/95 text-white"
            >
              {isSavingSchedule ? 'Saving...' : 'Save Schedule'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

const timestampToDatetimeLocal = (timestamp: number): string => {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  // Get components adjusted for local timezone offset
  const tzOffset = date.getTimezoneOffset() * 60000;
  const localDate = new Date(date.getTime() - tzOffset);
  return localDate.toISOString().slice(0, 16);
};

export default LectureCard;
