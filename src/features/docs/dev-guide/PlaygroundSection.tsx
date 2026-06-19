import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PlaygroundSectionProps {
  title: string;
  description: string | React.ReactNode;
  preview: React.ReactNode;
  codeText: string;
  editorContent: React.ReactNode;
}

export const PlaygroundSection: React.FC<PlaygroundSectionProps> = ({
  title,
  description,
  preview,
  codeText,
  editorContent,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="flex flex-col gap-5 border border-border/80 bg-card/40 rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition-all duration-300">
      {/* Title and Description */}
      <div className="flex flex-col gap-1">
        <h4 className="text-sm font-extrabold text-foreground tracking-tight">{title}</h4>
        <div className="text-xs text-muted-foreground leading-relaxed">{description}</div>
      </div>

      {/* Grid Layout: Left is Preview, Right is Code Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Side: Live Preview Panel */}
        <div className="lg:col-span-5 flex flex-col border border-border/60 bg-muted/5 dark:bg-slate-900/10 rounded-xl overflow-hidden min-h-[220px]">
          <div className="flex items-center justify-between border-b border-border/60 bg-muted/20 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground select-none">
            <span>Live Preview</span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <div className="flex-1 flex items-center justify-center p-6 bg-grid-pattern relative">
            <div className="w-full relative z-10">{preview}</div>
          </div>
        </div>

        {/* Right Side: Interactive Code Block Editor */}
        <div className="lg:col-span-7 flex flex-col border border-white/10 bg-slate-950 text-slate-200 rounded-xl overflow-hidden shadow-lg min-h-[220px] font-mono text-xs">
          <div className="flex items-center justify-between border-b border-white/5 bg-slate-900/40 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground select-none">
            <span>Interactive Code Editor</span>
            <Button
              variant="ghost"
              size="xs"
              onClick={handleCopy}
              className="h-6 gap-1 px-2 text-[10px] text-slate-400 hover:text-white hover:bg-white/5 font-mono cursor-pointer border border-white/5 rounded-md"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3 text-emerald-400 animate-in zoom-in-50 duration-200" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  <span>Copy Code</span>
                </>
              )}
            </Button>
          </div>
          <div className="flex-1 p-5 overflow-x-auto leading-relaxed select-text font-mono text-[11px]">
            <pre className="m-0 whitespace-pre">
              <code>{editorContent}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaygroundSection;
