"use client";

import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Star, MapPin, ArrowUpRight, Zap } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ExpertCardProps {
  id: string;
  name: string;
  title: string;
  category: string;
  price: number;
  rating: number;
  location: string;
  image: string;
}

const ExpertCard = ({ id, name, title, category, price, rating, location, image }: ExpertCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="overflow-hidden group h-full flex flex-col hover:shadow-[0_20px_50px_rgba(var(--primary),0.15)] transition-all duration-500 rounded-[2.5rem] border-white/10 glass relative">
        <div className="relative h-64 overflow-hidden">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="absolute top-4 left-4 flex flex-col space-y-2">
            <Badge className="bg-white/90 dark:bg-black/80 backdrop-blur-md text-foreground border-none font-bold px-3 py-1 text-xs">
              {category}
            </Badge>
            <div className="flex items-center space-x-2 bg-green-500/90 backdrop-blur-md text-white rounded-full px-3 py-1 text-[10px] font-bold w-fit animate-pulse">
              <span className="w-1.5 h-1.5 bg-white rounded-full" />
              <span>LIVE NOW</span>
            </div>
          </div>
          
          <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-md text-white rounded-2xl px-3 py-1.5 flex items-center space-x-1 shadow-lg transform translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
            <Star className="w-4 h-4 fill-white" />
            <span className="text-xs font-bold">{rating}</span>
          </div>
        </div>
        
        <CardContent className="p-7 flex-grow">
          <div className="mb-4">
            <h3 className="text-2xl font-bold line-clamp-1 mb-1 group-hover:text-primary transition-colors">{name}</h3>
            <p className="text-sm font-semibold text-primary/80">{title}</p>
          </div>
          
          <div className="flex items-center space-x-4 mb-2">
            <div className="flex items-center text-muted-foreground text-xs font-medium">
              <MapPin size={14} className="mr-1 text-primary" />
              <span>{location}</span>
            </div>
            <div className="flex items-center text-muted-foreground text-xs font-medium">
              <Zap size={14} className="mr-1 text-secondary" />
              <span>Top 1% Expert</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-7 pt-0 flex items-center justify-between border-t border-white/5 mt-auto">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1">Session Rate</p>
            <p className="text-2xl font-black">${price}<span className="text-xs font-medium text-muted-foreground ml-1">/hr</span></p>
          </div>
          <Link 
            href={`/experts/${id}`}
            className={cn(buttonVariants({ 
              className: "rounded-2xl h-12 px-6 group/btn bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20" 
            }))}
          >
            <span className="font-bold">Book</span>
            <ArrowUpRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ExpertCard;
