import React, { useState } from 'react';
import { InfluenceLinesWorkspaceProvider, useInfluenceWorkspace } from '@/subjects/structural-analysis/features/influence-lines/context/InfluenceLinesWorkspaceContext';
import { useInfluenceLinesEngine } from '@/subjects/structural-analysis/features/influence-lines/hooks/useInfluenceLinesEngine';
import { InfluenceLineBeamCanvas } from '@/subjects/structural-analysis/features/influence-lines/components/builder/InfluenceLineBeamCanvas';
import { ILManager } from '@/subjects/structural-analysis/features/influence-lines/components/builder/ILManager';
import { TargetSectionSelector } from '@/subjects/structural-analysis/features/influence-lines/components/builder/TargetSectionSelector';
import { MovingVehicleConfigurator } from '@/subjects/structural-analysis/features/influence-lines/components/builder/MovingVehicleConfigurator';
import { InfluenceLinesToolBar } from '@/subjects/structural-analysis/features/influence-lines/components/builder/InfluenceLinesToolBar';
import { InfluenceLineChart } from '@/subjects/structural-analysis/features/influence-lines/components/diagrams/InfluenceLineChart';
import { MullerBreslauAnimator } from '@/subjects/structural-analysis/features/influence-lines/components/diagrams/MullerBreslauAnimator';
import { CalculationBreakdowns } from '@/subjects/structural-analysis/features/influence-lines/components/breakdowns/CalculationBreakdowns';
import { MathTextRenderer } from '@/subjects/mechanics-of-solids/features/sfd-bmd/components/breakdowns/MathTextRenderer';
import { ArrowLeft, RefreshCw, AlertTriangle, FileDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PDFExportModal } from '@/features/pdf-export/PDFExportModal';

const InfluenceLinesPageInternal: React.FC = () => {
    const { solverResult } = useInfluenceLinesEngine();
    const { transitMethod, targets, supports, activeVehicle, transitPosition, activeTab, setActiveTab } = useInfluenceWorkspace();
    const navigate = useNavigate();
    const [isExportOpen, setIsExportOpen] = useState(false);

    const visibleTargets = targets.filter(t => t.isVisible);

    return (
        <div className="flex flex-col gap-6 p-6 max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate('/')}
                        className="rounded-lg border border-border p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
                        title="Back to Dashboard"
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </button>
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-foreground md:text-2xl">
                            Influence Lines & Moving Loads Solver
                        </h1>
                        <p className="text-xs text-muted-foreground">
                            Analyze support reactions, shear force cuts, and bending moments under unit loads and multi-axle vehicle transits
                        </p>
                    </div>
                </div>
                <div className="flex gap-2">
                    {/* Temporarily hidden for debugging */}
                    {false && (
                        <button
                            onClick={() => setIsExportOpen(true)}
                            disabled={!solverResult.success}
                            className="flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            <FileDown className="h-3.5 w-3.5 text-primary" />
                            <span>Export Report</span>
                        </button>
                    )}
                    <button
                        onClick={() => window.location.reload()}
                        className="flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted transition-all"
                    >
                        <RefreshCw className="h-3.5 w-3.5" />
                        <span>Reset Workspace</span>
                    </button>
                </div>
            </div>

            {/* Main Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Visual Canvas & Diagrams Area */}
                <div className="flex flex-col gap-6 lg:col-span-3">
                    <div id="il-beam-canvas">
                        <InfluenceLineBeamCanvas />
                    </div>

                    {solverResult.success ? (
                        <div className="flex flex-col gap-6">
                            {visibleTargets.map((t) => (
                                <div key={t.id} id={`il-chart-${t.id}`} className="flex flex-col gap-3">
                                    {transitMethod === 'muller-breslau' ? (
                                        <MullerBreslauAnimator target={t} />
                                    ) : (
                                        <InfluenceLineChart target={t} />
                                    )}
                                </div>
                            ))}
                            {visibleTargets.length === 0 && (
                                <div className="flex items-center justify-center p-8 border border-dashed border-border rounded-xl text-xs text-muted-foreground">
                                    No diagrams selected. Enable visibility toggles in the Manager to display diagrams.
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex gap-3 rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-xs text-destructive">
                            <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                            <div>
                                <p className="font-semibold">Solving Suspended</p>
                                <div className="mt-1 text-destructive/80">
                                    <MathTextRenderer text={solverResult.error || 'The beam support configuration is unstable or statically redundant. Please adjust supports to evaluate the influence lines.'} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-6 lg:col-span-1">
                    <ILManager />
                    <InfluenceLinesToolBar />
                    <TargetSectionSelector />
                    <MovingVehicleConfigurator />
                </div>
            </div>

            {/* Step-by-Step Educational Mathematics Breakdowns */}
            <div className="mt-2">
                <CalculationBreakdowns />
            </div>

            {/* PDF Export Options Modal */}
            <PDFExportModal
                isOpen={isExportOpen}
                onClose={() => setIsExportOpen(false)}
                documentType="influence-lines"
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                defaultTitle="Influence Lines & Moving Loads Report"
                availableCharts={visibleTargets.map(t => {
                    let label = '';
                    if (t.type === 'reaction') {
                        const sortedSupports = [...supports].sort((a, b) => a.position - b.position);
                        const idx = sortedSupports.findIndex(s => Math.abs(s.position - (t.targetSupportX ?? -999)) < 0.05);
                        const letter = idx >= 0 ? String.fromCharCode(65 + idx) : '';
                        label = `Influence Line: Reaction R_${letter}`;
                    } else if (t.type === 'shear') {
                        label = `Influence Line: Shear Force V_c (x = ${t.targetSection.xc.toFixed(2)}m)`;
                    } else if (t.type === 'moment') {
                        label = `Influence Line: Bending Moment M_c (x = ${t.targetSection.xc.toFixed(2)}m)`;
                    }
                    return { id: `il-chart-${t.id}`, label, defaultSelected: true };
                })}
                availableCalculations={[
                    { id: 'il-breakdown-doi', label: 'Indeterminacy analysis (DOI)', tabToActivate: 'doi' },
                    { id: 'il-breakdown-ild', label: 'ILD Equations & derivation steps', tabToActivate: 'ild' },
                    ...(activeVehicle ? [
                        { id: 'il-breakdown-transit', label: `Convolution Superposition (x = ${transitPosition.toFixed(1)}m)`, tabToActivate: 'transit' },
                        { id: 'il-breakdown-absMax', label: 'Absolute Maximum moving envelopes', tabToActivate: 'absMax' },
                    ] : [])
                ]}
            />
        </div>
    );
};

export const InfluenceLinesPage: React.FC = () => {
    return (
        <InfluenceLinesWorkspaceProvider>
            <InfluenceLinesPageInternal />
        </InfluenceLinesWorkspaceProvider>
    );
};
export default InfluenceLinesPage;
