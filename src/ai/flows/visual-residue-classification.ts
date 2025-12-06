'use server';
/**
 * @fileOverview Visual Residue Classification AI agent powered by OpenAI.
 *
 * - visualResidueClassification - A function that handles the image classification process.
 * - VisualResidueClassificationInput - The input type for the visualResidueClassification function.
 * - VisualResidueClassificationOutput - The return type for the visualResidueClassification function.
 */

import {callOpenAIJson, defaultOpenAIModel, type OpenAIMessage} from '@/ai/openai-client';
import {z} from 'zod';

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

const visualResidueClassificationJsonSchema = {
  type: 'object',
  properties: {
    classification: {type: 'string', enum: ['reciclaje', 'compostaje', 'no_reciclaje_compostaje']},
    reason: {type: 'string'},
  },
  required: ['classification', 'reason'],
  additionalProperties: false,
} as const;

export async function visualResidueClassification(
  input: VisualResidueClassificationInput
): Promise<VisualResidueClassificationOutput> {
  const validatedInput = VisualResidueClassificationInputSchema.parse(input);

  const systemPrompt: OpenAIMessage = {
    role: 'system',
    content: [
      {
        type: 'text',
        text: `Eres un experto en gestión de residuos.

Recibirás la foto de un residuo y debes clasificarlo únicamente como:
- "reciclaje" cuando pueda ir a un contenedor de reciclaje común.
- "compostaje" cuando sea materia orgánica o compostable.
- "no_reciclaje_compostaje" cuando no deba ir ni a reciclaje ni a compostaje.

Explica brevemente el motivo de la decisión para orientar al usuario.`,
      },
    ],
  };

  const userPrompt: OpenAIMessage = {
    role: 'user',
    content: [
      {
        type: 'text',
        text: 'Clasifica esta imagen en una de las categorías permitidas y justifica la decisión.',
      },
      {
        type: 'image_url',
        image_url: {url: validatedInput.photoDataUri},
      },
    ],
  };

  const response = await callOpenAIJson<VisualResidueClassificationOutput>({
    schemaName: 'VisualResidueClassification',
    schema: visualResidueClassificationJsonSchema,
    messages: [systemPrompt, userPrompt],
    model: defaultOpenAIModel,
  });

  return VisualResidueClassificationOutputSchema.parse(response);
}
