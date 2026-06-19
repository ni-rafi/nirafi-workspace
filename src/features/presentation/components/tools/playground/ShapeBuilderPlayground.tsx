import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { VisualCanvasShape } from '../../../types/schema';

// Import subcomponents
import ShapeBuilderHeader from './ShapeBuilderHeader';
import ShapeBuilderToolbar from './ShapeBuilderToolbar';
import ShapeBuilderInspector from './ShapeBuilderInspector';
import ShapeBuilderCanvas from './ShapeBuilderCanvas';
import { usePlaygroundData } from './usePlaygroundData';
import { createDefaultShape } from './playgroundUtils';

export const ShapeBuilderPlayground: React.FC = () => {
  const { subjectId, sessionId, lectureId } = useParams<{
    subjectId: string;
    sessionId: string;
    lectureId: string;
  }>();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(`/${subjectId}/${sessionId}/${lectureId}`);
  };

  const {
    pages,
    activeIndex,
    activePage,
    savingStatus,
    isLoading,
    setActiveIndex,
    addPage,
    duplicatePage,
    deletePage,
    renamePage,
    updateActivePageElements,
    updateActivePageScaleFactor,
  } = usePlaygroundData(
    subjectId || 'quantity-surveying',
    sessionId || 'session-2026',
    lectureId || 'lecture-1-concrete'
  );

  const elements = activePage.elements;
  const scaleFactor = activePage.scaleFactor;

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [simulatedClick, setSimulatedClick] = useState(1);
  const [snappingEnabled, setSnappingEnabled] = useState(true);
  const [activePopover, setActivePopover] = useState<{
    elementId: string;
    key: 'length' | 'height' | 'diameter' | 'diagonal1' | 'diagonal2';
    val: number;
    clientX: number;
    clientY: number;
  } | null>(null);

  const selectedEl = useMemo(
    () => elements.find((el: VisualCanvasShape) => el.id === selectedId) || null,
    [elements, selectedId]
  );

  const addElement = (type: VisualCanvasShape['type']) => {
    const defaultShape = createDefaultShape(type);
    const newEl: VisualCanvasShape = {
      id: `${type}-${Date.now()}`,
      x: 200,
      y: 150,
      enterAt: 1,
      ...defaultShape,
    };

    const updated = [...elements, newEl];
    updateActivePageElements(updated);
    setSelectedId(newEl.id);
  };

  const updateSelected = (key: keyof VisualCanvasShape | Partial<VisualCanvasShape>, val?: any) => {
    if (!selectedId) return;
    const updated = elements.map((el: VisualCanvasShape) => {
      if (el.id !== selectedId) return el;
      
      let updatedEl: VisualCanvasShape;
      if (typeof key === 'object') {
        updatedEl = { ...el, ...key };
      } else {
        updatedEl = { ...el, [key]: val } as VisualCanvasShape;
      }

      if (updatedEl.dimensions) {
        const u = { ...updatedEl.dimensions };
        if (updatedEl.type === 'circle' || updatedEl.type === 'hinge') {
          u.diameter = parseFloat((updatedEl.w / scaleFactor.pixelsPerUnit).toFixed(3));
        } else {
          u.length = parseFloat((updatedEl.w / scaleFactor.pixelsPerUnit).toFixed(3));
          u.height = parseFloat((updatedEl.h / scaleFactor.pixelsPerUnit).toFixed(3));
        }
        updatedEl.dimensions = u;
      }
      return updatedEl;
    });
    updateActivePageElements(updated);
  };

  const updateSelectedDimensions = (dimKey: string, val: number) => {
    if (!selectedId || !selectedEl) return;
    const updated = elements.map((el: VisualCanvasShape) => {
      if (el.id !== selectedId) return el;
      const updatedDims = { ...(el.dimensions || {}), [dimKey]: val };
      const updatedEl = { ...el, dimensions: updatedDims };

      if (dimKey === 'diameter') {
        const px = val * scaleFactor.pixelsPerUnit;
        updatedEl.w = px;
        updatedEl.h = px;
      } else if (dimKey === 'length') {
        updatedEl.w = val * scaleFactor.pixelsPerUnit;
      } else if (dimKey === 'height') {
        updatedEl.h = val * scaleFactor.pixelsPerUnit;
      }
      return updatedEl;
    });
    updateActivePageElements(updated);
  };

  const deleteSelected = () => {
    if (!selectedId) return;
    updateActivePageElements(elements.filter((el: VisualCanvasShape) => el.id !== selectedId));
    setSelectedId(null);
  };

  // Keyboard shortcut listener to delete selected shape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedId) return;
      const activeEl = document.activeElement;
      if (activeEl) {
        const tagName = activeEl.tagName.toUpperCase();
        if (tagName === 'TEXTAREA' || activeEl.getAttribute('contenteditable') === 'true') {
          return;
        }
        if (tagName === 'INPUT') {
          const type = (activeEl as HTMLInputElement).type?.toLowerCase();
          const textInputTypes = ['text', 'number', 'password', 'email', 'search', 'tel', 'url'];
          if (textInputTypes.includes(type) || !type) {
            return;
          }
        }
      }
      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault();
        deleteSelected();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedId, elements, updateActivePageElements]);

  const handleLabelClick = (
    elId: string,
    key: 'length' | 'height' | 'diameter' | 'diagonal1' | 'diagonal2',
    val: number,
    clientX: number,
    clientY: number
  ) => {
    setActivePopover({ elementId: elId, key, val, clientX, clientY });
  };

  const submitPopoverValue = (val: number) => {
    if (!activePopover) return;
    const { elementId, key } = activePopover;
    const updated = elements.map((el: VisualCanvasShape) => {
      if (el.id !== elementId) return el;
      const updatedDims = { ...(el.dimensions || {}), [key]: val };
      const updatedEl = { ...el, dimensions: updatedDims };

      if (key === 'diameter') {
        const px = val * scaleFactor.pixelsPerUnit;
        updatedEl.w = px;
        updatedEl.h = px;
      } else if (key === 'length') {
        updatedEl.w = val * scaleFactor.pixelsPerUnit;
      } else if (key === 'height') {
        updatedEl.h = val * scaleFactor.pixelsPerUnit;
      }
      return updatedEl;
    });
    updateActivePageElements(updated);
    setActivePopover(null);
  };

  const exportSchema = useMemo(() => {
    const formatted = {
      type: 'visual-canvas',
      config: { scaleFactor },
      data: { elements },
    };
    return JSON.stringify(formatted, null, 2);
  }, [elements, scaleFactor]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(exportSchema);
    alert('Schema copied to clipboard successfully!');
  };

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background text-foreground font-sans">
        <div className="flex flex-col items-center gap-3">
          <span className="h-7 w-7 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <span className="text-xs text-muted-foreground font-semibold">Loading designer canvas...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-background text-foreground overflow-hidden font-sans">
      <ShapeBuilderHeader
        scaleFactor={scaleFactor}
        onScaleFactorChange={updateActivePageScaleFactor}
        simulatedClick={simulatedClick}
        onSimulatedClickChange={setSimulatedClick}
        onCopy={copyToClipboard}
        onBack={handleBack}
        savingStatus={savingStatus}
        pages={pages}
        activeIndex={activeIndex}
        onSelectPage={setActiveIndex}
        onAddPage={addPage}
        onDuplicatePage={duplicatePage}
        onDeletePage={deletePage}
        onRenamePage={renamePage}
        snappingEnabled={snappingEnabled}
        onSnappingEnabledChange={setSnappingEnabled}
      />

      <div className="flex-1 flex overflow-hidden">
        <ShapeBuilderToolbar onAddElement={addElement} />

        <ShapeBuilderCanvas
          elements={elements}
          scaleFactor={scaleFactor}
          selectedId={selectedId}
          simulatedClick={simulatedClick}
          activePopover={activePopover}
          onElementsChange={updateActivePageElements}
          onSelectedIdChange={setSelectedId}
          onLabelClick={handleLabelClick}
          onSubmitPopoverValue={submitPopoverValue}
          onClosePopover={() => setActivePopover(null)}
          snappingEnabled={snappingEnabled}
        />

        <ShapeBuilderInspector
          selectedEl={selectedEl}
          scaleFactor={scaleFactor}
          exportSchema={exportSchema}
          onUpdateSelected={updateSelected}
          onUpdateSelectedDimensions={updateSelectedDimensions}
          onDeleteSelected={deleteSelected}
        />
      </div>
    </div>
  );
};

export default ShapeBuilderPlayground;
