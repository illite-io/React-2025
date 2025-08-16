import { Router } from "express";
import Redis from "ioredis";
import { nanoid } from "nanoid";
import axios from "axios";
import { classifyInput } from "../utils/url.js";
import { sanitizeFilename } from "../utils/sanitize.js";
import { toYmd } from "../utils/date.js";
import { YouTube } from "../services/youtube.js";
import { createZipStream, pickBestThumb } from "../services/zip.js";
import { uploadStreamToS3, s3ClientFromEnv } from "../services/s3.js";
import { ProgressBus } from "../utils/progressBus.js";

export function collectRouter(deps: {
  redis: Redis, yt: YouTube, progress: ProgressBus
}) {
  const r = Router();

  r.post("/", async (req, res) => {
    const { url, count = 100 } = req.body as { url: string, count?: number };
    if (!url) return res.status(400).json({ error: "url 필요" });

    const taskId = nanoid();
    const { kind, value } = classifyInput(url);

    (async () => {
      try {
        const progress = deps.progress;
        progress.publish(taskId, { stage: "prepare" });

        let playlistId: string;
        if (kind === "playlist") {
          playlistId = value;
        } else if (kind === "channel") {
          playlistId = await deps.yt.channelToUploadsPlaylistId(value);
        } else if (kind === "handle") {
          const chId = await deps.yt.handleToChannelId(value);
          playlistId = await deps.yt.channelToUploadsPlaylistId(chId);
        } else {
          playlistId = "";
        }

        let videoIds: string[] = [];
        if (kind === "video") {
          videoIds = [value];
        } else {
          videoIds = await deps.yt.listPlaylistItems(playlistId, count);
        }
        if (videoIds.length === 0) throw new Error("수집된 영상이 없습니다.");

        progress.publish(taskId, { stage: "meta", total: videoIds.length });

        const meta = await deps.yt.videosSnippets(videoIds);

        const { archive, stream } = createZipStream();
        const client = s3ClientFromEnv();
        const bucket = process.env.S3_BUCKET!;
        const key = `zip/${taskId}.zip`;
        const expiresDays = Number(process.env.ZIP_EXPIRE_DAYS || 7);

        const uploadPromise = uploadStreamToS3({
          client, bucket, key, body: stream as any, expiresDays
        });

        let done = 0;
        for (const vid of videoIds) {
          const { title, publishedAt } = meta[vid] || { title: vid, publishedAt: new Date().toISOString() };
          const ymd = toYmd(publishedAt);
          const best = await pickBestThumb(vid);
          const filename = `${ymd} - ${sanitizeFilename(title)} - ${vid}.${best.ext}`;

          const resp = await axios.get(best.url, { responseType: "stream", validateStatus: () => true });
          if (resp.status === 200) {
            archive.append(resp.data, { name: filename });
          }
          done++;
          progress.publish(taskId, { stage: "downloading", done, total: videoIds.length });
        }

        await archive.finalize();
        await uploadPromise;

        const endpoint = (process.env.S3_ENDPOINT || "").replace(/\/$/, "");
        const downloadUrl = `${endpoint}/${bucket}/${key}`;
        progress.publish(taskId, { stage: "done", downloadUrl, key });
      } catch (e: any) {
        deps.progress.publish(taskId, { stage: "error", message: e.message || String(e) });
      }
    })();

    res.json({ taskId });
  });

  return r;
}