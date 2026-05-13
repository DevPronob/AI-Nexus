"use client";

import React from 'react';
import { useAuthStore } from '@/lib/authStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  Briefcase, 
  Star, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 900 },
];

export default function DashboardPage() {
  const { user } = useAuthStore();

  const stats = [
    { title: 'Total Bookings', value: '128', icon: Briefcase, trend: '+12%', up: true },
    { title: 'Consultation Hours', value: '342', icon: TrendingUp, trend: '+5%', up: true },
    { title: 'Average Rating', value: '4.9', icon: Star, trend: '0%', up: true },
    { title: 'New Leads', value: '45', icon: Users, trend: '-2%', up: false },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {user?.name}</h1>
        <p className="text-muted-foreground">Here's what's happening with your account today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="glass border-white/10 rounded-3xl overflow-hidden group">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-primary/10 rounded-2xl text-primary group-hover:scale-110 transition-transform">
                  <stat.icon size={24} />
                </div>
                <div className={`flex items-center text-xs font-bold ${stat.up ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.up ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
                  {stat.trend}
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
              <h3 className="text-3xl font-bold">{stat.value}</h3>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="glass border-white/10 rounded-[2.5rem] p-6">
          <CardHeader className="px-0">
            <CardTitle className="text-xl">Platform Growth</CardTitle>
          </CardHeader>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="glass border-white/10 rounded-[2.5rem] p-6">
          <CardHeader className="px-0">
            <CardTitle className="text-xl">User Engagement</CardTitle>
          </CardHeader>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Line type="monotone" dataKey="value" stroke="hsl(var(--secondary))" strokeWidth={4} dot={{r: 6, fill: 'hsl(var(--secondary))'}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Data Table Section */}
      <Card className="glass border-white/10 rounded-[2.5rem] overflow-hidden">
        <CardHeader className="p-8 border-b border-white/10">
          <CardTitle className="text-xl">Recent Activity</CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-muted-foreground text-sm border-b border-white/5">
                <th className="px-8 py-4 font-medium">Expert</th>
                <th className="px-8 py-4 font-medium">Date</th>
                <th className="px-8 py-4 font-medium">Status</th>
                <th className="px-8 py-4 font-medium text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                { name: 'Dr. Sarah Johnson', date: 'May 12, 2026', status: 'Completed', amount: '$150.00' },
                { name: 'Marcus Chen', date: 'May 10, 2026', status: 'Pending', amount: '$120.00' },
                { name: 'Elena Rodriguez', date: 'May 08, 2026', status: 'Completed', amount: '$90.00' },
                { name: 'David Smith', date: 'May 05, 2026', status: 'Cancelled', amount: '$200.00' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors">
                  <td className="px-8 py-4 font-medium">{row.name}</td>
                  <td className="px-8 py-4 text-muted-foreground">{row.date}</td>
                  <td className="px-8 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      row.status === 'Completed' ? 'bg-green-500/10 text-green-500' :
                      row.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500' :
                      'bg-red-500/10 text-red-500'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-8 py-4 text-right font-bold">{row.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
