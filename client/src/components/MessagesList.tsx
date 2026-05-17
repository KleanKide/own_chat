import type { MutableRefObject } from "react";
import type { ChatMessage } from "../types/chat";
import { MessageBubble } from "./MessageBubble";

type MessagesListProps = {
  messages: ChatMessage[];
  isLoading: boolean;
  messagesRef: MutableRefObject<HTMLDivElement | null>;
};

export function MessagesList({
  messages,
  isLoading,
  messagesRef
}: MessagesListProps) {
  return (
    <div
      className="grid min-h-0 max-h-full content-start gap-3.5 overflow-y-auto pr-2 max-sm:max-h-80"
      aria-live="polite"
      ref={messagesRef}
    >
      {messages.map((item, index) => (
        <MessageBubble key={`${item.role}-${index}`} message={item} />
      ))}

      {isLoading ? (
        <article className="max-w-full rounded-[22px] border border-white/10 bg-[rgba(10,33,87,0.42)] px-[18px] py-4 opacity-80 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] animate-[fadeUp_.22s_ease] sm:max-w-[620px]">
          <span className="text-xs font-extrabold tracking-[0.08em] uppercase">
            AI
          </span>
          <p className="mt-1.5 whitespace-pre-wrap">
            Thinking about the answer...
          </p>
        </article>
      ) : null}
    </div>
  );
}
