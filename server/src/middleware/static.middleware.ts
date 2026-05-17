import express, { type Express } from "express";
import fs from "node:fs";
import { clientDistPath, clientIndexPath } from "../config/paths.js";

export function applyStaticMiddleware(app: Express) {
  if (!fs.existsSync(clientIndexPath)) {
    return;
  }

  app.use(express.static(clientDistPath));

  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api/")) {
      return next();
    }

    return res.sendFile(clientIndexPath);
  });
}
