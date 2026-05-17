import type React from "react";

type ComposerProps = {
  message: string;
  isLoading: boolean;
  isRecording: boolean;
  speechSupported: boolean;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  onMessageChange: (value: string) => void;
  onMessageKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onToggleRecording: () => void;
};

export function Composer({
  message,
  isLoading,
  isRecording,
  speechSupported,
  onSubmit,
  onMessageChange,
  onMessageKeyDown,
  onToggleRecording
}: ComposerProps) {
  return (
    <form
      className="grid w-full max-w-[560px] grid-cols-[auto_1fr_auto] items-center gap-3.5 rounded-[22px] border border-[rgba(119,163,255,0.18)] bg-[linear-gradient(180deg,rgba(12,38,96,0.62),rgba(7,28,74,0.72))] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_20px_40px_rgba(5,16,50,0.18)] backdrop-blur-[22px]"
      onSubmit={onSubmit}
    >
      <label className="sr-only" htmlFor="message">
        Enter your prompt
      </label>

      <button
        className={`grid h-11 w-11 place-items-center rounded-[14px] transition duration-150 hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-50 ${
          isRecording
            ? "bg-[linear-gradient(180deg,rgba(86,137,255,0.92),rgba(61,105,206,0.92))] text-white"
            : "bg-transparent text-[rgba(118,169,255,0.95)]"
        }`}
        type="button"
        onClick={onToggleRecording}
        disabled={!speechSupported}
        title={
          speechSupported
            ? "Start voice input"
            : "Your browser does not support voice input"
        }
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="h-[22px] w-[22px]"
        >
          <path
            d="M12 15.5a3.5 3.5 0 0 0 3.5-3.5V7.5a3.5 3.5 0 1 0-7 0V12a3.5 3.5 0 0 0 3.5 3.5Z"
            fill="currentColor"
          />
          <path
            d="M6.75 11.5a.75.75 0 0 1 1.5 0 3.75 3.75 0 0 0 7.5 0 .75.75 0 0 1 1.5 0 5.25 5.25 0 0 1-4.5 5.19V19a.75.75 0 0 1-1.5 0v-2.31a5.25 5.25 0 0 1-4.5-5.19Z"
            fill="currentColor"
          />
        </svg>
      </button>

      <textarea
        id="message"
        value={message}
        onChange={(event) => onMessageChange(event.target.value)}
        onKeyDown={onMessageKeyDown}
        placeholder="Ask whatever you want"
        rows={1}
        className="min-h-7 max-h-36 w-full resize-none overflow-y-auto bg-transparent py-3 text-lg text-slate-100 outline-none placeholder:text-slate-300/65"
      />

      <button
        className="grid h-12 w-12 place-items-center rounded-2xl bg-[linear-gradient(180deg,rgba(68,118,220,0.96),rgba(50,93,188,0.96))] text-slate-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_10px_22px_rgba(5,18,54,0.22)] transition duration-150 hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-50"
        type="submit"
        disabled={isLoading}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="h-[22px] w-[22px]"
        >
          <path
            d="m9 6 6 6-6 6"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </form>
  );
}
