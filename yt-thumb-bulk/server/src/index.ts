import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import Redis from "ioredis";
import { Cache } from "./services/cache.js";
import { YouTube } from "./services/youtube.js";
import { ProgressBus } from "./utils/progressBus.js";
import { collectRouter } from "./routes/collect.js";
import { progressRouter } from "./routes/progress.js";
import { auth } from "./middlewares/auth.js";
import { dailyQuota, increaseDaily, rateLimit } from "./middlewares/rateLimit.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const redis = new Redis(process.env.REDIS_URL);
const cache = new Cache(redis);
const yt = new YouTube(process.env.YOUTUBE_API_KEY!, cache);
const bus = new ProgressBus(redis);

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/api", auth, rateLimit(redis), dailyQuota(redis));
app.use("/api/progress", progressRouter(redis));
app.use("/api/collect", collectRouter({ redis, yt, progress: bus }), increaseDaily(redis));

const port = Number(process.env.PORT || 8080);
app.listen(port, () => console.log(`listening on ${port}`));