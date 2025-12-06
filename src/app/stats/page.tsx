import MainLayout from '@/components/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, Recycle, Scale } from 'lucide-react';
import { StatsDisplay } from './stats-display';

export default function StatsPage() {
  return (
    <MainLayout pageTitle="Impacto Comunitario">
      <div className="space-y-8">
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Orgánicos Desviados (Semana)</CardTitle>
              <Leaf className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">35 kg</div>
              <p className="text-xs text-muted-foreground">de residuos que ahora son compost</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reciclables Colectados (Semana)</CardTitle>
              <Recycle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">20 kg</div>
              <p className="text-xs text-muted-foreground">de plástico, vidrio y papel</p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Desviado del Relleno</CardTitle>
              <Scale className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">55 kg</div>
              <p className="text-xs text-muted-foreground">¡Gracias a tu esfuerzo!</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Progreso Semanal de Separación (kg)</CardTitle>
          </CardHeader>
          <CardContent>
            <StatsDisplay />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
