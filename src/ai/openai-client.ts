import {z} from 'zod';

export const defaultOpenAIModel = process.env.OPENAI_MODEL ?? 'gpt-4o-mini';
const openAIEndpoint = process.env.OPENAI_API_URL ?? 'https://api.openai.com/v1/chat/completions';

const OpenAIMessageSchema = z.object({
  role: z.enum(['system', 'user', 'assistant']),
  content: z.array(
    z.discriminatedUnion('type', [
      z.object({type: z.literal('text'), text: z.string()}),
      z.object({type: z.literal('image_url'), image_url: z.object({url: z.string()})}),
    ])
  ),
});

export type OpenAIMessage = z.infer<typeof OpenAIMessageSchema>;

interface OpenAIJsonRequest<TSchema extends z.ZodTypeAny> {
  messages: OpenAIMessage[];
  schemaName: string;
  schema: TSchema;
  model?: string;
  temperature?: number;
}

interface OpenAIChoiceResponse {
  message?: {
    content?: string | Array<{type: string; text?: string}>;
  };
}

export async function callOpenAIJson<T>(params: OpenAIJsonRequest<z.ZodTypeAny>): Promise<T> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not set.');
  }

  const requestBody = {
    model: params.model ?? defaultOpenAIModel,
    messages: params.messages.map(message => OpenAIMessageSchema.parse(message)),
    temperature: params.temperature ?? 0.2,
    response_format: {
      type: 'json_schema',
      json_schema: {
        name: params.schemaName,
        schema: params.schema,
        strict: true,
      },
    },
  };

  const response = await fetch(openAIEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI API error (${response.status}): ${errorText}`);
  }

  const completion = (await response.json()) as {choices?: OpenAIChoiceResponse[]};
  const content = completion.choices?.[0]?.message?.content;

  const textContent = typeof content === 'string' ? content : content?.find(part => part.type === 'text')?.text;
  if (!textContent) {
    throw new Error('OpenAI API returned an empty response.');
  }

  return JSON.parse(textContent) as T;
}
