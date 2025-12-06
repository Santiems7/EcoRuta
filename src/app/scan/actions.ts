'use server';

import { visualResidueClassification } from '@/ai/flows/visual-residue-classification';

export async function classifyResidue(photoDataUri: string) {
  try {
    const result = await visualResidueClassification({ photoDataUri });
    return result;
  } catch (error) {
    console.error('Error in visualResidueClassification flow:', error);
    throw new Error('Failed to classify residue.');
  }
}
