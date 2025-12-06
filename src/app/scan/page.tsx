import MainLayout from '@/components/main-layout';
import { ScanForm } from './scan-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ScanPage() {
  return (
    <MainLayout pageTitle="Escanear Residuo">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Clasificador Visual de Residuos</CardTitle>
          <CardDescription>
            Toma una foto de un residuo y la inteligencia artificial te dirá cómo clasificarlo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScanForm />
        </CardContent>
      </Card>
    </MainLayout>
  );
}
