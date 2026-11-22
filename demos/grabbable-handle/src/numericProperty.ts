/** Read numeric UIKit values (including signals), without treating percentages as units. */
export function numericProperty(input: unknown, fallback: number): number {
  const value = input != null && typeof input === 'object' && 'value' in input ? input.value : input;
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}
