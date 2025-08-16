import Redis from "ioredis";

export class ProgressBus {
  constructor(private pub: Redis) {}
  publish(taskId: string, payload: any) {
    return this.pub.publish(`progress:${taskId}`, JSON.stringify(payload));
  }
}