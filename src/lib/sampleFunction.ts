import { VoiceEntry, ProcessedResult } from './types';
import { callOpenAI } from './openai';

export async function processEntries(entries: VoiceEntry[]): Promise<ProcessedResult> {
  const result: ProcessedResult = { summary: '', tagFrequencies: {} };

  for (const entry of entries) {
    const prompt = `
Return JSON:
{ "emotion_score": float, "gratitude": boolean, "stress": boolean, "family": boolean, "career": boolean, "health": boolean, "relationships": boolean }
Entry: """${entry.transcript}"""
`;

    try {
      const raw = await callOpenAI(prompt);
      const tags = JSON.parse(raw);
      (result as any)[entry.id] = tags;

      for (const [k, v] of Object.entries(tags)) {
        if (v === true) {
          result.tagFrequencies[k] = (result.tagFrequencies[k] || 0) + 1;
        }
      }
    } catch {
      (result as any)[entry.id] = {
        emotion_score: 0.5,
        gratitude: false,
        stress: false,
        family: false,
        career: false,
        health: false,
        relationships: false
      };
    }
  }

  result.summary = `Processed ${entries.length} entries.`;
  return result;
}
// TEMP: Run this file directly to see live OpenAI results
if (require.main === module) {
  (async () => {
    const entries = [
      { id: 'live1', transcript: 'I feel overwhelmed but grateful for my family.' },
      { id: 'live2', transcript: 'Today I exercised and felt really healthy and energized.' }
    ];

    const result = await processEntries(entries);
    console.log(JSON.stringify(result, null, 2));
  })();
}
