'use server';
/**
 * @fileOverview Visual Residue Classification AI agent.
 *
 * - visualResidueClassification - A function that handles the image classification process.
 * - VisualResidueClassificationInput - The input type for the visualResidueClassification function.
 * - VisualResidueClassificationOutput - The return type for the visualResidueClassification function.
 */

import {ai, defaultModel} from '@/ai/genkit';
import {z} from 'genkit';

const VisualResidueClassificationInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a waste item, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type VisualResidueClassificationInput = z.infer<typeof VisualResidueClassificationInputSchema>;

const VisualResidueClassificationOutputSchema = z.object({
  classification: z.enum(['organic', 'recyclable', 'non-recyclable']).describe('The classification of the waste item.'),
  reason: z.string().describe('The reason for the classification.'),
});
export type VisualResidueClassificationOutput = z.infer<typeof VisualResidueClassificationOutputSchema>;

export async function visualResidueClassification(input: VisualResidueClassificationInput): Promise<VisualResidueClassificationOutput> {
  return visualResidueClassificationFlow(input);
}

const classifyPrompt = ai.definePrompt(
  {
    name: 'residueClassifier',
    input: { schema: VisualResidueClassificationInputSchema },
    output: { schema: VisualResidueClassificationOutputSchema },
    model: defaultModel,
    prompt: `You are an expert in waste management and recycling.

You will receive a photo of a waste item and must classify it as either 'organic', 'recyclable', or 'non-recyclable'.

Also provide a brief reason for your classification.

Photo: {{media url=photoDataUri}}`,
  },
);

const visualResidueClassificationFlow = ai.defineFlow(
  {
    name: 'visualResidueClassificationFlow',
    inputSchema: VisualResidueClassificationInputSchema,
    outputSchema: VisualResidueClassificationOutputSchema,
  },
  async (input) => {
    const { output } = await classifyPrompt(input);
    return output!;
  }
);
