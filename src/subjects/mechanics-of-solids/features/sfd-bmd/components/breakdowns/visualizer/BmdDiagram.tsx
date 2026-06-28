import React from 'react';
import { motion } from 'motion/react';
import { getSvgX, getParabolaPoints } from './diagramConstants';

interface BmdDiagramProps {
  bmdY: number;
  bmdScale: number;
  pairing: 'beam' | 'beam-sfd' | 'sfd-bmd' | 'all';
  stepIndex: number;
  displayedStep: number;
  clickIdx: number;
}

export const BmdDiagram: React.FC<BmdDiagramProps> = ({
  bmdY,
  bmdScale,
  pairing,
  stepIndex,
  displayedStep,
  clickIdx,
}) => {
  const showBmd = pairing === 'sfd-bmd' || pairing === 'all';
  if (!showBmd) return null;

  // Helper function to draw reference lines + orange difference arrows
  const renderHelperVisuals = (
    stepCond: boolean,
    opacity: number,
    refY1: number,
    refY2: number,
    xRefStart: number,
    xRefEnd: number,
    arrowX: number,
    arrowYStart: number,
    arrowYEnd: number,
    diffValue?: string
  ) => {
    if (!stepCond) return null;
    const midY = (arrowYStart + arrowYEnd) / 2;
    const textX = getSvgX(arrowX) + (arrowX > 15 ? -6 : 6);
    const textAnchor = arrowX > 15 ? 'end' : 'start';

    return (
      <g style={{ opacity }}>
        <line
          x1={getSvgX(xRefStart)}
          y1={refY1}
          x2={getSvgX(xRefEnd)}
          y2={refY2}
          className="stroke-amber-500/70"
          strokeWidth="1.2"
          strokeDasharray="2 2"
        />
        {arrowYStart !== arrowYEnd && (
          <g>
            <line
              x1={getSvgX(arrowX)}
              y1={arrowYStart}
              x2={getSvgX(arrowX)}
              y2={arrowYEnd}
              className="stroke-amber-500 animate-in fade-in duration-200"
              strokeWidth="1.8"
              markerEnd="url(#arrow)"
            />
            {diffValue && (
              <text
                x={textX}
                y={midY + 3}
                textAnchor={textAnchor}
                className="text-[7.5px] font-black fill-amber-500 font-mono animate-in fade-in"
              >
                {diffValue}
              </text>
            )}
          </g>
        )}
      </g>
    );
  };

  return (
    <g>
      {/* Baseline */}
      <line x1="30" y1={bmdY} x2="470" y2={bmdY} className="stroke-slate-400/60 dark:stroke-slate-650" strokeWidth="1.2" />
      <text x="473" y={bmdY + 3} className="text-[8px] font-bold fill-muted-foreground font-mono">x</text>
      <text x="40" y={bmdY - 26} className="text-[8px] font-black fill-indigo-500 font-mono">M (kNm)</text>

      {/* NODE A START (step 14) */}
      {displayedStep >= 14 && (
        <g>
          {((displayedStep === 14 && clickIdx >= 1) || displayedStep > 14) && (
            <circle cx={getSvgX(0)} cy={bmdY} r="3" className="fill-indigo-500 stroke-white dark:stroke-slate-900 animate-in zoom-in-50 duration-200" strokeWidth="1" />
          )}
        </g>
      )}

      {/* BMD SEGMENT A-C INTEGRATION (step 15) */}
      {displayedStep >= 15 && (
        <g>
          {((displayedStep === 15 && clickIdx >= 1) || displayedStep > 15) && (
            <circle cx={getSvgX(5)} cy={bmdY - 71.625 * bmdScale} r="3" className="fill-indigo-500 stroke-white dark:stroke-slate-900 animate-in zoom-in-50 duration-200" strokeWidth="1" />
          )}
          {renderHelperVisuals(
            stepIndex >= 15,
            stepIndex === 15 ? (clickIdx >= 2 ? 1 : 0) : 0.15,
            bmdY, bmdY,
            0, 5, 5,
            bmdY,
            bmdY - 71.625 * bmdScale,
            "+71.625 kNm"
          )}
          {displayedStep > 15 ? (
            <line x1={getSvgX(0)} y1={bmdY} x2={getSvgX(5)} y2={bmdY - 71.625 * bmdScale} className="stroke-indigo-500" strokeWidth="2" />
          ) : displayedStep === 15 && clickIdx >= 3 ? (
            <motion.line
              x1={getSvgX(0)} y1={bmdY}
              x2={getSvgX(5)} y2={bmdY - 71.625 * bmdScale}
              className="stroke-indigo-500"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          ) : null}
        </g>
      )}

      {/* BMD NODE C CHECK (step 16) */}
      {displayedStep >= 16 && (
        <g>
          {((displayedStep === 16 && clickIdx >= 1) || displayedStep > 16) && (
            <circle cx={getSvgX(5)} cy={bmdY - 71.625 * bmdScale} r="3" className="fill-indigo-500 stroke-white dark:stroke-slate-900 animate-in zoom-in-50 duration-200" strokeWidth="1" />
          )}
        </g>
      )}

      {/* BMD SEGMENT C-TO-PEAK INTEGRATION (step 17) */}
      {displayedStep >= 17 && (
        <g>
          {((displayedStep === 17 && clickIdx >= 1) || displayedStep > 17) && (
            <circle cx={getSvgX(9.775)} cy={bmdY - 105.825 * bmdScale} r="3" className="fill-indigo-500 stroke-white dark:stroke-slate-900 animate-in zoom-in-50 duration-200" strokeWidth="1" />
          )}
          {renderHelperVisuals(
            stepIndex >= 17,
            stepIndex === 17 ? (clickIdx >= 2 ? 1 : 0) : 0.15,
            bmdY - 71.625 * bmdScale,
            bmdY - 71.625 * bmdScale,
            5, 9.775, 9.775,
            bmdY - 71.625 * bmdScale,
            bmdY - 105.825 * bmdScale,
            "+34.200 kNm"
          )}
          {displayedStep > 17 ? (
            <path d={`M ${getParabolaPoints(5, 9.775, bmdY, bmdScale).trim().split(' ').join(' L ')}`} fill="none" className="stroke-indigo-500" strokeWidth="2" />
          ) : displayedStep === 17 && clickIdx >= 3 ? (
            <motion.path
              d={`M ${getParabolaPoints(5, 9.775, bmdY, bmdScale).trim().split(' ').join(' L ')}`}
              fill="none"
              className="stroke-indigo-500"
              strokeWidth="2.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          ) : null}
        </g>
      )}

      {/* BMD PEAK MOMENT CHECK (step 18) */}
      {displayedStep >= 18 && (
        <g>
          {((displayedStep === 18 && clickIdx >= 1) || displayedStep > 18) && (
            <circle cx={getSvgX(9.775)} cy={bmdY - 105.825 * bmdScale} r="3" className="fill-indigo-500 stroke-white dark:stroke-slate-900 animate-in zoom-in-50 duration-200" strokeWidth="1" />
          )}
        </g>
      )}

      {/* BMD SEGMENT PEAK-TO-D INTEGRATION (step 19) */}
      {displayedStep >= 19 && (
        <g>
          {((displayedStep === 19 && clickIdx >= 1) || displayedStep > 19) && (
            <circle cx={getSvgX(12)} cy={bmdY - 98.4 * bmdScale} r="3" className="fill-indigo-500 stroke-white dark:stroke-slate-900 animate-in zoom-in-50 duration-200" strokeWidth="1" />
          )}
          {renderHelperVisuals(
            stepIndex >= 19,
            stepIndex === 19 ? (clickIdx >= 2 ? 1 : 0) : 0.15,
            bmdY - 105.825 * bmdScale,
            bmdY - 105.825 * bmdScale,
            9.775, 12, 12,
            bmdY - 105.825 * bmdScale,
            bmdY - 98.4 * bmdScale,
            "-7.425 kNm"
          )}
          {displayedStep > 19 ? (
            <path d={`M ${getParabolaPoints(9.775, 12, bmdY, bmdScale).trim().split(' ').join(' L ')}`} fill="none" className="stroke-indigo-500" strokeWidth="2" />
          ) : displayedStep === 19 && clickIdx >= 3 ? (
            <motion.path
              d={`M ${getParabolaPoints(9.775, 12, bmdY, bmdScale).trim().split(' ').join(' L ')}`}
              fill="none"
              className="stroke-indigo-500"
              strokeWidth="2.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          ) : null}
        </g>
      )}

      {/* BMD NODE D CHECK (step 20) */}
      {displayedStep >= 20 && (
        <g>
          {((displayedStep === 20 && clickIdx >= 1) || displayedStep > 20) && (
            <circle cx={getSvgX(12)} cy={bmdY - 98.4 * bmdScale} r="3" className="fill-indigo-500 stroke-white dark:stroke-slate-900 animate-in zoom-in-50 duration-200" strokeWidth="1" />
          )}
        </g>
      )}

      {/* BMD SEGMENT D-E INTEGRATION (step 21) */}
      {displayedStep >= 21 && (
        <g>
          {((displayedStep === 21 && clickIdx >= 1) || displayedStep > 21) && (
            <circle cx={getSvgX(17)} cy={bmdY - 65.025 * bmdScale} r="3" className="fill-indigo-500 stroke-white dark:stroke-slate-900 animate-in zoom-in-50 duration-200" strokeWidth="1" />
          )}
          {renderHelperVisuals(
            stepIndex >= 21,
            stepIndex === 21 ? (clickIdx >= 2 ? 1 : 0) : 0.15,
            bmdY - 98.4 * bmdScale,
            bmdY - 98.4 * bmdScale,
            12, 17, 17,
            bmdY - 98.4 * bmdScale,
            bmdY - 65.025 * bmdScale,
            "-33.375 kNm"
          )}
          {displayedStep > 21 ? (
            <line x1={getSvgX(12)} y1={bmdY - 98.4 * bmdScale} x2={getSvgX(17)} y2={bmdY - 65.025 * bmdScale} className="stroke-indigo-500" strokeWidth="2" />
          ) : displayedStep === 21 && clickIdx >= 3 ? (
            <motion.line
              x1={getSvgX(12)} y1={bmdY - 98.4 * bmdScale}
              x2={getSvgX(17)} y2={bmdY - 65.025 * bmdScale}
              className="stroke-indigo-500"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          ) : null}
        </g>
      )}

      {/* BMD NODE E CHECK (step 22) */}
      {displayedStep >= 22 && (
        <g>
          {((displayedStep === 22 && clickIdx >= 1) || displayedStep > 22) && (
            <circle cx={getSvgX(17)} cy={bmdY - 65.025 * bmdScale} r="3" className="fill-indigo-500 stroke-white dark:stroke-slate-900 animate-in zoom-in-50 duration-200" strokeWidth="1" />
          )}
        </g>
      )}

      {/* BMD SEGMENT E-B INTEGRATION (step 23) */}
      {displayedStep >= 23 && (
        <g>
          {((displayedStep === 23 && clickIdx >= 1) || displayedStep > 23) && (
            <circle cx={getSvgX(20)} cy={bmdY} r="3" className="fill-indigo-500 stroke-white dark:stroke-slate-900 animate-in zoom-in-50 duration-200" strokeWidth="1" />
          )}
          {renderHelperVisuals(
            stepIndex >= 23,
            stepIndex === 23 ? (clickIdx >= 2 ? 1 : 0) : 0.15,
            bmdY - 65.025 * bmdScale,
            bmdY - 65.025 * bmdScale,
            17, 20, 20,
            bmdY - 65.025 * bmdScale,
            bmdY,
            "-65.025 kNm"
          )}
          {displayedStep > 23 ? (
            <line x1={getSvgX(17)} y1={bmdY - 65.025 * bmdScale} x2={getSvgX(20)} y2={bmdY} className="stroke-indigo-500" strokeWidth="2" />
          ) : displayedStep === 23 && clickIdx >= 3 ? (
            <motion.line
              x1={getSvgX(17)} y1={bmdY - 65.025 * bmdScale}
              x2={getSvgX(20)} y2={bmdY}
              className="stroke-indigo-500"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          ) : null}
        </g>
      )}

      {/* BMD NODE B CHECK (step 24) */}
      {displayedStep >= 24 && (
        <g>
          {((displayedStep === 24 && clickIdx >= 1) || displayedStep > 24) && (
            <circle cx={getSvgX(20)} cy={bmdY} r="3" className="fill-indigo-500 stroke-white dark:stroke-slate-900 animate-in zoom-in-50 duration-200" strokeWidth="1" />
          )}
        </g>
      )}

      {/* Curvature selections highlight overrides */}
      {displayedStep === 13 && (
        <polyline
          points={getParabolaPoints(5, 9.775, bmdY, bmdScale)}
          fill="none"
          className={`stroke-[3.5] transition-all ${clickIdx >= 1 ? 'stroke-emerald-500' : 'stroke-indigo-500/20'}`}
        />
      )}
      {displayedStep === 14 && (
        <polyline
          points={getParabolaPoints(9.775, 12, bmdY, bmdScale)}
          fill="none"
          className={`stroke-[3.5] transition-all ${clickIdx >= 1 ? 'stroke-rose-500' : 'stroke-indigo-500/20'}`}
        />
      )}

      {/* Completed BMD overlay */}
      {(displayedStep === 25 || displayedStep === 12) && (
        <g>
          <line x1={getSvgX(0)} y1={bmdY} x2={getSvgX(5)} y2={bmdY - 71.625 * bmdScale} className="stroke-indigo-500" strokeWidth="2.2" />
          <polyline points={getParabolaPoints(5, 12, bmdY, bmdScale)} fill="none" className="stroke-indigo-500" strokeWidth="2.2" />
          <line x1={getSvgX(12)} y1={bmdY - 98.4 * bmdScale} x2={getSvgX(17)} y2={bmdY - 65.025 * bmdScale} className="stroke-indigo-500" strokeWidth="2.2" />
          <line x1={getSvgX(17)} y1={bmdY - 65.025 * bmdScale} x2={getSvgX(20)} y2={bmdY} className="stroke-indigo-500" strokeWidth="2.2" />
          
          <text x={getSvgX(5) + 6} y={bmdY - 71.625 * bmdScale + 3} className="text-[7.5px] font-bold fill-indigo-500 font-mono">71.625</text>
          <text x={getSvgX(9.775)} y={bmdY - 105.825 * bmdScale - 5} textAnchor="middle" className="text-[7.5px] font-black fill-indigo-500 font-mono">105.825</text>
          <text x={getSvgX(12) + 6} y={bmdY - 98.4 * bmdScale + 3} className="text-[7.5px] font-bold fill-indigo-500 font-mono">98.4</text>
          <text x={getSvgX(17) + 6} y={bmdY - 65.025 * bmdScale + 3} className="text-[7.5px] font-bold fill-indigo-500 font-mono">65.025</text>
        </g>
      )}
    </g>
  );
};
