import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { HelpCircle, Settings } from 'lucide-react';
import UserGuideTab from './UserGuideTab';
import DevGuideTab from './DevGuideTab';

export const SlideCustomizationDocs: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab') || 'user';
  const activeTab = tabParam === 'dev' ? 'dev' : 'user';

  // Ensure default search params are always present in the URL
  useEffect(() => {
    const tab = searchParams.get('tab');
    const sub = searchParams.get('sub');
    
    if (!tab || !sub) {
      setSearchParams(prev => {
        const next = new URLSearchParams(prev);
        if (!next.has('tab')) {
          next.set('tab', 'user');
        }
        if (!next.has('sub')) {
          const currentTab = next.get('tab');
          next.set('sub', currentTab === 'dev' ? 'paragraphs' : 'welcome');
        }
        return next;
      }, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const setActiveTab = (tab: 'user' | 'dev') => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      next.set('tab', tab);
      next.delete('sub'); // Clear sub-tab when toggling main guides
      return next;
    }, { replace: true });
  };

  return (
    <div className="mx-auto w-full max-w-none flex flex-col gap-6 p-6 md:p-8 text-left animate-in fade-in duration-300 min-h-0 overflow-y-auto">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6 border-border/80">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
            Workspace Hub & Guides
          </h2>
          <p className="text-xs text-muted-foreground leading-relaxed max-w-lg">
            A comprehensive reference for navigating, interacting, and developing slide decks within Rafi's Workspace.
          </p>
        </div>

        {/* Custom Radix-like sliding tab controls */}
        <div className="relative flex rounded-xl p-1 bg-muted/50 border border-border/60 w-fit self-start md:self-center">
          <button
            onClick={() => setActiveTab('user')}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all duration-200 select-none ${
              activeTab === 'user'
                ? 'bg-background text-foreground shadow-xs font-semibold'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <HelpCircle className="h-3.5 w-3.5" />
            <span>User Guide</span>
          </button>
          <button
            onClick={() => setActiveTab('dev')}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all duration-200 select-none ${
              activeTab === 'dev'
                ? 'bg-background text-foreground shadow-xs font-semibold'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Settings className="h-3.5 w-3.5" />
            <span>Developer Guide</span>
          </button>
        </div>
      </div>

      {/* Main Tab Content Panel */}
      <div className="flex-1 mt-2">
        {activeTab === 'user' ? (
          <UserGuideTab />
        ) : (
          <DevGuideTab />
        )}
      </div>
    </div>
  );
};

export default SlideCustomizationDocs;
