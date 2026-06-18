import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { HelpCircle, Keyboard, Layers, ClipboardCheck, Printer, Settings, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import WelcomeSection from './user-guide/WelcomeSection';
import ShortcutsSection from './user-guide/ShortcutsSection';
import ModesSection from './user-guide/ModesSection';
import QuizzesSection from './user-guide/QuizzesSection';
import PrintingSection from './user-guide/PrintingSection';
import ToolbarSimulatorSection from './user-guide/ToolbarSimulatorSection';
import InteractiveDemoSection from './user-guide/InteractiveDemoSection';

type SubSection = 'welcome' | 'shortcuts' | 'modes' | 'quizzes' | 'printing' | 'toolbar' | 'demo';

export const UserGuideTab: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const subParam = searchParams.get('sub') || 'welcome';
  const activeSubSection = (['welcome', 'shortcuts', 'modes', 'quizzes', 'printing', 'toolbar', 'demo'].includes(subParam)
    ? subParam
    : 'welcome') as SubSection;

  const setActiveSubSection = (sub: SubSection) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      next.set('sub', sub);
      return next;
    }, { replace: true });
  };

  const menuItems = [
    { id: 'welcome' as SubSection, label: 'Welcome', icon: HelpCircle },
    { id: 'shortcuts' as SubSection, label: 'Keyboard Shortcuts', icon: Keyboard },
    { id: 'modes' as SubSection, label: 'View Modes', icon: Layers },
    { id: 'toolbar' as SubSection, label: 'Presenter Tools', icon: Settings },
    { id: 'quizzes' as SubSection, label: 'Live Quizzes', icon: ClipboardCheck },
    { id: 'printing' as SubSection, label: 'PDF Exporting', icon: Printer },
    { id: 'demo' as SubSection, label: 'Interactive Demo', icon: Zap },
  ];

  const renderContent = () => {
    switch (activeSubSection) {
      case 'welcome':
        return <WelcomeSection onNavigateToSection={(sec) => setActiveSubSection(sec as SubSection)} />;
      case 'shortcuts':
        return <ShortcutsSection />;
      case 'modes':
        return <ModesSection />;
      case 'toolbar':
        return <ToolbarSimulatorSection />;
      case 'quizzes':
        return <QuizzesSection />;
      case 'printing':
        return <PrintingSection />;
      case 'demo':
        return <InteractiveDemoSection />;
      default:
        return <WelcomeSection onNavigateToSection={(sec) => setActiveSubSection(sec as SubSection)} />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start animate-in fade-in duration-300">
      {/* Nested Left Navigation Menu */}
      <aside className="md:col-span-2 flex flex-col gap-1.5 border-b md:border-b-0 md:border-r pb-4 md:pb-0 md:pr-6 border-border/80">
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-2 mb-2 select-none">
          User Guide Topics
        </span>
        <div className="flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible gap-1.5 pb-2 md:pb-0">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSubSection === item.id;
            return (
              <Button
                key={item.id}
                variant={isActive ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setActiveSubSection(item.id)}
                className={`justify-start text-xs h-9 font-semibold cursor-pointer shrink-0 ${
                  isActive ? 'bg-primary/10 text-primary hover:bg-primary/15' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                <span>{item.label}</span>
              </Button>
            );
          })}
        </div>
      </aside>

      {/* Main Sub-Section content area */}
      <main className="md:col-span-10 min-h-[300px]">
        {renderContent()}
      </main>
    </div>
  );
};

export default UserGuideTab;
