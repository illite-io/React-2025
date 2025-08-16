import axios from "axios";
import { Cache } from "./cache.js";

const API = "https://www.googleapis.com/youtube/v3";

export class YouTube {
  constructor(private key: string, private cache: Cache) {}

  private async get<T>(path: string, params: Record<string, any>) {
    const url = `${API}/${path}`;
    const res = await axios.get<T>(url, { params: { key: this.key, ...params } });
    return res.data;
  }

  async handleToChannelId(handle: string) {
    const key = `yt:handle:${handle}`;
    const cached = await this.cache.getJSON<string>(key);
    if (cached) return cached;

    const data = await this.get<any>("channels", { part: "id", forHandle: handle.replace(/^@/, "") });
    const id = data.items?.[0]?.id as string;
    if (!id) throw new Error("채널을 찾을 수 없습니다.");
    await this.cache.setJSON(key, id, 3600 * 6);
    return id;
  }

  async channelToUploadsPlaylistId(channelId: string) {
    const key = `yt:uploads:${channelId}`;
    const cached = await this.cache.getJSON<string>(key);
    if (cached) return cached;

    const data = await this.get<any>("channels", { part: "contentDetails", id: channelId });
    const uploads = data.items?.[0]?.contentDetails?.relatedPlaylists?.uploads as string;
    if (!uploads) throw new Error("업로드 플레이리스트를 찾을 수 없습니다.");
    await this.cache.setJSON(key, uploads, 3600 * 12);
    return uploads;
  }

  async listPlaylistItems(playlistId: string, maxCollect: number) {
    const ids: string[] = [];
    let nextPageToken: string | undefined;

    while (ids.length < maxCollect) {
      const cacheKey = `yt:pl:${playlistId}:${nextPageToken || "first"}`;
      const cached = await this.cache.getJSON<any>(cacheKey);
      let page: any;

      if (cached) {
        page = cached;
      } else {
        page = await this.get<any>("playlistItems", {
          part: "contentDetails",
          playlistId,
          maxResults: 50,
          pageToken: nextPageToken
        });
        await this.cache.setJSON(cacheKey, page, 3600 * 6);
      }

      for (const it of page.items || []) {
        if (it.contentDetails?.videoId) {
          ids.push(it.contentDetails.videoId);
          if (ids.length >= maxCollect) break;
        }
      }
      nextPageToken = page.nextPageToken;
      if (!nextPageToken) break;
    }
    return ids;
  }

  async videosSnippets(videoIds: string[]) {
    const chunks: string[][] = [];
    for (let i = 0; i < videoIds.length; i += 50) chunks.push(videoIds.slice(i, i + 50));

    const results: Record<string, { title: string; publishedAt: string }> = {};
    for (const ch of chunks) {
      const miss: string[] = [];
      const mapFromCache: Record<string, any> = {};
      for (const id of ch) {
        const v = await this.cache.getJSON<any>(`yt:v:${id}`);
        if (v) mapFromCache[id] = v; else miss.push(id);
      }
      Object.assign(results, mapFromCache);

      if (miss.length) {
        const data = await this.get<any>("videos", { part: "snippet", id: miss.join(",") });
        for (const it of data.items || []) {
          const v = { title: it.snippet.title as string, publishedAt: it.snippet.publishedAt as string };
          results[it.id] = v;
          await this.cache.setJSON(`yt:v:${it.id}`, v, 3600 * 24);
        }
      }
    }
    return results;
  }
}