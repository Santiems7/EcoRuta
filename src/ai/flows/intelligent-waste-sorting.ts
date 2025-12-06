'use server';

/**
 * @fileOverview Implements the Intelligent Waste Sorting flow.
 *
 * - intelligentWasteSorting - A function that takes an image of waste and returns sorting instructions.
 * - IntelligentWasteSortingInput - The input type for the intelligentWasteSorting function.
 * - IntelligentWasteSortingOutput - The return type for the intelligentWasteSorting function.
 */

import {ai, defaultModel} from '@/ai/genkit';
import {z} from 'genkit';

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

export async function intelligentWasteSorting(input: IntelligentWasteSortingInput): Promise<IntelligentWasteSortingOutput> {
  return intelligentWasteSortingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'intelligentWasteSortingPrompt',
  input: {schema: IntelligentWasteSortingInputSchema},
  output: {schema: IntelligentWasteSortingOutputSchema},
  model: defaultModel,
  prompt: `You are an expert in waste management and recycling policies.

Given a photo of a waste item and the user's location, provide detailed instructions on how to sort the waste according to local guidelines.

Waste Item Photo: {{media url=photoDataUri}}
Location: {{location}}

Instructions:`, // location is optional, so Handlebars won't complain if it is blank
});

const intelligentWasteSortingFlow = ai.defineFlow(
  {
    name: 'intelligentWasteSortingFlow',
    inputSchema: IntelligentWasteSortingInputSchema,
    outputSchema: IntelligentWasteSortingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
