import MainLayout from '@/components/main-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InteractiveMap } from './interactive-map';

export default function MapPage() {
  return (
    <MainLayout pageTitle="Mapa de Puntos Ecológicos">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Mapa Interactivo de la Unidad</CardTitle>
          <CardDescription>
            Haz clic en los íconos para ver detalles de cada punto de recolección de residuos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <InteractiveMap />
        </CardContent>
      </Card>
    </MainLayout>
  );
}
