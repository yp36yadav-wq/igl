


'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Fuel, Menu, X, ChevronLeft, ChevronRight, Calendar as CalendarIcon,
    Clock, Check, User, Mail, Phone, Plus, Sparkles, Users
} from 'lucide-react';

import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';

// ✅ Axios instance configured for localhost:4000
const apiClient = axios.create({
    baseURL: 'http://localhost:4000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

const BookingModal = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState(null);

    // Calendar State
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);

    // Time State
    const [selectedTime, setSelectedTime] = useState(null);
    const [isAllDay, setIsAllDay] = useState(false);

    //   Employee Validation State
    const [employeeValid, setEmployeeValid] = useState(false);
    const [employeeLoading, setEmployeeLoading] = useState(false);
    const [employeeError, setEmployeeError] = useState('');

    // Form State - Updated to match MongoDB schema
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone1: '',
        phone2: '',
        numberOfPeople: 1,
        description: '',
        existingEmployeeId: ''
    });

    // Reset state when opening
    useEffect(() => {
        if (isOpen) {
            setStep(1);
            setSelectedDate(null);
            setSelectedTime(null);
            setIsAllDay(false);
            setIsSubmitting(false);
            setFormData({
                name: '',
                email: '',
                phone1: '',
                phone2: '',
                numberOfPeople: 1,
                description: '',
                existingEmployeeId: ''
            });
        }
    }, [isOpen]);

    // Calendar Logic
    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month, 1).getDay();
    };

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const handleDateClick = (day) => {
        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        setSelectedDate(newDate);
    };

    // Time Slots
    const timeSlots = [
        '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
        '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
        '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
        '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
        '05:00 PM'
    ];

    const handleTimeSelect = (time) => {
        setSelectedTime(time);
        setIsAllDay(false);
    };

    const handleAllDayToggle = () => {
        setIsAllDay(!isAllDay);
        if (!isAllDay) {
            setSelectedTime('All Day');
        } else {
            setSelectedTime(null);
        }
    };

    const validateEmployeeId = async (employeeId) => {
        if (!employeeId || employeeId.length < 5) {
            setEmployeeValid(false);
            setEmployeeLoading(false);
            setEmployeeError('');
            return;
        }

        setEmployeeLoading(true);
        setEmployeeError('');

        try {
            // ✅ NEW API endpoint to check employee
            const response = await apiClient.get(`/employees/validate/${encodeURIComponent(employeeId.trim())}`);
            const employee = response.data.employee;

            if (employee) {
                setEmployeeValid(true);
                console.log('✅ Employee verified:', employee.employeeId, employee.email);
            } else {
                setEmployeeValid(false);
                setEmployeeError('Employee ID not found');
            }
        } catch (error) {
            setEmployeeValid(false);
            if (error.response?.status === 404) {
                setEmployeeError('Employee ID not found in database');
            } else {
                setEmployeeError('Validation error. Please try again.');
            }
        } finally {
            setEmployeeLoading(false);
        }
    };

    // Navigation with validation
    const nextStep = () => {
        if (step === 1 && !selectedDate) return;
        if (step === 2 && !selectedTime) return;
        setStep(prev => prev + 1);
    };

    const prevStep = () => {
        setStep(prev => prev - 1);
    };

    // ✅ UPDATED: Submit to Backend using AXIOS to localhost:4000
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!employeeValid) {
            alert('Please enter a valid Employee ID first.');
            return;
        }

        setIsSubmitting(true);

        try {
            // Prepare base appointment data
            const baseAppointmentData = {
                appointmentDate: selectedDate.toISOString(),
                timeSlot: selectedTime,
                name: formData.name.trim(),
                email: formData.email.trim().toLowerCase(),
                phone1: formData.phone1.trim(),
                phone2: formData.phone2?.trim() || undefined,
                numberOfPeople: formData.numberOfPeople,
                existingEmployeeId: formData.existingEmployeeId.trim() || undefined,
                description: formData.description.trim() || undefined,
            };

            console.log('Sending appointment data:', baseAppointmentData);

            // Send to backend - backend will handle validation and set status
            const response = await apiClient.post('/appointments', baseAppointmentData);

            console.log('Success response:', response.data);

            // Backend returns status in response
            const { status } = response.data;

            if (status === 'approved') {
                setSubmissionStatus('approved');
                setStep(4); // Show success screen
            } else if (status === 'rejected') {
                alert('❌ Request rejected: Email does not match any existing employee ID in our database.');
                setSubmissionStatus('rejected');
            } else {
                setSubmissionStatus('pending');
                setStep(4); // Show pending screen
            }

        } catch (error) {
            console.error('Full error object:', error);
            console.error('Error response:', error.response);

            if (error.response?.data?.error || error.response?.data?.message) {
                alert(`Error: ${error.response.data.error || error.response.data.message}`);
            } else if (error.request) {
                alert('No response from server. Please check if the backend is running on http://localhost:4000');
            } else {
                alert(`Error: ${error.message}`);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    // Helper to format date
    const formatDate = (date) => {
        if (!date) return '';
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'long',
            day: 'numeric'
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            {/* Animated Background linear - IGL Colors */}
            <div className="absolute inset-0 bg-linear-to-br from-yellow-500/10 via-orange-500/10 to-green-800/10 animate-linear-xy" />

            {/* Backdrop */}
            <div
                onClick={onClose}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300"
            />

            {/* Floating Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-14 left-14 w-2 h-2 bg-yellow-400 rounded-full animate-float" />
                <div className="absolute top-1/3 right-14 w-3 h-3 bg-orange-400 rounded-full animate-float animation-delay-1000" />
                <div className="absolute bottom-14 left-1/3 w-2 h-2 bg-green-700 rounded-full animate-float animation-delay-2000" />
            </div>

            {/* Modal Container */}
            <div className="relative w-full max-w-5xl bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-170 md:h-auto md:min-h-170  animate-in zoom-in-95 slide-in-from-bottom-8 duration-500 border border-white/20">

                {/* Summary Sidebar with IGL linear */}
                <div className="hidden md:flex flex-col w-80 bg-linear-to-br from-yellow-50 via-orange-50 to-green-50 p-8 border-r border-white/50 relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-linear-to-br from-yellow-400 to-orange-400 rounded-full opacity-20 blur-3xl animate-pulse-slow" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-6">
                            <Sparkles className="text-orange-600 animate-spin-slow size-6" />
                            <h2 className="text-2xl font-bold text-gray-800">
                                Appointment Details
                            </h2>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start group hover:scale-105 transition-transform duration-300">
                                <div className="bg-linear-to-br from-yellow-500 to-orange-500 p-2 rounded-xl text-white mr-3 shadow-lg group-hover:shadow-yellow-200 transition-shadow">
                                    <CalendarIcon size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-600 font-medium">Date</p>
                                    <p className="text-slate-900 font-semibold">
                                        {selectedDate ? formatDate(selectedDate) : <span className="text-slate-400 animate-pulse">Select a date</span>}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start group hover:scale-105 transition-transform duration-300">
                                <div className="bg-linear-to-br from-yellow-500 to-orange-500 p-2 rounded-xl text-white mr-3 shadow-lg group-hover:shadow-yellow-200 transition-shadow">
                                    <Clock size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-600 font-medium">Time</p>
                                    <p className="text-slate-900 font-semibold">
                                        {selectedTime || <span className="text-slate-400 animate-pulse">Select a time</span>}
                                    </p>
                                </div>
                            </div>

                            {formData.numberOfPeople > 1 && (
                                <div className="flex items-start group hover:scale-105 transition-transform duration-300">
                                    <div className="bg-linear-to-br from-green-600 to-green-700 p-2 rounded-xl text-white mr-3 shadow-lg group-hover:shadow-green-200 transition-shadow">
                                        <Users size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-600 font-medium">People</p>
                                        <p className="text-slate-900 font-semibold">{formData.numberOfPeople}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="mt-auto">
                            <p className="text-sm text-slate-500 mb-2 font-medium">
                                Step {step} of 3
                            </p>
                            <div className="h-3 w-full bg-white/50 rounded-full overflow-hidden shadow-inner">
                                <div
                                    className="h-full bg-linear-to-r from-yellow-500 via-orange-500 to-green-700 transition-all duration-500 ease-out rounded-full shadow-lg"
                                    style={{ width: `${(step / 3) * 100}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 p-6 md:p-10 flex flex-col relative overflow-hidden">
                    <button
                        onClick={onClose}
                        className="absolute cursor-pointer top-6 right-6 p-2 hover:bg-red-50 rounded-full transition-all duration-300 z-20 group hover:scale-110"
                    >
                        <X className="text-slate-400 group-hover:text-red-500 transition-colors" />
                    </button>

                    <div className="flex-1 flex flex-col">
                        {/* Step 1: Calendar */}
                        {step === 1 && (
                            <div className=" h-140 flex items-center justify-center p-4 pt-12 pb-12 lg:pb-0">
                                <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-6 animate-in fade-in slide-in-from-right-6 duration-500">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-linear-to-br from-yellow-500 to-orange-500 rounded-xl">
                                            <CalendarIcon className="text-white size-6" />
                                        </div>
                                        <h3 className="text-3xl font-bold text-gray-800">
                                            Select a Date
                                        </h3>
                                    </div>

                                    <div className="flex items-center justify-between mb-6 bg-linear-to-r from-yellow-50 to-orange-50 p-4 rounded-2xl">
                                        <h4 className="text-lg font-bold text-slate-800">
                                            {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                        </h4>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={handlePrevMonth}
                                                className="p-2 hover:bg-white rounded-full text-slate-600 hover:text-orange-600 transition-all hover:scale-110 shadow-sm"
                                            >
                                                <ChevronLeft size={20} />
                                            </button>
                                            <button
                                                onClick={handleNextMonth}
                                                className="p-2 hover:bg-white rounded-full text-slate-600 hover:text-orange-600 transition-all hover:scale-110 shadow-sm"
                                            >
                                                <ChevronRight size={20} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-7 gap-2 mb-3">
                                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                                            <div key={day} className="text-center text-xs font-bold text-slate-500 uppercase tracking-wider py-2">
                                                {day}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-7 gap-2">
                                        {Array.from({ length: getFirstDayOfMonth(currentDate) }, (_, i) => (
                                            <div key={`empty - ${i}`} />
                                        ))}
                                        {Array.from({ length: getDaysInMonth(currentDate) }, (_, i) => {
                                            const day = i + 1;
                                            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                                            const isSelected = selectedDate?.toDateString() === date.toDateString();
                                            const isToday = new Date().toDateString() === date.toDateString();

                                            // Check if date is in the past (before today)
                                            const today = new Date();
                                            today.setHours(0, 0, 0, 0);
                                            const isPast = date < today;

                                            return (
                                                <button
                                                    key={day}
                                                    onClick={() => !isPast && handleDateClick(day)}
                                                    disabled={isPast}
                                                    className={clsx(
                                                        'w-full text-black aspect-square rounded-2xl flex items-center justify-center text-sm font-bold transition-all duration-300 relative',
                                                        isPast
                                                            ? 'bg-gray-100 text-black cursor-not-allowed opacity-50'
                                                            : isSelected
                                                                ? 'bg-linear-to-br from-yellow-500 to-orange-600 text-white shadow-xl shadow-orange-300 scale-110 animate-in zoom-in'
                                                                : 'hover:bg-linear-to-br hover:from-yellow-50 hover:to-orange-50 text-slate-700 hover:text-orange-600 hover:scale-105 cursor-pointer',
                                                        isToday && !isSelected && !isPast
                                                            ? 'bg-yellow-100 text-orange-600 font-bold ring-2 ring-orange-300'
                                                            : ''
                                                    )}
                                                >
                                                    {day}
                                                    {isToday && !isSelected && (
                                                        <span className="absolute bottom-1 w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
                                                    )}
                                                    {isSelected && (
                                                        <Check className="absolute top-1 right-1 w-3 h-3 animate-in zoom-in" />
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <div className="mt-6 pt-6 border-t border-orange-200">
                                        <button
                                            type="button"
                                            onClick={() => setStep(2)}
                                            disabled={!selectedDate}
                                            className={clsx(
                                                'w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform',
                                                selectedDate
                                                    ? 'bg-linear-to-r from-yellow-500 to-orange-600 text-white hover:shadow-xl hover:scale-105 hover:from-yellow-600 hover:to-orange-700 cursor-pointer'
                                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                            )}
                                        >
                                            {selectedDate ? 'Continue to Time Selection →' : 'Please select a date'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Time Selection */}
                        {step === 2 && (
                            <div className="h-full flex flex-col animate-in fade-in slide-in-from-right-6 duration-500">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-linear-to-br from-orange-500 to-green-700 rounded-xl">
                                        <Clock className="text-white size-6" />
                                    </div>
                                    <h3 className="text-3xl font-bold bg-linear-to-r from-orange-600 to-green-700
                    bg-clip-text text-transparent">
                                        Select a Time
                                    </h3>
                                </div>

                                <div className="space-y-4 mb-8">
                                    <button
                                        type="button"
                                        onClick={handleAllDayToggle}
                                        className={clsx(
                                            'w-full flex items-center justify-center p-4 border-2 rounded-2xl font-semibold transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 cursor-pointer',
                                            isAllDay
                                                ? 'bg-linear-to-r from-green-500 to-green-600 border-green-500 text-white shadow-green-200'
                                                : 'border-orange-300 hover:border-orange-400 text-orange-700 hover:bg-orange-50'
                                        )}
                                    >
                                        <Clock className="mr-2 size-5" />
                                        {isAllDay ? 'All Day Selected' : 'All Day Booking'}
                                    </button>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 flex-1">
                                    {timeSlots.map((time) => (
                                        <button
                                            key={time}
                                            type="button"
                                            onClick={() => handleTimeSelect(time)}
                                            disabled={isAllDay}
                                            className={clsx(
                                                'group relative p-4 rounded-xl border-2 font-semibold transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-200',
                                                selectedTime === time
                                                    ? 'bg-linear-to-br from-orange-500 to-orange-600 border-orange-500 text-white shadow-xl shadow-orange-300 scale-105 ring-4 ring-orange-200/50'
                                                    : 'border-slate-200 hover:border-orange-300 text-slate-700 hover:text-orange-600 hover:bg-orange-50',
                                                isAllDay && 'opacity-50 cursor-not-allowed'
                                            )}
                                        >
                                            <div className="text-center">
                                                <span className="block text-sm font-bold leading-tight">{time}</span>
                                                {selectedTime === time && (
                                                    <Check className="absolute -top-2 -right-2 w-5 h-5 text-white bg-green-500 rounded-full p-0.5 animate-bounce" />
                                                )}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                                {/* ADD THIS NAVIGATION BUTTONS SECTION */}
                                <div className="mt-6 pt-6 border-t border-green-200 flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="flex-1 py-4 rounded-2xl font-bold cursor-pointer text-lg transition-all duration-300 transform border-2 border-orange-300 text-orange-600 hover:bg-orange-50 hover:scale-105"
                                    >
                                        ← Back to Calendar
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setStep(3)}
                                        disabled={!selectedTime && !isAllDay}
                                        className={clsx(
                                            'flex-1 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform',
                                            (selectedTime || isAllDay)
                                                ? 'bg-linear-to-r from-orange-500 to-green-600 text-white hover:shadow-xl hover:scale-105 hover:from-orange-600 hover:to-green-700 cursor-pointer'
                                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        )}
                                    >
                                        {(selectedTime || isAllDay) ? 'Continue to Details →' : 'Please select a time'}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Customer Details */}
                        {/* Step 3: Customer Details */}
                        {step === 3 && (
                            <form onSubmit={handleSubmit} className="h-full flex flex-col animate-in fade-in slide-in-from-right-6 duration-500">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-linear-to-br from-green-500 to-blue-600 rounded-xl">
                                        <User className="text-white size-5" />
                                    </div>
                                    <h3 className="text-2xl font-bold bg-linear-to-r from-green-600 to-blue-700 bg-clip-text text-black">
                                        Your Details
                                    </h3>
                                </div>

                                <div className="flex gap-4 mb-4 text-sm">
                                    <p className="flex items-center text-slate-600">
                                        <CalendarIcon className="mr-2 w-4 h-4 text-orange-500" />
                                        {formatDate(selectedDate)} at {selectedTime}
                                    </p>
                                    {formData.numberOfPeople > 1 && (
                                        <p className="flex items-center text-slate-600">
                                            <Users className="mr-2 w-4 h-4 text-green-500" />
                                            {formData.numberOfPeople} people
                                        </p>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-6 flex-1 overflow-y-auto">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name *</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition-all text-black"
                                            placeholder="Enter your full name"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1">Email *</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition-all text-black"
                                            placeholder="your.email@example.com"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1">Phone 1 *</label>
                                        <input
                                            type="tel"
                                            required
                                            value={formData.phone1}
                                            onChange={(e) => setFormData({ ...formData, phone1: e.target.value })}
                                            className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition-all text-black"
                                            placeholder="+91 98765 43210"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1">Phone 2 (Optional)</label>
                                        <input
                                            type="tel"
                                            value={formData.phone2}
                                            onChange={(e) => setFormData({ ...formData, phone2: e.target.value })}
                                            className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition-all text-black"
                                            placeholder="+91 98765 43210"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1">Number of People *</label>
                                        <input
                                            type="number"
                                            min="1"
                                            max="20"
                                            required
                                            value={formData.numberOfPeople}
                                            onChange={(e) => setFormData({ ...formData, numberOfPeople: parseInt(e.target.value) || 1 })}
                                            className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition-all text-black"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1">
                                            Employee ID <span className="text-orange-600">*</span> (Required)
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                required
                                                value={formData.existingEmployeeId}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    setFormData({ ...formData, existingEmployeeId: value });
                                                    // Debounce validation (300ms delay)
                                                    clearTimeout(window.employeeTimeout);
                                                    window.employeeTimeout = setTimeout(() => {
                                                        validateEmployeeId(value);
                                                    }, 300);
                                                }}
                                                className={clsx(
                                                    "w-full p-3 pr-10 border rounded-xl focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition-all text-black",
                                                    employeeValid
                                                        ? "border-green-300 bg-green-50"
                                                        : employeeError
                                                            ? "border-red-300 bg-red-50"
                                                            : "border-slate-200"
                                                )}
                                                placeholder="EMP-12345"
                                                maxLength={20}
                                            />
                                            {/* Loading Spinner */}
                                            {employeeLoading && (
                                                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                                    <div className="w-4 h-4 border-2 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
                                                </div>
                                            )}
                                            {/* Status Icon */}
                                            {employeeValid && !employeeLoading && (
                                                <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                                            )}
                                            {employeeError && !employeeLoading && (
                                                <X className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500 cursor-pointer" />
                                            )}
                                        </div>

                                        {/* Validation Messages */}
                                        {employeeError && (
                                            <p className="mt-1 text-xs text-red-600 flex items-center gap-1 cursor-pointer">
                                                <X className="w-3 h-3" />
                                                {employeeError}
                                            </p>
                                        )}
                                        {employeeValid && (
                                            <p className="mt-1 text-xs text-green-600 flex items-center gap-1">
                                                <Check className="w-3 h-3" />
                                                <span>Employee verified! Ready for booking.</span>
                                            </p>
                                        )}
                                    </div>



                                    <div className="col-span-2">
                                        <label className="block text-sm font-semibold text-slate-700 mb-1">Description</label>
                                        <textarea
                                            rows={2}
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition-all resize-vertical text-black"
                                            placeholder="Your Description..."
                                        />
                                    </div>
                                </div>

                                {/* ✅ SUBMIT BUTTON NOW INSIDE THE FORM */}
                                <div className="flex flex-col space-y-3 pt-6 border-t border-slate-100 mt-auto">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full cursor-pointer bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-2xl hover:scale-[1.02] shadow-lg"
                                    >
                                        {isSubmitting ? 'Booking...' : 'Book Appointment'}
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* Step 4: Success */}

                        {step === 4 && (
                            <div className="h-full flex flex-col animate-in fade-in zoom-in-95 duration-700 p-6 md:p-10">
                                {/* Header Section */}
                                <div className="text-center mb-8 md:mb-12">
                                    <div className={clsx(
                                        "inline-flex items-center justify-center mx-auto w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-3xl shadow-2xl mb-6 p-4 animate-pulse",
                                        submissionStatus === 'approved'
                                            ? 'bg-linear-to-br from-emerald-500 via-emerald-600 to-teal-600'
                                            : 'bg-linear-to-br from-amber-500 via-amber-600 to-yellow-600'
                                    )}>
                                        <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center animate-spin-slow">
                                            {submissionStatus === 'approved' ? (
                                                <Check className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white drop-shadow-md" />
                                            ) : (
                                                <Clock className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white drop-shadow-md" />
                                            )}
                                        </div>
                                    </div>

                                    <h3 className={clsx(
                                        "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-4",
                                        submissionStatus === 'approved'
                                            ? 'bg-linear-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent'
                                            : 'bg-linear-to-r from-amber-600 via-yellow-600 to-orange-600 bg-clip-text text-transparent'
                                    )}>
                                        {submissionStatus === 'approved'
                                            ? '🎉 Appointment Auto-Approved!'
                                            : '✅ Request Submitted Successfully!'
                                        }
                                    </h3>

                                    <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                                        {submissionStatus === 'approved'
                                            ? 'Your appointment is confirmed! You can visit at the scheduled time.'
                                            : 'Your appointment has been received and is now pending admin approval.'
                                        }
                                    </p>
                                </div>

                                {/* Status Cards - Responsive Grid */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 max-w-6xl mx-auto w-full">
                                    {/* Left Card - Status Specific */}
                                    <div className={clsx(
                                        "group rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 w-full",
                                        submissionStatus === 'approved'
                                            ? 'bg-linear-to-br from-emerald-50 to-teal-50/50 border-2 border-emerald-200/80'
                                            : 'bg-linear-to-br from-amber-50 to-yellow-50/50 backdrop-blur-sm border-2 border-amber-200/80'
                                    )}>
                                        <div className="flex items-start gap-4">
                                            <div className={clsx(
                                                "shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 p-3",
                                                submissionStatus === 'approved'
                                                    ? 'bg-linear-to-br from-emerald-500 to-teal-600'
                                                    : 'bg-linear-to-br from-amber-500 to-yellow-500'
                                            )}>
                                                {submissionStatus === 'approved' ? (
                                                    <Check className="w-5 h-5 md:w-6 md:h-6 text-white" />
                                                ) : (
                                                    <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-white" />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className={clsx(
                                                    "text-lg md:text-xl font-bold mb-3",
                                                    submissionStatus === 'approved'
                                                        ? 'bg-linear-to-r from-emerald-900 to-teal-900 bg-clip-text text-transparent'
                                                        : 'bg-linear-to-r from-amber-900 to-yellow-900 bg-clip-text text-transparent'
                                                )}>
                                                    {submissionStatus === 'approved'
                                                        ? '✅ Appointment Confirmed'
                                                        : '⏳ Pending Admin Approval'
                                                    }
                                                </h4>
                                                <p className="text-sm md:text-base leading-relaxed">
                                                    {submissionStatus === 'approved'
                                                        ? 'Your booking is verified and approved. You can visit the office at your scheduled time.'
                                                        : 'Your request is awaiting approval. <span className="font-black">Do not visit</span> until you receive confirmation email.'
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Card - Appointment Details (Always Same) */}
                                    <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                                        <h4 className="text-xl md:text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                                            <div className="w-10 h-10 md:w-12 md:h-12 bg-linear-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-md p-3">
                                                <CalendarIcon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                                            </div>
                                            Appointment Details
                                        </h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                                            <div className="text-center p-4 rounded-2xl bg-linear-to-b from-slate-50 to-slate-100 hover:bg-slate-100 transition-colors">
                                                <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Date</span>
                                                <span className="text-xl md:text-2xl font-black text-slate-900 block">{formatDate(selectedDate)}</span>
                                            </div>
                                            <div className="text-center p-4 rounded-2xl bg-linear-to-b from-emerald-50 to-emerald-100 hover:bg-emerald-100 transition-colors">
                                                <span className="block text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-2">Time</span>
                                                <span className="text-xl md:text-2xl font-black text-slate-900 block">{selectedTime}</span>
                                            </div>
                                            <div className="text-center p-4 rounded-2xl bg-linear-to-b from-blue-50 to-blue-100 hover:bg-blue-100 transition-colors">
                                                <span className="block text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">People</span>
                                                <span className="text-xl md:text-2xl font-black text-slate-900 block">{formData.numberOfPeople}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Email Confirmation - Centered */}
                                <div className="max-w-2xl mx-auto mb-8">
                                    <div className="bg-linear-to-r from-green-50 to-emerald-50/50 backdrop-blur-sm border border-green-200/80 rounded-3xl p-6 md:p-8 shadow-xl text-center group hover:shadow-2xl transition-all duration-500">
                                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                            <div className="w-14 h-14 md:w-16 md:h-16 bg-linear-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                                                <Mail className="w-6 h-6 md:w-7 md:h-7 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-base md:text-lg font-semibold text-green-800 mb-1">
                                                    Confirmation email sent to
                                                </p>
                                                <p className="text-lg md:text-xl font-black text-green-900 bg-linear-to-r from-green-900 to-emerald-900 bg-clip-text text-transparent">
                                                    {formData.email}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons - Fixed Layout */}
                                <div className="flex flex-col sm:flex-row gap-4 mt-auto pt-8 border-t border-slate-200">
                                    <button
                                        onClick={onClose}
                                        className="group flex-1 bg-linear-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-4 px-6 md:px-8 rounded-2xl text-lg shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-500/30"
                                    >
                                        <span className="flex items-center justify-center gap-2">
                                            <Check className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            {submissionStatus === 'approved' ? 'Close' : 'Close Modal'}
                                        </span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setStep(1);
                                            setSelectedDate(null);
                                            setSelectedTime(null);
                                            setIsAllDay(false);
                                            setFormData({
                                                name: '',
                                                email: '',
                                                phone1: '',
                                                phone2: '',
                                                numberOfPeople: 1,
                                                description: '',
                                                existingEmployeeId: ''
                                            });
                                            setEmployeeValid(false);
                                            setEmployeeError('');
                                        }}
                                        className="group flex-1 border-2 border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-bold py-4 px-6 md:px-8 rounded-2xl text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-slate-500/30"
                                    >
                                        <span className="flex items-center justify-center gap-2">
                                            <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                            Book Another
                                        </span>
                                    </button>
                                </div>
                            </div>
                        )}


                    </div>

                    {/* Navigation Buttons */}
                    {(step === 1 || step === 2) && (
                        <div className="flex space-x-3 pt-6 border-t border-slate-100 md:hidden">
                            <button
                                type="button"
                                onClick={step > 1 ? prevStep : onClose}
                                className="flex-1 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 py-4 px-6 rounded-xl font-semibold transition-all duration-300 hover:shadow-md"
                            >
                                {step > 1 ? 'Previous' : 'Cancel'}
                            </button>
                            <button
                                type="button"
                                onClick={nextStep}
                                disabled={step === 1 ? !selectedDate : !selectedTime}
                                className="flex-1 bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl hover:scale-105 shadow-lg"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookingModal;
