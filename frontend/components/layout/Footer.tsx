import React from 'react';
import Link from 'next/link';
import { Sparkles, Send, ExternalLink, Globe, Mail, Phone, MapPin, Layout } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t pt-16 pb-8">
      <div className="container mx-auto px-6 grid md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-1">
          <Link href="/" className="flex items-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Sparkles className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold gradient-text">AI Nexus</span>
          </Link>
          <p className="text-muted-foreground mb-6">
            Empowering the next generation of professionals with AI-driven consultancy and world-class expert advice.
          </p>
          <div className="flex space-x-4">
            <Link href="#" className="p-2 bg-background rounded-full hover:bg-primary hover:text-white transition-all">
              <Send size={18} />
            </Link>
            <Link href="#" className="p-2 bg-background rounded-full hover:bg-primary hover:text-white transition-all">
              <Layout size={18} />
            </Link>
            <Link href="#" className="p-2 bg-background rounded-full hover:bg-primary hover:text-white transition-all">
              <ExternalLink size={18} />
            </Link>
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-6">Platform</h4>
          <ul className="space-y-4 text-muted-foreground">
            <li><Link href="/explore" className="hover:text-primary transition-colors">Find Experts</Link></li>
            <li><Link href="/ai-tools" className="hover:text-primary transition-colors">AI Tools</Link></li>
            <li><Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link></li>
            <li><Link href="/blog" className="hover:text-primary transition-colors">Success Stories</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6">Company</h4>
          <ul className="space-y-4 text-muted-foreground">
            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link href="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
            <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6">Contact</h4>
          <ul className="space-y-4 text-muted-foreground">
            <li className="flex items-center space-x-3">
              <Mail size={18} className="text-primary" />
              <span>hello@ainexus.com</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone size={18} className="text-primary" />
              <span>+1 (555) 000-1234</span>
            </li>
            <li className="flex items-center space-x-3">
              <MapPin size={18} className="text-primary" />
              <span>123 Innovation Way, SF</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="container mx-auto px-6 pt-8 border-t text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} AI Nexus Platform. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
