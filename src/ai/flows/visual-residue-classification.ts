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
  classification: z
    .enum(['reciclaje', 'compostaje', 'no_reciclaje_compostaje'])
    .describe('La categoría de disposición adecuada para el residuo.'),
  reason: z.string().describe('Explicación breve de por qué pertenece a esa categoría.'),
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
    prompt: `Eres un experto en gestión de residuos.

Recibirás la foto de un residuo y debes clasificarlo únicamente como:
- "reciclaje" cuando pueda ir a un contenedor de reciclaje común.
- "compostaje" cuando sea materia orgánica o compostable.
- "no_reciclaje_compostaje" cuando no deba ir ni a reciclaje ni a compostaje.

Explica brevemente el motivo de la decisión para orientar al usuario.

Foto: {{media url=photoDataUri}}`,
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
