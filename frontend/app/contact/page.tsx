"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20">
          <div className="space-y-12">
            <div>
              <h1 className="text-6xl font-bold mb-6">Let's <span className="gradient-text">Connect</span></h1>
              <p className="text-xl text-muted-foreground">
                Have questions about our platform or want to join as an expert? We're here to help.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center text-primary shadow-xl">
                  <Mail size={28} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground uppercase font-bold">Email Us</p>
                  <p className="text-xl font-bold">support@ainexus.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center text-secondary shadow-xl">
                  <Phone size={28} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground uppercase font-bold">Call Us</p>
                  <p className="text-xl font-bold">+1 (555) 000-1234</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center text-accent shadow-xl">
                  <MapPin size={28} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground uppercase font-bold">Visit Us</p>
                  <p className="text-xl font-bold">123 Innovation Way, San Francisco</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass p-12 rounded-[3.5rem] border-white/10 shadow-2xl">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium ml-1">Full Name</label>
                  <Input placeholder="John Doe" className="h-14 rounded-2xl glass" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium ml-1">Email</label>
                  <Input type="email" placeholder="john@example.com" className="h-14 rounded-2xl glass" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium ml-1">Subject</label>
                <Input placeholder="How can we help?" className="h-14 rounded-2xl glass" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium ml-1">Message</label>
                <textarea 
                  className="w-full min-h-[150px] p-6 rounded-3xl glass border border-input focus:ring-2 focus:ring-primary outline-none transition-all"
                  placeholder="Tell us more about your inquiry..."
                ></textarea>
              </div>
              <Button className="w-full h-14 rounded-2xl text-lg font-bold">
                Send Message <Send className="ml-2 w-5 h-5" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
