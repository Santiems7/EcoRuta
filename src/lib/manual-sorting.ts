export type WasteClassification = 'reciclaje' | 'compostaje' | 'no_reciclaje_compostaje';

const COMPOST_KEYWORDS = [
  'orgánico',
  'organico',
  'cáscara',
  'cascara',
  'fruta',
  'verdura',
  'hoja',
  'resto de comida',
  'restos de comida',
  'comida',
  'borra de café',
  'cafe',
  'poso de café',
  'posos de café',
  'servilleta',
  'papel de cocina',
  'hueso',
  'pan',
  'cáscaras de huevo',
  'cascara de huevo',
  'huevo',
];

const RECYCLING_KEYWORDS = [
  'plástico',
  'plastico',
  'botella',
  'envase',
  'lata',
  'vidrio',
  'frasco',
  'papel',
  'cartón',
  'carton',
  'tetrapak',
  'tetrabrik',
  'aluminio',
  'metal',
  'lata de bebida',
  'bolsa',
];

const SPECIAL_WASTE_KEYWORDS = [
  'batería',
  'bateria',
  'pilas',
  'aceite usado',
  'aceite de motor',
  'aceite vegetal',
  'electrónico',
  'electronico',
  'celular',
  'computador',
  'foco',
  'bombillo',
  'medicamento',
  'jeringa',
  'limpiador',
  'químico',
  'quimico',
];

function normalize(text: string): string {
  return text.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
}

function findKeyword(description: string, keywords: string[]): string | null {
  const normalized = normalize(description);
  for (const keyword of keywords) {
    if (normalized.includes(normalize(keyword))) {
      return keyword;
    }
  }
  return null;
}

export function classifyWasteByDescription(description: string): {
  classification: WasteClassification;
  reason: string;
} {
  const trimmed = description.trim();
  if (!trimmed) {
    throw new Error('Se requiere una descripción del residuo para clasificarlo.');
  }

  const compostKeyword = findKeyword(trimmed, COMPOST_KEYWORDS);
  if (compostKeyword) {
    return {
      classification: 'compostaje',
      reason: `Se mencionó "${compostKeyword}", un material orgánico que puede ir al contenedor de compostaje.
Retira empaques o adhesivos y evita mezclarlo con plástico.`,
    };
  }

  const recyclingKeyword = findKeyword(trimmed, RECYCLING_KEYWORDS);
  if (recyclingKeyword) {
    return {
      classification: 'reciclaje',
      reason: `Se detectó "${recyclingKeyword}", que puede reciclarse si está limpio y seco.
Enjuaga, seca y lleva el material al contenedor azul o de reciclaje mixto.`,
    };
  }

  const specialKeyword = findKeyword(trimmed, SPECIAL_WASTE_KEYWORDS);
  if (specialKeyword) {
    return {
      classification: 'no_reciclaje_compostaje',
      reason: `El artículo incluye "${specialKeyword}", considerado residuo especial.
No debe ir al reciclaje ni al compostaje; consulta un punto de disposición segura.`,
    };
  }

  return {
    classification: 'no_reciclaje_compostaje',
    reason: 'No se identificó un material reciclable u orgánico en la descripción. Usa el contenedor gris o el punto de residuos no aprovechables de tu zona.',
  };
}

export function buildSortingInstructions(description: string, location?: string): {
  classification: WasteClassification;
  sortingInstructions: string;
} {
  const classificationResult = classifyWasteByDescription(description);
  const locationLine = location?.trim()
    ? `Ubicación indicada: ${location.trim()}. Aplica las normas locales antes de disponer el residuo.`
    : 'Aplica estas indicaciones de forma general y confirma con la normativa local.';

  const stepsByCategory: Record<WasteClassification, string[]> = {
    reciclaje: [
      'Enjuaga y seca el material para evitar malos olores.',
      'Comprueba que no tenga restos de comida ni líquidos.',
      'Deposita en el contenedor azul o en el punto de reciclaje más cercano.',
    ],
    compostaje: [
      'Retira empaques plásticos, etiquetas o grapas.',
      'Trocea los restos grandes para que se degraden más rápido.',
      'Llévalo al contenedor verde o al punto de compostaje comunitario.',
    ],
    no_reciclaje_compostaje: [
      'Guárdalo en una bolsa resistente y bien cerrada.',
      'Evita mezclarlo con reciclables u orgánicos.',
      'Deposítalo en el contenedor gris o solicita recolección especial si aplica.',
    ],
  };

  const steps = stepsByCategory[classificationResult.classification]
    .map((step) => `• ${step}`)
    .join('\n');

  return {
    classification: classificationResult.classification,
    sortingInstructions: `${classificationResult.reason}\n\n${locationLine}\n\nPasos sugeridos:\n${steps}`,
  };
}
