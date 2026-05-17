import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: process.env.PORT || "4000",
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
  openAiApiKey: process.env.OPENAI_API_KEY,
  openAiModel: process.env.OPENAI_MODEL || "gpt-4.1-mini"
};
