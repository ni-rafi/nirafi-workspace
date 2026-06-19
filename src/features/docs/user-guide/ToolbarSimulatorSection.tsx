import React, { useState } from 'react';
import { 
  ChevronLeft, ChevronRight, LayoutGrid, PenTool, Timer, Video, SlidersHorizontal,
  MousePointer, Pencil, Eraser, Minus, ArrowUpRight, Square, Circle as CircleIcon,
  Camera, Menu
} from 'lucide-react';
import { NavControls } from '@/features/presentation/components/layers/NavControls';
import { ContextMenu } from '@/features/presentation/components/tools/ContextMenu';
import { Button } from '@/components/ui/button';

export const ToolbarSimulatorSection: React.FC = () => {
  // Only pen + settings are live — everything else is visual-only (no-op)
  const [isPenActive, setIsPenActive] = useState(false);
  const [activeTool, setActiveTool] = useState<'select' | 'pencil' | 'eraser' | 'line' | 'arrow' | 'rect' | 'circle'>('pencil');
  const [penColor, setPenColor] = useState('#ef4444');
  const [penWidth, setPenWidth] = useState(6);
  const [areDrawingsHidden, setAreDrawingsHidden] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [currentSlide] = useState(3);
  const totalSlides = 10;

  // Context Menu State
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; isOpen: boolean } | null>(null);

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      isOpen: true,
    });
  };

  const handleTriggerButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    setContextMenu({
      x: rect.left,
      y: rect.bottom + 8,
      isOpen: true,
    });
  };

  const toolbarControlsDocs = [
    { 
      name: "Slide Navigation", 
      tooltip: "Prev/Next (Arrows)", 
      cat: "Core", 
      desc: "Allows quick slide pagination forwards and backwards.",
      icon: <div className="flex gap-0.5"><ChevronLeft className="h-3.5 w-3.5" /><ChevronRight className="h-3.5 w-3.5" /></div>
    },
    { 
      name: "Overview Modal", 
      tooltip: "Overview (O)", 
      cat: "Navigation", 
      desc: "Opens a grid dashboard displaying miniature previews of all slides for fast skipping.",
      icon: <LayoutGrid className="h-3.5 w-3.5" />
    },
    { 
      name: "Drawing Mode Pen", 
      tooltip: "Toggle Drawing Pen", 
      cat: "Annotation", 
      desc: "Reveals the annotation toolbar containing brushes, colors, and geometric shapes.",
      icon: <PenTool className="h-3.5 w-3.5" />
    },
    { 
      name: "Stopwatch Timer", 
      tooltip: "Stopwatch Timer", 
      cat: "Utility", 
      desc: "Tracks lecture duration or slide-level timers in a floating header badge.",
      icon: <Timer className="h-3.5 w-3.5" />
    },
    { 
      name: "Record Deck", 
      tooltip: "Record Deck", 
      cat: "Utility", 
      desc: "Starts a client-side WebM screen recorder with microphone input for slides exporting.",
      icon: <Video className="h-3.5 w-3.5" />
    },
    { 
      name: "Camera Overlay", 
      tooltip: "Webcam Overlay", 
      cat: "Utility", 
      desc: "Toggles a resizable circular webcam stream overlay on top of slide canvases.",
      icon: <Camera className="h-3.5 w-3.5" />
    },
    { 
      name: "Settings Panel", 
      tooltip: "Settings Panel", 
      cat: "Config", 
      desc: "Configures presentation-specific settings like notes, layout alignment, and scale.",
      icon: <SlidersHorizontal className="h-3.5 w-3.5" />
    },
    { 
      name: "Select & Move", 
      tooltip: "Select & Move (V)", 
      cat: "Pen Tool", 
      desc: "Moves and resizes existing ink elements and vector shapes on the drawing board.",
      icon: <MousePointer className="h-3.5 w-3.5" />
    },
    { 
      name: "Pencil Draw", 
      tooltip: "Pencil Draw (P)", 
      cat: "Pen Tool", 
      desc: "Freehand brush stroke draw mode for highlights.",
      icon: <Pencil className="h-3.5 w-3.5" />
    },
    { 
      name: "Stroke Eraser", 
      tooltip: "Stroke Eraser (E)", 
      cat: "Pen Tool", 
      desc: "Removes vector canvas drawings on touch, stroke-by-stroke.",
      icon: <Eraser className="h-3.5 w-3.5" />
    },
    { 
      name: "Geometric Shapes", 
      tooltip: "Line/Arrow/Rect/Circle", 
      cat: "Pen Tool", 
      desc: "Draws straight lines, directive arrows, boundary rectangles, or circles on slides.",
      icon: <div className="flex gap-0.5"><Minus className="h-3.5 w-3.5 rotate-45" /><ArrowUpRight className="h-3.5 w-3.5" /><Square className="h-3.5 w-3.5" /><CircleIcon className="h-3.5 w-3.5" /></div>
    }
  ];

  return (
    <div className="flex flex-col gap-8 w-full animate-in fade-in duration-200 text-left">
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-extrabold text-foreground tracking-tight">Presenter Tools & Menus</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Test-drive the presentation control bar and right-click context menu. These are the **actual production components** running inline inside our workspace documentation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* Right-Click Context Menu Sandbox */}
        <div 
          onContextMenu={handleContextMenu}
          className="border border-dashed border-border bg-muted/20 p-6 rounded-2xl flex flex-col justify-between items-center text-center relative min-h-[220px] select-none group hover:bg-muted/30 transition-all cursor-context-menu"
        >
          <div className="flex flex-col items-center gap-2 mt-4">
            <Menu className="h-8 w-8 text-primary/75 group-hover:scale-105 transition-transform" />
            <span className="text-xs font-bold text-foreground">Right-Click Simulation Area</span>
            <p className="text-[11px] text-muted-foreground max-w-xs leading-relaxed">
              Right-click anywhere inside this gray box to open the floating presenter options menu.
            </p>
          </div>
          
          <Button 
            size="xs" 
            variant="outline" 
            onClick={handleTriggerButton}
            className="mt-4 text-[10px] h-7 cursor-pointer"
          >
            Trigger Context Menu
          </Button>

          {contextMenu?.isOpen && (
            <ContextMenu
              x={contextMenu.x}
              y={contextMenu.y}
              onClose={() => setContextMenu(null)}
              currentSlide={currentSlide}
              totalSlides={totalSlides}
              onPrev={() => {}}
              onNext={() => {}}
              isDark={false}
              onToggleDark={() => {}}
              isFullscreen={false}
              onToggleFullscreen={() => {}}
              isLaser={false}
              onToggleLaser={() => {}}
              isPen={isPenActive}
              onTogglePen={() => setIsPenActive(!isPenActive)}
              isEraser={activeTool === 'eraser'}
              onToggleEraser={() => setActiveTool(activeTool === 'eraser' ? 'pencil' : 'eraser')}
              isOverview={false}
              onToggleOverview={() => {}}
              isPresenterView={false}
              onTogglePresenter={() => {}}
            />
          )}
        </div>

        {/* Live Presentation Toolbar control panel */}
        <div className="border border-border p-6 bg-card rounded-2xl flex flex-col justify-center items-center relative min-h-[220px] select-none shadow-sm gap-4">
          <div className="text-left w-full border-b pb-2 mb-2">
            <span className="text-[10px] font-bold text-primary font-mono uppercase tracking-wider">Live Control Drawer</span>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              Click the Pen icon to reveal the vector drawing brush toolbar.
            </p>
          </div>
          
          <div className="flex-1 flex items-center justify-center w-full min-h-[90px]">
            <NavControls
              current={currentSlide}
              total={totalSlides}
              onPrev={() => {}}
              onNext={() => {}}
              isFullscreen={false}
              onToggleFullscreen={() => {}}
              isCameraOpen={false}
              onToggleCamera={() => {}}
              isTimerOpen={false}
              onToggleTimer={() => {}}
              isRecording={false}
              onToggleRecording={() => {}}
              isOverviewOpen={false}
              onToggleOverview={() => {}}
              isSettingsOpen={isSettingsOpen}
              onToggleSettings={() => setIsSettingsOpen(!isSettingsOpen)}
              isDark={false}
              onToggleDark={() => {}}
              isPresenterView={false}
              onTogglePresenter={() => {}}
              isPenActive={isPenActive}
              onPenActiveChange={setIsPenActive}
              penColor={penColor}
              onPenColorChange={setPenColor}
              penWidth={penWidth}
              onPenWidthChange={setPenWidth}
              activeTool={activeTool}
              onActiveToolChange={setActiveTool}
              onClearDrawing={() => {}}
              areDrawingsHidden={areDrawingsHidden}
              onToggleDrawingsHidden={() => setAreDrawingsHidden(!areDrawingsHidden)}
              className="relative bottom-0 left-0 z-10 flex flex-col gap-2.5 items-center justify-center w-full"
            />
          </div>
        </div>
      </div>

      {/* Detailed Icons Explanation Table */}
      <section className="flex flex-col gap-3 mt-2">
        <div className="flex items-center gap-2 border-b pb-2">
          <h4 className="text-sm font-bold text-foreground">Toolbar Button & Tooltip Reference</h4>
        </div>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full border-collapse text-left text-xs font-sans">
            <thead>
              <tr className="border-b bg-muted/50 font-bold text-foreground">
                <th className="p-3 w-1/3">Control Name & Icon</th>
                <th className="p-3 w-1/4">Tooltip Title</th>
                <th className="p-3 w-1/6">Category</th>
                <th className="p-3 w-1/3">Detailed Description</th>
              </tr>
            </thead>
            <tbody>
              {toolbarControlsDocs.map((doc, idx) => (
                <tr key={idx} className="border-b border-border/60 hover:bg-muted/20 transition-colors last:border-none">
                  <td className="p-3 font-semibold text-foreground flex items-center gap-3">
                    <span className="text-muted-foreground bg-muted p-1.5 rounded-lg border border-border shrink-0 flex items-center justify-center">
                      {doc.icon}
                    </span>
                    <span>{doc.name}</span>
                  </td>
                  <td className="p-3 font-mono text-[11px] text-primary">{doc.tooltip}</td>
                  <td className="p-3 text-muted-foreground">{doc.cat}</td>
                  <td className="p-3 text-muted-foreground leading-normal">{doc.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ToolbarSimulatorSection;
