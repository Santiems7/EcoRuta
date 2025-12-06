'use client';

import Image from 'next/image';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Leaf, Recycle, Trash2 } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const wastePoints = [
  {
    id: 'organic1',
    type: 'Orgánico',
    location: 'Sótano 1, al lado del ascensor',
    icon: <Leaf className="h-6 w-6 text-white" />,
    color: 'bg-green-600 hover:bg-green-700',
    position: { top: '30%', left: '25%' },
  },
  {
    id: 'recycling1',
    type: 'Reciclaje',
    location: 'Sótano 1, cerca de la salida vehicular',
    icon: <Recycle className="h-6 w-6 text-white" />,
    color: 'bg-blue-600 hover:bg-blue-700',
    position: { top: '45%', left: '70%' },
  },
  {
    id: 'general1',
    type: 'Ordinario',
    location: 'Sótano 2, cuarto de basuras principal',
    icon: <Trash2 className="h-6 w-6 text-white" />,
    color: 'bg-gray-600 hover:bg-gray-700',
    position: { top: '75%', left: '40%' },
  },
  {
    id: 'organic2',
    type: 'Orgánico',
    location: 'Al lado de la piscina',
    icon: <Leaf className="h-6 w-6 text-white" />,
    color: 'bg-green-600 hover:bg-green-700',
    position: { top: '15%', left: '85%' },
  },
];

export function InteractiveMap() {
  const mapImage = PlaceHolderImages.find(p => p.id === 'map-background');

  if (!mapImage) return <div className="text-center text-red-500">Error: Imagen del mapa no encontrada.</div>;

  return (
    <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border">
      <Image
        src={mapImage.imageUrl}
        alt={mapImage.description}
        data-ai-hint={mapImage.imageHint}
        fill
        className="object-cover"
      />
      {wastePoints.map((point) => (
        <Popover key={point.id}>
          <PopoverTrigger asChild>
            <Button
              variant="default"
              size="icon"
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full w-10 h-10 shadow-lg animate-pulse ${point.color}`}
              style={{ top: point.position.top, left: point.position.left }}
              aria-label={`Punto de ${point.type} en ${point.location}`}
            >
              {point.icon}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 bg-background">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg font-headline text-primary">{point.type}</h3>
              <p className="text-sm text-muted-foreground">{point.location}</p>
            </div>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  );
}
