export interface PavementLayerSpec {
  id: string;
  name: string;
  thickness: number;   // in mm
  colorClass: string;  // CSS fill/stroke styling class
  isSubgrade?: boolean; // can flag bottom subgrade to be rendered flat
}

export interface ShoulderSpec {
  width: number;       // shoulder width in mm
  slopePercentage: number; // shoulder slope (usually steeper than camber, e.g. 4%)
  colorClass: string;
}

export interface DrainageSpec {
  width: number;       // trench top width
  depth: number;       // trench depth
  shoulderClearance: number; // offset between shoulder edge and drain start
  colorClass: string;
}

export interface RoadSectionSpec {
  id: string;
  carriagewayWidth: number; // total road width in mm
  camberPercentage: number; // crown slope percentage (e.g. 2.5)
  layers: PavementLayerSpec[];
  shoulder?: ShoulderSpec;
  drainage?: DrainageSpec;
}
