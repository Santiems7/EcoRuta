import Link from 'next/link';
import { PlayCircle, MonitorSmartphone, CheckCircle2, Activity, AlertTriangle, Map, ScanLine, Lightbulb, BookOpen, BarChart3 } from 'lucide-react';
import MainLayout from '@/components/main-layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const quickLinks = [
  { href: '/scan', label: 'Escanear en demo', description: 'Prueba la cámara virtual y valida la clasificación.', icon: ScanLine },
  { href: '/sorter', label: 'Clasificador inteligente', description: 'Envía imágenes de ejemplo y revisa la respuesta del asistente.', icon: Lightbulb },
  { href: '/map', label: 'Mapa interactivo', description: 'Confirma que la unidad y los puntos de reciclaje cargan correctamente.', icon: Map },
  { href: '/guides', label: 'Guías rápidas', description: 'Abre los modales de ayuda y verifica el contenido multimedia.', icon: BookOpen },
  { href: '/stats', label: 'Panel de impacto', description: 'Visualiza que las gráficas muestren datos de prueba.', icon: BarChart3 },
];

const verificationSteps = [
  {
    title: 'Arranque del servidor',
    status: 'OK en puerto 9002',
    detail: 'npm run dev con Turbopack habilitado para iterar desde el IDE.',
  },
  {
    title: 'Autenticación simulada',
    status: 'Sesión temporal',
    detail: 'La app carga con usuario invitado para navegar sin credenciales.',
  },
  {
    title: 'Datos de prueba',
    status: 'Mocks locales',
    detail: 'Listas de puntos de reciclaje y estadísticas vienen precargadas.',
  },
  {
    title: 'UI responsiva',
    status: 'Listo para revisar',
    detail: 'Componentes principales adaptados a escritorio y móvil.',
  },
];

export default function DemoIdePage() {
  return (
    <MainLayout pageTitle="Demo desde IDE">
      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-6">
          <Card className="border-primary/30">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="font-headline text-primary">Lanza la demo sin salir del IDE</CardTitle>
                <CardDescription>Activa un servidor local con datos simulados para validar el flujo completo.</CardDescription>
              </div>
              <PlayCircle className="h-10 w-10 text-primary" />
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                Ejecuta <code className="font-mono text-xs">npm run dev</code> y abre <code className="font-mono text-xs">http://localhost:9002</code>.
                El script utiliza Turbopack para que los cambios se reflejen en segundos.
              </p>
              <div className="grid gap-2 md:grid-cols-2">
                <Badge variant="secondary" className="w-fit">Modo invitado habilitado</Badge>
                <Badge variant="outline" className="w-fit">Datos mock para recorridos guiados</Badge>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button asChild>
                  <Link href="/scan">Ir al escáner</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/map">Ver mapa</Link>
                </Button>
                <Button asChild variant="ghost">
                  <Link href="/guides">Abrir guías</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Checklist rápida de verificación</CardTitle>
              <CardDescription>Confirma que los módulos carguen en el entorno virtual antes de desplegar.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              {verificationSteps.map((step) => (
                <div key={step.title} className="rounded-lg border p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <p className="font-medium">{step.title}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{step.detail}</p>
                  <Badge variant="secondary">{step.status}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Accesos directos a módulos clave</CardTitle>
              <CardDescription>Recorre las pantallas principales sin salir de la sesión de prueba.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              {quickLinks.map((link) => (
                <Link href={link.href} key={link.href} className="group">
                  <div className="rounded-lg border p-4 h-full space-y-2 transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-0.5">
                    <div className="flex items-center gap-3">
                      <link.icon className="h-6 w-6 text-primary" />
                      <p className="font-medium">{link.label}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{link.description}</p>
                    <Badge variant="outline" className="group-hover:border-primary group-hover:text-primary">Abrir módulo</Badge>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="font-headline">Panel de estado de la demo</CardTitle>
                <CardDescription>Indicadores básicos para el arranque local.</CardDescription>
              </div>
              <MonitorSmartphone className="h-9 w-9 text-primary" />
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-3">
                <Activity className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">Recarga en caliente</p>
                  <p>Actualiza componentes en tiempo real al guardar cambios en el IDE.</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">Mocks incluidos</p>
                  <p>Los puntos del mapa, estadísticas y guías usan datasets locales seguros.</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                <div>
                  <p className="font-medium text-foreground">Sin dependencias externas</p>
                  <p>La sesión de prueba no requiere llaves ni servicios en la nube.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
