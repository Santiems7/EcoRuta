'use server';

import { visualResidueClassification, type VisualResidueClassificationOutput } from '@/ai/flows/visual-residue-classification';
import { OpenAIConfigurationError, OpenAIQuotaError } from '@/ai/openai-client';

export type ClassificationFailureReason = 'configuration' | 'quota' | 'unexpected';

export type ClassificationResult =
  | {success: true; data: VisualResidueClassificationOutput}
  | {success: false; reason: ClassificationFailureReason; message: string};

export async function classifyResidue(photoDataUri: string): Promise<ClassificationResult> {
  try {
    const result = await visualResidueClassification({ photoDataUri });
    return {success: true, data: result};
  } catch (error) {
    console.error('Error in visualResidueClassification flow:', error);
    if (error instanceof OpenAIConfigurationError) {
      return {
        success: false,
        reason: 'configuration',
        message: 'Configura OPENAI_API_KEY antes de clasificar residuos.',
      };
    }
    if (error instanceof OpenAIQuotaError) {
      return {
        success: false,
        reason: 'quota',
        message: 'Has agotado la cuota de OpenAI: revisa tu plan o inténtalo más tarde.',
      };
    }

    return {
      success: false,
      reason: 'unexpected',
      message: 'No se pudo clasificar el residuo. Inténtalo de nuevo.',
    };
  }
}
