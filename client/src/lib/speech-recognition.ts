import type { BrowserSpeechWindow } from "../types/speech";

const browserWindow = window as BrowserSpeechWindow;

export const SpeechRecognition =
  browserWindow.SpeechRecognition || browserWindow.webkitSpeechRecognition;
