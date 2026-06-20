import React from 'react';
import { useBeamWorkspace } from '../../context/BeamWorkspaceContext';
import { SupportType, ReleaseType } from '@/cores/mechanics-of-solids/sfd-bmd/types';

export const ElementConfigurator: React.FC = () => {
  const {
    length,
    setLength,
    supports,
    updateSupport,
    deleteSupport,
    releases,
    updateRelease,
    deleteRelease,
    loads,
    updateLoad,
    deleteLoad,
    selectedId,
  } = useBeamWorkspace();

  const activeSupport = supports.find(s => s.id === selectedId);
  const activeRelease = releases.find(r => r.id === selectedId);
  const activeLoad = loads.find(l => l.id === selectedId);

  const renderContent = () => {
    if (selectedId === 'beam') {
      return (
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-primary">Beam Properties</h3>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted-foreground">Beam Length (meters)</label>
            <input
              type="number"
              min={1}
              max={50}
              step={0.5}
              value={length}
              onChange={(e) => setLength(parseFloat(e.target.value) || 6)}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
            />
          </div>
        </div>
      );
    }

    if (activeSupport) {
      return (
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold text-primary">Support Properties</h3>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted-foreground">Support Type</label>
            <select
              value={activeSupport.type}
              onChange={(e) => updateSupport(activeSupport.id, { type: e.target.value as SupportType })}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
            >
              <option value="roller">Roller Support</option>
              <option value="hinge">Hinge Support</option>
              <option value="fixed">Fixed Support</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted-foreground">Position (meters from left)</label>
            <input
              type="number"
              min={0}
              max={length}
              step={0.1}
              value={activeSupport.position}
              onChange={(e) => updateSupport(activeSupport.id, { position: parseFloat(e.target.value) || 0 })}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
            />
          </div>
          <button
            onClick={() => deleteSupport(activeSupport.id)}
            className="mt-2 w-full rounded-lg bg-destructive px-3 py-2 text-xs font-semibold text-destructive-foreground transition-all hover:bg-destructive/90 active:scale-[0.98]"
          >
            Delete Support
          </button>
        </div>
      );
    }

    if (activeRelease) {
      return (
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold text-primary">Internal Release Properties</h3>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted-foreground">Release Type</label>
            <select
              value={activeRelease.type}
              onChange={(e) => updateRelease(activeRelease.id, { type: e.target.value as ReleaseType })}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
            >
              <option value="hinge">Internal Hinge (Moment Release)</option>
              <option value="roller">Internal Roller (Moment & Shear Release)</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted-foreground">Position (meters from left)</label>
            <input
              type="number"
              min={0}
              max={length}
              step={0.1}
              value={activeRelease.position}
              onChange={(e) => updateRelease(activeRelease.id, { position: parseFloat(e.target.value) || 0 })}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
            />
          </div>
          <button
            onClick={() => deleteRelease(activeRelease.id)}
            className="mt-2 w-full rounded-lg bg-destructive px-3 py-2 text-xs font-semibold text-destructive-foreground transition-all hover:bg-destructive/90 active:scale-[0.98]"
          >
            Delete Release
          </button>
        </div>
      );
    }

    if (activeLoad) {
      const isPointOrMoment = activeLoad.type === 'point' || activeLoad.type === 'moment';
      return (
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold text-primary">{activeLoad.type.toUpperCase()} Load Properties</h3>
          
          {isPointOrMoment ? (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-muted-foreground">Position (meters)</label>
              <input
                type="number"
                min={0}
                max={length}
                step={0.1}
                value={activeLoad.position ?? 0}
                onChange={(e) => updateLoad(activeLoad.id, { position: parseFloat(e.target.value) || 0 })}
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
              />
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">Start Position (meters)</label>
                <input
                  type="number"
                  min={0}
                  max={activeLoad.endPosition ?? length}
                  step={0.1}
                  value={activeLoad.startPosition ?? 0}
                  onChange={(e) => updateLoad(activeLoad.id, { startPosition: parseFloat(e.target.value) || 0 })}
                  className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">End Position (meters)</label>
                <input
                  type="number"
                  min={activeLoad.startPosition ?? 0}
                  max={length}
                  step={0.1}
                  value={activeLoad.endPosition ?? length}
                  onChange={(e) => updateLoad(activeLoad.id, { endPosition: parseFloat(e.target.value) || length })}
                  className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
                />
              </div>
            </>
          )}

          {activeLoad.type === 'point' && (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-muted-foreground">Magnitude (kN, positive downward, negative upward)</label>
              <input
                type="number"
                step={1}
                value={activeLoad.magnitude ?? 10}
                onChange={(e) => updateLoad(activeLoad.id, { magnitude: parseFloat(e.target.value) || 0 })}
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
              />
            </div>
          )}

          {activeLoad.type === 'moment' && (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-muted-foreground">Magnitude (kNm, positive clockwise, negative CCW)</label>
              <input
                type="number"
                step={1}
                value={activeLoad.magnitude ?? 5}
                onChange={(e) => updateLoad(activeLoad.id, { magnitude: parseFloat(e.target.value) || 0 })}
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
              />
            </div>
          )}

          {activeLoad.type === 'udl' && (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-muted-foreground">Magnitude (kN/m, positive downward)</label>
              <input
                type="number"
                step={1}
                value={activeLoad.magnitude ?? 4}
                onChange={(e) => updateLoad(activeLoad.id, { magnitude: parseFloat(e.target.value) || 0 })}
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
              />
            </div>
          )}

          {activeLoad.type === 'uvl' && (
            <>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">Start Magnitude (kN/m, positive downward)</label>
                <input
                  type="number"
                  step={1}
                  value={activeLoad.startMagnitude ?? 0}
                  onChange={(e) => updateLoad(activeLoad.id, { startMagnitude: parseFloat(e.target.value) || 0 })}
                  className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">End Magnitude (kN/m, positive downward)</label>
                <input
                  type="number"
                  step={1}
                  value={activeLoad.endMagnitude ?? 6}
                  onChange={(e) => updateLoad(activeLoad.id, { endMagnitude: parseFloat(e.target.value) || 0 })}
                  className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
                />
              </div>
            </>
          )}

          <button
            onClick={() => deleteLoad(activeLoad.id)}
            className="mt-2 w-full rounded-lg bg-destructive px-3 py-2 text-xs font-semibold text-destructive-foreground transition-all hover:bg-destructive/90 active:scale-[0.98]"
          >
            Delete Load
          </button>
        </div>
      );
    }

    return (
      <div className="flex h-full flex-col items-center justify-center py-6 text-center text-xs text-muted-foreground">
        <p>Select an element on the canvas to configure properties</p>
        <button
          onClick={() => setLength(length)}
          className="mt-3 rounded-lg border border-border bg-background px-3 py-1.5 font-medium text-foreground transition-all hover:border-primary hover:bg-primary/10"
        >
          Configure Beam Member
        </button>
      </div>
    );
  };

  return (
    <div className="flex flex-col rounded-xl border border-border bg-card/40 p-4 backdrop-blur-md min-h-[220px]">
      <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Configuration Panel</div>
      {renderContent()}
    </div>
  );
};
