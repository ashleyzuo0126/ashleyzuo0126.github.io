export const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
export function asset(path?: string | null) {
  if (typeof path !== 'string' || !path.trim()) return '';
  return /^https?:\/\//.test(path)
    ? path
    : `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
