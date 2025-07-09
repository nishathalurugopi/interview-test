import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Call OpenAI to extract tags from a diary entry prompt.
 */
export async function callOpenAI(prompt: string): Promise<string> {
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'You extract tags from diary entries.' },
      { role: 'user', content: prompt }
    ],
    temperature: 0.3,
  });

  const content = response.choices[0].message?.content;

  if (!content) {
    throw new Error("OpenAI response is missing content.");
  }

  return content.trim();
}
