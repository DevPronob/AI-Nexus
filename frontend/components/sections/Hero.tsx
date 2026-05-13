"use client";

import React from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Shield } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const Hero = () => {
  return (
    <section className="relative h-[70vh] flex items-center overflow-hidden pt-20">
      {/* Background blobs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] animate-pulse delay-700" />

      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
            <Sparkles size={16} />
            <span className="text-sm font-semibold">AI-Powered Consultancy Platform</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            Scale Your Future with <span className="gradient-text">AI Precision</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-lg">
            Connect with world-class experts and leverage cutting-edge AI tools to accelerate your growth and solve complex challenges.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              href="/explore" 
              className={cn(buttonVariants({ size: "lg", className: "rounded-full px-8 text-lg" }))}
            >
              Explore Experts <ArrowRight className="ml-2" />
            </Link>
            <Link 
              href="/about" 
              className={cn(buttonVariants({ size: "lg", variant: "outline", className: "rounded-full px-8 text-lg" }))}
            >
              How it Works
            </Link>
          </div>
          
          <div className="mt-12 flex items-center space-x-8 text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Zap size={20} className="text-secondary" />
              <span>Fast Results</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield size={20} className="text-accent" />
              <span>Secure Data</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative hidden md:block"
        >
          <div className="relative z-10 animate-float">
            <img 
              src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=600&auto=format&fit=crop" 
              alt="AI Hero" 
              className="rounded-3xl shadow-2xl border-4 border-white/10"
            />
            {/* Floating glass cards */}
            <div className="absolute -top-10 -right-10 glass p-6 rounded-2xl shadow-xl animate-float delay-1000">
              <p className="text-sm font-bold">AI Matched!</p>
              <div className="flex -space-x-2 mt-2">
                {[1,2,3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200" />
                ))}
              </div>
            </div>
            <div className="absolute -bottom-10 -left-10 glass p-6 rounded-2xl shadow-xl animate-float delay-500">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center text-white font-bold">98%</div>
                <div>
                  <p className="text-xs text-muted-foreground">Success Rate</p>
                  <p className="text-sm font-bold">Industry Leading</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
