export type SpeechRecognitionAlternativeLike = {
  transcript: string;
};

export type SpeechRecognitionResultLike = {
  0?: SpeechRecognitionAlternativeLike;
  length: number;
};

export type SpeechRecognitionResultListLike = {
  [index: number]: SpeechRecognitionResultLike;
  length: number;
};

export type SpeechRecognitionEventLike = Event & {
  results: SpeechRecognitionResultListLike;
};

export type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onstart: null | (() => void);
  onresult: null | ((event: SpeechRecognitionEventLike) => void);
  onerror: null | ((event: { error: string }) => void);
  onend: null | (() => void);
  start: () => void;
  stop: () => void;
};

export type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

export type BrowserSpeechWindow = Window &
  typeof globalThis & {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  };
