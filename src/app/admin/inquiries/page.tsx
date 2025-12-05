'use client';

import { useEffect, useState } from 'react';
import { Mail, Phone, Building, Calendar, ChevronDown, Check, Clock, Archive } from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { cn } from '@/lib/utils';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  university: string | null;
  subject: string | null;
  serviceType: string | null;
  message: string;
  status: 'NEW' | 'IN_PROGRESS' | 'COMPLETED' | 'ARCHIVED';
  createdAt: string;
}

const statusColors = {
  NEW: 'bg-blue-100 text-blue-700',
  IN_PROGRESS: 'bg-amber-100 text-amber-700',
  COMPLETED: 'bg-green-100 text-green-700',
  ARCHIVED: 'bg-neutral-100 text-neutral-600',
};

const statusLabels = {
  NEW: 'Ново',
  IN_PROGRESS: 'В процес',
  COMPLETED: 'Завършено',
  ARCHIVED: 'Архивирано',
};

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const res = await fetch('/api/admin/inquiries');
      if (res.ok) {
        const data = await res.json();
        setInquiries(data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        fetchInquiries();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const selected = inquiries.find((i) => i.id === selectedId);

  return (
    <div className="min-h-screen bg-neutral-100">
      <AdminSidebar />

      <main className="lg:ml-64 p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-neutral-900">Запитвания</h1>
          <p className="text-neutral-600">Управление на запитванията от сайта</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* List */}
          <div className="card">
            <div className="p-4 border-b border-neutral-100">
              <p className="text-sm text-neutral-600">
                {inquiries.length} запитвания
              </p>
            </div>
            <div className="divide-y divide-neutral-100 max-h-[600px] overflow-y-auto">
              {loading ? (
                <div className="p-6 text-center text-neutral-500">Зареждане...</div>
              ) : inquiries.length > 0 ? (
                inquiries.map((inquiry) => (
                  <button
                    key={inquiry.id}
                    onClick={() => setSelectedId(inquiry.id)}
                    className={cn(
                      'w-full p-4 text-left hover:bg-neutral-50 transition-colors',
                      selectedId === inquiry.id && 'bg-primary-50'
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-medium text-neutral-900 truncate">
                          {inquiry.name}
                        </p>
                        <p className="text-sm text-neutral-600 truncate">
                          {inquiry.email}
                        </p>
                      </div>
                      <span
                        className={cn(
                          'px-2 py-1 text-xs font-medium rounded-full flex-shrink-0',
                          statusColors[inquiry.status]
                        )}
                      >
                        {statusLabels[inquiry.status]}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-500 mt-2 line-clamp-2">
                      {inquiry.message}
                    </p>
                    <p className="text-xs text-neutral-400 mt-2">
                      {new Date(inquiry.createdAt).toLocaleDateString('bg-BG')}
                    </p>
                  </button>
                ))
              ) : (
                <div className="p-6 text-center text-neutral-500">
                  Няма запитвания
                </div>
              )}
            </div>
          </div>

          {/* Detail */}
          <div className="card">
            {selected ? (
              <>
                <div className="p-6 border-b border-neutral-100">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-neutral-900">
                        {selected.name}
                      </h2>
                      <div className="flex items-center gap-4 mt-2 text-sm text-neutral-600">
                        <span className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          {selected.email}
                        </span>
                        {selected.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            {selected.phone}
                          </span>
                        )}
                      </div>
                    </div>
                    <span
                      className={cn(
                        'px-3 py-1 text-sm font-medium rounded-full',
                        statusColors[selected.status]
                      )}
                    >
                      {statusLabels[selected.status]}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  {selected.university && (
                    <div className="flex items-center gap-2 text-sm">
                      <Building className="w-4 h-4 text-neutral-400" />
                      <span className="text-neutral-600">{selected.university}</span>
                    </div>
                  )}
                  {selected.subject && (
                    <div>
                      <p className="text-sm font-medium text-neutral-700">Тема:</p>
                      <p className="text-neutral-600">{selected.subject}</p>
                    </div>
                  )}
                  {selected.serviceType && (
                    <div>
                      <p className="text-sm font-medium text-neutral-700">Услуга:</p>
                      <p className="text-neutral-600">{selected.serviceType}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-neutral-700 mb-2">Съобщение:</p>
                    <p className="text-neutral-600 whitespace-pre-wrap bg-neutral-50 p-4 rounded-xl">
                      {selected.message}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-neutral-100">
                    <p className="text-sm font-medium text-neutral-700 mb-3">
                      Промяна на статус:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(statusLabels).map(([key, label]) => (
                        <button
                          key={key}
                          onClick={() => updateStatus(selected.id, key)}
                          className={cn(
                            'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                            selected.status === key
                              ? 'bg-primary-600 text-white'
                              : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                          )}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="p-12 text-center text-neutral-500">
                Изберете запитване за преглед
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
