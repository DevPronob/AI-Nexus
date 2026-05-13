"use client";

import Hero from "@/components/sections/Hero";
import { Features, Stats } from "@/components/sections/HomeSections";
import ExpertCard from "@/components/ui/ExpertCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

const API_URL = "http://localhost:5000/api";

export default function Home() {
  const { data: experts, isLoading } = useQuery({
    queryKey: ["featured-experts"],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/experts`);
      return res.data.slice(0, 4); // Show only 4 on home
    }
  });

  return (
    <div className="space-y-0">
      <Hero />
      
      <Stats />

      {/* Featured Experts Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-4">Top <span className="gradient-text">Experts</span></h2>
              <p className="text-muted-foreground">The most highly-rated consultants on our platform.</p>
            </div>
            <Link href="/explore" className="text-primary font-semibold flex items-center hover:underline">
              View All <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {isLoading ? (
              [1, 2, 3, 4].map((i) => (
                <div key={i} className="h-[400px] rounded-3xl bg-muted animate-pulse" />
              ))
            ) : (
              experts?.map((expert: any) => (
                <motion.div
                  key={expert._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <ExpertCard 
                    id={expert._id}
                    name={expert.name}
                    title={expert.title}
                    category={expert.category}
                    price={expert.price}
                    rating={expert.rating}
                    location={expert.location}
                    image={expert.image}
                  />
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      <Features />

      {/* Categories Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-16">Browse by <span className="gradient-text">Category</span></h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["AI & ML", "Software", "Business", "Marketing"].map((cat) => (
              <div key={cat} className="glass p-8 rounded-3xl hover:bg-primary hover:text-white transition-all cursor-pointer group">
                <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/20">
                  <Sparkles size={24} />
                </div>
                <h3 className="font-bold">{cat}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-primary to-secondary p-12 md:p-20 rounded-[3rem] text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to transform your vision?</h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Join thousands of professionals already scaling their impact with AI Nexus.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link href="/register" className="bg-white text-primary px-10 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors">
                Get Started Now
              </Link>
              <Link href="/contact" className="border-2 border-white/30 text-white px-10 py-4 rounded-full font-bold hover:bg-white/10 transition-colors">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
