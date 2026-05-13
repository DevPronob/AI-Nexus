"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Target, Users, BarChart, Globe } from 'lucide-react';

const features = [
  {
    title: "AI Matching",
    description: "Our proprietary algorithm finds the perfect expert for your specific needs.",
    icon: <Target className="text-primary" />,
    color: "bg-primary/10"
  },
  {
    title: "Instant Insights",
    description: "Get real-time feedback and data analysis on your business challenges.",
    icon: <Zap className="text-secondary" />,
    color: "bg-secondary/10"
  },
  {
    title: "Secure Network",
    description: "Encryption and privacy protocols ensure your sensitive data is always protected.",
    icon: <Shield className="text-accent" />,
    color: "bg-accent/10"
  }
];

export const Features = () => (
  <section className="py-24 bg-muted/30">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">Why Choose <span className="gradient-text">AI Nexus</span></h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We combine human expertise with artificial intelligence to deliver results that were previously impossible.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -10 }}
            className="p-8 rounded-3xl bg-background border hover:shadow-xl transition-all"
          >
            <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6`}>
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export const Stats = () => (
  <section className="py-20 bg-primary text-white">
    <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
      <div>
        <h3 className="text-4xl font-bold mb-2">50k+</h3>
        <p className="text-primary-foreground/80">Active Users</p>
      </div>
      <div>
        <h3 className="text-4xl font-bold mb-2">1.2k+</h3>
        <p className="text-primary-foreground/80">Expert Consultants</p>
      </div>
      <div>
        <h3 className="text-4xl font-bold mb-2">98%</h3>
        <p className="text-primary-foreground/80">Success Rate</p>
      </div>
      <div>
        <h3 className="text-4xl font-bold mb-2">24/7</h3>
        <p className="text-primary-foreground/80">AI Support</p>
      </div>
    </div>
  </section>
);
