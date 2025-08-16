import { Request, Response, NextFunction } from "express";
import Redis from "ioredis";

function todayKey(prefix: string, id: string) {
  const d = new Date();
  const ymd = `${d.getFullYear()}${String(d.getMonth()+1).padStart(2,"0")}${String(d.getDate()).padStart(2,"0")}`;
  return `${prefix}:${id}:${ymd}`;
}

export function rateLimit(redis: Redis) {
  const MAX_REQ = 3, WINDOW_SEC = 10;

  return async (req: Request, res: Response, next: NextFunction) => {
    const key = (req as any).apiKey as string;
    const bucket = `rl:${key}`;
    const now = Date.now();
    const z = redis.multi()
      .zremrangebyscore(bucket, 0, now - WINDOW_SEC * 1000)
      .zadd(bucket, now, String(now))
      .zcard(bucket)
      .expire(bucket, WINDOW_SEC + 1)
      .exec();

    const [, , sizeCmd] = await z;
    const size = Number(sizeCmd[1]);
    if (size > MAX_REQ) return res.status(429).json({ error: "요청이 너무 잦습니다" });
    next();
  };
}

export function dailyQuota(redis: Redis) {
  const basic = Number(process.env.DAILY_QUOTA_BASIC || 3);
  const premium = Number(process.env.DAILY_QUOTA_PREMIUM || 50);

  return async (req: Request, res: Response, next: NextFunction) => {
    const key = (req as any).apiKey as string;
    const plan = (req as any).plan as "basic" | "premium";
    const limit = plan === "premium" ? premium : basic;

    const k = todayKey("quota", key);
    const used = Number(await redis.get(k) || 0);
    if (used >= limit) return res.status(402).json({ error: "일일 다운로드 한도 초과", limit, used });

    (req as any).quotaKey = k;
    (req as any).quotaLimit = limit;
    next();
  };
}

export function increaseDaily(redis: Redis) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    const k: string = (req as any).quotaKey;
    if (k) {
      const exists = await redis.exists(k);
      await redis.incr(k);
      if (!exists) {
        const now = new Date();
        const end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        const ttl = Math.floor((end.getTime() - now.getTime()) / 1000);
        await redis.expire(k, ttl);
      }
    }
    next();
  };
}