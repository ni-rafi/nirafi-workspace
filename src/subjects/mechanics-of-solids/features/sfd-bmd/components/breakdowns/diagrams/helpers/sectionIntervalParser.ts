export function parseIntervalLimits(
    text: string,
    stepIndex?: number,
    allSteps?: string[],
    length: number = 0,
    hoverX: number | null = null
  ) {
    let startX = 0;
    let endX = length;
    let match = text.match(/\[([\d.]+),\s*([\d.]+)\]/);

    if (!match && allSteps && stepIndex !== undefined) {
      for (let i = stepIndex; i >= 0; i--) {
        const parentText = allSteps[i];
        if (parentText) {
          match = parentText.match(/\[([\d.]+),\s*([\d.]+)\]/);
          if (match) break;
        }
      }
    }

    if (match && match[1] && match[2]) {
      startX = parseFloat(match[1]);
      endX = parseFloat(match[2]);
    }

    let cutX = (startX + endX) / 2;
    if (hoverX !== null && hoverX >= startX && hoverX <= endX) {
      cutX = hoverX;
    }

    const isMoment = text.toLowerCase().includes('moment') || text.includes('M(x)') || text.toLowerCase().includes('m(x)');

    return { startX, endX, cutX, isMoment };
  }
