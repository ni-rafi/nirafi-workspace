import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import {
  InteractiveCard,
  SlideContent,
  ClickHighlight,
  ParameterSlider,
  LatexFormula
} from '@/features/presentation/components/elements';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';
import { calculateFinishingAreas } from '../../cores';

export const FinishAreaSandbox: React.FC = () => {
  const [roomL, setRoomL] = useUrlSyncedState<number>('finish_room_l', 4.50);
  const [roomW, setRoomW] = useUrlSyncedState<number>('finish_room_w', 3.60);
  const [wallH, setWallH] = useUrlSyncedState<number>('finish_wall_h', 2.80);

  const { floorArea, wallArea } = calculateFinishingAreas(roomL, roomW, wallH);

  return (
    <TwoColumnLayout
      title="5.1 &amp; 5.3 Plastering &amp; Floor Finishes"
      bgVariant="default"
      leftWidth="45%"
      leftContent={
        <div className="flex flex-col gap-4">
          <InteractiveCard title="Surface Area Take-Off Rules">
            <SlideContent
              blocks={[
                {
                  type: 'paragraph',
                  text: (
                    <span>
                      Finishes are measured strictly in <strong>Surface Area (m² or sft)</strong>.
                    </span>
                  ),
                },
                {
                  type: 'bullet',
                  text: (
                    <span>
                      For internal floor tiles and ceiling plaster, calculate using the room's inside <ClickHighlight at={1} variant="paint">Clear Span</ClickHighlight> dimensions (<LatexFormula math="L \times W" />).
                    </span>
                  ),
                  revealAt: 0,
                },
                {
                  type: 'bullet',
                  text: (
                    <span>
                      For interior walls, calculate the total room perimeter and multiply by the <ClickHighlight at={2} variant="bold">Net Height</ClickHighlight> (floor finish to ceiling soffit).
                    </span>
                  ),
                  revealAt: 0,
                },
              ]}
            />
          </InteractiveCard>
        </div>
      }
      rightContent={
        <div className="flex flex-col justify-between h-full space-y-4">
          <InteractiveCard title="Finishing Area Modeler">
            <div className="grid grid-cols-3 gap-2.5 mb-2">
              <ParameterSlider label="Room Length" min={3.00} max={6.00} step={0.10} value={roomL} onChange={setRoomL} unit="m" />
              <ParameterSlider label="Room Width" min={2.70} max={5.40} step={0.10} value={roomW} onChange={setRoomW} unit="m" />
              <ParameterSlider label="Net Wall Height" min={2.60} max={3.30} step={0.10} value={wallH} onChange={setWallH} unit="m" />
            </div>

            <div className="bg-background rounded-lg border border-border/30 p-3 flex flex-col gap-2 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Floor / Ceiling Area:</span>
                <span className="font-bold text-primary">{floorArea.toFixed(3)} m²</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Wall Plastering Area:</span>
                <span className="font-bold text-primary">{wallArea.toFixed(3)} m²</span>
              </div>
            </div>

            <div className="mt-1 p-2 bg-muted rounded border border-border/40 text-center font-mono text-[11px] leading-relaxed">
              <LatexFormula math="A_{floor} = L \times W" />
              <br className="mb-1" />
              <LatexFormula math="A_{walls} = (2L + 2W) \times H_{net}" />
            </div>
          </InteractiveCard>
        </div>
      }
    />
  );
};

export default FinishAreaSandbox;
