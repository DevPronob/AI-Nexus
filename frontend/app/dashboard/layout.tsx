"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/authStore';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  Settings, 
  User as UserIcon, 
  LogOut, 
  Sparkles,
  BarChart3,
  HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push('/login');
  }, [user, router]);

  if (!user) return null;

  const userMenuItems = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'My Bookings', href: '/dashboard/bookings', icon: Briefcase },
    { name: 'Profile', href: '/dashboard/profile', icon: UserIcon },
  ];

  const adminMenuItems = [
    ...userMenuItems,
    { name: 'Manage Users', href: '/dashboard/users', icon: Users },
    { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
    { name: 'Platform Settings', href: '/dashboard/settings', icon: Settings },
  ];

  const menuItems = user.role === 'admin' ? adminMenuItems : userMenuItems;

  return (
    <div className="flex min-h-screen bg-background pt-20">
      {/* Sidebar */}
      <aside className="w-64 glass border-r hidden md:flex flex-col fixed left-0 top-20 bottom-0 z-40">
        <div className="flex-grow py-8 px-4 space-y-2">
          {menuItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-primary/10 hover:text-primary transition-all group"
            >
              <item.icon size={20} className="group-hover:scale-110 transition-transform" />
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </div>
        
        <div className="p-4 border-t">
          <div className="bg-primary/10 rounded-2xl p-4 mb-4">
            <div className="flex items-center space-x-2 text-primary mb-2">
              <Sparkles size={16} />
              <span className="text-xs font-bold uppercase">Pro Feature</span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">Get unlimited access to AI insights.</p>
            <Button size="sm" className="w-full rounded-lg text-xs">Upgrade</Button>
          </div>
          <Button 
            variant="ghost" 
            onClick={logout}
            className="w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut size={20} className="mr-3" /> Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow md:ml-64 p-8">
        {children}
      </main>
    </div>
  );
}
