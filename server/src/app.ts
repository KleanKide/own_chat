import express from "express";
import { applyCommonMiddleware } from "./middleware/common.middleware.js";
import { applyStaticMiddleware } from "./middleware/static.middleware.js";
import { apiRouter } from "./routes/index.js";

export function createApp() {
  const app = express();

  applyCommonMiddleware(app);
  app.use("/api", apiRouter);
  applyStaticMiddleware(app);

  return app;
}
