export type ChatRequestBody = {
  message?: string;
};

export type ChatSuccessResponse = {
  reply: string;
};

export type ErrorResponse = {
  error: string;
};

export type OpenAIErrorLike = {
  status?: number;
  message?: string;
  error?: {
    message?: string;
  };
};
