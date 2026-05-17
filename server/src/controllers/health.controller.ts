import type { Request, Response } from "express";
import { env } from "../config/env.js";

export function getHealth(_req: Request, res: Response) {
  res.json({
    ok: true,
    model: env.openAiModel,
    apiKeyConfigured: Boolean(env.openAiApiKey)
  });
}
