"use client";

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';

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
        { name: 'Helpline', href: '/helpline' },
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
                'fixed top-0 left-0 right-0 z-50 border-b bg-yellow-500',
                isScrolled
                    ? 'border-gray-800 shadow-lg py-2'
                    : 'border-gray-900 shadow-sm py-3'
            )}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                {/* Logo */}
                <a 
                    href="#home" 
                    onClick={(e) => handleScrollTo(e, '#home')} 
                    className="flex items-center space-x-3"
                >
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full p-1.5 shadow-lg">
                        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                            {/* Sun rays */}
                            <path d="M100 30 L100 10" stroke="#FDB913" strokeWidth="6" strokeLinecap="round"/>
                            <path d="M145 45 L158 32" stroke="#FDB913" strokeWidth="6" strokeLinecap="round"/>
                            <path d="M170 100 L190 100" stroke="#FDB913" strokeWidth="6" strokeLinecap="round"/>
                            <path d="M145 155 L158 168" stroke="#FDB913" strokeWidth="6" strokeLinecap="round"/>
                            <path d="M100 170 L100 190" stroke="#FDB913" strokeWidth="6" strokeLinecap="round"/>
                            <path d="M55 155 L42 168" stroke="#FDB913" strokeWidth="6" strokeLinecap="round"/>
                            <path d="M30 100 L10 100" stroke="#FDB913" strokeWidth="6" strokeLinecap="round"/>
                            <path d="M55 45 L42 32" stroke="#FDB913" strokeWidth="6" strokeLinecap="round"/>
                            
                            {/* Longer diagonal rays */}
                            <path d="M130 65 L145 50" stroke="#FDB913" strokeWidth="5" strokeLinecap="round"/>
                            <path d="M70 65 L55 50" stroke="#FDB913" strokeWidth="5" strokeLinecap="round"/>
                            <path d="M130 135 L145 150" stroke="#FDB913" strokeWidth="5" strokeLinecap="round"/>
                            <path d="M70 135 L55 150" stroke="#FDB913" strokeWidth="5" strokeLinecap="round"/>
                            
                            {/* Yellow circle */}
                            <circle cx="100" cy="100" r="45" fill="#FDB913"/>
                            
                            {/* Green orbit */}
                            <ellipse cx="100" cy="100" rx="55" ry="20" fill="none" stroke="#006838" strokeWidth="5" transform="rotate(-30 100 100)"/>
                            
                            {/* IGL text */}
                            <text x="100" y="110" fontFamily="Georgia, serif" fontSize="40" fontWeight="bold" fill="#CC0000" textAnchor="middle" fontStyle="italic">igl</text>
                        </svg>
                    </div>
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
                    <Link
                        href="/helpline"
                        className="text-sm lg:text-lg font-medium text-white hover:text-black"
                    >
                        Helpline
                    </Link>
                    
                    <a 
                        href="#booking"
                        onClick={(e) => handleScrollTo(e, '#booking')}
                        className="bg-white text-black px-5 py-2.5 rounded-lg text-sm lg:text-base font-medium hover:bg-gray-200 shadow-lg"
                    >
                        Book Now
                    </a>
                    <a
                    
                        href="#login"
                        onClick={(e) => handleScrollTo(e, '#login')}
                        className="bg-white text-black px-5 py-2.5 rounded-lg text-sm lg:text-base font-medium hover:bg-gray-200 shadow-lg"
                    >
                        Login
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-white hover:bg-gray-800 rounded-lg"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-black border-b border-gray-800 shadow-xl">
                    <div className="container mx-auto px-4 py-4 flex flex-col space-y-2">
                        <Link
                            href="/helpline"
                            className="text-white font-medium p-3 hover:bg-gray-800 rounded-lg"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Helpline
                        </Link>
                        
                        <a 
                            href="#booking"
                            onClick={(e) => handleScrollTo(e, '#booking')}
                            className="bg-white text-black px-5 py-3 rounded-lg text-center font-medium hover:bg-gray-200 mt-2"
                        >
                            Book Now
                        </a>

                        <a 
                            href="#login"
                            onClick={(e) => handleScrollTo(e, '#login')}
                            className="bg-white text-black px-5 py-3 rounded-lg text-center font-medium hover:bg-gray-200"
                        >
                            Login
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;