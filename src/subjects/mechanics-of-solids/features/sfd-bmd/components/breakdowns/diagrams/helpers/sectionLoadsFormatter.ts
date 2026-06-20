export function formatNumber(val: number): string {
  const rounded = parseFloat(val.toFixed(3));
  if (Number.isInteger(rounded)) {
    return rounded.toFixed(1);
  }
  return rounded.toString();
}
