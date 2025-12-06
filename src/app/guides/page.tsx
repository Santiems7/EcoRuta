import MainLayout from '@/components/main-layout';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const guidesData = [
  {
    id: 'guide-organic',
    title: "Cómo separar tus residuos orgánicos",
    description: "Aprende qué restos de comida y jardín puedes compostar.",
    content: "En la caneca de orgánicos van todos los restos de comida cruda o cocinada, como cáscaras de frutas y verduras, restos de café, cáscaras de huevo y restos de jardín. ¡No incluyas carnes, lácteos o aceites en grandes cantidades!",
  },
  {
    id: 'guide-compost',
    title: "Qué SÍ y qué NO va al compost",
    description: "Una guía rápida para no equivocarte al compostar.",
    content: "SÍ: Frutas, verduras, legumbres, cereales, hojas secas. NO: Plásticos, vidrios, metales, pañales, colillas de cigarrillo, excrementos de mascotas, productos químicos.",
  },
  {
    id: 'guide-recycling',
    title: "Reciclaje de Plástico y Papel",
    description: "Limpia y seca tus envases antes de depositarlos.",
    content: "Asegúrate de que las botellas de plástico, envases y cartones estén limpios y secos antes de llevarlos al punto de reciclaje. Esto evita la contaminación de otros materiales y facilita el proceso.",
  },
  {
    id: 'guide-new-residents',
    title: "Guía para Nuevos Residentes",
    description: "Bienvenido a la comunidad, ¡así separamos en Mirador de Calasanz!",
    content: "¡Hola! En nuestra unidad tenemos tres tipos de contenedores principales: Orgánicos (marrón), Reciclables (azul/blanco) y Ordinarios (negro). Usa esta app para saber dónde va cada cosa. ¡Gracias por tu ayuda!",
  },
];

export default function GuidesPage() {
  return (
    <MainLayout pageTitle="Guías de Reciclaje">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {guidesData.map((guide) => {
          const image = PlaceHolderImages.find(p => p.id === guide.id);
          return (
            <Dialog key={guide.id}>
              <DialogTrigger asChild>
                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  {image && (
                     <div className="aspect-video relative w-full overflow-hidden rounded-t-lg">
                        <Image
                          src={image.imageUrl}
                          alt={guide.title}
                          data-ai-hint={image.imageHint}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover"
                        />
                     </div>
                  )}
                  <CardHeader>
                    <CardTitle className="font-headline">{guide.title}</CardTitle>
                    <CardDescription>{guide.description}</CardDescription>
                  </CardHeader>
                </Card>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="font-headline text-primary">{guide.title}</DialogTitle>
                  <DialogDescription>
                    {guide.description}
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  {image && (
                     <div className="aspect-video relative w-full overflow-hidden rounded-lg mb-4">
                        <Image
                          src={image.imageUrl}
                          alt={guide.title}
                          data-ai-hint={image.imageHint}
                          fill
                          sizes="100vw"
                          className="object-cover"
                        />
                     </div>
                  )}
                  <p className="text-sm text-foreground">{guide.content}</p>
                </div>
              </DialogContent>
            </Dialog>
          );
        })}
      </div>
    </MainLayout>
  );
}
