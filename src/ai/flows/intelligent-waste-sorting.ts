'use server';

/**
 * @fileOverview Implements the Intelligent Waste Sorting flow using OpenAI.
 *
 * - intelligentWasteSorting - A function that takes an image of waste and returns sorting instructions.
 * - IntelligentWasteSortingInput - The input type for the intelligentWasteSorting function.
 * - IntelligentWasteSortingOutput - The return type for the intelligentWasteSorting function.
 */

import {callOpenAIJson, defaultOpenAIModel, type OpenAIMessage} from '@/ai/openai-client';
import {z} from 'zod';

const IntelligentWasteSortingInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a waste item, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  location: z.string().optional().describe('The location of the user.'),
});
export type IntelligentWasteSortingInput = z.infer<typeof IntelligentWasteSortingInputSchema>;

const IntelligentWasteSortingOutputSchema = z.object({
  sortingInstructions: z.string().describe('Instructions for how to sort the waste.'),
});
export type IntelligentWasteSortingOutput = z.infer<typeof IntelligentWasteSortingOutputSchema>;

const intelligentWasteSortingJsonSchema = {
  type: 'object',
  properties: {
    sortingInstructions: {type: 'string'},
  },
  required: ['sortingInstructions'],
  additionalProperties: false,
} as const;

export async function intelligentWasteSorting(
  input: IntelligentWasteSortingInput
): Promise<IntelligentWasteSortingOutput> {
  const validatedInput = IntelligentWasteSortingInputSchema.parse(input);

  const systemPrompt: OpenAIMessage = {
    role: 'system',
    content: [
      {
        type: 'text',
        text: `You are an expert in waste management and recycling policies.

Given a photo of a waste item and the user's location, provide detailed instructions on how to sort the waste according to local guidelines.`,
      },
    ],
  };

  const userPrompt: OpenAIMessage = {
    role: 'user',
    content: [
      {
        type: 'text',
        text: `Waste Item Photo:`,
      },
      {
        type: 'image_url',
        image_url: {url: validatedInput.photoDataUri},
      },
      {
        type: 'text',
        text: `Location: ${validatedInput.location ?? 'No proporcionado'}

Provide clear, concise sorting instructions for this specific item.`,
      },
    ],
  };

  const response = await callOpenAIJson<IntelligentWasteSortingOutput>({
    schemaName: 'IntelligentWasteSorting',
    schema: intelligentWasteSortingJsonSchema,
    messages: [systemPrompt, userPrompt],
    model: defaultOpenAIModel,
  });

  return IntelligentWasteSortingOutputSchema.parse(response);
}
