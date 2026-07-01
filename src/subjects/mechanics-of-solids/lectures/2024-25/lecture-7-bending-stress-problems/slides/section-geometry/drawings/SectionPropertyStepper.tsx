import React from 'react';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';

export const SectionPropertyStepper: React.FC = () => {
  const [step, setStep] = useUrlSyncedState<number>('geom_step', 1);

  const steps = [
    { id: 1, name: 'Segmentation', desc: 'Divide the asymmetric section into 3 clean rectangular components: Top Flange (1), Web (2), and Bottom Flange (3).' },
    { id: 2, name: 'Component Centroids', desc: 'Find the area A_i and centroid height y_i of each component from the baseline: y_1 = 275mm, y_2 = 150mm, y_3 = 25mm.' },
    { id: 3, name: 'Global Centroid (NA)', desc: 'Use y_bar = sum(A_i * y_i) / sum(A_i) to locate the Neutral Axis at 125mm from the bottom.' },
    { id: 4, name: 'Parallel Axis Offsets', desc: 'Find distance d_i from the global NA to each component centroid: d_1 = 150mm, d_2 = 25mm, d_3 = 100mm.' },
    { id: 5, name: 'Global Inertia Assembly', desc: 'Sum (I_c + A * d^2) for all three shapes to find total I_xx = 255.2 * 10^6 mm^4.' },
  ];
  // SVG coordinates: total height is 300px, width is 200px
  // Let's scale SVG to viewBox 0 0 240 320
  const topFlangeY = 320 - 300; // y = 20 to 70
  const webY = 320 - 250;       // y = 70 to 270
  const botFlangeY = 320 - 50;  // y = 270 to 320

  const topFlangeW = 100;
  const webW = 50;
  const botFlangeW = 200;

  return (
    <div className="flex flex-col gap-4 text-left select-none">
      <div className="flex gap-1.5 bg-slate-900/60 p-1 rounded-lg border border-border/40 w-full overflow-x-auto">
        {steps.map((st) => (
          <button
            key={st.id}
            onClick={() => setStep(st.id)}
            className={`flex-1 min-w-[70px] py-1 text-[9px] font-bold rounded transition-all cursor-pointer ${
              step === st.id
                ? 'bg-indigo-500 text-white shadow-md'
                : 'bg-background hover:bg-muted text-muted-foreground'
            }`}
          >
            Step {st.id}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        {/* Math & description details */}
        <div className="space-y-3">
          <div className="bg-muted/30 p-3 rounded-xl border border-border/50 min-h-[90px]">
            <span className="text-[8px] font-bold text-indigo-500 uppercase tracking-widest block mb-0.5">
              Step {step}: {steps[step - 1]?.name ?? ''}
            </span>
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              {steps[step - 1]?.desc ?? ''}
            </p>
          </div>

          <div className="font-mono text-[9px] bg-slate-950 p-2.5 rounded-xl border border-border/40 text-muted-foreground space-y-1.5">
            {step === 1 && (
              <>
                <p className="text-indigo-400 font-bold">Dividing the areas:</p>
                <p>• Top Flange: A1 = 100 × 50 = 5,000 mm²</p>
                <p>• Web Segment: A2 = 50 × 200 = 10,000 mm²</p>
                <p>• Bottom Flange: A3 = 200 × 50 = 10,000 mm²</p>
              </>
            )}
            {step === 2 && (
              <>
                <p className="text-indigo-400 font-bold">Component Centroids (from base):</p>
                <p>• y1 = 250 + 25 = 275 mm</p>
                <p>• y2 = 50 + 100 = 150 mm</p>
                <p>• y3 = 25 mm</p>
              </>
            )}
            {step === 3 && (
              <>
                <p className="text-indigo-400 font-bold">Global Centroid Calculation:</p>
                <p>y_bar = (A1·y1 + A2·y2 + A3·y3) / A_total</p>
                <p>y_bar = (5k·275 + 10k·150 + 10k·25) / 25k</p>
                <p className="text-emerald-400 font-bold">y_bar = 125 mm (Neutral Axis)</p>
              </>
            )}
            {step === 4 && (
              <>
                <p className="text-indigo-400 font-bold">Offsets to Neutral Axis (d_i = |ybar - y_i|):</p>
                <p>• d1 = |125 - 275| = 150 mm</p>
                <p>• d2 = |125 - 150| = 25 mm</p>
                <p>• d3 = |125 - 25| = 100 mm</p>
              </>
            )}
            {step === 5 && (
              <>
                <p className="text-indigo-400 font-bold">Inertia Assembly (I = I_c + A·d²):</p>
                <p>• I1 = 1.04·10⁶ + 5k·150² = 113.54·10⁶ mm⁴</p>
                <p>• I2 = 33.33·10⁶ + 10k·25² = 39.58·10⁶ mm⁴</p>
                <p>• I3 = 2.08·10⁶ + 10k·100² = 102.08·10⁶ mm⁴</p>
                <p className="text-emerald-400 font-bold">Total I_xx = 255.20 × 10⁶ mm⁴</p>
              </>
            )}
          </div>
        </div>

        {/* Visual Drawing */}
        <div className="bg-muted/30 border border-border/50 rounded-xl p-3 flex justify-center items-center h-[220px]">
          <svg viewBox="0 0 240 320" className="h-full overflow-visible">
            {/* Top Flange */}
            <rect
              x={120 - topFlangeW / 2}
              y={topFlangeY}
              width={topFlangeW}
              height={50}
              fill={step === 1 ? 'rgba(99, 102, 241, 0.25)' : 'none'}
              stroke={step >= 1 ? 'var(--foreground)' : 'var(--border)'}
              strokeWidth={1.5}
            />
            {step >= 1 && <text x={120} y={topFlangeY + 28} textAnchor="middle" className="fill-muted-foreground text-[8px] font-bold">1</text>}

            {/* Web */}
            <rect
              x={120 - webW / 2}
              y={webY}
              width={webW}
              height={200}
              fill={step === 1 ? 'rgba(99, 102, 241, 0.15)' : 'none'}
              stroke={step >= 1 ? 'var(--foreground)' : 'var(--border)'}
              strokeWidth={1.5}
            />
            {step >= 1 && <text x={120} y={webY + 105} textAnchor="middle" className="fill-muted-foreground text-[8px] font-bold">2</text>}

            {/* Bottom Flange */}
            <rect
              x={120 - botFlangeW / 2}
              y={botFlangeY}
              width={botFlangeW}
              height={50}
              fill={step === 1 ? 'rgba(99, 102, 241, 0.25)' : 'none'}
              stroke={step >= 1 ? 'var(--foreground)' : 'var(--border)'}
              strokeWidth={1.5}
            />
            {step >= 1 && <text x={120} y={botFlangeY + 28} textAnchor="middle" className="fill-muted-foreground text-[8px] font-bold">3</text>}

            {/* Component centroids */}
            {step >= 2 && (
              <>
                <circle cx={120} cy={topFlangeY + 25} r={3} fill="var(--primary)" />
                <circle cx={120} cy={webY + 100} r={3} fill="var(--primary)" />
                <circle cx={120} cy={botFlangeY + 25} r={3} fill="var(--primary)" />
              </>
            )}

            {/* Neutral Axis */}
            {step >= 3 && (
              <g>
                <line x1={10} y1={320 - 125} x2={230} y2={320 - 125} stroke="var(--destructive)" strokeWidth={1.5} strokeDasharray="4,2" />
                <text x={215} y={320 - 130} className="fill-destructive text-[8px] font-mono font-bold">N.A. (125mm)</text>
              </g>
            )}

            {/* Offsets (d_i) */}
            {step === 4 && (
              <g stroke="var(--primary)" strokeWidth={0.8} opacity={0.8}>
                {/* d1: from 125 to 275 */}
                <path d={`M 155 ${320 - 125} L 155 ${320 - 275}`} />
                <text x={160} y={320 - 200} className="fill-primary text-[7px] font-bold">d1 = 150</text>
                {/* d3: from 125 to 25 */}
                <path d={`M 155 ${320 - 125} L 155 ${320 - 25}`} />
                <text x={160} y={320 - 75} className="fill-primary text-[7px] font-bold">d3 = 100</text>
              </g>
            )}
          </svg>
        </div>
      </div>
    </div>
  );
};
