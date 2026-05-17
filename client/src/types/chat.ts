export type ChatMessage = {
  role: "assistant" | "user";
  text: string;
};

export type ChatResponse = {
  reply?: string;
  error?: string;
};
