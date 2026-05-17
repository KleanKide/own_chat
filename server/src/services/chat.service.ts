import { env } from "../config/env.js";
import { openai } from "../config/openai.js";
import type { OpenAIErrorLike } from "../types/chat.js";

export async function getChatReply(message: string): Promise<string> {
  if (!openai) {
    throw {
      status: 500,
      message: "На сервере не настроен OPENAI_API_KEY."
    } satisfies OpenAIErrorLike;
  }

  const response = await openai.responses.create({
    model: env.openAiModel,
    input: [
      {
        role: "system",
        content: [
          {
            type: "input_text",
            text: "Ты полезный ассистент. Отвечай кратко, понятно и на языке пользователя."
          }
        ]
      },
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: message
          }
        ]
      }
    ]
  });

  return response.output_text?.trim() || "Модель не вернула текстовый ответ.";
}
