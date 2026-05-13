"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/authStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sparkles, Mail, ArrowRight, Loader2, Layout, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [loading, setLoading] = useState(false);

  const handleDemoLogin = (role: 'user' | 'admin') => {
    setLoading(true);
    setTimeout(() => {
      setAuth(
        { 
          id: '1', 
          name: role === 'admin' ? 'Admin User' : 'Standard User', 
          email: `${role}@demo.com`, 
          role: role 
        },
        'mock-token'
      );
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden relative">
      {/* Abstract Background */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="glass p-10 rounded-[3rem] shadow-2xl border-white/10">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-primary/20">
              <Sparkles className="text-white w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to your AI Nexus account</p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-sm font-medium ml-1">Email Address</label>
              <Input type="email" placeholder="name@example.com" className="h-12 rounded-xl glass" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-medium">Password</label>
                <Link href="#" className="text-xs text-primary hover:underline">Forgot password?</Link>
              </div>
              <Input type="password" placeholder="••••••••" className="h-12 rounded-xl glass" />
            </div>

            <Button className="w-full h-12 rounded-xl text-lg font-bold" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : 'Sign In'}
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/10" /></div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-transparent px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-12 rounded-xl glass font-medium">
              <Layout className="mr-2 w-5 h-5" /> GitHub
            </Button>
            <Button variant="outline" className="h-12 rounded-xl glass font-medium">
              <Mail className="mr-2 w-5 h-5" /> Google
            </Button>
          </div>

          <div className="mt-8 space-y-3">
            <p className="text-xs text-center text-muted-foreground uppercase font-bold tracking-widest">Demo Credentials</p>
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="secondary" 
                className="rounded-xl h-10 text-xs" 
                onClick={() => handleDemoLogin('user')}
                disabled={loading}
              >
                Login as User
              </Button>
              <Button 
                variant="secondary" 
                className="rounded-xl h-10 text-xs" 
                onClick={() => handleDemoLogin('admin')}
                disabled={loading}
              >
                Login as Admin
              </Button>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Don't have an account? <Link href="/register" className="text-primary font-bold hover:underline">Register now</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
