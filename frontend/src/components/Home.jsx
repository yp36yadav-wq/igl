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

    // Scale Up animation variants
    const scaleUpVariants = {
        hidden: { opacity: 0, scale: 0.5 },
        visible: { 
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: [0.34, 1.56, 0.64, 1] // Bouncy easing
            }
        }
    };

    const scaleUpSlowVariants = {
        hidden: { opacity: 0, scale: 0.7 },
        visible: { 
            opacity: 1,
            scale: 1,
            transition: {
                duration: 1.2,
                ease: "easeOut"
            }
        }
    };

    const scaleUpBounceVariants = {
        hidden: { opacity: 0, scale: 0.3 },
        visible: { 
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: [0.68, -0.55, 0.265, 1.55] // Elastic bounce
            }
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    return (
        <section id="home" className="relative bg-gradient-to-br from-green-900 to-green-700 text-white py-24 lg:py-32 overflow-hidden h-[600px] flex items-center justify-center">
            {/* Animated Background Image with scale up */}
            <motion.div 
                className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574169208538-4f4f7d39c031?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"
                initial={{ opacity: 0, scale: 1.2 }}
                animate={{ 
                    opacity: 0.1,
                    scale: 1
                }}
                transition={{
                    duration: 1.5,
                    ease: "easeOut"
                }}
            />

            {/* Animated Gradient Orbs with scale up */}
            <motion.div
                className="absolute top-20 left-20 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0, scale: 0 },
                    visible: { 
                        opacity: 0.2,
                        scale: 1,
                        transition: {
                            duration: 1.5,
                            ease: [0.34, 1.56, 0.64, 1]
                        }
                    }
                }}
            />
            <motion.div
                className="absolute bottom-20 right-20 w-96 h-96 bg-green-300/20 rounded-full blur-3xl"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0, scale: 0 },
                    visible: { 
                        opacity: 0.2,
                        scale: 1,
                        transition: {
                            duration: 1.5,
                            delay: 0.2,
                            ease: [0.34, 1.56, 0.64, 1]
                        }
                    }
                }}
            />

            {/* Floating particles with scale up */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(25)].map((_, i) => (
                    <motion.div
                        key={`particle-${i}`}
                        className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: [0, 0.6, 0],
                            scale: [0, 1.5, 0],
                            y: [-20, -100, -20],
                            x: [0, Math.random() * 50 - 25, 0],
                        }}
                        transition={{
                            duration: Math.random() * 5 + 5,
                            repeat: Infinity,
                            delay: Math.random() * 3 + 1,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>

            {/* Grid pattern animation with scale up */}
            <motion.div 
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage: `linear-gradient(rgba(234, 179, 8, 0.3) 1px, transparent 1px),
                                     linear-gradient(90deg, rgba(234, 179, 8, 0.3) 1px, transparent 1px)`,
                    backgroundSize: '50px 50px',
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                    opacity: 0.05,
                    scale: 1
                }}
                transition={{
                    duration: 1.5,
                    ease: "easeOut"
                }}
            />

            {/* Main content container with stagger scale up animation */}
            <motion.div 
                className="container mx-auto px-4 relative z-10 text-center"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                {/* Heading with scale up bounce animation */}
                <motion.h1 
                    className="text-4xl md:text-6xl font-bold mb-6 tracking-tight min-h-[120px] flex items-center justify-center"
                    variants={scaleUpBounceVariants}
                >
                    <motion.span 
                        className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            textShadow: [
                                "0 0 20px rgba(234, 179, 8, 0.3)",
                                "0 0 40px rgba(234, 179, 8, 0.5)",
                                "0 0 20px rgba(234, 179, 8, 0.3)"
                            ]
                        }}
                        transition={{
                            opacity: { duration: 0.8, ease: "easeOut" },
                            scale: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] },
                            textShadow: {
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.8
                            }
                        }}
                    >
                        <TypewriterText key={key} text={texts[currentTextIndex]} />
                    </motion.span>
                </motion.h1>

                {/* Description with scale up animation */}
                <motion.p 
                    className="text-lg md:text-xl text-yellow-50 mb-8 max-w-2xl mx-auto"
                    variants={scaleUpVariants}
                >
                    Experience the best in class fuel delivery and vehicle maintenance. Fast, reliable, and always ready to optimize your journey.
                </motion.p>

                {/* Button with scale up animation */}
                <motion.div
                    variants={scaleUpSlowVariants}
                    className="relative inline-block"
                >
                    {/* Button glow effect with scale up */}
                    <motion.div
                        className="absolute inset-0 bg-yellow-400/30 rounded-xl blur-xl -z-10"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{
                            opacity: [0, 0.5, 0.8, 0.5],
                            scale: [0.8, 1, 1.2, 1],
                        }}
                        transition={{
                            opacity: { duration: 1.2 },
                            scale: {
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 1
                            }
                        }}
                    />

                    <motion.button 
                        onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })} 
                        className="group bg-yellow-500 hover:bg-yellow-600 text-green-900 px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-[0_0_40px_-10px_rgba(234,179,8,0.5)] hover:shadow-[0_0_60px_-15px_rgba(234,179,8,0.6)] flex items-center justify-center mx-auto gap-2 relative overflow-hidden"
                        whileHover={{ 
                            scale: 1.08,
                            y: -3,
                        }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {/* Shimmer effect on button */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            initial={{ x: "-200%", opacity: 0 }}
                            animate={{
                                x: ["-200%", "200%"],
                                opacity: [0, 1, 0]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatDelay: 1,
                                ease: "easeInOut",
                                delay: 1.5
                            }}
                        />

                        <span className="relative z-10">Book Appointment</span>
                        
                        {/* Animated arrow with scale up */}
                        <motion.div
                            className="relative z-10"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ 
                                opacity: 1,
                                scale: 1,
                                x: [0, 5, 0],
                            }}
                            transition={{ 
                                opacity: { duration: 0.5, delay: 0.8 },
                                scale: { duration: 0.5, delay: 0.8, ease: [0.34, 1.56, 0.64, 1] },
                                x: {
                                    duration: 1.5, 
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 1.5
                                }
                            }}
                        >
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </motion.div>
                    </motion.button>
                </motion.div>
            </motion.div>

            {/* Animated scroll indicator with scale up */}
            <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
                initial={{ opacity: 0, scale: 0, y: -20 }}
                animate={{ 
                    opacity: [0, 0.4, 1, 0.4],
                    scale: 1,
                    y: [0, 10, 0]
                }}
                transition={{
                    opacity: { duration: 2, delay: 1 },
                    scale: { duration: 0.8, delay: 1, ease: [0.34, 1.56, 0.64, 1] },
                    y: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                    }
                }}
            >
                <motion.div 
                    className="w-6 h-10 border-2 border-yellow-400 rounded-full flex justify-center relative"
                    whileHover={{ 
                        scale: 1.3,
                        borderColor: "rgb(234, 179, 8)"
                    }}
                >
                    <motion.div
                        className="w-1.5 h-3 bg-yellow-400 rounded-full mt-2"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: [0, 1, 0.3, 1],
                            scale: 1,
                            y: [0, 16, 0],
                        }}
                        transition={{
                            opacity: { duration: 1, delay: 1.5 },
                            scale: { duration: 0.5, delay: 1.5, ease: [0.34, 1.56, 0.64, 1] },
                            y: {
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 2
                            }
                        }}
                    />
                    
                    {/* Scroll indicator glow with scale up */}
                    <motion.div
                        className="absolute inset-0 rounded-full bg-yellow-400/20 blur-md"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: [0, 0.5, 0, 0.5],
                            scale: [0.5, 1, 1.4, 1],
                        }}
                        transition={{
                            opacity: { duration: 1, delay: 1.5 },
                            scale: {
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 2
                            }
                        }}
                    />
                </motion.div>
            </motion.div>
        </section>
    )
}

export default Hero