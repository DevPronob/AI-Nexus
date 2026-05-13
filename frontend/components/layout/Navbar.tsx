"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/lib/authStore';
import { Menu, X, User, LogOut, ChevronDown, Sparkles, Bell } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const loggedOutRoutes = [
    { name: 'Home', href: '/' },
    { name: 'Explore Network', href: '/explore' },
    { name: 'How it Works', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const loggedInRoutes = [
    { name: 'Explore', href: '/explore' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'AI Generator', href: '/ai-tools' },
    { name: 'Settings', href: '/dashboard/settings' },
  ];

  const routes = user ? loggedInRoutes : loggedOutRoutes;

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled ? 'glass py-3 shadow-[0_8px_30px_rgb(0,0,0,0.12)]' : 'bg-transparent py-6'
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-11 h-11 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
            <Sparkles className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-black tracking-tighter gradient-text">AI NEXUS</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-10">
          <div className="flex items-center space-x-8">
            {routes.map((route) => (
              <Link key={route.name} href={route.href} className="text-sm font-bold hover:text-primary transition-all hover:translate-y-[-1px] active:translate-y-0">
                {route.name}
              </Link>
            ))}
          </div>
          
          <div className="h-8 w-px bg-white/10 mx-2" />

          {user ? (
            <div className="flex items-center space-x-4">
              <button className="p-2 text-muted-foreground hover:text-primary transition-colors relative">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full border-2 border-background" />
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger className={cn(buttonVariants({ variant: "ghost", className: "relative h-11 w-11 rounded-2xl p-0 flex items-center justify-center border border-white/10 hover:bg-white/5" }))}>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white text-xs font-bold shadow-md">
                    {user.name.charAt(0)}
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 glass p-2 mt-2">
                  <DropdownMenuLabel className="font-normal p-3">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-black leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground opacity-70">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/5" />
                  <DropdownMenuItem className="rounded-xl p-3 focus:bg-primary/10">
                    <Link href="/dashboard/profile" className="w-full font-bold">Profile Details</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-xl p-3 focus:bg-primary/10">
                    <Link href="/dashboard/settings" className="w-full font-bold">Account Settings</Link>
                  </DropdownMenuItem>
                  {user.role === 'admin' && (
                    <DropdownMenuItem className="rounded-xl p-3 focus:bg-secondary/10">
                      <Link href="/dashboard/admin" className="w-full font-bold text-secondary">Admin Console</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator className="bg-white/5" />
                  <DropdownMenuItem onClick={logout} className="rounded-xl p-3 text-destructive focus:bg-destructive/10 font-bold">
                    <LogOut className="mr-3 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center space-x-6">
              <Link href="/login" className="text-sm font-bold hover:text-primary transition-colors">Login</Link>
              <Link href="/register" className={cn(buttonVariants({ className: "rounded-2xl h-11 px-8 font-black shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 transition-all active:scale-95" }))}>
                Join Free
              </Link>
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2 rounded-xl glass" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass absolute top-full left-4 right-4 mt-4 p-8 rounded-[2.5rem] flex flex-col items-center space-y-6 border border-white/20 shadow-2xl animate-in fade-in zoom-in-95 duration-300">
          {routes.map((route) => (
            <Link key={route.name} href={route.href} onClick={() => setMobileMenuOpen(false)} className="text-xl font-bold hover:text-primary transition-colors">
              {route.name}
            </Link>
          ))}
          {!user && (
            <div className="flex flex-col w-full space-y-4 pt-4">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="text-center text-lg font-bold">Login</Link>
              <Link href="/register" onClick={() => setMobileMenuOpen(false)} className={cn(buttonVariants({ className: "rounded-2xl h-14 font-black text-lg" }))}>
                Sign Up Now
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
