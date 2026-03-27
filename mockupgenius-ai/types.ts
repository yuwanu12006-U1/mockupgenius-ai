export interface GenerationSettings {
  scenario: string;
  medium: string;
  genre: string;
  lighting: string;
  colorGrading: string;
  aspectRatio: string;
  customPrompt: string;
}

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: number;
}

export enum AppState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export type AspectRatio = "1:1" | "3:4" | "4:3" | "9:16" | "16:9";