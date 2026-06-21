import React from 'react';
import { LatexFormula } from '@/features/presentation/components/elements/LatexFormula';
import { IMatrixPayload } from '../../../../cores/shared/types/step-protocol';

interface MatrixStepRendererProps {
  payload: IMatrixPayload;
  title: string;
}

export const MatrixStepRenderer: React.FC<MatrixStepRendererProps> = ({ payload, title }) => {
  const { matrix, vectorF, vectorD, labels } = payload;

  const formatMatrix = (mat: number[][]) => {
    return `\\begin{bmatrix} ${mat.map(row => row.map(v => parseFloat(v.toFixed(3))).join(' & ')).join(' \\\\ ') } \\end{bmatrix}`;
  };

  const formatVector = (vec: number[]) => {
    return `\\begin{Bmatrix} ${vec.map(v => parseFloat(v.toFixed(3))).join(' \\\\ ') } \\end{Bmatrix}`;
  };

  const formatLabels = (lbls: string[]) => {
    return `\\begin{Bmatrix} ${lbls.join(' \\\\ ') } \\end{Bmatrix}`;
  };

  const matrixLatex = formatMatrix(matrix);
  const vectorFLatex = formatVector(vectorF);
  const labelsLatex = labels && labels.length === vectorF.length ? formatLabels(labels) : '\\{D\\}';

  return (
    <div className="rounded-xl border border-border bg-card/50 p-4 shadow-xs flex flex-col gap-4">
      <div className="text-xs font-bold text-primary uppercase tracking-wider border-b border-border/40 pb-2">
        {title}
      </div>

      <div className="flex flex-col gap-3 overflow-x-auto py-2">
        <div className="text-xs text-muted-foreground font-semibold">{"Stiffness Equation \\([K]\\{D\\} = \\{F\\}\\):"}</div>
        <div className="flex justify-center my-2 select-text">
          <LatexFormula math={`${matrixLatex} \\times ${labelsLatex} = ${vectorFLatex}`} block />
        </div>
      </div>

      {vectorD && vectorD.length > 0 && (
        <div className="border-t border-border/30 pt-3 flex flex-col gap-2 overflow-x-auto">
          <div className="text-xs text-primary font-bold">{"Solved Degrees of Freedom \\(\\{D\\}\\):"}</div>
          <div className="flex justify-center my-1 select-text">
            {labels && labels.length === vectorD.length ? (
              <div className="flex flex-col gap-1.5 items-center">
                <LatexFormula math={`\\{D\\} = ${formatVector(vectorD)}`} block />
                <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-xs font-mono bg-background/25 border border-border/30 rounded-lg p-2.5 mt-2">
                  {labels.map((lbl, idx) => (
                    <div key={idx} className="flex gap-2">
                      <span className="text-muted-foreground">{lbl} =</span>
                      <span className="font-bold text-foreground">{vectorD[idx]!.toFixed(5)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <LatexFormula math={`\\{D\\} = ${formatVector(vectorD)}`} block />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default MatrixStepRenderer;
