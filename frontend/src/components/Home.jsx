"use client";
import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TypewriterText = ({ text }) => {
    const [displayText, setDisplayText] = useState('');
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < text.length) {
            const timeout = setTimeout(() => {
                setDisplayText((prev) => prev + text[index]);
                setIndex((prev) => prev + 1);
            }, 50); // Typing speed
            return () => clearTimeout(timeout);
        }
    }, [index, text]);

    return (
        <span>
            {displayText}
            <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-1 h-8 md:h-12 bg-yellow-400 ml-1 align-middle"
            />
        </span>
    );
};

const Hero = () => {
    const texts = [
        "Welcome to our company",
        "Book your appointment in three simple steps"
    ];
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [key, setKey] = useState(0); // Force re-render for typewriter effect

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentTextIndex((prev) => (prev + 1) % texts.length);
            setKey((prev) => prev + 1);
        }, 5000); // Time to display text before switching

        return () => clearTimeout(timer);
    }, [currentTextIndex]);

    return (
        <section id="home" className="relative bg-gradient-to-br from-green-900 to-green-700 text-white py-24 lg:py-32 overflow-hidden h-[600px] flex items-center justify-center">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574169208538-4f4f7d39c031?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
            <div className="container mx-auto px-4 relative z-10 text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight min-h-[120px] flex items-center justify-center">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
                        <TypewriterText key={key} text={texts[currentTextIndex]} />
                    </span>
                </h1>
                <p className="text-lg md:text-xl text-yellow-50 mb-8 max-w-2xl mx-auto">
                    Experience the best in class fuel delivery and vehicle maintenance. Fast, reliable, and always ready to optimize your journey.
                </p>
                <button onClick={() => document.getElementById('booking').scrollIntoView({ behavior: 'smooth' })} className="group bg-yellow-500 hover:bg-yellow-600 text-green-900 px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-[0_0_40px_-10px_rgba(234,179,8,0.5)] hover:shadow-[0_0_60px_-15px_rgba(234,179,8,0.6)] flex items-center justify-center mx-auto gap-2">
                    Book Appointment
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </section>
    )
}

export default Hero