'use client';

import React, { useState } from 'react';

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      service: 'Dental Checkup',
      date: '2026-02-15',
      time: '09:00 AM',
      status: 'confirmed',
      phone: '+1 (555) 123-4567'
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'mchen@email.com',
      service: 'Consultation',
      date: '2026-02-15',
      time: '10:30 AM',
      status: 'pending',
      phone: '+1 (555) 234-5678'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      email: 'emily.r@email.com',
      service: 'Follow-up',
      date: '2026-02-16',
      time: '02:00 PM',
      status: 'confirmed',
      phone: '+1 (555) 345-6789'
    },
    {
      id: 4,
      name: 'James Wilson',
      email: 'j.wilson@email.com',
      service: 'Physical Therapy',
      date: '2026-02-16',
      time: '11:00 AM',
      status: 'cancelled',
      phone: '+1 (555) 456-7890'
    },
    {
      id: 5,
      name: 'Aisha Patel',
      email: 'aisha.p@email.com',
      service: 'Annual Checkup',
      date: '2026-02-17',
      time: '03:30 PM',
      status: 'confirmed',
      phone: '+1 (555) 567-8901'
    },
    {
      id: 6,
      name: 'David Kim',
      email: 'dkim@email.com',
      service: 'X-Ray',
      date: '2026-02-18',
      time: '01:00 PM',
      status: 'pending',
      phone: '+1 (555) 678-9012'
    }
  ]);

  const [filter, setFilter] = useState('all');

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'pending':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'cancelled':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredAppointments = appointments.filter(apt => 
    filter === 'all' ? true : apt.status === filter
  );

  const stats = {
    total: appointments.length,
    confirmed: appointments.filter(a => a.status === 'confirmed').length,
    pending: appointments.filter(a => a.status === 'pending').length,
    cancelled: appointments.filter(a => a.status === 'cancelled').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
                Appointments Dashboard
              </h1>
              <p className="text-slate-600 mt-1">Manage and track all appointments</p>
            </div>
            <button className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
              + New Appointment
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Total</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-emerald-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-700 text-sm font-medium">Confirmed</p>
                <p className="text-3xl font-bold text-emerald-600 mt-1">{stats.confirmed}</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-amber-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-700 text-sm font-medium">Pending</p>
                <p className="text-3xl font-bold text-amber-600 mt-1">{stats.pending}</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-rose-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-rose-700 text-sm font-medium">Cancelled</p>
                <p className="text-3xl font-bold text-rose-600 mt-1">{stats.cancelled}</p>
              </div>
              <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-rose-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-5 mb-6 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="text-slate-700 font-medium">Filter:</span>
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === 'all'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('confirmed')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === 'confirmed'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
              }`}
            >
              Confirmed
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === 'pending'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter('cancelled')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === 'cancelled'
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'bg-rose-100 text-rose-700 hover:bg-rose-200'
              }`}
            >
              Cancelled
            </button>
          </div>
        </div>

        {/* Appointments List */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Patient</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Contact</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Service</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Date & Time</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Status</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredAppointments.map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {appointment.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{appointment.name}</p>
                          <p className="text-sm text-slate-500">ID: #{appointment.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-slate-700">{appointment.email}</p>
                        <p className="text-sm text-slate-500">{appointment.phone}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {appointment.service}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-slate-900">{appointment.date}</p>
                        <p className="text-sm text-slate-500">{appointment.time}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(appointment.status)}`}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors group" title="View">
                          <svg className="w-5 h-5 text-slate-600 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button className="p-2 hover:bg-emerald-50 rounded-lg transition-colors group" title="Edit">
                          <svg className="w-5 h-5 text-slate-600 group-hover:text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button className="p-2 hover:bg-rose-50 rounded-lg transition-colors group" title="Delete">
                          <svg className="w-5 h-5 text-slate-600 group-hover:text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}