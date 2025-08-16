import { Request, Response, NextFunction } from "express";

export type Plan = "basic" | "premium";

export function parseApiKeys(): Map<string, Plan> {
  const raw = process.env.API_KEYS || "";
  const map = new Map<string, Plan>();
  raw.split(",").map(s => s.trim()).filter(Boolean).forEach(pair => {
    const [plan, key] = pair.split(":");
    if (plan && key) map.set(key, plan as Plan);
  });
  return map;
}

const apiKeyMap = parseApiKeys();

export function auth(req: Request, res: Response, next: NextFunction) {
  const key = req.header("x-api-key");
  if (!key || !apiKeyMap.has(key)) return res.status(401).json({ error: "API key 필요" });
  (req as any).plan = apiKeyMap.get(key);
  (req as any).apiKey = key;
  next();
}