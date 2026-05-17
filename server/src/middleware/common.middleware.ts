import cors from "cors";
import express, { type Express } from "express";
import { env } from "../config/env.js";

export function applyCommonMiddleware(app: Express) {
  app.use(
    cors({
      origin: env.clientUrl
    })
  );
  app.use(express.json());
}
