// components/AdminDashboard.jsx
'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {

      const res = await axios.get('http://localhost:4000/api/admin/dashboard', {
      withCredentials: true,
      });

      setDashboard(res.data.dashboard);
      setError(null);
    } catch (error) {
      console.error('Dashboard fetch error:', error.response?.data);

      if (error.response?.status === 403) {
        // Unauthorized - not CEO/HR
        setError('Access Denied: You do not have admin privileges');
        setTimeout(() => {
          localStorage.removeItem('employee');
          router.push('/login');
        }, 2000);
      } else if (error.response?.status === 401) {
        // Invalid token
        localStorage.removeItem('employee');
        router.push('/login');
      } else {
        setError('Failed to load dashboard');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.put(`http://localhost:4000/api/admin/appointments/${id}/approve`, {}, {
        withCredentials: true,
      });
      fetchDashboard();
      alert('✅ Appointment approved successfully!');
    } catch (error) {
      if (error.response?.status === 403) {
        alert('❌ Access denied: Admin privileges required');
      } else {
        alert('❌ Error approving appointment');
      }
    }
  };

  const handleDecline = async (id) => {
    try {
  
      await axios.put(`http://localhost:4000/api/admin/appointments/${id}/decline`, {}, {
        withCredentials: true,
      });
      fetchDashboard();
      alert('❌ Appointment declined!');
    } catch (error) {
      if (error.response?.status === 403) {
        alert('❌ Access denied: Admin privileges required');
      } else {
        alert('❌ Error declining appointment');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('employee');
    router.push('/login');
  };

  // Error screen for unauthorized access
  if (error && error.includes('Access Denied')) {
    return (
      <div className="min-h-screen bg-linear-to-br from-red-50 to-gray-100 flex items-center justify-center">
        <div className="text-center bg-white p-12 rounded-3xl shadow-2xl max-w-md">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🚫</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">
            You do not have admin privileges to access this dashboard.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Redirecting to login...
          </p>
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mb-4"></div>
          <p className="text-xl text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Rest of your component code remains the same...
  const filteredAppointments = dashboard?.appointments.filter(appt => {
    const matchesStatus = filterStatus === 'all' || appt.status === filterStatus;
    const matchesSearch = appt.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appt.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appt.phone1.includes(searchQuery);
    return matchesStatus && matchesSearch;
  }) || [];

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Welcome back, {dashboard?.role.toUpperCase()} • {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="px-6 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-100 hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Pending</p>
                <h3 className="text-3xl font-bold text-blue-600">{dashboard?.stats.pending || 0}</h3>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">⏳</span>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-blue-600">
              <span className="font-medium">Awaiting review</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-green-100 hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Approved</p>
                <h3 className="text-3xl font-bold text-green-600">{dashboard?.stats.approved || 0}</h3>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">✅</span>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <span className="font-medium">Confirmed bookings</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-red-100 hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Declined</p>
                <h3 className="text-3xl font-bold text-red-600">{dashboard?.stats.declined || 0}</h3>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">❌</span>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-red-600">
              <span className="font-medium">Rejected requests</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-indigo-100 hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total</p>
                <h3 className="text-3xl font-bold text-indigo-600">{dashboard?.stats.total || 0}</h3>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-indigo-600">
              <span className="font-medium">All appointments</span>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex gap-2 w-full md:w-auto">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-5 py-2.5 rounded-xl cursor-pointer font-medium transition-all duration-200 ${filterStatus === 'all'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                All ({dashboard?.stats.total || 0})
              </button>
              <button
                onClick={() => setFilterStatus('pending')}
                className={`px-5 py-2.5 rounded-xl cursor-pointer font-medium transition-all duration-200 ${filterStatus === 'pending'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                Pending ({dashboard?.stats.pending || 0})
              </button>
              <button
                onClick={() => setFilterStatus('approved')}
                className={`px-5 py-2.5 rounded-xl cursor-pointer font-medium transition-all duration-200 ${filterStatus === 'approved'
                    ? 'bg-green-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                Approved ({dashboard?.stats.approved || 0})
              </button>
              <button
                onClick={() => setFilterStatus('declined')}
                className={`px-5 py-2.5 rounded-xl cursor-pointer font-medium transition-all duration-200 ${filterStatus === 'declined'
                    ? 'bg-red-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                Declined ({dashboard?.stats.declined || 0})
              </button>
            </div>
            {/*             
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 py-2.5 pl-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <span className="absolute left-4 top-3.5 text-gray-400 text-xl">🔍</span>
            </div> */}
          </div>
        </div>

        {/* Appointments Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-linear-to-r from-indigo-600 to-purple-600 text-white">
                <tr>
                  <th className="p-5 text-left font-semibold">Date & Time</th>
                  <th className="p-5 text-left font-semibold">Employee Details</th>
                  <th className="p-5 text-left font-semibold">Contact</th>
                  <th className="p-5 text-left font-semibold">People</th>
                  <th className="p-5 text-left font-semibold">Status</th>
                  <th className="p-5 text-center font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredAppointments.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-12 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-400">
                        <span className="text-6xl mb-4">📭</span>
                        <p className="text-xl font-medium text-gray-600">No appointments found</p>
                        <p className="text-sm text-gray-500 mt-2">Try adjusting your filters or search query</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredAppointments.map((appt) => (
                    <tr key={appt._id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                            <span className="text-xl">📅</span>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">
                              {new Date(appt.appointmentDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </div>
                            <div className="text-sm text-gray-600 font-medium">{appt.timeSlot}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-5">
                        <div className="font-semibold text-gray-900">{appt.name}</div>
                        <div className="text-sm text-gray-600">{appt.email}</div>
                      </td>
                      <td className="p-5">
                        <div className="font-medium text-gray-900">{appt.phone1}</div>
                        {appt.phone2 && (
                          <div className="text-sm text-gray-600">{appt.phone2}</div>
                        )}
                      </td>
                      <td className="p-5">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg">
                          <span className="text-lg">👥</span>
                          <span className="font-semibold text-gray-900">{appt.numberOfPeople}</span>
                        </div>
                      </td>
                      <td className="p-5">
                        <span className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold ${appt.status === 'pending' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                            appt.status === 'approved' ? 'bg-green-100 text-green-800 border border-green-200' :
                              'bg-red-100 text-red-800 border border-red-200'
                          }`}>
                          {appt.status === 'pending' && '⏳ '}
                          {appt.status === 'approved' && '✅ '}
                          {appt.status === 'declined' && '❌ '}
                          {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                        </span>
                      </td>
                      <td className="p-5">
                        {appt.status === 'pending' ? (
                          <div className="flex gap-2 justify-center">
                            <button
                              onClick={() => handleApprove(appt._id)}
                              className="px-5 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-200 text-sm font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                            >
                              ✅ Approve
                            </button>
                            <button
                              onClick={() => handleDecline(appt._id)}
                              className="px-5 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-200 text-sm font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                            >
                              ❌ Decline
                            </button>
                          </div>
                        ) : (
                          <div className="text-center text-gray-400 text-sm font-medium">
                            {appt.status === 'approved' ? '✓ Completed' : '✗ Rejected'}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="mt-6 bg-white p-4 rounded-2xl shadow-lg border border-gray-200">
          <p className="text-center text-sm text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredAppointments.length}</span> of <span className="font-semibold text-gray-900">{dashboard?.appointments.length || 0}</span> appointments
          </p>
        </div>
      </div>
    </div>
  );
} 