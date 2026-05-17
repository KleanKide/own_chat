import type { Request, Response } from "express";
import { getChatReply } from "../services/chat.service.js";
import type {
  ChatRequestBody,
  ChatSuccessResponse,
  ErrorResponse,
  OpenAIErrorLike
} from "../types/chat.js";

export async function postChatMessage(
  req: Request<Record<string, never>, ChatSuccessResponse | ErrorResponse, ChatRequestBody>,
  res: Response<ChatSuccessResponse | ErrorResponse>
): Promise<Response<ChatSuccessResponse | ErrorResponse>> {
  const message = req.body?.message?.trim();

  if (!message) {
    return res.status(400).json({
      error: "Введите текст перед отправкой."
    });
  }

  try {
    const reply = await getChatReply(message);
    return res.json({ reply });
  } catch (error: unknown) {
    const apiError = error as OpenAIErrorLike;
    const status = apiError.status || 500;
    const details =
      apiError.error?.message ||
      apiError.message ||
      "Не удалось получить ответ от AI-сервиса.";

    return res.status(status).json({
      error: details
    });
  }
}
