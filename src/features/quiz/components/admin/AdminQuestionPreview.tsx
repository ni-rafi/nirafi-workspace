import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface AdminQuestionPreviewProps {
  previewTitle: string;
  status: string;
  isLagging: boolean;
  curQuestionText: React.ReactNode;
  isInspectRevealed: boolean;
  setIsInspectRevealed: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AdminQuestionPreview: React.FC<AdminQuestionPreviewProps> = ({
  previewTitle,
  status,
  isLagging,
  curQuestionText,
  isInspectRevealed,
  setIsInspectRevealed,
}) => {
  const shouldHide = status === 'hidden' || (status === 'active' && isLagging);

  return (
    <div className="text-xs font-medium text-foreground select-text border bg-muted/20 p-3 rounded-xl mb-1 flex flex-col gap-2.5">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <span className="font-bold text-muted-foreground block mb-0.5 select-none">
            {previewTitle}
          </span>
          {shouldHide ? (
            isInspectRevealed ? (
              <span className="text-foreground">{curQuestionText}</span>
            ) : (
              <span className="italic text-muted-foreground font-normal">
                {status === 'hidden'
                  ? '[Question hidden until active]'
                  : '[Question hidden during buffer time]'}
              </span>
            )
          ) : (
            <span className="text-foreground">{curQuestionText}</span>
          )}
        </div>
        {shouldHide && (
          <button
            type="button"
            onClick={() => setIsInspectRevealed((prev) => !prev)}
            className="p-1 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer shrink-0"
            title={isInspectRevealed ? 'Hide question text' : 'Inspect question text'}
          >
            {isInspectRevealed ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};
