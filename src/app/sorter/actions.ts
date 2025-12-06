'use server';

import { intelligentWasteSorting } from '@/ai/flows/intelligent-waste-sorting';

export async function getSortingInstructions(photoDataUri: string, location: string) {
  try {
    const result = await intelligentWasteSorting({ photoDataUri, location });
    return result;
  } catch (error) {
    console.error('Error in intelligentWasteSorting flow:', error);
    throw new Error('Failed to get sorting instructions.');
  }
}
