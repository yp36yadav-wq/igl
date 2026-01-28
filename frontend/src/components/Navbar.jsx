"use client";

import { useState, useEffect } from 'react';
import { Fuel, Menu, X } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        { name: 'Booking', href: '#booking' },
    ];

    const handleScrollTo = (e, href) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <nav
            className={twMerge(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
                isScrolled
                    ? 'bg-white/70 backdrop-blur-lg border-slate-200 shadow-sm py-2'
                    : 'bg-transparent border-transparent py-4'
            )}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                <a href="#home" onClick={(e) => handleScrollTo(e, '#home')} className="flex items-center space-x-2 text-blue-600 group">
                    <div className="bg-blue-600/10 p-2 rounded-lg group-hover:bg-blue-600/20 transition-colors">
                        <Fuel className="h-6 w-6" />
                    </div>
                    <span className={clsx("text-xl font-bold tracking-tight transition-colors", isScrolled ? "text-slate-900" : "text-white")}>
                        I J L Fuel Pump
                    </span>
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleScrollTo(e, link.href)}
                            className={clsx(
                                "text-sm font-medium transition-all hover:-translate-y-0.5",
                                isScrolled ? "text-slate-600 hover:text-blue-600" : "text-slate-200 hover:text-white"
                            )}
                        >
                            {link.name}
                        </a>
                    ))}
                    <a
                        href="#booking"
                        onClick={(e) => handleScrollTo(e, '#booking')}
                        className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 active:translate-y-0"
                    >
                        Book Now
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-slate-500"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu className={isScrolled ? "text-slate-900" : "text-white"} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-100 shadow-xl p-4 flex flex-col space-y-4 animate-in slide-in-from-top-5">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleScrollTo(e, link.href)}
                            className="text-slate-600 font-medium p-2 hover:bg-slate-50 rounded-lg"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>
            )}
        </nav>
    )
}

export default Navbar