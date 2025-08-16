import Redis from "ioredis";

export class Cache {
  constructor(private redis: Redis) {}
  async getJSON<T>(key: string): Promise<T | null> {
    const v = await this.redis.get(key);
    return v ? JSON.parse(v) as T : null;
  }
  async setJSON<T>(key: string, value: T, ttlSec: number) {
    await this.redis.set(key, JSON.stringify(value), "EX", ttlSec);
  }
}