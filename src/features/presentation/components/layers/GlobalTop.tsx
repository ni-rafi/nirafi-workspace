import React from 'react';

interface GlobalTopProps {
  subjectName: string;
  subjectCode: string;
  lectureTitle: string;
  hide?: boolean;
}

/**
 * GlobalTop renders a persistent header layer inside the slide canvas sheet.
 * Hidden on cover layout pages.
 */
export const GlobalTop: React.FC<GlobalTopProps> = ({
  subjectName,
  subjectCode,
  lectureTitle,
  hide = false,
}) => {
  if (hide) {
    return null;
  }

  return (
    <div
      className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-8 py-3 text-[10px] font-semibold tracking-wider text-muted-foreground/85 uppercase select-none pointer-events-none"
      data-global-top
    >
      <div className="flex items-center gap-2">
        <span className="bg-primary/10 border border-primary/20 text-primary px-1.5 py-0.5 rounded font-mono font-bold">
          {subjectCode}
        </span>
        <span className="truncate max-w-[150px]">{subjectName}</span>
      </div>
      <div className="truncate max-w-[200px] text-right font-medium">
        {lectureTitle}
      </div>
    </div>
  );
};

export default GlobalTop;
