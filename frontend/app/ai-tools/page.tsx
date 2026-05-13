"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Copy, RefreshCw, Wand2, Loader2, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = "http://localhost:5000/api";

export default function AIToolsPage() {
  const [prompt, setPrompt] = useState('');
  const [type, setType] = useState('description');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/ai/generate`, { prompt, type });
      setResult(res.data.content);
    } catch (err) {
      console.error(err);
      setResult("Error generating content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
            <Sparkles size={16} />
            <span className="text-sm font-semibold">Powered by Nexus Intelligence</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">AI Content <span className="gradient-text">Generator</span></h1>
          <p className="text-muted-foreground text-lg">
            Create professional expert bios, service descriptions, and marketing copy in seconds.
          </p>
        </div>

        <Card className="glass border-white/10 rounded-[3rem] overflow-hidden p-8 mb-12">
          <div className="space-y-6">
            <div>
              <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3 block">What are you building?</label>
              <div className="flex flex-wrap gap-3">
                {['description', 'summary', 'headline', 'marketing'].map((t) => (
                  <Button 
                    key={t}
                    variant={type === t ? 'default' : 'outline'}
                    className={`rounded-xl capitalize ${type === t ? '' : 'glass'}`}
                    onClick={() => setType(t)}
                  >
                    {t}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground block">Enter Keywords or Context</label>
              <div className="flex gap-4">
                <Input 
                  placeholder="e.g. Expert in React and AI consultancy for startups..." 
                  className="h-14 rounded-2xl glass text-lg"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
                <Button 
                  className="h-14 w-14 rounded-2xl shrink-0"
                  onClick={handleGenerate}
                  disabled={loading || !prompt}
                >
                  {loading ? <Loader2 className="animate-spin" /> : <Wand2 />}
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="bg-primary/5 border-primary/20 rounded-[3rem] p-10 relative group">
                <div className="absolute top-6 right-6 flex gap-2">
                  <Button variant="ghost" size="icon" className="rounded-xl hover:bg-primary/10" onClick={copyToClipboard}>
                    {copied ? <Check className="text-green-500" /> : <Copy className="w-5 h-5" />}
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-xl hover:bg-primary/10" onClick={handleGenerate}>
                    <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                  </Button>
                </div>
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <Sparkles className="mr-2 text-primary" size={20} /> Generated Content
                </h3>
                <p className="text-xl text-foreground leading-relaxed italic">
                  "{result}"
                </p>
                <div className="mt-8 pt-8 border-t border-primary/10 flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Generated in 1.2s</span>
                  <Button variant="link" className="text-primary font-bold">Refine with AI →</Button>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
