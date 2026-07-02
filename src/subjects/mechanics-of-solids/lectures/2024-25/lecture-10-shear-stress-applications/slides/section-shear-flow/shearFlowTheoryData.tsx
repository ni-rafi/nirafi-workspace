
import { type ClickSyncedTabItem } from '@/features/presentation/components/elements/ClickSyncedTabs';
import { LatexFormula, SlideParagraph, SlideList, ClickReveal, ClickHighlight } from '@/features/presentation/components/elements';
import { BuiltUpFastenersDrawing } from './drawings/BuiltUpFastenersDrawing';
import { ShearFlowDerivationDrawing } from './drawings/ShearFlowDerivationDrawing';

export const getShearFlowTheoryItems = (currentClick: number): ClickSyncedTabItem[] => {
  const propertiesList = [
    { text: <span>Units: Force per unit length (<LatexFormula math="\text{N/m}" /> or <LatexFormula math="\text{kN/m}" />).</span> },
    { text: <span><LatexFormula math="Q" /> is calculated for the connected flange block being secured.</span> },
    { text: <span>Notice that contact width <LatexFormula math="b" /> is absent, as we integrate across it.</span> }
  ];

  const parameterDefinitions = [
    { text: <span><LatexFormula math="F_{\text{nail}}" /> = allowable shear force capacity of a single fastener</span> },
    { text: <span><LatexFormula math="n" /> = number of fasteners acting in a transverse row at any cross-section</span> },
    { text: <span><LatexFormula math="s" /> = longitudinal spacing interval between fastener rows</span> }
  ];

  const explanationItems = [
    { text: <span>Shear stress <LatexFormula math="\tau" /> is force per unit area. Multiplying by width <LatexFormula math="b" /> yields the force per unit length along the longitudinal axis.</span> },
    { text: <span>The statical moment <LatexFormula math="Q" /> is calculated for the isolated flange block above the cutting interface.</span> }
  ];

  return [
    {
      title: '1. The Concept of Shear Flow (q)',
      badge: 'Concept',
      badgeVariant: 'primary',
      description: 'Introduction to horizontal interface flow in built-up shapes.',
      tintClass: 'border-l-[3px] border-l-indigo-500 bg-indigo-500/5 dark:bg-indigo-500/[0.08]',
      rightVisualizer: (
        <BuiltUpFastenersDrawing spacing={60} currentClick={0} />
      ),
      rightContent: (
        <div className="text-xs leading-normal text-muted-foreground w-full px-1">
          <SlideParagraph variant="plain" className="text-xs font-bold text-foreground mb-1">
            Horizontal Interface Flow:
          </SlideParagraph>
          <span className="space-y-1 block text-muted-foreground">
            • <strong>Built-Up Shapes</strong>: In beams made of multiple connected components, horizontal shear stress acts along contact interfaces.
            <div className="py-2 text-center bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-indigo-500 font-extrabold text-[12px] my-1.5">
              <LatexFormula math="q = \tau \cdot b = \frac{V \cdot Q}{I}" />
            </div>
            • <strong>Resisting connectors</strong>: Shear flow represents the continuous sliding force that must be resisted by fasteners (nails, screws, glue).
          </span>
        </div>
      ),
      leftBottomContent: (
        <div className="space-y-1.5 w-full border-t border-border/30 pt-3">
          <SlideList
            title='Properties of Shear Flow'
            items={propertiesList}
            variant="plain"
            revealMode="none"
          />
        </div>
      )
    },
    {
      title: '2. Mathematical Derivation',
      badge: 'Derivation',
      badgeVariant: 'warning',
      description: 'Derived interface force per unit length from VQ/I.',
      tintClass: 'border-l-[3px] border-l-amber-500 bg-amber-500/5 dark:bg-amber-500/[0.08]',
      rightVisualizer: (
        <ShearFlowDerivationDrawing currentClick={currentClick} />
      ),
      rightContent: (
        <div className="text-xs leading-normal text-muted-foreground w-full px-1">
          <SlideParagraph variant="plain" className="text-xs font-bold text-foreground mb-1">
            Mathematical Derivation:
          </SlideParagraph>
          <span className="space-y-1 block text-muted-foreground">
            • <strong>Analogy</strong>: An un-glued stack of planks slides relative to one another under load. Gluing halts slip.
            <ClickReveal at={2}>
              <div className="mt-1">
                • <strong>Why width b cancels</strong>: Integrating stress across contact width:
                <div className="py-2 text-center bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-indigo-500 font-extrabold text-[12px] my-1">
                  <ClickHighlight variant="paint" at={2} className="inline-block font-extrabold text-[12px]">
                    <LatexFormula math="q = \tau \cdot b = \left(\frac{V \cdot Q}{I \cdot b}\right) \cdot b = \frac{V \cdot Q}{I}" />
                  </ClickHighlight>
                </div>
              </div>
            </ClickReveal>
          </span>
        </div>
      ),
      leftBottomContent: (
        <ClickReveal at={2} className="w-full">
          <div className="space-y-1.5 w-full border-t border-border/30 pt-3">
            <SlideList
              title='Integration variables'
              items={explanationItems}
              variant="plain"
              revealMode="none"
            />
          </div>
        </ClickReveal>
      )
    },
    {
      title: '3. Discrete Fastener Spacing',
      badge: 'Spacing Formula',
      badgeVariant: 'success',
      description: 'Sizing fastener pitch s based on allowable nail capacity.',
      tintClass: 'border-l-[3px] border-l-emerald-500 bg-emerald-500/5 dark:bg-emerald-500/[0.08]',
      rightVisualizer: (
        <BuiltUpFastenersDrawing spacing={80} currentClick={currentClick} />
      ),
      rightContent: (
        <div className="text-xs leading-normal text-muted-foreground w-full px-1">
          <SlideParagraph variant="plain" className="text-xs font-bold text-foreground mb-1">
            Resisting Spacing Limit:
          </SlideParagraph>
          <span className="space-y-1 block text-muted-foreground">
            • <strong>Fastener Spacing s</strong>: Nails must be placed at close enough spacing to handle the local shear flow:
            <ClickReveal at={4}>
              <div className="py-2 text-center bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-500 font-extrabold text-[12px] my-1">
                <ClickHighlight variant="paint" at={4} className="inline-block font-extrabold text-[12px]">
                  <LatexFormula math="s \le \frac{n \cdot F_{\text{nail}}}{q} = \frac{n \cdot F_{\text{nail}} \cdot I}{V \cdot Q}" />
                </ClickHighlight>
              </div>
            </ClickReveal>
          </span>
        </div>
      ),
      leftBottomContent: (
        <div className="space-y-1.5 w-full border-t border-border/30 pt-3">
          <SlideList
            title='Connection Parameters:'
            items={parameterDefinitions}
            variant="plain"
            revealMode="none"
          />
        </div>
      )
    }
  ];
};
