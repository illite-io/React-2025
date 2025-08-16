export type InputKind = "channel" | "handle" | "playlist" | "video";

export function classifyInput(urlOrId: string): { kind: InputKind; value: string } {
  const u = (() => { try { return new URL(urlOrId); } catch { return null; } })();
  if (!u) {
    if (urlOrId.startsWith("UC")) return { kind: "channel", value: urlOrId };
    if (urlOrId.startsWith("PL") || urlOrId.startsWith("UU")) return { kind: "playlist", value: urlOrId };
    return { kind: "video", value: urlOrId };
  }

  const { hostname, pathname, searchParams } = u;

  if (/youtube\.com$/.test(hostname) || /youtu\.be$/.test(hostname)) {
    if (pathname.startsWith("/channel/")) return { kind: "channel", value: pathname.split("/")[2] };
    if (pathname.startsWith("/@")) return { kind: "handle", value: pathname.substring(1) };
    if (pathname.startsWith("/playlist")) return { kind: "playlist", value: searchParams.get("list") || "" };
    if (pathname.startsWith("/watch")) return { kind: "video", value: searchParams.get("v") || "" };
    if (pathname.startsWith("/shorts/")) return { kind: "video", value: pathname.split("/")[2] };
  }
  return { kind: "video", value: urlOrId };
}