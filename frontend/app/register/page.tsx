"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sparkles, Mail, ArrowRight, Loader2, Layout, User, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mock registration
    setTimeout(() => {
      setLoading(false);
      router.push('/login');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden relative">
      {/* Abstract Background */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
        <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="glass p-10 rounded-[3rem] shadow-2xl border-white/10">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-secondary/20">
              <Sparkles className="text-white w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Create Account</h1>
            <p className="text-muted-foreground">Join the AI Nexus community today</p>
          </div>

          <form className="space-y-5" onSubmit={handleRegister}>
            <div className="space-y-2">
              <label className="text-sm font-medium ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input type="text" placeholder="John Doe" className="h-12 pl-11 rounded-xl glass" required />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input type="email" placeholder="name@example.com" className="h-12 pl-11 rounded-xl glass" required />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input type="password" placeholder="••••••••" className="h-12 pl-11 rounded-xl glass" required />
              </div>
            </div>

            <div className="flex items-center space-x-2 ml-1 pb-2">
              <input type="checkbox" id="terms" className="rounded border-white/20 bg-white/10" required />
              <label htmlFor="terms" className="text-xs text-muted-foreground">
                I agree to the <Link href="#" className="text-primary hover:underline">Terms</Link> and <Link href="#" className="text-primary hover:underline">Privacy Policy</Link>
              </label>
            </div>

            <Button className="w-full h-12 rounded-xl text-lg font-bold bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : 'Create Account'}
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/10" /></div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-transparent px-2 text-muted-foreground">Or register with</span>
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

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account? <Link href="/login" className="text-primary font-bold hover:underline">Sign In</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
