'use server';

import { visualResidueClassification } from '@/ai/flows/visual-residue-classification';
import { OpenAIConfigurationError } from '@/ai/openai-client';

export async function classifyResidue(photoDataUri: string) {
  try {
    const result = await visualResidueClassification({ photoDataUri });
    return result;
  } catch (error) {
    console.error('Error in visualResidueClassification flow:', error);
    if (error instanceof OpenAIConfigurationError) {
      throw new Error('AI configuration error: please set OPENAI_API_KEY before classifying residuos.');
    }

    throw new Error('Failed to classify residue.');
  }
}
