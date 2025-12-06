'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { getSortingInstructions } from './actions';
import type { IntelligentWasteSortingOutput } from '@/ai/flows/intelligent-waste-sorting';
import { Camera, Lightbulb, Loader2, Upload } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

export function SorterForm() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [location, setLocation] = useState('Medellín');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<IntelligentWasteSortingOutput | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setResult(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!imagePreview) {
      toast({
        title: 'No hay imagen',
        description: 'Por favor, selecciona o toma una foto primero.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const instructionResult = await getSortingInstructions(imagePreview, location);
      setResult(instructionResult);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error de clasificación',
        description: 'No se pudieron obtener las instrucciones. Inténtalo de nuevo.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="waste-image">Foto del Residuo</Label>
          <div className="flex items-center gap-4 mt-2">
            <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
              <Camera className="mr-2 h-4 w-4" />
              Tomar Foto
            </Button>
             <span className="text-muted-foreground text-sm">o</span>
            <Button type="button" variant="ghost" onClick={() => fileInputRef.current?.click()}>
              <Upload className="mr-2 h-4 w-4" />
              Subir Archivo
            </Button>
            <Input
              id="waste-image"
              type="file"
              accept="image/*"
              capture="environment"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>

        <div>
            <Label htmlFor="location">Ubicación (opcional)</Label>
            <Input 
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Ej: Medellín, Colombia"
                className="mt-2"
            />
        </div>
      </div>

      {imagePreview && (
        <div className="w-full max-w-sm mx-auto">
          <Image
            src={imagePreview}
            alt="Vista previa del residuo"
            width={400}
            height={400}
            className="rounded-lg object-cover aspect-square"
          />
        </div>
      )}

      {imagePreview && (
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Obteniendo instrucciones...</>
          ) : (
            'Obtener Instrucciones'
          )}
        </Button>
      )}

      {isLoading && (
         <Card>
            <CardHeader className="items-center text-center">
              <Skeleton className="h-12 w-12 rounded-full bg-accent" />
              <Skeleton className="h-6 w-48 mt-2" />
            </CardHeader>
            <CardContent className="text-center space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4 mx-auto" />
               <Skeleton className="h-4 w-full" />
            </CardContent>
          </Card>
      )}

      {result && (
        <Card className="bg-card/80 animate-in fade-in-50">
          <CardHeader className="items-center text-center">
            <Lightbulb className="h-12 w-12 text-yellow-500" />
            <CardTitle className="font-headline text-2xl">Instrucciones de Clasificación</CardTitle>
          </CardHeader>
          <CardContent className="text-left">
            <p className="text-foreground whitespace-pre-wrap">{result.sortingInstructions}</p>
          </CardContent>
        </Card>
      )}
    </form>
  );
}
