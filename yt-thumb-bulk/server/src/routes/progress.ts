import { Router } from "express";
import Redis from "ioredis";

export function progressRouter(sub: Redis) {
  const r = Router();

  r.get("/:taskId", async (req, res) => {
    const { taskId } = req.params;
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    const chan = `progress:${taskId}`;
    const client = sub.duplicate();
    await client.connect();
    await client.subscribe(chan, (msg) => {
      res.write(`data: ${msg}\n\n`);
    });

    req.on("close", async () => {
      try { await client.unsubscribe(chan); await client.quit(); } catch {}
      res.end();
    });
  });

  return r;
}