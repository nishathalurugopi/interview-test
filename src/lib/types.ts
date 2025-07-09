export interface VoiceEntry {
  id: string;
  transcript: string;
}

export interface ProcessedResult {
  summary: string;
  tagFrequencies: Record<string, number>;
  [id: string]: any;
}
