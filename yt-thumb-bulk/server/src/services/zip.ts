import axios from "axios";
import Archiver from "archiver";
import { PassThrough } from "stream";

const CANDIDATES = ["maxresdefault", "sddefault", "hqdefault", "mqdefault", "default"];

export async function pickBestThumb(videoId: string): Promise<{ url: string; ext: "jpg" | "webp" }> {
  for (const name of CANDIDATES) {
    const urlJ = `https://i.ytimg.com/vi/${videoId}/${name}.jpg`;
    try {
      const head = await axios.head(urlJ, { validateStatus: () => true });
      if (head.status === 200 && Number(head.headers["content-length"] || 1) > 1000) {
        return { url: urlJ, ext: "jpg" };
      }
    } catch {}
    const urlW = `https://i.ytimg.com/vi_webp/${videoId}/${name}.webp`;
    try {
      const head = await axios.head(urlW, { validateStatus: () => true });
      if (head.status === 200 && Number(head.headers["content-length"] || 1) > 1000) {
        return { url: urlW, ext: "webp" };
      }
    } catch {}
  }
  return { url: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`, ext: "jpg" };
}

export function createZipStream() {
  const pass = new PassThrough();
  const archive = Archiver("zip", { zlib: { level: 9 } });
  archive.pipe(pass);
  return { archive, stream: pass };
}