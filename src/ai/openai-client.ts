import {z} from 'zod';

export class OpenAIConfigurationError extends Error {
  constructor(message = 'OpenAI configuration error.') {
    super(message);
    this.name = 'OpenAIConfigurationError';
  }
}

export class OpenAIQuotaError extends Error {
  constructor(message = 'OpenAI quota exceeded.') {
    super(message);
    this.name = 'OpenAIQuotaError';
  }
}

const usingFreeProvider =
  process.env.AI_PROVIDER?.toLowerCase() !== 'openai' && process.env.USE_FREE_AI?.toLowerCase() !== 'false';

const openAIEndpoint = usingFreeProvider
  ? process.env.FREE_OPENAI_API_URL ?? 'https://ai.fakeopen.com/v1/chat/completions'
  : process.env.OPENAI_API_URL ?? 'https://api.openai.com/v1/chat/completions';

const apiKey = usingFreeProvider ? process.env.FREE_OPENAI_API_KEY ?? '' : process.env.OPENAI_API_KEY;

export const defaultOpenAIModel = usingFreeProvider
  ? process.env.FREE_VISION_MODEL ?? 'gpt-4o-mini'
  : process.env.OPENAI_MODEL ?? 'gpt-4o-mini';

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
  if (!apiKey && !usingFreeProvider) {
    throw new OpenAIConfigurationError('OPENAI_API_KEY is not set.');
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
      ...(apiKey ? {Authorization: `Bearer ${apiKey}`} : {}),
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorText = await response.text();
    try {
      const parsedError = JSON.parse(errorText) as {error?: {message?: string; code?: string}};
      if (parsedError.error?.code === 'insufficient_quota') {
        throw new OpenAIQuotaError(parsedError.error?.message ?? 'OpenAI quota exceeded.');
      }

      const parsedMessage = parsedError.error?.message;
      if (parsedMessage) {
        throw new Error(`OpenAI API error (${response.status}): ${parsedMessage}`);
      }
    } catch (error) {
      if (error instanceof OpenAIQuotaError) {
        throw error;
      }

      if (error instanceof Error && !(error instanceof SyntaxError)) {
        throw error;
      }
    }

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
