import { useEffect, useRef, useState } from "react";
import { Composer } from "./components/Composer";
import { ErrorAlert } from "./components/ErrorAlert";
import { Hero } from "./components/Hero";
import { MessagesList } from "./components/MessagesList";
import { SpeechRecognition } from "./lib/speech-recognition";
import type { ChatMessage, ChatResponse } from "./types/chat";
import type {
  SpeechRecognitionEventLike,
  SpeechRecognitionLike
} from "./types/speech";

const apiUrl = import.meta.env.VITE_API_URL || "";
const initialMessages: ChatMessage[] = [];

export default function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState("");
  const [speechSupported, setSpeechSupported] = useState(Boolean(SpeechRecognition));
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const messagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesRef.current?.scrollTo({
      top: messagesRef.current.scrollHeight,
      behavior: "smooth"
    });
  }, [messages, isLoading]);

  useEffect(() => {
    if (!SpeechRecognition) {
      setSpeechSupported(false);
      return undefined;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "ru-RU";
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.onstart = () => {
      setError("");
      setIsRecording(true);
    };

    recognition.onresult = (event: SpeechRecognitionEventLike) => {
      const transcript = Array.from({ length: event.results.length }, (_, index) => {
        return event.results[index]?.[0]?.transcript || "";
      }).join("");

      setMessage(transcript);
    };

    recognition.onerror = (event) => {
      setError(`Ошибка распознавания речи: ${event.error}`);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmed = message.trim();
    if (!trimmed || isLoading) {
      return;
    }

    setError("");
    setIsLoading(true);
    setMessages((current) => [...current, { role: "user", text: trimmed }]);

    try {
      const response = await fetch(`${apiUrl}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: trimmed })
      });

      const data = (await response.json()) as ChatResponse;

      if (!response.ok) {
        throw new Error(data.error || "Не удалось получить ответ.");
      }

      setMessages((current) => [
        ...current,
        { role: "assistant", text: data.reply || "Пустой ответ от сервера." }
      ]);
      setMessage("");
    } catch (submitError: unknown) {
      const messageText =
        submitError instanceof Error ? submitError.message : "Неизвестная ошибка.";

      setError(messageText);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMessageKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key !== "Enter" || event.shiftKey) {
      return;
    }

    event.preventDefault();

    if (!message.trim() || isLoading) {
      return;
    }

    event.currentTarget.form?.requestSubmit();
  };

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      setError("Голосовой ввод не поддерживается в этом браузере.");
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      return;
    }

    recognitionRef.current.start();
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(135deg,#08245b_0%,#0a2c6a_48%,#0f3476_100%)] px-4 py-6 text-slate-50 sm:px-8 sm:py-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(83,135,255,0.22),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(36,91,204,0.2),transparent_24%),radial-gradient(circle_at_18%_10%,rgba(255,255,255,0.08),transparent_14%),radial-gradient(circle_at_80%_90%,rgba(28,76,176,0.28),transparent_22%)]"
      />

      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-3rem)] w-full max-w-[1040px] grid-rows-[auto_auto_1fr_auto_auto] gap-5 sm:min-h-[calc(100vh-4.5rem)] sm:gap-[22px]">
        <Hero />

        <MessagesList
          messages={messages}
          isLoading={isLoading}
          messagesRef={messagesRef}
        />

        <Composer
          message={message}
          isLoading={isLoading}
          isRecording={isRecording}
          speechSupported={speechSupported}
          onSubmit={handleSubmit}
          onMessageChange={setMessage}
          onMessageKeyDown={handleMessageKeyDown}
          onToggleRecording={toggleRecording}
        />

        {error ? <ErrorAlert message={error} /> : null}
      </section>

      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}
