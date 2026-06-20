import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FileDown, X, Loader2, CheckSquare, Square, FileText } from 'lucide-react';
import { pdfExportService } from '../../cores/pdf/pdfExportService';
import { IPDFExportElement } from '../../cores/pdf/IPDFExportService';
import { goeyToast } from 'goey-toast';

interface PDFExportItem {
  id: string;
  label: string;
  defaultSelected?: boolean;
  disabled?: boolean;
  disabledReason?: string;
  tabToActivate?: string;
}

interface PDFExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentType: 'sfd-bmd' | 'influence-lines';
  availableCharts: PDFExportItem[];
  availableCalculations: PDFExportItem[];
  defaultTitle?: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const PDFExportModal: React.FC<PDFExportModalProps> = ({
  isOpen,
  onClose,
  documentType,
  availableCharts,
  availableCalculations,
  defaultTitle = 'Engineering Analysis Report',
  activeTab,
  setActiveTab,
}) => {
  const [title, setTitle] = useState(defaultTitle);
  const [author, setAuthor] = useState('Md. Nazmul Islam Rafi');
  const [institution, setInstitution] = useState('SUST');
  const [includeBeamCanvas, setIncludeBeamCanvas] = useState(true);
  const [selectedCharts, setSelectedCharts] = useState<string[]>([]);
  const [selectedCalculations, setSelectedCalculations] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progressStatus, setProgressStatus] = useState('');

  // Synchronize defaults on open, filtering out disabled items
  useEffect(() => {
    if (isOpen) {
      setSelectedCharts(availableCharts.filter(c => c.defaultSelected !== false && !c.disabled).map(c => c.id));
      setSelectedCalculations(availableCalculations.filter(c => c.defaultSelected !== false && !c.disabled).map(c => c.id));
      setIsGenerating(false);
      setProgressStatus('');
    }
  }, [isOpen, availableCharts, availableCalculations]);

  if (!isOpen) return null;

  const handleToggleChart = (chart: PDFExportItem) => {
    if (chart.disabled) return;
    setSelectedCharts(prev =>
      prev.includes(chart.id) ? prev.filter(c => c !== chart.id) : [...prev, chart.id]
    );
  };

  const handleToggleCalculation = (calc: PDFExportItem) => {
    if (calc.disabled) return;
    setSelectedCalculations(prev =>
      prev.includes(calc.id) ? prev.filter(c => c !== calc.id) : [...prev, calc.id]
    );
  };

  const handleExport = async () => {
    setIsGenerating(true);
    setProgressStatus('Initializing export settings...');
    const toastId = goeyToast('Generating PDF Report', {
      description: 'Initializing export settings...',
      duration: 0,
    });

    const elementsToExport: IPDFExportElement[] = [];

    // 1. Add Beam Model if selected
    if (includeBeamCanvas) {
      elementsToExport.push({
        id: documentType === 'sfd-bmd' ? 'beam-canvas' : 'il-beam-canvas',
        title: 'Beam Structural Model',
        type: 'chart',
      });
    }

    // 2. Add Charts
    selectedCharts.forEach(cId => {
      const chart = availableCharts.find(c => c.id === cId);
      if (chart && !chart.disabled) {
        elementsToExport.push({
          id: chart.id,
          title: chart.label,
          type: 'chart',
        });
      }
    });

    // 3. Capture Tabbed Calculations (Programmatic tab switching)
    const originalTab = activeTab;
    try {
      for (const calcId of selectedCalculations) {
        const calc = availableCalculations.find(c => c.id === calcId);
        if (calc && !calc.disabled) {
          if (calc.tabToActivate) {
            const stepMsg = `Preparing ${calc.label} layout...`;
            setProgressStatus(stepMsg);
            goeyToast.update(toastId, { description: stepMsg });
            setActiveTab(calc.tabToActivate);
            // Allow state to propagate and MathJax/KaTeX to layout
            await new Promise(resolve => setTimeout(resolve, 200));
          }
          elementsToExport.push({
            id: calc.id,
            title: calc.label,
            type: 'calculations',
          });
        }
      }

      // 4. Trigger PDF Generation Service
      await pdfExportService.generateReport({
        title,
        author,
        institution,
        timestamp: new Date().toLocaleString('en-US', {
          dateStyle: 'medium',
          timeStyle: 'short',
        }),
        brandingText: "System created by Md. Nazmul Islam Rafi | Md. Nazmul Islam Rafi's Workspace",
        elements: elementsToExport,
      }, (status) => {
        setProgressStatus(status);
        goeyToast.update(toastId, { description: status });
      });

      goeyToast.update(toastId, {
        title: 'Report Generated',
        description: 'PDF report exported successfully!',
        type: 'success',
      });
      setTimeout(() => goeyToast.dismiss(toastId), 4000);

    } catch (err) {
      console.error('PDF generation error:', err);
      goeyToast.update(toastId, {
        title: 'Export Failed',
        description: 'Failed to construct and export PDF report.',
        type: 'error',
      });
      setTimeout(() => goeyToast.dismiss(toastId), 5000);
    } finally {
      // Restore tab context & close
      setActiveTab(originalTab);
      setIsGenerating(false);
      onClose();
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-xs transition-opacity duration-200"
        onClick={!isGenerating ? onClose : undefined}
      />

      {/* Modal Content - wider max-w-3xl, fully responsive */}
      <div className="relative w-full max-w-md md:max-w-3xl rounded-xl border border-border bg-card p-6 shadow-2xl transition-all animate-in fade-in-50 zoom-in-95 duration-200 text-foreground flex flex-col gap-5 max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/40 pb-3">
          <div className="flex items-center gap-2">
            <FileDown className="h-5 w-5 text-primary" />
            <h2 className="text-base font-bold tracking-tight">Export PDF Report</h2>
          </div>
          {!isGenerating && (
            <button
              onClick={onClose}
              className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {isGenerating ? (
          /* Loading State */
          <div className="flex flex-col items-center justify-center py-10 gap-4 text-center">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
            <div>
              <p className="text-sm font-semibold">Generating PDF Document</p>
              <p className="text-xs text-muted-foreground mt-1 animate-pulse">{progressStatus}</p>
            </div>
          </div>
        ) : (
          /* Settings Panel */
          <div className="flex flex-col gap-4 overflow-y-auto pr-1">
            {/* Metadata Inputs */}
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Report Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-border bg-background/50 px-3 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Author / Student Name</label>
                  <input
                    type="text"
                    value={author}
                    onChange={e => setAuthor(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-border bg-background/50 px-3 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Institution</label>
                  <input
                    type="text"
                    value={institution}
                    onChange={e => setInstitution(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-border bg-background/50 px-3 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Beam Canvas Toggle */}
            <label className="flex items-center gap-2 cursor-pointer py-1 select-none border-b border-border/30">
              <input
                type="checkbox"
                checked={includeBeamCanvas}
                onChange={e => setIncludeBeamCanvas(e.target.checked)}
                className="rounded border-muted bg-background text-primary focus:ring-primary h-3.5 w-3.5"
              />
              <span className="text-xs font-semibold">Include Beam Structural Model</span>
            </label>

            {/* Selectors in two column grid for larger screen */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Diagrams Selector */}
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Select Diagrams to Include</span>
                <div className="mt-2 flex-1 flex flex-col gap-2.5 rounded-lg border border-border/60 bg-muted/10 p-4 max-h-[180px] overflow-y-auto">
                  {availableCharts.map(chart => {
                    const isChecked = selectedCharts.includes(chart.id);
                    return (
                      <button
                        key={chart.id}
                        disabled={chart.disabled}
                        onClick={() => handleToggleChart(chart)}
                        className={`flex items-start gap-2.5 text-left text-xs transition-colors ${chart.disabled
                            ? 'opacity-40 cursor-not-allowed text-muted-foreground/80'
                            : 'hover:text-primary cursor-pointer'
                          }`}
                      >
                        <span className="shrink-0 mt-0.5">
                          {isChecked && !chart.disabled ? (
                            <CheckSquare className="h-4 w-4 text-primary" />
                          ) : (
                            <Square className="h-4 w-4 text-muted-foreground" />
                          )}
                        </span>
                        <div>
                          <div className="font-semibold">{chart.label}</div>
                          {chart.disabled && chart.disabledReason && (
                            <div className="text-[9px] text-destructive/90 font-medium">({chart.disabledReason})</div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Calculations Selector */}
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Select Math Derivation Panels</span>
                <div className="mt-2 flex-1 flex flex-col gap-2.5 rounded-lg border border-border/60 bg-muted/10 p-4 max-h-[180px] overflow-y-auto">
                  {availableCalculations.map(calc => {
                    const isChecked = selectedCalculations.includes(calc.id);
                    return (
                      <button
                        key={calc.id}
                        disabled={calc.disabled}
                        onClick={() => handleToggleCalculation(calc)}
                        className={`flex items-start gap-2.5 text-left text-xs transition-colors ${calc.disabled
                            ? 'opacity-40 cursor-not-allowed text-muted-foreground/80'
                            : 'hover:text-primary cursor-pointer'
                          }`}
                      >
                        <span className="shrink-0 mt-0.5">
                          {isChecked && !calc.disabled ? (
                            <CheckSquare className="h-4 w-4 text-primary" />
                          ) : (
                            <Square className="h-4 w-4 text-muted-foreground" />
                          )}
                        </span>
                        <div>
                          <div className="font-semibold">{calc.label}</div>
                          {calc.disabled && calc.disabledReason && (
                            <div className="text-[9px] text-destructive/90 font-medium">({calc.disabledReason})</div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-3 border-t border-border/40">
              <button
                onClick={onClose}
                className="rounded-lg border border-border bg-background px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleExport}
                disabled={selectedCharts.length === 0 && selectedCalculations.length === 0}
                className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <FileText className="h-4 w-4" />
                <span>Generate PDF</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};
