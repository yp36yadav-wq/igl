"use client";
import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import BookingModal from '@/components/BookingModel'; // ✅ Import BookingModal


// ✅ TypewriterText component
const TypewriterText = ({ text }) => {
    const [displayText, setDisplayText] = useState('');
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < text.length) {
            const timeout = setTimeout(() => {
                setDisplayText((prev) => prev + text[index]);
                setIndex((prev) => prev + 1);
            }, 50);
            return () => clearTimeout(timeout);
        }
    }, [index, text]);

    return (
        <span>
            {displayText}
            <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-1 h-8 md:h-12 bg-yellow-500 ml-1 align-middle"
            />
        </span>
    );
};

// ✅ UPDATED Hero with white background and black text
const Hero = () => {
    const texts = [
        "Welcome to IGL",
        "Book your appointment in three simple steps"
    ];
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [key, setKey] = useState(0);

    // ✅ Modal state
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentTextIndex((prev) => (prev + 1) % texts.length);
            setKey((prev) => prev + 1);
        }, 5000);

        return () => clearTimeout(timer);
    }, [currentTextIndex]);

    // ✅ Modal handlers
    const openBookingModal = () => {
        setIsBookingModalOpen(true);
    };

    const closeBookingModal = () => {
        setIsBookingModalOpen(false);
    };

    return (
        <>
            <section 
                id="home" 
                className="relative bg-gradient-to-br from-[#0b3d2e] via-[#0a2f23] to-[#083821] py-20 sm:py-24 lg:py-32 overflow-hidden min-h-[500px] sm:min-h-[600px] flex items-center justify-center"
            >
                {/* Subtle pattern overlay */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[length:24px_24px]"></div>
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    {/* Main Heading with Typewriter */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 tracking-tight min-h-[100px] sm:min-h-[120px] flex items-center justify-center">
                        <span className="text-yellow-500">
                            <TypewriterText key={key} text={texts[currentTextIndex]} />
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-base sm:text-lg md:text-xl text-yellow-500 mb-6 sm:mb-8 max-w-2xl mx-auto px-4 leading-relaxed">
                        Experience the best in class fuel delivery and vehicle maintenance. Fast, reliable, and always ready to optimize your journey.
                    </p>

                    {/* CTA Button */}
                     <button
                        onClick={openBookingModal}
                        className="group bg-white  text-black px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center mx-auto gap-2 hover:-translate-y-0.5 active:translate-y-0"
                    >
                        Book Appointment
                        <ArrowRight className="group-hover:translate-x-1 transition-transform w-5 h-5 sm:w-6 sm:h-6" />
                    </button> 

                    {/* Decorative Elements */}
                    <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
                        <div className="text-center p-4 sm:p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                            <div className="text-3xl sm:text-4xl font-bold text-green-950 mb-2">Fast</div>
                            <p className="text-sm sm:text-base text-black">Quick Service</p>
                        </div>
                        <div className="text-center p-4 sm:p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                            <div className="text-3xl sm:text-4xl font-bold text-green-950 mb-2">Reliable</div>
                            <p className="text-sm sm:text-base text-black">Trusted Quality</p>
                        </div>
                        <div className="text-center p-4 sm:p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                            <div className="text-3xl sm:text-4xl font-bold text-green-950 mb-2">24/7</div>
                            <p className="text-sm sm:text-base text-black">Always Available</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ✅ Render BookingModal */}
            <BookingModal
                isOpen={isBookingModalOpen}
                onClose={closeBookingModal}
            />
        </>
    );
};

export default Hero;