'use server';

import { buildSortingInstructions } from '@/lib/manual-sorting';

export type SortingInstructionsResult = {
  sortingInstructions: string;
};

export async function getSortingInstructions(photoDataUri: string, location: string, description: string) {
  try {
    if (!photoDataUri) {
      throw new Error('Agrega una foto para guardar evidencia de lo que vas a desechar.');
    }

    if (!description.trim()) {
      throw new Error('Incluye una breve descripción del residuo para generar las instrucciones sin IA.');
    }

    const result = buildSortingInstructions(description, location);
    const response: SortingInstructionsResult = {
      sortingInstructions: result.sortingInstructions,
    };
    return response;
  } catch (error) {
    console.error('Error en la generación de instrucciones sin IA:', error);
    throw new Error('No se pudieron generar instrucciones de clasificación.');
  }
}
