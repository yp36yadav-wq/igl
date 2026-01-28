"use client";

import { useState, useEffect } from 'react';
import { Fuel, Menu, X, ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, Check, User, Mail, Phone, FileText, Sparkles, Users, MapPin, Car } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';

// BookingModal Component
const BookingModal = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Calendar State
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);

    // Time State
    const [selectedTime, setSelectedTime] = useState(null);
    const [isAllDay, setIsAllDay] = useState(false);

    // Form State - Updated to match MongoDB schema
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone1: '',
        phone2: '',
        numberOfPeople: 1,
        description: '',
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
        "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
        "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
        "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
        "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
        "05:00 PM"
    ];

    const handleTimeSelect = (time) => {
        setSelectedTime(time);
        setIsAllDay(false);
    };

    const handleAllDayToggle = () => {
        setIsAllDay(!isAllDay);
        if (!isAllDay) setSelectedTime("All Day");
        else setSelectedTime(null);
    };

    // Navigation with validation
    const nextStep = () => {
        if (step === 1 && !selectedDate) return;
        if (step === 2 && !selectedTime) return;
        setStep((prev) => prev + 1);
    };

    const prevStep = () => {
        setStep((prev) => prev - 1);
    };

    // Submit to Backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Prepare data according to MongoDB schema
            const appointmentData = {
                appointmentDate: selectedDate,
                timeSlot: selectedTime,
                name: formData.name,
                email: formData.email,
                phone1: formData.phone1,
                phone2: formData.phone2 || undefined,
                numberOfPeople: formData.numberOfPeople,
                description: formData.description || undefined,
                status: 'pending',
            };

            // API call to your backend
            const response = await fetch('/api/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(appointmentData),
            });

            if (!response.ok) {
                throw new Error('Failed to create appointment');
            }

            const result = await response.json();
            console.log('Appointment created:', result);

            // Move to success step
            setStep(4);
        } catch (error) {
            console.error('Error creating appointment:', error);
            alert('Failed to book appointment. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Helper to format date
    const formatDate = (date) => {
        if (!date) return '';
        return date.toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric' });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Animated Background Gradient - IGL Colors */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-orange-500/10 to-green-800/10 animate-gradient-xy"></div>
            
            {/* Backdrop */}
            <div
                onClick={onClose}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300"
            />

            {/* Floating Particles */}
            <div className="absolute inset-0   overflow-hidden pointer-events-none">
                 <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-float"></div>
                <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-orange-400 rounded-full animate-float animation-delay-1000"></div>
                <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-green-700 rounded-full animate-float animation-delay-2000"></div>
            </div> 

            {/* Modal Container */}
            <div className="relative w-full max-w-4xl bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[600px] md:h-auto md:min-h-[600px] animate-in zoom-in-95 slide-in-from-bottom-8 duration-500 border border-white/20">
                
                {/* Summary Sidebar with IGL Gradient */}
                <div className="hidden md:flex flex-col w-1/3 bg-gradient-to-br from-yellow-50 via-orange-50 to-green-50 p-8 border-r border-white/50 relative overflow-hidden">
                    {/* Animated gradient orb */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full opacity-20 blur-3xl animate-pulse-slow"></div>
                    
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-6">
                            <Sparkles className="text-orange-600 animate-spin-slow" size={24} />
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-green-700 bg-clip-text text-transparent">
                                Appointment Details
                            </h2>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start group hover:scale-105 transition-transform duration-300">
                                <div className="bg-gradient-to-br from-yellow-500 to-orange-500 p-2 rounded-xl text-white mr-3 shadow-lg group-hover:shadow-yellow-200 transition-shadow">
                                    <CalendarIcon size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-600 font-medium">Date</p>
                                    <p className="text-slate-900 font-semibold">
                                        {selectedDate ? formatDate(selectedDate) : 
                                        <span className="text-slate-400 animate-pulse">Select a date</span>}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start group hover:scale-105 transition-transform duration-300">
                                <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-2 rounded-xl text-white mr-3 shadow-lg group-hover:shadow-orange-200 transition-shadow">
                                    <Clock size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-600 font-medium">Time</p>
                                    <p className="text-slate-900 font-semibold">
                                        {selectedTime || 
                                        <span className="text-slate-400 animate-pulse">Select a time</span>}
                                    </p>
                                </div>
                            </div>

                            {formData.numberOfPeople > 1 && (
                                <div className="flex items-start group hover:scale-105 transition-transform duration-300">
                                    <div className="bg-gradient-to-br from-green-600 to-green-700 p-2 rounded-xl text-white mr-3 shadow-lg group-hover:shadow-green-200 transition-shadow">
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
                            <p className="text-sm text-slate-500 mb-2 font-medium">Step {step} of 3</p>
                            <div className="h-3 w-full bg-white/50 rounded-full overflow-hidden shadow-inner">
                                <div
                                    className="h-full bg-gradient-to-r from-yellow-500 via-orange-500 to-green-700 transition-all duration-500 ease-out rounded-full shadow-lg"
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
                        className="absolute top-6 right-6 p-2 hover:bg-red-50 rounded-full transition-all duration-300 z-20 group hover:scale-110"
                    >
                        <X className="text-slate-400 group-hover:text-red-500 transition-colors" />
                    </button>

                    <div className="flex-1 flex flex-col">
                        {/* Step 1: Calendar */}
                        {step === 1 && (
                            <div className="h-full flex flex-col animate-in fade-in slide-in-from-right-6 duration-500">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl">
                                        <CalendarIcon className="text-white" size={24} />
                                    </div>
                                    <h3 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                                        Select a Date
                                    </h3>
                                </div>

                                <div className="flex items-center justify-between mb-6 bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-2xl">
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
                                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                        <div key={day} className="text-center text-xs font-bold text-slate-500 uppercase tracking-wider py-2">
                                            {day}
                                        </div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-7 gap-2 flex-1">
                                    {Array.from({ length: getFirstDayOfMonth(currentDate) }).map((_, i) => (
                                        <div key={`empty-${i}`} />
                                    ))}
                                    {Array.from({ length: getDaysInMonth(currentDate) }).map((_, i) => {
                                        const day = i + 1;
                                        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                                        const isSelected = selectedDate?.toDateString() === date.toDateString();
                                        const isToday = new Date().toDateString() === date.toDateString();

                                        return (
                                            <button
                                                key={day}
                                                onClick={() => handleDateClick(day)}
                                                className={`w-full aspect-square rounded-2xl flex items-center justify-center text-sm font-bold transition-all duration-300 relative ${
                                                    isSelected
                                                        ? "bg-gradient-to-br from-yellow-500 to-orange-600 text-white shadow-xl shadow-orange-300 scale-110 animate-in zoom-in"
                                                        : "hover:bg-gradient-to-br hover:from-yellow-50 hover:to-orange-50 text-slate-700 hover:text-orange-600 hover:scale-105"
                                                } ${isToday && !isSelected ? "bg-yellow-100 text-orange-600 font-bold ring-2 ring-orange-300" : ""}`}
                                            >
                                                {day}
                                                {isToday && !isSelected && (
                                                    <span className="absolute bottom-1 w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></span>
                                                )}
                                                {isSelected && (
                                                    <Check className="absolute top-1 right-1 w-3 h-3 animate-in zoom-in" />
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Step 2: Time Selection */}
                        {step === 2 && (
                            <div className="h-full flex flex-col animate-in fade-in slide-in-from-right-6 duration-500">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-gradient-to-br from-orange-500 to-green-700 rounded-xl">
                                        <Clock className="text-white" size={24} />
                                    </div>
                                    <h3 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-green-700 bg-clip-text text-transparent">
                                        Select Time
                                    </h3>
                                </div>

                                <div className="mb-6">
                                    <label className="flex items-center p-4 border-2 border-orange-200 rounded-2xl hover:bg-gradient-to-r hover:from-yellow-50 hover:to-orange-50 cursor-pointer transition-all duration-300 group hover:border-orange-300">
                                        <input
                                            type="checkbox"
                                            checked={isAllDay}
                                            onChange={handleAllDayToggle}
                                            className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500 transition-all"
                                        />
                                        <span className="ml-3 font-semibold text-slate-700 group-hover:text-orange-700">All Day Availability</span>
                                        <Sparkles className="ml-auto text-orange-400 group-hover:text-orange-600 transition-colors" size={20} />
                                    </label>
                                </div>

                                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {timeSlots.map((time, index) => (
                                            <button
                                                key={time}
                                                disabled={isAllDay}
                                                onClick={() => handleTimeSelect(time)}
                                                className={`py-4 px-4 rounded-2xl text-sm font-bold border-2 transition-all duration-300 text-center transform hover:scale-105 ${
                                                    selectedTime === time
                                                        ? "bg-gradient-to-br from-orange-500 to-green-700 text-white border-orange-600 shadow-xl shadow-orange-300 scale-105"
                                                        : "border-slate-200 text-slate-700 hover:border-orange-400 hover:bg-gradient-to-br hover:from-yellow-50 hover:to-orange-50 hover:text-orange-700"
                                                } ${isAllDay ? "opacity-40 cursor-not-allowed" : ""}`}
                                                style={{ animationDelay: `${index * 30}ms` }}
                                            >
                                                {time}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Details Form */}
                        {step === 3 && (
                            <div className="h-full flex flex-col animate-in fade-in slide-in-from-right-6 duration-500">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-gradient-to-br from-green-600 to-green-800 rounded-xl">
                                        <User className="text-white" size={24} />
                                    </div>
                                    <h3 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                                        Your Information
                                    </h3>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-5 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                                    <div className="space-y-2 animate-in fade-in-up duration-300">
                                        <label className="text-sm font-bold text-slate-700">Full Name *</label>
                                        <div className="relative group">
                                            <User className="absolute left-4 top-4 text-slate-400 h-5 w-5 group-focus-within:text-yellow-600 transition-colors" />
                                            <input
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 text-black border-slate-200 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-100 outline-none transition-all duration-300 font-medium"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="space-y-2 animate-in fade-in-up duration-300 animation-delay-100">
                                            <label className="text-sm font-bold text-slate-700">Email *</label>
                                            <div className="relative group">
                                                <Mail className="absolute left-4 top-4 text-slate-400 h-5 w-5 group-focus-within:text-orange-600 transition-colors" />
                                                <input
                                                    type="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className="w-full pl-12 pr-4 py-4 text-black rounded-2xl border-2 border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all duration-300 font-medium"
                                                    placeholder="john@example.com"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2 animate-in fade-in-up duration-300 animation-delay-200">
                                            <label className="text-sm font-bold text-slate-700">Phone 1 *</label>
                                            <div className="relative group">
                                                <Phone className="absolute left-4 top-4 text-slate-400 h-5 w-5 group-focus-within:text-green-600 transition-colors" />
                                                <input
                                                    type="tel"
                                                    required
                                                    value={formData.phone1}
                                                    onChange={(e) => setFormData({ ...formData, phone1: e.target.value })}
                                                    className="w-full pl-12 pr-4 py-4 text-black rounded-2xl border-2 border-slate-200 focus:border-green-600 focus:ring-4 focus:ring-green-100 outline-none transition-all duration-300 font-medium"
                                                    placeholder="+91 98765 43210"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="space-y-2 animate-in fade-in-up duration-300 animation-delay-300">
                                            <label className="text-sm font-bold text-slate-700">Phone 2 (Optional)</label>
                                            <div className="relative group">
                                                <Phone className="absolute left-4 top-4 text-slate-400 h-5 w-5 group-focus-within:text-yellow-600 transition-colors" />
                                                <input
                                                    type="tel"
                                                    value={formData.phone2}
                                                    onChange={(e) => setFormData({ ...formData, phone2: e.target.value })}
                                                    className="w-full pl-12 pr-4 py-4 text-black rounded-2xl border-2 border-slate-200 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-100 outline-none transition-all duration-300 font-medium"
                                                    placeholder="+91 98765 43210"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2 animate-in fade-in-up duration-300 animation-delay-400">
                                            <label className="text-sm font-bold text-slate-700">Number of People *</label>
                                            <div className="relative group">
                                                <Users className="absolute left-4 top-4 text-slate-400 h-5 w-5 group-focus-within:text-green-600 transition-colors" />
                                                <input
                                                    type="number"
                                                    min="1"
                                                    required
                                                    value={formData.numberOfPeople}
                                                    onChange={(e) => setFormData({ ...formData, numberOfPeople: parseInt(e.target.value) || 1 })}
                                                    className="w-full pl-12 pr-4 py-4 text-black rounded-2xl border-2 border-slate-200 focus:border-green-600 focus:ring-4 focus:ring-green-100 outline-none transition-all duration-300 font-medium"
                                                    placeholder="1"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2 animate-in fade-in-up duration-300 animation-delay-500">
                                        <label className="text-sm font-bold text-slate-700">Additional Notes</label>
                                        <div className="relative group">
                                            <FileText className="absolute left-4 top-4 text-slate-400 h-5 w-5 group-focus-within:text-orange-600 transition-colors" />
                                            <textarea
                                                value={formData.description}
                                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                className="w-full pl-12 pr-4 py-4 text-black rounded-2xl border-2 border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none resize-none h-32 transition-all duration-300 font-medium"
                                                placeholder="Any specific requests or details..."
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* Step 4: Success */}
                        {step === 4 && (
                            <div className="h-full flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-500">
                                <div className="relative mb-8">
                                    <div className="absolute inset-0 bg-green-600 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                                    <div className="relative w-24 h-24 bg-gradient-to-br from-green-600 to-green-800 text-white rounded-full flex items-center justify-center shadow-2xl animate-in zoom-in duration-700">
                                        <Check size={48} className="animate-in zoom-in duration-500 animation-delay-200" />
                                    </div>
                                </div>
                                <h3 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent mb-3 animate-in slide-in-from-bottom-4 duration-500">
                                    Booking Confirmed!
                                </h3>
                                <p className="text-slate-600 mb-10 max-w-sm text-lg animate-in fade-in duration-500 animation-delay-200">
                                    Your appointment has been successfully scheduled. We have sent a confirmation email to <span className="font-bold text-orange-600">{formData.email}</span>.
                                </p>
                                <button
                                    onClick={onClose}
                                    className="bg-gradient-to-r from-green-700 to-green-900 text-white px-10 py-4 rounded-2xl font-bold hover:from-green-800 hover:to-black transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 animate-in slide-in-from-bottom-4 duration-500 animation-delay-400"
                                >
                                    Done
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Footer Buttons */}
                    {step < 4 && (
                        <div className="mt-8 flex justify-between items-center pt-6 border-t-2 border-slate-100">
                            {step > 1 ? (
                                <button
                                    onClick={prevStep}
                                    disabled={isSubmitting}
                                    className="text-slate-600 hover:text-slate-900 font-bold px-6 py-3 rounded-xl hover:bg-slate-100 transition-all duration-300 hover:scale-105 disabled:opacity-50"
                                >
                                    ← Back
                                </button>
                            ) : (
                                <div></div>
                            )}

                            {step < 3 ? (
                                <button
                                    onClick={nextStep}
                                    disabled={(step === 1 && !selectedDate) || (step === 2 && !selectedTime && !isAllDay)}
                                    className={`px-8 py-3 rounded-2xl font-bold transition-all duration-300 flex items-center gap-2 ${
                                        (step === 1 && !selectedDate) || (step === 2 && !selectedTime && !isAllDay)
                                            ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                                            : "bg-gradient-to-r from-yellow-500 to-orange-600 text-white shadow-xl shadow-orange-300 hover:shadow-2xl hover:scale-105 hover:from-yellow-600 hover:to-orange-700"
                                    }`}
                                >
                                    Next Step <ChevronRight size={20} />
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className="bg-gradient-to-r from-green-600 to-green-800 text-white px-10 py-3 rounded-2xl font-bold hover:from-green-700 hover:to-green-900 transition-all duration-300 shadow-xl shadow-green-300 hover:shadow-2xl hover:scale-105 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            <Check size={20} /> Confirm Booking
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                @keyframes gradient-xy {
                    0%, 100% { background-position: 0% 0%; }
                    25% { background-position: 100% 0%; }
                    50% { background-position: 100% 100%; }
                    75% { background-position: 0% 100%; }
                }
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.2; }
                    50% { opacity: 0.4; }
                }
                .animate-float { animation: float 3s ease-in-out infinite; }
                .animate-gradient-xy { 
                    background-size: 400% 400%;
                    animation: gradient-xy 15s ease infinite; 
                }
                .animate-spin-slow { animation: spin-slow 8s linear infinite; }
                .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
                .animation-delay-100 { animation-delay: 100ms; }
                .animation-delay-200 { animation-delay: 200ms; }
                .animation-delay-300 { animation-delay: 300ms; }
                .animation-delay-400 { animation-delay: 400ms; }
                .animation-delay-500 { animation-delay: 500ms; }
                .animation-delay-1000 { animation-delay: 1s; }
                .animation-delay-2000 { animation-delay: 2s; }
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: linear-gradient(to bottom, #f59e0b, #15803d); border-radius: 10px; }
            `}</style>
        </div>
    );
};

// Navbar Component with updated background color
const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'Services', href: '#services' },
        { name: 'Booking', href: '#booking', isBooking: true },
    ];

    const handleScrollTo = (e, href, isBooking = false) => {
        e.preventDefault();
        if (isBooking) {
            setIsBookingOpen(true);
            setIsMobileMenuOpen(false);
            return;
        }
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <>
            <nav
                className={twMerge(
                    'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
                    isScrolled
                        ? 'bg-[#0b3d2e]/95 backdrop-blur-lg border-green-700/50 shadow-lg shadow-green-900/20 py-2'
                        : 'bg-[#0b3d2e]/90 backdrop-blur-sm border-green-800/30 py-4'
                )}
            >
                <div className="container mx-auto px-4 flex items-center justify-between">
                    <a href="#home" onClick={(e) => handleScrollTo(e, '#home')} className="flex items-center space-x-3 group">
                        {/* Logo Image */}
                        <div className="relative w-17 h-17 bg-white shadow-md group-hover:shadow-lg transition-all">
                            <Image
                                src="/logo.png"
                                alt="IGL Logo"
                                width={90}
                                height={90}
                                className="object-contain"
                            />
                        </div>
                    </a>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleScrollTo(e, link.href, link.isBooking)}
                                className="text-sm font-medium transition-all hover:-translate-y-0.5 text-white drop-shadow-lg hover:text-yellow-200"
                            >
                                {link.name}
                            </a>
                        ))}
                        <button
                            onClick={() => setIsBookingOpen(true)}
                            className="bg-gradient-to-r from-yellow-500 to-green-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:from-yellow-600 hover:to-green-800 transition-all shadow-lg hover:shadow-yellow-500/30 hover:-translate-y-0.5 active:translate-y-0"
                        >
                            Book Now
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? (
                            <X className="text-white" />
                        ) : (
                            <Menu className="text-white" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-yellow-200 shadow-xl p-4 flex flex-col space-y-4 animate-in slide-in-from-top-5">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleScrollTo(e, link.href, link.isBooking)}
                                className="text-green-700 font-medium p-2 hover:bg-gradient-to-r hover:from-yellow-50 hover:to-green-50 rounded-lg transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                )}
            </nav>

            {/* Booking Modal */}
            <BookingModal 
                isOpen={isBookingOpen} 
                onClose={() => setIsBookingOpen(false)} 
            />
        </>
    )
}

export default Navbar