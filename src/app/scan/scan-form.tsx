'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { classifyResidue, type ClassificationFailureReason } from './actions';
import type { VisualResidueClassificationOutput } from '@/ai/flows/visual-residue-classification';
import { AlertTriangle, Camera, Leaf, Loader2, Recycle, Trash2, Upload } from 'lucide-react';

const ResultIcon = ({ classification }: { classification: string }) => {
  switch (classification) {
    case 'compostaje':
      return <Leaf className="h-12 w-12 text-green-600" />;
    case 'reciclaje':
      return <Recycle className="h-12 w-12 text-blue-600" />;
    case 'no_reciclaje_compostaje':
      return <Trash2 className="h-12 w-12 text-gray-600" />;
    default:
      return null;
  }
};

const classificationLabels: Record<string, string> = {
  reciclaje: 'Reciclaje',
  compostaje: 'Compostaje',
  no_reciclaje_compostaje: 'No es para reciclaje ni compostaje',
};

export function ScanForm() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<VisualResidueClassificationOutput | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorReason, setErrorReason] = useState<ClassificationFailureReason | null>(null);
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
    setErrorMessage(null);
    setErrorReason(null);

    try {
      const classificationResult = await classifyResidue(imagePreview);
      if (!classificationResult.success) {
        setErrorMessage(classificationResult.message);
        setErrorReason(classificationResult.reason);
        toast({
          title: 'Error de clasificación',
          description: classificationResult.message,
          variant: 'destructive',
        });
        return;
      }

      setResult(classificationResult.data);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error de clasificación',
        description: 'No se pudo clasificar la imagen. Inténtalo de nuevo.',
        variant: 'destructive',
      });
      setErrorMessage('No se pudo clasificar la imagen. Inténtalo de nuevo.');
      setErrorReason('unexpected');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="waste-image">Foto del Residuo</Label>
        <div className="flex items-center gap-4">
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
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Clasificando...</>
          ) : (
            'Clasificar Residuo'
          )}
        </Button>
      )}

      {isLoading && (
        <Card>
          <CardHeader className="items-center text-center">
            <Skeleton className="h-12 w-12 rounded-full" />
            <Skeleton className="h-6 w-32 mt-2" />
          </CardHeader>
          <CardContent className="text-center space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4 mx-auto" />
          </CardContent>
        </Card>
      )}

      {errorMessage && (
        <Card className="border-destructive/40 bg-destructive/10">
          <CardHeader className="flex flex-row items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-destructive" />
            <div>
              <CardTitle className="font-headline text-lg">No pudimos clasificar la imagen</CardTitle>
              <CardDescription className="text-destructive/80">
                {errorReason === 'quota'
                  ? 'El servicio de IA alcanzó su límite: inténtalo de nuevo más tarde o revisa la configuración.'
                  : 'Revisa la imagen o inténtalo nuevamente en unos minutos.'}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{errorMessage}</p>
          </CardContent>
        </Card>
      )}

      {result && (
        <Card className="bg-card/80 animate-in fade-in-50">
          <CardHeader className="items-center text-center">
            <ResultIcon classification={result.classification} />
            <CardTitle className="font-headline text-2xl">
              {classificationLabels[result.classification] ?? result.classification}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground">{result.reason}</p>
          </CardContent>
        </Card>
      )}
    </form>
  );
}
