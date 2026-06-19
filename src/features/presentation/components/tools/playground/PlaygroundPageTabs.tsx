import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Copy, Trash2 } from 'lucide-react';
import { PlaygroundPage } from '../../../types/schema';

interface PlaygroundPageTabsProps {
  pages: PlaygroundPage[];
  activeIndex: number;
  onSelectPage: (index: number) => void;
  onAddPage: () => void;
  onDuplicatePage: () => void;
  onDeletePage: () => void;
  onRenamePage: (index: number, name: string) => void;
}

export const PlaygroundPageTabs: React.FC<PlaygroundPageTabsProps> = ({
  pages,
  activeIndex,
  onSelectPage,
  onAddPage,
  onDuplicatePage,
  onDeletePage,
  onRenamePage,
}) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [tempName, setTempName] = useState('');

  const startEditing = (idx: number, name: string) => {
    setEditingIndex(idx);
    setTempName(name);
  };

  const handleRenameSubmit = (idx: number) => {
    if (tempName.trim()) {
      onRenamePage(idx, tempName.trim());
    }
    setEditingIndex(null);
  };

  return (
    <div className="flex items-center gap-2 overflow-x-auto scrollbar-none max-w-[450px]">
      <div className="inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground">
        {pages.map((page, idx) => {
          const isActive = idx === activeIndex;
          const isEditing = idx === editingIndex;

          return (
            <button
              key={page.id}
              onClick={() => !isEditing && onSelectPage(idx)}
              onDoubleClick={() => startEditing(idx, page.name)}
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-xs font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer ${
                isActive
                  ? 'bg-background text-foreground shadow-sm font-bold'
                  : 'text-muted-foreground hover:text-foreground bg-transparent'
              }`}
            >
              {isEditing ? (
                <Input
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  onBlur={() => handleRenameSubmit(idx)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleRenameSubmit(idx);
                    if (e.key === 'Escape') setEditingIndex(null);
                  }}
                  autoFocus
                  className="h-5 w-20 text-[10px] font-semibold bg-background px-1 py-0.5 text-center"
                />
              ) : (
                <span>{page.name}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Add Page Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onAddPage}
        className="h-7 w-7 text-muted-foreground hover:text-foreground"
        title="Add Blank Page"
      >
        <Plus className="h-4 w-4" />
      </Button>

      {/* Duplicate Page Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onDuplicatePage}
        className="h-7 w-7 text-muted-foreground hover:text-foreground"
        title="Duplicate Current Page"
      >
        <Copy className="h-3.5 w-3.5" />
      </Button>

      {/* Delete Page Button */}
      <Button
        variant="ghost"
        size="icon"
        disabled={pages.length <= 1}
        onClick={onDeletePage}
        className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10 disabled:opacity-40"
        title="Delete Page"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
};

export default PlaygroundPageTabs;
