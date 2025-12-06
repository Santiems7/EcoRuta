import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

export const defaultModel = process.env.GOOGLE_GENAI_MODEL ?? 'gemini-1.5-flash';

export const ai = genkit({
  plugins: [googleAI()],
});
