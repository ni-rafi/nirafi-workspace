import React from 'react';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';
import { ParameterSlider, CalculationOutput, SlideParagraph } from '@/features/presentation/components/elements';
import { ExpandableDrawing } from '@/shared/components';

export const CoverPlateRetrofit: React.FC = () => {
  const [bPlate, setBPlate] = useUrlSyncedState<number>('retrofit_bp', 200); // mm
  const [tPlate, setTPlate] = useUrlSyncedState<number>('retrofit_tp', 15); // mm

  const I_core = 120e6; // mm⁴
  const d_core = 240; // mm
  const sigmaAllow = 140; // MPa

  // Composite Section Properties
  // Centroid remains at center because addition is symmetric
  const yMax = d_core / 2 + tPlate; // outer fiber distance: 120 + tPlate
  const A_plate = bPlate * tPlate;
  const d_plate = d_core / 2 + tPlate / 2; // distance from center to plate centroid: 120 + tPlate/2
  const I_plate_own = (bPlate * Math.pow(tPlate, 3)) / 12;
  const I_plate_transfer = A_plate * Math.pow(d_plate, 2);
  const I_comp = I_core + 2 * (I_plate_own + I_plate_transfer); // mm⁴
  
  const Z_comp = I_comp / yMax; // mm³
  const Z_baseline = I_core / (d_core / 2); // 1.0 * 10^6 mm³

  // Allowable Moment Capacities
  const M_allow_comp = (sigmaAllow * Z_comp) / 1e6; // kNm
  const M_allow_baseline = (sigmaAllow * Z_baseline) / 1e6; // 140 kNm
  const capacityIncreasePercent = ((M_allow_comp - M_allow_baseline) / M_allow_baseline) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full text-left items-stretch">
      {/* Parameters Panel */}
      <div className="flex flex-col justify-between gap-3 bg-muted/30 dark:bg-muted/10 p-4 border border-border/40 rounded-xl">
        <div>
          <span className="text-[9px] font-bold text-indigo-500 uppercase tracking-widest block mb-1">
            Retrofit Options
          </span>
          <SlideParagraph variant="plain" className="text-[10px] text-muted-foreground leading-normal">
            Adjust the width and thickness of the cover plates welded to the baseline joist flanges to see the structural capacity improvement.
          </SlideParagraph>
        </div>

        <div className="space-y-2">
          <ParameterSlider label="Plate Width (bp)" value={bPlate} unit="mm" min={100} max={300} step={10} onChange={setBPlate} />
          <ParameterSlider label="Plate Thickness (tp)" value={tPlate} unit="mm" min={5} max={30} step={1} onChange={setTPlate} />
        </div>

        <div className="grid grid-cols-2 gap-2 mt-1 text-[10px]">
          <CalculationOutput title="Comp. Inertia I" value={(I_comp / 1e6).toFixed(2)} unit="10⁶ mm⁴" />
          <CalculationOutput title="Capacity Gain" value={`${capacityIncreasePercent.toFixed(1)}%`} unit="increase" className="text-emerald-500 font-bold" />
        </div>
      </div>

      {/* Visual Drawing Card with Modal Zoom */}
      <div className="flex flex-col justify-between bg-muted/20 border border-border/40 rounded-xl p-4">
        <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest block mb-3 text-center">
          Symmetrical Reinforcement Layout
        </span>

        <div className="flex-1 flex justify-center items-center h-[130px]">
          <ExpandableDrawing title="Cover Plate Retrofitting Section">
            <svg viewBox="0 0 200 160" className="w-[140px] h-[120px] overflow-visible">
              {/* Baseline central Joist (Gray) */}
              {/* Top Flange */}
              <rect x={70} y={40} width={60} height={10} fill="var(--muted-foreground)" opacity={0.25} stroke="var(--foreground)" strokeWidth={0.8} />
              {/* Web */}
              <rect x={95} y={50} width={10} height={60} fill="var(--muted-foreground)" opacity={0.25} stroke="var(--foreground)" strokeWidth={0.8} />
              {/* Bottom Flange */}
              <rect x={70} y={110} width={60} height={10} fill="var(--muted-foreground)" opacity={0.25} stroke="var(--foreground)" strokeWidth={0.8} />

              {/* Centroid neutral axis */}
              <line x1={20} y1={80} x2={180} y2={80} stroke="var(--destructive)" strokeWidth={1} strokeDasharray="3,1" />
              <text x={183} y={83} className="fill-destructive text-[7px] font-bold">N.A.</text>

              {/* Symmetrical cover plates (Safety Orange) */}
              {(() => {
                // scale plates relative to joist: joist is 60 wide, 80 high
                // bPlate is 100 to 300 (drawn as 30 to 90)
                // tPlate is 5 to 30 (drawn as 1.5 to 9)
                const scaleW = 60 / 200;
                const scaleH = 80 / 240;
                const wDraw = bPlate * scaleW;
                const hDraw = tPlate * scaleH;

                return (
                  <g>
                    {/* Top Plate */}
                    <rect
                      x={100 - wDraw / 2}
                      y={40 - hDraw}
                      width={wDraw}
                      height={hDraw}
                      fill="rgba(249, 115, 22, 0.2)"
                      stroke="rgb(249, 115, 22)"
                      strokeWidth={1.2}
                    />
                    {/* Bottom Plate */}
                    <rect
                      x={100 - wDraw / 2}
                      y={120}
                      width={wDraw}
                      height={hDraw}
                      fill="rgba(249, 115, 22, 0.2)"
                      stroke="rgb(249, 115, 22)"
                      strokeWidth={1.2}
                    />

                    {/* Outer fiber marker */}
                    <line x1={100 - wDraw / 2} y1={40 - hDraw} x2={40} y2={40 - hDraw} stroke="var(--foreground)" strokeWidth={0.5} strokeDasharray="1,1" />
                    <line x1={100} y1={80} x2={100} y2={40 - hDraw} stroke="var(--foreground)" strokeWidth={0.5} markerEnd="url(#arrow-retro)" />
                    <text x={104} y={60} className="fill-foreground text-[7px] font-bold">y_max</text>
                  </g>
                );
              })()}

              {/* Arrow definitions */}
              <defs>
                <marker id="arrow-retro" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--foreground)" />
                </marker>
              </defs>
            </svg>
          </ExpandableDrawing>
        </div>
      </div>
    </div>
  );
};
export default CoverPlateRetrofit;
