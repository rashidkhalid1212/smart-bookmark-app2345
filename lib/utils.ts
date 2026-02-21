/**
 * Ensures a URL is absolute so the browser doesn't treat it as relative to the current domain.
 * Prepends https:// if the value has no protocol.
 */
export function toAbsoluteUrl(url: string): string {
  const trimmed = (url || "").trim();
  if (!trimmed) return trimmed;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}
