"use client";

import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import ExpertCard from '@/components/ui/ExpertCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, SlidersHorizontal, Loader2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const API_URL = "http://localhost:5000/api";

export default function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data: experts, isLoading } = useQuery({
    queryKey: ['experts', debouncedSearch, category, sortBy],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/experts`, {
        params: {
          search: debouncedSearch,
          category: category === 'All' ? '' : category,
          sortBy: sortBy
        }
      });
      return res.data;
    }
  });

  const categories = ['All', 'AI & Machine Learning', 'Software Development', 'Marketing', 'Business'];

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-2">Explore <span className="gradient-text">Experts</span></h1>
            <p className="text-muted-foreground">Discover and connect with top consultants worldwide.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative group w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 group-focus-within:text-primary transition-colors" />
              <Input 
                placeholder="Search by name, title or skills..." 
                className="pl-10 rounded-full glass focus:ring-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger className={cn(buttonVariants({ variant: "outline", className: "rounded-full glass" }))}>
                  <Filter className="mr-2 w-4 h-4" /> {category || 'Category'}
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="glass">
                  {categories.map((cat) => (
                    <DropdownMenuItem key={cat} onClick={() => setCategory(cat)}>
                      {cat}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger className={cn(buttonVariants({ variant: "outline", className: "rounded-full glass" }))}>
                  <SlidersHorizontal className="mr-2 w-4 h-4" /> Sort
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="glass">
                  <DropdownMenuItem onClick={() => setSortBy('newest')}>Newest First</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy('price_asc')}>Price: Low to High</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy('price_desc')}>Price: High to Low</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy('rating')}>Top Rated</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
            <p className="text-muted-foreground">Searching our expert network...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {experts?.length > 0 ? (
              experts.map((expert: any) => (
                <ExpertCard 
                  key={expert._id}
                  id={expert._id}
                  name={expert.name}
                  title={expert.title}
                  category={expert.category}
                  price={expert.price}
                  rating={expert.rating}
                  location={expert.location}
                  image={expert.image}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-24 glass rounded-[3rem]">
                <h3 className="text-2xl font-bold mb-2">No experts found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters.</p>
                <Button variant="link" onClick={() => { setSearchTerm(''); setCategory(''); }} className="mt-4">
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
