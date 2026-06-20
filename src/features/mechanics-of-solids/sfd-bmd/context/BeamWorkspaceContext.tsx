import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ISupport, IInternalRelease, ILoad, SupportType, ReleaseType, LoadType } from '@/cores/mechanics-of-solids/sfd-bmd/types';

interface BeamWorkspaceContextProps {
  length: number;
  supports: ISupport[];
  releases: IInternalRelease[];
  loads: ILoad[];
  selectedId: string | null;
  hoverX: number | null;
  setLength: (len: number) => void;
  addSupport: (type: SupportType, position: number) => void;
  updateSupport: (id: string, updates: Partial<ISupport>) => void;
  deleteSupport: (id: string) => void;
  addRelease: (type: ReleaseType, position: number) => void;
  updateRelease: (id: string, updates: Partial<IInternalRelease>) => void;
  deleteRelease: (id: string) => void;
  addLoad: (type: LoadType, position: number) => void;
  updateLoad: (id: string, updates: Partial<ILoad>) => void;
  deleteLoad: (id: string) => void;
  setSelectedId: (id: string | null) => void;
  setHoverX: (x: number | null) => void;
}

const BeamWorkspaceContext = createContext<BeamWorkspaceContextProps | undefined>(undefined);

export const BeamWorkspaceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [length, setLengthState] = useState<number>(6);
  const [supports, setSupports] = useState<ISupport[]>([
    { id: 's-hinge', type: 'hinge', position: 0 },
    { id: 's-roller', type: 'roller', position: 6 },
  ]);
  const [releases, setReleases] = useState<IInternalRelease[]>([]);
  const [loads, setLoads] = useState<ILoad[]>([
    { id: 'l-point', type: 'point', position: 3, magnitude: 10 },
  ]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoverX, setHoverX] = useState<number | null>(null);

  const setLength = (len: number) => {
    setLengthState(Math.max(1, len));
    // Bound existing supports/loads to new length
    setSupports(prev => prev.map(s => ({ ...s, position: Math.min(s.position, len) })));
    setReleases(prev => prev.map(r => ({ ...r, position: Math.min(r.position, len) })));
    setLoads(prev => prev.map(l => {
      const updates = { ...l };
      if (l.position !== undefined) updates.position = Math.min(l.position, len);
      if (l.startPosition !== undefined) updates.startPosition = Math.min(l.startPosition, len);
      if (l.endPosition !== undefined) updates.endPosition = Math.min(l.endPosition, len);
      return updates;
    }));
  };

  const addSupport = (type: SupportType, position: number) => {
    const id = `support-${Date.now()}`;
    setSupports(prev => [...prev, { id, type, position: Math.min(Math.max(0, position), length) }]);
    setSelectedId(id);
  };

  const updateSupport = (id: string, updates: Partial<ISupport>) => {
    setSupports(prev => prev.map(s => {
      if (s.id !== id) return s;
      const updated = { ...s, ...updates };
      if (updated.position !== undefined) {
        updated.position = Math.min(Math.max(0, updated.position), length);
      }
      return updated;
    }));
  };

  const deleteSupport = (id: string) => {
    setSupports(prev => prev.filter(s => s.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const addRelease = (type: ReleaseType, position: number) => {
    const id = `release-${Date.now()}`;
    setReleases(prev => [...prev, { id, type, position: Math.min(Math.max(0, position), length) }]);
    setSelectedId(id);
  };

  const updateRelease = (id: string, updates: Partial<IInternalRelease>) => {
    setReleases(prev => prev.map(r => {
      if (r.id !== id) return r;
      const updated = { ...r, ...updates };
      if (updated.position !== undefined) {
        updated.position = Math.min(Math.max(0, updated.position), length);
      }
      return updated;
    }));
  };

  const deleteRelease = (id: string) => {
    setReleases(prev => prev.filter(r => r.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const addLoad = (type: LoadType, position: number) => {
    const id = `load-${Date.now()}`;
    const p = Math.min(Math.max(0, position), length);
    const newLoad: ILoad = { id, type };
    if (type === 'point' || type === 'moment') {
      newLoad.position = p;
      newLoad.magnitude = type === 'point' ? 10 : 5;
    } else {
      newLoad.startPosition = p;
      newLoad.endPosition = Math.min(p + 2, length);
      if (type === 'udl') {
        newLoad.magnitude = 4;
      } else {
        newLoad.startMagnitude = 0;
        newLoad.endMagnitude = 6;
      }
    }
    setLoads(prev => [...prev, newLoad]);
    setSelectedId(id);
  };

  const updateLoad = (id: string, updates: Partial<ILoad>) => {
    setLoads(prev => prev.map(l => {
      if (l.id !== id) return l;
      const updated = { ...l, ...updates };
      if (updated.position !== undefined) {
        updated.position = Math.min(Math.max(0, updated.position), length);
      }
      if (updated.startPosition !== undefined) {
        updated.startPosition = Math.min(Math.max(0, updated.startPosition), length);
      }
      if (updated.endPosition !== undefined) {
        updated.endPosition = Math.min(Math.max(0, updated.endPosition), length);
      }
      return updated;
    }));
  };

  const deleteLoad = (id: string) => {
    setLoads(prev => prev.filter(l => l.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  return (
    <BeamWorkspaceContext.Provider
      value={{
        length,
        supports,
        releases,
        loads,
        selectedId,
        hoverX,
        setLength,
        addSupport,
        updateSupport,
        deleteSupport,
        addRelease,
        updateRelease,
        deleteRelease,
        addLoad,
        updateLoad,
        deleteLoad,
        setSelectedId,
        setHoverX,
      }}
    >
      {children}
    </BeamWorkspaceContext.Provider>
  );
};

export const useBeamWorkspace = () => {
  const context = useContext(BeamWorkspaceContext);
  if (!context) {
    throw new Error('useBeamWorkspace must be used within a BeamWorkspaceProvider');
  }
  return context;
};
