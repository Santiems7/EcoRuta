import MainLayout from '@/components/main-layout';
import { SorterForm } from './sorter-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function SorterPage() {
  return (
    <MainLayout pageTitle="Clasificador Inteligente">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Asistente de Clasificación Inteligente</CardTitle>
          <CardDescription>
            Toma una foto, dinos tu ubicación (opcional), y te daremos instrucciones de reciclaje locales.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SorterForm />
        </CardContent>
      </Card>
    </MainLayout>
  );
}
