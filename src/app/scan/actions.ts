'use server';

import { classifyWasteByDescription, type WasteClassification } from '@/lib/manual-sorting';

export type ClassificationFailureReason = 'validation' | 'unexpected';

export type VisualResidueClassificationOutput = {
  classification: WasteClassification;
  reason: string;
};

export type ClassificationResult =
  | {success: true; data: VisualResidueClassificationOutput}
  | {success: false; reason: ClassificationFailureReason; message: string};

export async function classifyResidue(photoDataUri: string, description: string): Promise<ClassificationResult> {
  try {
    if (!photoDataUri) {
      return {
        success: false,
        reason: 'validation',
        message: 'Agrega una foto para acompañar la clasificación manual.',
      };
    }

    const trimmedDescription = description.trim();
    if (!trimmedDescription) {
      return {
        success: false,
        reason: 'validation',
        message: 'Describe brevemente el residuo para clasificarlo sin IA.',
      };
    }

    const result = classifyWasteByDescription(trimmedDescription);

    return {success: true, data: result};
  } catch (error) {
    console.error('Error en la clasificación manual:', error);
    return {
      success: false,
      reason: 'unexpected',
      message: 'No se pudo clasificar la imagen de forma manual. Inténtalo nuevamente.',
    };
  }
}
