export function sanitizeFilename(s: string) {
  return s.replace(/[\\/:*?"<>|]/g, "_").trim();
}