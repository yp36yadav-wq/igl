"use client";
import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

const IGLLogo = () => (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M100 30 L100 10 M145 45 L158 32 M170 100 L190 100 M145 155 L158 168 M100 170 L100 190 M55 155 L42 168 M30 100 L10 100 M55 45 L42 32" stroke="#FDB913" strokeWidth="6" strokeLinecap="round"/>
        <path d="M130 65 L145 50 M70 65 L55 50 M130 135 L145 150 M70 135 L55 150" stroke="#FDB913" strokeWidth="5" strokeLinecap="round"/>
        <circle cx="100" cy="100" r="45" fill="#FDB913"/>
        <ellipse cx="100" cy="100" rx="55" ry="20" fill="none" stroke="#006838" strokeWidth="5" transform="rotate(-30 100 100)"/>
        <text x="100" y="110" fontFamily="Georgia" fontSize="40" fontWeight="bold" fill="#CC0000" textAnchor="middle" fontStyle="italic">igl</text>
    </svg>
);

export default function HelplinePage() {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const contactInfo = [
        { icon: Mail, label: 'Email', value: 'support@iglsmartcard.com', link: 'mailto:support@iglsmartcard.com' },
        { icon: Phone, label: 'Phone 1', value: '+91-120-4844761', link: 'tel:+911204844761' },
        { icon: Phone, label: 'Phone 2', value: '+91-11-46074607', link: 'tel:+911146074607' },
        { icon: MapPin, label: 'Address', value: 'IGL Bhawan, Plot No 4, Community Center, R. K. Puram, Sector 9, RK Puram, New Delhi, Delhi 110022' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0b3d2e] via-[#0a2f23] to-[#083821] py-12 px-4 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-400 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Floating particles */}
            {[...Array(15)].map((_, i) => (
                <div key={i} className="absolute w-2 h-2 bg-yellow-400/30 rounded-full animate-bounce"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`,
                        animationDuration: `${3 + Math.random() * 2}s`
                    }} />
            ))}

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-12 animate-fade-in">
                    <div className="w-32 h-32 mx-auto mb-6 bg-white rounded-full p-6 shadow-2xl transform hover:scale-110 transition-transform duration-300">
                        <IGLLogo />
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black text-yellow-400 mb-4 tracking-tight drop-shadow-lg">
                        IGL Helpline
                    </h1>
                    <p className="text-xl text-yellow-100 max-w-2xl mx-auto">
                        We're here to help you 24/7. Reach out to us for any queries or support.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 lg:items-start">
                    {/* Contact Form - Full Height */}
                    <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl transform hover:scale-[1.02] transition-all duration-300 animate-slide-in-left flex flex-col h-full">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center">
                                <Send className="w-6 h-6 text-[#0b3d2e]" />
                            </div>
                            <h2 className="text-3xl font-bold text-[#0b3d2e]">Send us a Message</h2>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5 flex-1 flex flex-col">
                            <div className="grid md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border-2 text-black border-gray-200 rounded-xl focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 outline-none transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border-2 text-black border-gray-200 rounded-xl focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 outline-none transition-all"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border-2 text-black border-gray-200 rounded-xl focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 outline-none transition-all"
                                        placeholder="+91 98765 43210"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Subject *</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border-2 text-black border-gray-200 rounded-xl focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 outline-none transition-all"
                                        placeholder="How can we help?"
                                    />
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border-2 text-black  border-gray-200 rounded-xl focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 outline-none transition-all resize-none flex-1 min-h-[150px]"
                                    placeholder="Tell us more about your inquiry..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#0b3d2e] font-bold text-lg py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group"
                            >
                                <span>Send Message</span>
                                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>

                            {submitted && (
                                <div className="flex items-center gap-2 text-green-600 bg-green-50 p-4 rounded-xl animate-fade-in">
                                    <CheckCircle className="w-5 h-5" />
                                    <span className="font-semibold">Message sent successfully! We'll get back to you soon.</span>
                                </div>
                            )}
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-6 animate-slide-in-right">
                        <div className="bg-white rounded-3xl p-8 shadow-2xl">
                            <h2 className="text-3xl font-bold text-[#0b3d2e] mb-6">Contact Information</h2>
                            <div className="space-y-5">
                                {contactInfo.map((info, idx) => (
                                    <div key={idx} className="flex items-start gap-4 p-4 rounded-xl hover:bg-yellow-50 transition-colors duration-300 group">
                                        <div className="w-12 h-12 bg-gradient-to-br from-[#0b3d2e] to-[#0a5c3f] rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                            <info.icon className="w-6 h-6 text-yellow-400" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-900 mb-1">{info.label}</h3>
                                            {info.link ? (
                                                <a href={info.link} className="text-gray-600 hover:text-yellow-600 transition-colors break-words">
                                                    {info.value}
                                                </a>
                                            ) : (
                                                <p className="text-gray-600 break-words">{info.value}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Business Hours */}
                        <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-3xl p-8 shadow-2xl text-[#0b3d2e]">
                            <h2 className="text-3xl font-bold mb-6">Business Hours</h2>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold">Monday - Friday</span>
                                    <span className="font-bold">9:00 AM - 6:00 PM</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold">Saturday</span>
                                    <span className="font-bold">9:00 AM - 2:00 PM</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold">Sunday</span>
                                    <span className="font-bold">Closed</span>
                                </div>
                                <div className="mt-4 pt-4 border-t-2 border-[#0b3d2e]/20">
                                    <p className="text-center font-bold text-lg">
                                        Emergency Helpline: 24/7
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slide-in-left {
                    from { opacity: 0; transform: translateX(-50px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                @keyframes slide-in-right {
                    from { opacity: 0; transform: translateX(50px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .animate-fade-in { animation: fade-in 0.8s ease-out; }
                .animate-slide-in-left { animation: slide-in-left 0.8s ease-out; }
                .animate-slide-in-right { animation: slide-in-right 0.8s ease-out 0.2s backwards; }
            `}</style>
        </div>
    );
}