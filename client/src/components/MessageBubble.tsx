import type { ChatMessage } from "../types/chat";

type MessageBubbleProps = {
  message: ChatMessage;
};

export function MessageBubble({ message }: MessageBubbleProps) {
  return (
    <article
      className={`max-w-full rounded-[22px] px-[18px] py-4 animate-[fadeUp_.22s_ease] sm:max-w-[620px] ${
        message.role === "user"
          ? "ml-auto bg-[linear-gradient(135deg,rgba(69,120,220,0.95),rgba(46,90,184,0.95))] text-slate-50 shadow-[0_16px_32px_rgba(4,18,54,0.18)]"
          : "border border-white/10 bg-[rgba(10,33,87,0.42)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
      }`}
    >
      <span className="text-xs font-extrabold tracking-[0.08em] uppercase">
        {message.role === "user" ? "You" : "AI"}
      </span>
      <p className="mt-1.5 whitespace-pre-wrap">{message.text}</p>
    </article>
  );
}
