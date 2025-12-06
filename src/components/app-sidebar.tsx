'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator
} from '@/components/ui/sidebar';
import {
  Home,
  ScanLine,
  Lightbulb,
  Map,
  BookOpen,
  BarChart3,
  User,
  Leaf,
} from 'lucide-react';

const menuItems = [
  { href: '/', label: 'Inicio', icon: Home },
  { href: '/scan', label: 'Escanear Residuo', icon: ScanLine },
  { href: '/sorter', label: 'Clasificador Inteligente', icon: Lightbulb },
  { href: '/map', label: 'Mapa de Puntos', icon: Map },
  { href: '/guides', label: 'Guías', icon: BookOpen },
  { href: '/stats', label: 'Impacto', icon: BarChart3 },
  { href: '/profile', label: 'Mi Perfil', icon: User },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2">
          <Leaf className="h-8 w-8 text-primary" />
          <span className="text-xl font-semibold font-headline">EcoRuta Calasanz</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={{ children: item.label }}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <div className="text-xs text-center text-muted-foreground p-2">
          Unidad Residencial Mirador de Calasanz
        </div>
      </SidebarFooter>
    </>
  );
}
