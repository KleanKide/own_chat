import { Router } from "express";
import { chatRouter } from "./chat.route.js";
import { healthRouter } from "./health.route.js";

export const apiRouter = Router();

apiRouter.use(healthRouter);
apiRouter.use(chatRouter);
