"use client";

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/button';
import { 
  Users, 
  UserCheck, 
  BarChart3, 
  TrendingUp, 
  Search, 
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight,
  Loader2
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const API_URL = "http://localhost:5000/api";

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 900 },
];

export default function AdminDashboard() {
  const { data: experts, isLoading } = useQuery({
    queryKey: ['admin-experts'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/experts`);
      return res.data;
    }
  });

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your platform and track performance.</p>
        </div>
        <div className="flex space-x-3">
          <button className="glass px-4 py-2 rounded-xl text-sm font-medium hover:bg-white/10 transition-colors flex items-center">
            <Search className="mr-2 w-4 h-4" /> Search
          </button>
          <button className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-medium shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity">
            Export Data
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Experts', value: experts?.length || 0, icon: UserCheck, color: 'text-primary', bg: 'bg-primary/10', trend: '+12%', up: true },
          { label: 'Active Bookings', value: '1,284', icon: TrendingUp, color: 'text-secondary', bg: 'bg-secondary/10', trend: '+18%', up: true },
          { label: 'Revenue', value: '$48,290', icon: BarChart3, color: 'text-accent', bg: 'bg-accent/10', trend: '-2.4%', up: false },
          { label: 'Total Users', value: '12,402', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10', trend: '+5%', up: true },
        ].map((stat, i) => (
          <div key={i} className="glass p-6 rounded-3xl relative overflow-hidden">
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-4`}>
              <stat.icon size={24} />
            </div>
            <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
            <div className="flex items-end justify-between">
              <h3 className="text-2xl font-bold">{stat.value}</h3>
              <span className={`text-xs font-bold px-2 py-1 rounded-full flex items-center ${stat.up ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                {stat.up ? <ArrowUpRight size={12} className="mr-1" /> : <ArrowDownRight size={12} className="mr-1" />}
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Chart */}
        <div className="lg:col-span-2 glass p-8 rounded-[3rem]">
          <h3 className="text-xl font-bold mb-8">Revenue Overview</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderRadius: '12px', border: 'none', color: '#fff' }}
                  itemStyle={{ color: 'hsl(var(--primary))' }}
                />
                <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Experts */}
        <div className="glass p-8 rounded-[3rem]">
          <h3 className="text-xl font-bold mb-8">Recent Experts</h3>
          <div className="space-y-6">
            {experts?.slice(0, 5).map((expert: any) => (
              <div key={expert._id} className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10">
                    <img src={expert.image} alt={expert.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-bold group-hover:text-primary transition-colors">{expert.name}</p>
                    <p className="text-xs text-muted-foreground">{expert.category}</p>
                  </div>
                </div>
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <MoreVertical size={16} />
                </button>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 text-sm font-bold text-primary hover:underline">
            View All Experts
          </button>
        </div>
      </div>
    </div>
  );
}
