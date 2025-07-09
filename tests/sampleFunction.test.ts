import { processEntries } from '../src/lib/sampleFunction';
import { mockVoiceEntries } from '../src/lib/mockData';

test('processEntries returns valid structure', async () => {
  const entries = mockVoiceEntries;
  const result = await processEntries(entries);

  expect(result).toHaveProperty('summary');
  expect(result.summary).toContain('Processed');

  expect(result).toHaveProperty('tagFrequencies');
  expect(typeof result.tagFrequencies).toBe('object');

  for (const entry of entries) {
    const tags = (result as any)[entry.id];
    expect(typeof tags.emotion_score).toBe('number');
    expect(tags).toHaveProperty('gratitude');
    expect(typeof tags.gratitude).toBe('boolean');
  }
});
