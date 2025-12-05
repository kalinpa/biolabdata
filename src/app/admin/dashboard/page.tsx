'use client';

import { useEffect, useState } from 'react';
import { MessageSquare, FileText, TrendingUp, Clock } from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';

interface Stats {
  totalInquiries: number;
  newInquiries: number;
  totalPosts: number;
  recentInquiries: any[];
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    totalInquiries: 0,
    newInquiries: 0,
    totalPosts: 0,
    recentInquiries: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/stats');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      label: 'Общо запитвания',
      value: stats.totalInquiries,
      icon: MessageSquare,
      color: 'bg-primary-50 text-primary-600',
    },
    {
      label: 'Нови запитвания',
      value: stats.newInquiries,
      icon: TrendingUp,
      color: 'bg-accent-50 text-accent-600',
    },
    {
      label: 'Публикации',
      value: stats.totalPosts,
      icon: FileText,
      color: 'bg-amber-50 text-amber-600',
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-100">
      <AdminSidebar />
      
      <main className="lg:ml-64 p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-neutral-900">Dashboard</h1>
          <p className="text-neutral-600">Преглед на активността</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <div key={index} className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
              <p className="text-3xl font-bold text-neutral-900 mb-1">
                {loading ? '...' : stat.value}
              </p>
              <p className="text-sm text-neutral-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Recent Inquiries */}
        <div className="card">
          <div className="p-6 border-b border-neutral-100">
            <h2 className="text-lg font-semibold text-neutral-900">Последни запитвания</h2>
          </div>
          <div className="divide-y divide-neutral-100">
            {loading ? (
              <div className="p-6 text-center text-neutral-500">Зареждане...</div>
            ) : stats.recentInquiries.length > 0 ? (
              stats.recentInquiries.map((inquiry: any) => (
                <div key={inquiry.id} className="p-6 hover:bg-neutral-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-neutral-900">{inquiry.name}</p>
                      <p className="text-sm text-neutral-600">{inquiry.email}</p>
                      <p className="text-sm text-neutral-500 mt-1 line-clamp-1">
                        {inquiry.message}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-neutral-500">
                      <Clock className="w-4 h-4" />
                      {new Date(inquiry.createdAt).toLocaleDateString('bg-BG')}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-neutral-500">
                Няма запитвания
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
