import React from 'react';
import { motion } from 'motion/react';
import { getSvgX, rxnA } from './diagramConstants';

interface SfdDiagramProps {
  sfdY: number;
  sfdScale: number;
  pairing: 'beam' | 'beam-sfd' | 'sfd-bmd' | 'all';
  stepIndex: number;
  displayedStep: number;
  clickIdx: number;
}

export const SfdDiagram: React.FC<SfdDiagramProps> = ({
  sfdY,
  sfdScale,
  pairing,
  stepIndex,
  displayedStep,
  clickIdx,
}) => {
  const showSfd = pairing === 'beam-sfd' || pairing === 'sfd-bmd' || pairing === 'all';
  if (!showSfd) return null;

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

  // Integration highlight area on SFD
  let shadeSource: React.ReactNode = null;
  if (pairing === 'sfd-bmd') {
    if (stepIndex === 15 && clickIdx >= 0) {
      shadeSource = (
        <g>
          <rect
            x={getSvgX(0)}
            y={sfdY - rxnA * sfdScale}
            width={getSvgX(5) - getSvgX(0)}
            height={rxnA * sfdScale}
            className="fill-emerald-500/25 stroke-emerald-500/20 animate-in fade-in duration-300"
          />
          {clickIdx >= 1 && (
            <text x={getSvgX(2.5)} y={sfdY - rxnA * sfdScale + 12} textAnchor="middle" className="text-[7px] font-black fill-emerald-600 dark:fill-emerald-400 font-mono animate-in fade-in">V = 14.325, L = 5m</text>
          )}
        </g>
      );
    } else if (stepIndex === 17 && clickIdx >= 0) {
      const peakX = 9.775;
      shadeSource = (
        <g>
          <polygon
            points={`${getSvgX(5)},${sfdY} ${getSvgX(5)},${sfdY - rxnA * sfdScale} ${getSvgX(peakX)},${sfdY}`}
            className="fill-emerald-500/25 stroke-emerald-500/20 animate-in fade-in duration-300"
          />
          {clickIdx >= 1 && (
            <text x={getSvgX(7.3)} y={sfdY - 6} textAnchor="middle" className="text-[7px] font-black fill-emerald-600 dark:fill-emerald-400 font-mono animate-in fade-in">V = 14.325, L = 4.775m</text>
          )}
        </g>
      );
    } else if (stepIndex === 19 && clickIdx >= 0) {
      const peakX = 9.775;
      const vD = -6.675;
      shadeSource = (
        <g>
          <polygon
            points={`${getSvgX(peakX)},${sfdY} ${getSvgX(12)},${sfdY} ${getSvgX(12)},${sfdY - vD * sfdScale}`}
            className="fill-rose-500/25 stroke-rose-500/20 animate-in fade-in duration-300"
          />
          {clickIdx >= 1 && (
            <text x={getSvgX(10.9)} y={sfdY + 12} textAnchor="middle" className="text-[7px] font-black fill-rose-600 dark:fill-rose-455 font-mono animate-in fade-in">V = -6.675, L = 2.225m</text>
          )}
        </g>
      );
    } else if (stepIndex === 21 && clickIdx >= 0) {
      const vDE = -6.675;
      shadeSource = (
        <g>
          <rect
            x={getSvgX(12)}
            y={sfdY}
            width={getSvgX(17) - getSvgX(12)}
            height={Math.abs(vDE * sfdScale)}
            className="fill-rose-500/25 stroke-rose-500/20 animate-in fade-in duration-300"
          />
          {clickIdx >= 1 && (
            <text x={getSvgX(14.5)} y={sfdY + 16} textAnchor="middle" className="text-[7px] font-black fill-rose-600 dark:fill-rose-455 font-mono animate-in fade-in">V = -6.675, L = 5m</text>
          )}
        </g>
      );
    } else if (stepIndex === 23 && clickIdx >= 0) {
      const vEB = -21.675;
      shadeSource = (
        <g>
          <rect
            x={getSvgX(17)}
            y={sfdY}
            width={getSvgX(20) - getSvgX(17)}
            height={Math.abs(vEB * sfdScale)}
            className="fill-rose-500/25 stroke-rose-500/20 animate-in fade-in duration-300"
          />
          {clickIdx >= 1 && (
            <text x={getSvgX(18.5)} y={sfdY + 22} textAnchor="middle" className="text-[7px] font-black fill-rose-600 dark:fill-rose-455 font-mono animate-in fade-in">V = -21.675, L = 3m</text>
          )}
        </g>
      );
    }
  }

  return (
    <g>
      {/* Baseline */}
      <line x1="30" y1={sfdY} x2="470" y2={sfdY} className="stroke-slate-400/60 dark:stroke-slate-650" strokeWidth="1.2" />
      <text x="473" y={sfdY + 3} className="text-[8px] font-bold fill-muted-foreground font-mono">x</text>
      <text x="40" y={sfdY - 26} className="text-[8px] font-black fill-rose-500 font-mono">V (kN)</text>

      {pairing === 'sfd-bmd' && shadeSource}

      {/* NODE A JUMP (step 3) */}
      {displayedStep >= 3 && (
        <g>
          {((displayedStep === 3 && clickIdx >= 1) || displayedStep > 3) && (
            <>
              <circle cx={getSvgX(0)} cy={sfdY} r="3" className="fill-rose-500 stroke-white dark:stroke-slate-900 animate-in zoom-in-50 duration-200" strokeWidth="1" />
              <circle cx={getSvgX(0)} cy={sfdY - rxnA * sfdScale} r="3" className="fill-rose-500 stroke-white dark:stroke-slate-900 animate-in zoom-in-50 duration-200" strokeWidth="1" />
            </>
          )}
          {renderHelperVisuals(
            stepIndex >= 3,
            stepIndex === 3 ? (clickIdx >= 2 ? 1 : 0) : 0.15,
            sfdY,
            sfdY,
            -0.5,
            0.5,
            0,
            sfdY,
            sfdY - rxnA * sfdScale,
            "+14.325 kN"
          )}
          {displayedStep > 3 ? (
            <line x1={getSvgX(0)} y1={sfdY} x2={getSvgX(0)} y2={sfdY - rxnA * sfdScale} className="stroke-rose-500" strokeWidth="2" />
          ) : displayedStep === 3 && clickIdx >= 3 ? (
            <motion.line
              x1={getSvgX(0)}
              y1={sfdY}
              x2={getSvgX(0)}
              y2={sfdY - rxnA * sfdScale}
              className="stroke-rose-500"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          ) : null}
        </g>
      )}

      {/* SEGMENT A-C INTEGRATION (step 4) */}
      {displayedStep >= 4 && (
        <g>
          {((displayedStep === 4 && clickIdx >= 1) || displayedStep > 4) && (
            <circle cx={getSvgX(5)} cy={sfdY - rxnA * sfdScale} r="3" className="fill-rose-500 stroke-white dark:stroke-slate-900 animate-in zoom-in-50 duration-200" strokeWidth="1" />
          )}
          {renderHelperVisuals(
            stepIndex >= 4,
            stepIndex === 4 ? (clickIdx >= 2 ? 1 : 0) : 0.15,
            sfdY - rxnA * sfdScale,
            sfdY - rxnA * sfdScale,
            0, 5, 5,
            sfdY - rxnA * sfdScale,
            sfdY - rxnA * sfdScale
          )}
          {displayedStep > 4 ? (
            <line x1={getSvgX(0)} y1={sfdY - rxnA * sfdScale} x2={getSvgX(5)} y2={sfdY - rxnA * sfdScale} className="stroke-rose-500" strokeWidth="2" />
          ) : displayedStep === 4 && clickIdx >= 3 ? (
            <motion.line
              x1={getSvgX(0)}
              y1={sfdY - rxnA * sfdScale}
              x2={getSvgX(5)}
              y2={sfdY - rxnA * sfdScale}
              className="stroke-rose-500"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          ) : null}
        </g>
      )}

      {/* NODE C CONTINUITY (step 5) */}
      {displayedStep >= 5 && (
        <g>
          {((displayedStep === 5 && clickIdx >= 1) || displayedStep > 5) && (
            <circle cx={getSvgX(5)} cy={sfdY - rxnA * sfdScale} r="3" className="fill-rose-500 stroke-white dark:stroke-slate-900 animate-in zoom-in-50 duration-200" strokeWidth="1" />
          )}
        </g>
      )}

      {/* SEGMENT C-D INTEGRATION (step 6) */}
      {displayedStep >= 6 && (
        <g>
          {((displayedStep === 6 && clickIdx >= 1) || displayedStep > 6) && (
            <circle cx={getSvgX(12)} cy={sfdY - (-6.675) * sfdScale} r="3" className="fill-rose-500 stroke-white dark:stroke-slate-900 animate-in zoom-in-50 duration-200" strokeWidth="1" />
          )}
          {renderHelperVisuals(
            stepIndex >= 6,
            stepIndex === 6 ? (clickIdx >= 2 ? 1 : 0) : 0.15,
            sfdY - rxnA * sfdScale,
            sfdY - rxnA * sfdScale,
            5, 12, 12,
            sfdY - rxnA * sfdScale,
            sfdY - (-6.675) * sfdScale,
            "-21.000 kN"
          )}
          {displayedStep > 6 ? (
            <line x1={getSvgX(5)} y1={sfdY - rxnA * sfdScale} x2={getSvgX(12)} y2={sfdY - (-6.675) * sfdScale} className="stroke-rose-500" strokeWidth="2" />
          ) : displayedStep === 6 && clickIdx >= 3 ? (
            <motion.line
              x1={getSvgX(5)}
              y1={sfdY - rxnA * sfdScale}
              x2={getSvgX(12)}
              y2={sfdY - (-6.675) * sfdScale}
              className="stroke-rose-500"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          ) : null}
          {((displayedStep === 6 && clickIdx >= 3) || displayedStep > 6) && (
            <g className="animate-in fade-in">
              <circle cx={getSvgX(9.775)} cy={sfdY} r="2" className="fill-rose-500 animate-pulse" />
              <text x={getSvgX(9.775)} y={sfdY + 12} textAnchor="middle" className="text-[7.5px] font-black fill-rose-500 font-mono">x_0 = 9.775m</text>
            </g>
          )}
        </g>
      )}

      {/* NODE D CONTINUITY (step 7) */}
      {displayedStep >= 7 && (
        <g>
          {((displayedStep === 7 && clickIdx >= 1) || displayedStep > 7) && (
            <circle cx={getSvgX(12)} cy={sfdY - (-6.675) * sfdScale} r="3" className="fill-rose-500 stroke-white dark:stroke-slate-900 animate-in zoom-in-50 duration-200" strokeWidth="1" />
          )}
        </g>
      )}

      {/* SEGMENT D-E INTEGRATION (step 8) */}
      {displayedStep >= 8 && (
        <g>
          {((displayedStep === 8 && clickIdx >= 1) || displayedStep > 8) && (
            <circle cx={getSvgX(17)} cy={sfdY - (-6.675) * sfdScale} r="3" className="fill-rose-500 stroke-white dark:stroke-slate-900 animate-in zoom-in-50 duration-200" strokeWidth="1" />
          )}
          {renderHelperVisuals(
            stepIndex >= 8,
            stepIndex === 8 ? (clickIdx >= 2 ? 1 : 0) : 0.15,
            sfdY - (-6.675) * sfdScale,
            sfdY - (-6.675) * sfdScale,
            12, 17, 17,
            sfdY - (-6.675) * sfdScale,
            sfdY - (-6.675) * sfdScale
          )}
          {displayedStep > 8 ? (
            <line x1={getSvgX(12)} y1={sfdY - (-6.675) * sfdScale} x2={getSvgX(17)} y2={sfdY - (-6.675) * sfdScale} className="stroke-rose-500" strokeWidth="2" />
          ) : displayedStep === 8 && clickIdx >= 3 ? (
            <motion.line
              x1={getSvgX(12)}
              y1={sfdY - (-6.675) * sfdScale}
              x2={getSvgX(17)}
              y2={sfdY - (-6.675) * sfdScale}
              className="stroke-rose-500"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          ) : null}
        </g>
      )}

      {/* NODE E JUMP (step 9) */}
      {displayedStep >= 9 && (
        <g>
          {((displayedStep === 9 && clickIdx >= 1) || displayedStep > 9) && (
            <>
              <circle cx={getSvgX(17)} cy={sfdY - (-6.675) * sfdScale} r="3" className="fill-rose-500 stroke-white dark:stroke-slate-900 animate-in zoom-in-50 duration-200" strokeWidth="1" />
              <circle cx={getSvgX(17)} cy={sfdY - (-21.675) * sfdScale} r="3" className="fill-rose-500 stroke-white dark:stroke-slate-900 animate-in zoom-in-50 duration-200" strokeWidth="1" />
            </>
          )}
          {renderHelperVisuals(
            stepIndex >= 9,
            stepIndex === 9 ? (clickIdx >= 2 ? 1 : 0) : 0.15,
            sfdY - (-6.675) * sfdScale,
            sfdY - (-6.675) * sfdScale,
            16, 18, 17,
            sfdY - (-6.675) * sfdScale,
            sfdY - (-21.675) * sfdScale,
            "-15.000 kN"
          )}
          {displayedStep > 9 ? (
            <line x1={getSvgX(17)} y1={sfdY - (-6.675) * sfdScale} x2={getSvgX(17)} y2={sfdY - (-21.675) * sfdScale} className="stroke-rose-500" strokeWidth="2" />
          ) : displayedStep === 9 && clickIdx >= 3 ? (
            <motion.line
              x1={getSvgX(17)}
              y1={sfdY - (-6.675) * sfdScale}
              x2={getSvgX(17)}
              y2={sfdY - (-21.675) * sfdScale}
              className="stroke-rose-500"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          ) : null}
        </g>
      )}

      {/* SEGMENT E-B INTEGRATION (step 10) */}
      {displayedStep >= 10 && (
        <g>
          {((displayedStep === 10 && clickIdx >= 1) || displayedStep > 10) && (
            <circle cx={getSvgX(20)} cy={sfdY - (-21.675) * sfdScale} r="3" className="fill-rose-500 stroke-white dark:stroke-slate-900 animate-in zoom-in-50 duration-200" strokeWidth="1" />
          )}
          {renderHelperVisuals(
            stepIndex >= 10,
            stepIndex === 10 ? (clickIdx >= 2 ? 1 : 0) : 0.15,
            sfdY - (-21.675) * sfdScale,
            sfdY - (-21.675) * sfdScale,
            17, 20, 20,
            sfdY - (-21.675) * sfdScale,
            sfdY - (-21.675) * sfdScale
          )}
          {displayedStep > 10 ? (
            <line x1={getSvgX(17)} y1={sfdY - (-21.675) * sfdScale} x2={getSvgX(20)} y2={sfdY - (-21.675) * sfdScale} className="stroke-rose-500" strokeWidth="2" />
          ) : displayedStep === 10 && clickIdx >= 3 ? (
            <motion.line
              x1={getSvgX(17)}
              y1={sfdY - (-21.675) * sfdScale}
              x2={getSvgX(20)}
              y2={sfdY - (-21.675) * sfdScale}
              className="stroke-rose-500"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          ) : null}
        </g>
      )}

      {/* NODE B JUMP (step 11) */}
      {displayedStep >= 11 && (
        <g>
          {((displayedStep === 11 && clickIdx >= 1) || displayedStep > 11) && (
            <>
              <circle cx={getSvgX(20)} cy={sfdY - (-21.675) * sfdScale} r="3" className="fill-rose-500 stroke-white dark:stroke-slate-900 animate-in zoom-in-50 duration-200" strokeWidth="1" />
              <circle cx={getSvgX(20)} cy={sfdY} r="3" className="fill-rose-500 stroke-white dark:stroke-slate-900 animate-in zoom-in-50 duration-200" strokeWidth="1" />
            </>
          )}
          {renderHelperVisuals(
            stepIndex >= 11,
            stepIndex === 11 ? (clickIdx >= 2 ? 1 : 0) : 0.15,
            sfdY - (-21.675) * sfdScale,
            sfdY - (-21.675) * sfdScale,
            19, 21, 20,
            sfdY - (-21.675) * sfdScale,
            sfdY,
            "+21.675 kN"
          )}
          {displayedStep > 11 ? (
            <line x1={getSvgX(20)} y1={sfdY - (-21.675) * sfdScale} x2={getSvgX(20)} y2={sfdY} className="stroke-rose-500" strokeWidth="2" />
          ) : displayedStep === 11 && clickIdx >= 3 ? (
            <motion.line
              x1={getSvgX(20)}
              y1={sfdY - (-21.675) * sfdScale}
              x2={getSvgX(20)}
              y2={sfdY}
              className="stroke-rose-500"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          ) : null}
        </g>
      )}

      {/* SFD Final Path Overlay */}
      {(displayedStep > 11 || pairing === 'sfd-bmd' || pairing === 'all') && (
        <g>
          <path
            d={`M ${getSvgX(0)} ${sfdY} L ${getSvgX(0)} ${sfdY - rxnA * sfdScale} L ${getSvgX(5)} ${sfdY - rxnA * sfdScale} L ${getSvgX(12)} ${sfdY - (-6.675) * sfdScale} L ${getSvgX(17)} ${sfdY - (-6.675) * sfdScale} L ${getSvgX(17)} ${sfdY - (-21.675) * sfdScale} L ${getSvgX(20)} ${sfdY - (-21.675) * sfdScale} L ${getSvgX(20)} ${sfdY}`}
            fill="none"
            className="stroke-rose-500/80"
            strokeWidth="1.6"
          />
          <text x={getSvgX(2.5)} y={sfdY - rxnA * sfdScale - 3} textAnchor="middle" className="text-[7.5px] font-bold fill-rose-500/80 font-mono">+14.325</text>
          <text x={getSvgX(12) - 4} y={sfdY - (-6.675) * sfdScale + 9} textAnchor="end" className="text-[7.5px] font-bold fill-rose-500/80 font-mono">-6.675</text>
          <text x={getSvgX(18.5)} y={sfdY - (-21.675) * sfdScale + 9} textAnchor="middle" className="text-[7.5px] font-bold fill-rose-500/80 font-mono">-21.675</text>
        </g>
      )}
    </g>
  );
};
