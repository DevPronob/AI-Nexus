"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Users, Globe, Zap } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h1 className="text-6xl font-bold mb-6">Our Mission to <span className="gradient-text">Empower</span></h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            AI Nexus is the world's first AI-integrated consultancy marketplace, bridging the gap between human intuition and artificial intelligence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop" 
              alt="Our Team" 
              className="rounded-[3rem] shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-6 glass p-8 rounded-3xl animate-float">
              <p className="text-4xl font-bold text-primary">100+</p>
              <p className="text-sm font-medium">Team Members</p>
            </div>
          </div>
          <div className="space-y-8">
            <h2 className="text-4xl font-bold">Bridging the Gap</h2>
            <p className="text-lg text-muted-foreground">
              Founded in 2024, we recognized that the future of work isn't just about AI replacing humans, but about AI enhancing human potential. Our platform provides the infrastructure for experts to scale their knowledge and for clients to find precision solutions.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <Users />
                </div>
                <h4 className="font-bold">Human Centric</h4>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary">
                  <Zap />
                </div>
                <h4 className="font-bold">AI Driven</h4>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center bg-muted/30 p-20 rounded-[4rem]">
          <h2 className="text-4xl font-bold mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { title: "Transparency", desc: "Open communication and honest data." },
              { title: "Innovation", desc: "Constantly pushing the boundaries of AI." },
              { title: "Impact", desc: "Creating real-world value for our clients." }
            ].map((value, i) => (
              <div key={i}>
                <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                <p className="text-muted-foreground">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
