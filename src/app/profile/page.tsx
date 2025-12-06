import MainLayout from '@/components/main-layout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Gift, Star, Zap } from 'lucide-react';

const rewards = [
    {
        title: "Rifa Mensual: Cena para Dos",
        points: "500 Puntos",
        icon: <Gift className="h-6 w-6 text-primary" />
    },
    {
        title: "Descuento en Administración",
        points: "1000 Puntos",
        icon: <Award className="h-6 w-6 text-primary" />
    },
    {
        title: "Kit de Compostaje Casero",
        points: "2000 Puntos",
        icon: <Star className="h-6 w-6 text-primary" />
    }
]

export default function ProfilePage() {
  return (
    <MainLayout pageTitle="Mi Perfil">
      <div className="space-y-8">
        <Card>
          <CardHeader className="flex flex-col items-center text-center space-y-4">
            <Avatar className="h-24 w-24 border-4 border-primary">
              <AvatarImage src="https://picsum.photos/seed/laura/200" alt="Laura, la residente eco-curiosa" data-ai-hint="young woman smiling" />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl font-headline">Laura, la residente eco-curiosa</CardTitle>
              <CardDescription>Estudiante de Ingeniería | 22 años</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="flex items-center gap-2 p-3 bg-accent/30 rounded-lg">
                <Zap className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">150 Puntos Eco</span>
            </div>
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Recompensas Disponibles</CardTitle>
                <CardDescription>Usa tus Puntos Eco para participar en rifas y obtener beneficios.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {rewards.map((reward, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                            {reward.icon}
                            <div>
                                <p className="font-semibold">{reward.title}</p>
                                <p className="text-sm text-muted-foreground">{reward.points}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
