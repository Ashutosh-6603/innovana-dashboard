import { Redis } from "ioredis";
import { env } from "./env";

const globalForRedis = global as unknown as { redis: Redis };

export const redis = globalForRedis.redis ?? new Redis(env.REDIS_URL);

if (env.NODE_ENV !== "production") {
  globalForRedis.redis = redis;
}

redis.on("error", (err) => {
  console.error("❌ Redis connection error:", err.message);
});

redis.on("connect", () => {
  console.log("✅ Redis connected");
});
