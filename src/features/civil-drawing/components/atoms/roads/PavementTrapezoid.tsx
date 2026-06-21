import React from 'react';
import { PavementLayerGeometry } from '../../../engines/pavementProfileEngine';

interface PavementTrapezoidProps {
  layerGeoms: PavementLayerGeometry[];
  activeLayerId?: string;
  onSelectLayer?: (id: string) => void;
}

export const PavementTrapezoid: React.FC<PavementTrapezoidProps> = ({
  layerGeoms,
  activeLayerId,
  onSelectLayer,
}) => {
  return (
    <g>
      {layerGeoms.map(layer => {
        // Construct SVG polygon points string: "x1,y1 x2,y2 ..."
        const pointsStr = layer.polygonPoints.map(p => `${p.x},${p.y}`).join(' ');
        const isActive = activeLayerId === layer.id;

        const defaultClass = layer.colorClass || 'fill-muted stroke-foreground/35';
        const activeClass = 'fill-primary/20 stroke-primary stroke-2';

        return (
          <polygon
            key={layer.id}
            points={pointsStr}
            onClick={() => onSelectLayer?.(layer.id)}
            className={`transition-all duration-200 cursor-pointer ${
              isActive ? activeClass : defaultClass
            }`}
          />
        );
      })}
    </g>
  );
};
