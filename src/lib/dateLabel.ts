/** Parse display dates like "June 7, 2026" or "1st May 2026" for sorting. */
export function parseDateLabel(label: string): number {
  if (!label?.trim()) return 0;

  const normalized = label
    .trim()
    .replace(/(\d+)(st|nd|rd|th)\b/gi, "$1");

  const parsed = Date.parse(normalized);
  return Number.isNaN(parsed) ? 0 : parsed;
}

export function compareDateLabelsDesc(a: string, b: string): number {
  return parseDateLabel(b) - parseDateLabel(a);
}
