import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, BarChart3, BookOpen, Map, ScanLine } from 'lucide-react';
import { AppHeader } from '@/components/app-header';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import MainLayout from '@/components/main-layout';

const features = [
  {
    title: 'Escanear Residuo',
    description: 'Usa la cámara para identificar y clasificar tu residuo al instante.',
    href: '/scan',
    icon: <ScanLine className="h-8 w-8 text-primary" />,
  },
  {
    title: 'Ver Mapa de Puntos',
    description: 'Encuentra el contenedor correcto más cercano en la unidad.',
    href: '/map',
    icon: <Map className="h-8 w-8 text-primary" />,
  },
  {
    title: 'Guías de Reciclaje',
    description: 'Aprende a separar correctamente con videos y guías rápidas.',
    href: '/guides',
    icon: <BookOpen className="h-8 w-8 text-primary" />,
  },
  {
    title: 'Impacto Comunitario',
    description: 'Mira las estadísticas de reciclaje y el impacto positivo de la comunidad.',
    href: '/stats',
    icon: <BarChart3 className="h-8 w-8 text-primary" />,
  },
];

export default function Home() {
  return (
    <MainLayout pageTitle="Inicio">
      <div className="flex flex-col gap-8">
        <header className="space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-primary md:text-4xl font-headline">
            Bienvenido a EcoRuta Calasanz
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-muted-foreground">
            ¿Cómo podríamos ayudar a la Unidad Residencial Mirador de Calasanz a reducir el desperdicio de alimentos y mejorar la separación de residuos, mediante una aplicación que guíe a los residentes sobre el contenedor correcto donde depositarlos?
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {features.map((feature) => (
            <Link href={feature.href} key={feature.href} className="group">
              <Card className="h-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
                <CardHeader className="flex flex-row items-center justify-between p-6">
                  <div className="space-y-2">
                    <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </div>
                  {feature.icon}
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
