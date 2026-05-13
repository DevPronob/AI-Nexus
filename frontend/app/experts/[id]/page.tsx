"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Button, buttonVariants } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Calendar, Clock, MessageSquare, Shield, CheckCircle2, ArrowLeft, Loader2, Share2, Heart, Award, Briefcase } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const API_URL = "http://localhost:5000/api";

export default function ExpertDetailPage() {
  const { id } = useParams();

  const { data: expert, isLoading } = useQuery({
    queryKey: ['expert', id],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/experts/${id}`);
      return res.data;
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  if (!expert) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20">
        <h2 className="text-3xl font-bold mb-6">Expert not found</h2>
        <Link href="/explore">
          <Button variant="outline" className="rounded-2xl px-8 h-12">Back to Explore Network</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] -z-10 -translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-12">
          <Link href="/explore" className="inline-flex items-center text-muted-foreground hover:text-primary font-bold transition-all group">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mr-3 group-hover:bg-primary group-hover:text-white transition-all">
              <ArrowLeft size={16} />
            </div>
            Back to Network
          </Link>
          <div className="flex space-x-3">
            <button className="glass p-3 rounded-full hover:bg-white/10 transition-colors">
              <Share2 size={20} />
            </button>
            <button className="glass p-3 rounded-full hover:bg-white/10 transition-colors text-pink-500">
              <Heart size={20} />
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-12">
            <section className="flex flex-col md:flex-row gap-10 items-start md:items-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                className="w-56 h-56 rounded-[3.5rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border-4 border-white/20 relative group"
              >
                <img src={expert.image} alt={expert.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-[3.5rem]" />
              </motion.div>
              
              <div className="flex-grow space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge className="bg-primary px-4 py-1.5 rounded-full text-xs font-bold border-none shadow-lg shadow-primary/20">
                    {expert.category}
                  </Badge>
                  <div className="flex items-center space-x-1.5 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 px-3 py-1.5 rounded-full border border-yellow-500/20">
                    <Star size={16} className="fill-current" />
                    <span className="font-black text-sm">{expert.rating}</span>
                    <span className="text-xs font-medium opacity-60">(120+ Reviews)</span>
                  </div>
                </div>
                
                <h1 className="text-5xl md:text-6xl font-black tracking-tight">{expert.name}</h1>
                <p className="text-2xl text-primary font-bold">{expert.title}</p>
                
                <div className="flex flex-wrap items-center gap-6 pt-2">
                  <div className="flex items-center text-muted-foreground font-medium">
                    <MapPin size={18} className="mr-2 text-primary" />
                    <span>{expert.location}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground font-medium">
                    <Award size={18} className="mr-2 text-secondary" />
                    <span>Industry Pioneer</span>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-6 glass p-10 rounded-[3rem] border-white/5">
              <div className="flex items-center space-x-3 mb-2">
                <Briefcase className="text-primary" size={24} />
                <h2 className="text-3xl font-bold">Expert Profile</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {expert.bio || "Transforming businesses through strategic AI integration and data-driven insights. With a decade of experience across Fortune 500 companies and high-growth startups, I provide the roadmap you need to lead in your industry. My mission is to bridge the gap between complex technology and sustainable business growth."}
              </p>
            </section>

            <section className="grid sm:grid-cols-3 gap-6">
              {[
                { icon: Clock, label: 'Response Time', val: 'Fast (1-2h)', color: 'text-primary', bg: 'bg-primary/10' },
                { icon: Calendar, label: 'Booking', val: 'Instant Confirm', color: 'text-secondary', bg: 'bg-secondary/10' },
                { icon: Shield, label: 'Quality', val: 'Elite Trusted', color: 'text-accent', bg: 'bg-accent/10' },
              ].map((item, i) => (
                <div key={i} className="glass p-8 rounded-[2.5rem] text-center group hover:bg-white/5 transition-all">
                  <div className={`w-14 h-14 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-5 transform group-hover:scale-110 group-hover:rotate-6 transition-transform`}>
                    <item.icon size={28} />
                  </div>
                  <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest mb-1">{item.label}</p>
                  <p className="text-lg font-black">{item.val}</p>
                </div>
              ))}
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold px-2">Core Competencies</h2>
              <div className="flex flex-wrap gap-4">
                {(expert.skills || ["Advanced AI Strategy", "Full-stack Engineering", "Product Design", "Cloud Infrastructure", "Startup Scaling", "Data Architecture"]).map((skill: string) => (
                  <Badge key={skill} variant="outline" className="px-6 py-3 rounded-2xl glass border-white/10 hover:border-primary/50 hover:bg-primary/5 transition-all text-sm font-bold">
                    {skill}
                  </Badge>
                ))}
              </div>
            </section>
          </div>

          {/* Booking Column */}
          <div className="lg:col-span-4">
            <div className="glass p-10 rounded-[3.5rem] sticky top-32 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)] border-white/20 relative overflow-hidden group">
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative z-10">
                <div className="flex justify-between items-end mb-10">
                  <div>
                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest mb-2">Hourly Investment</p>
                    <div className="flex items-baseline">
                      <span className="text-5xl font-black tracking-tighter">${expert.price}</span>
                      <span className="text-lg font-medium text-muted-foreground ml-2">/hr</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-5 mb-10">
                  {[
                    "15-minute Strategy Intro (Free)",
                    "Customized growth roadmap",
                    "Recording of all sessions",
                    "Follow-up resource pack",
                    "Direct priority email access"
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center space-x-3 text-sm font-medium">
                      <div className="w-5 h-5 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 size={12} strokeWidth={3} />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <Button className="w-full h-16 rounded-[1.25rem] text-xl font-black shadow-[0_15px_30px_-5px_rgba(var(--primary),0.3)] bg-gradient-to-r from-primary to-primary/80 hover:translate-y-[-2px] active:translate-y-[1px] transition-all">
                    Secure Session
                  </Button>
                  <Button variant="outline" className="w-full h-16 rounded-[1.25rem] font-bold glass border-white/10 hover:bg-white/5 transition-all">
                    <MessageSquare className="mr-3" /> Start Discussion
                  </Button>
                </div>

                <div className="mt-8 pt-8 border-t border-white/5 text-center">
                  <div className="flex items-center justify-center space-x-2 text-muted-foreground mb-1">
                    <Shield size={14} className="text-green-500" />
                    <p className="text-[10px] font-bold uppercase tracking-widest">Safe & Secured Booking</p>
                  </div>
                  <p className="text-[10px] text-muted-foreground/60">Powered by AI Nexus Protection Plan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
