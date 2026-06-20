import { ILoad } from '@/subjects/mechanics-of-solids/cores/sfd-bmd/types';
import { IActiveLoadVisual } from '../sectionLoadHelper';
import { formatNumber } from './sectionLoadsFormatter';

export function computeActiveLoads(
  loads: ILoad[],
  activeSide: 'left' | 'right',
  cutX: number,
  length: number
): IActiveLoadVisual[] {
  const activeLoadVisuals: IActiveLoadVisual[] = [];

  loads.forEach(l => {
    let cX = 0;
    let P = 0;
    let isUpward = false;
    let label = '';
    let armLabel = '';

    if (activeSide === 'left') {
      if (l.type === 'point' && l.position !== undefined) {
        if (l.position > cutX - 1e-5) return;
        cX = l.position;
        P = Math.abs(l.magnitude ?? 0);
        isUpward = (l.magnitude ?? 0) < 0;
        label = `${P.toFixed(1)} kN`;
        armLabel = cX === 0 ? 'x' : `x - ${formatNumber(cX)}`;
      } else if (l.type === 'moment' && l.position !== undefined) {
        if (l.position > cutX - 1e-5) return;
        cX = l.position;
        P = Math.abs(l.magnitude ?? 0);
        isUpward = false;
        label = `${P.toFixed(1)} kNm`;
        armLabel = '';
      } else if (l.type === 'udl' && l.startPosition !== undefined && l.endPosition !== undefined) {
        const start = l.startPosition;
        if (start > cutX - 1e-5) return;
        const end = Math.min(l.endPosition, cutX);
        const L_load = end - start;
        if (L_load <= 1e-5) return;

        cX = start + L_load / 2;
        P = Math.abs(l.magnitude ?? 0) * L_load;
        isUpward = (l.magnitude ?? 0) < 0;
        label = `${P.toFixed(1)} kN (equiv)`;

        if (l.endPosition > cutX) {
          armLabel = start === 0 ? 'x/2' : `(x - ${formatNumber(start)})/2`;
        } else {
          armLabel = `x - ${formatNumber(cX)}`;
        }
      } else if (l.type === 'uvl' && l.startPosition !== undefined && l.endPosition !== undefined) {
        const start = l.startPosition;
        if (start > cutX - 1e-5) return;
        const end = Math.min(l.endPosition, cutX);
        const L_load = end - start;
        if (L_load <= 1e-5) return;

        const w1 = l.startMagnitude ?? 0;
        const w2 = l.endMagnitude ?? 0;
        const totalLen = l.endPosition - l.startPosition;
        if (totalLen <= 0) return;

        let rectW = w1;
        let triW = w2 - w1;

        if (l.endPosition > cutX) {
          const wx = w1 + ((w2 - w1) * L_load) / totalLen;
          rectW = w1;
          triW = wx - w1;
        }

        const absW1 = Math.abs(rectW);
        const absW2 = Math.abs(rectW + triW);
        P = 0.5 * Math.abs(rectW + (rectW + triW)) * L_load;
        isUpward = rectW < 0 || (rectW + triW) < 0;

        if (absW1 + absW2 > 1e-4) {
          cX = start + L_load * (absW1 + 2 * absW2) / (3 * (absW1 + absW2));
        } else {
          cX = start + L_load / 2;
        }
        label = `${P.toFixed(1)} kN (equiv)`;
        armLabel = `x - ${formatNumber(cX)}`;
      }
    } else {
      if (l.type === 'point' && l.position !== undefined) {
        if (l.position < cutX + 1e-5) return;
        cX = l.position;
        P = Math.abs(l.magnitude ?? 0);
        isUpward = (l.magnitude ?? 0) < 0;
        label = `${P.toFixed(1)} kN`;
        armLabel = cX === length ? `${formatNumber(length)} - x` : `${formatNumber(cX)} - x`;
      } else if (l.type === 'moment' && l.position !== undefined) {
        if (l.position < cutX + 1e-5) return;
        cX = l.position;
        P = Math.abs(l.magnitude ?? 0);
        isUpward = false;
        label = `${P.toFixed(1)} kNm`;
        armLabel = '';
      } else if (l.type === 'udl' && l.startPosition !== undefined && l.endPosition !== undefined) {
        const end = l.endPosition;
        if (end < cutX + 1e-5) return;
        const start = Math.max(l.startPosition, cutX);
        const L_load = end - start;
        if (L_load <= 1e-5) return;

        cX = start + L_load / 2;
        P = Math.abs(l.magnitude ?? 0) * L_load;
        isUpward = (l.magnitude ?? 0) < 0;
        label = `${P.toFixed(1)} kN (equiv)`;

        if (l.startPosition < cutX) {
          armLabel = end === length ? `(${formatNumber(length)} - x)/2` : `(${formatNumber(end)} - x)/2`;
        } else {
          armLabel = `${formatNumber(cX)} - x`;
        }
      } else if (l.type === 'uvl' && l.startPosition !== undefined && l.endPosition !== undefined) {
        const end = l.endPosition;
        if (end < cutX + 1e-5) return;
        const start = Math.max(l.startPosition, cutX);
        const L_load = end - start;
        if (L_load <= 1e-5) return;

        const w1 = l.startMagnitude ?? 0;
        const w2 = l.endMagnitude ?? 0;
        const totalLen = l.endPosition - l.startPosition;
        if (totalLen <= 0) return;

        let rectW = w1;
        let triW = w2 - w1;

        if (l.startPosition < cutX) {
          const wx = w1 + ((w2 - w1) * (totalLen - L_load)) / totalLen;
          rectW = wx;
          triW = w2 - wx;
        }

        const absW1 = Math.abs(rectW);
        const absW2 = Math.abs(rectW + triW);
        P = 0.5 * Math.abs(rectW + (rectW + triW)) * L_load;
        isUpward = rectW < 0 || (rectW + triW) < 0;

        if (absW1 + absW2 > 1e-4) {
          cX = start + L_load * (absW1 + 2 * absW2) / (3 * (absW1 + absW2));
        } else {
          cX = start + L_load / 2;
        }
        label = `${P.toFixed(1)} kN (equiv)`;
        armLabel = `${formatNumber(cX)} - x`;
      }
    }

    activeLoadVisuals.push({
      id: l.id,
      type: l.type,
      label,
      magnitude: P,
      centroidX: cX,
      isUpward,
      armLabel,
    });
  });

  return activeLoadVisuals;
}
