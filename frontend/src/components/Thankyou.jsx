"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ThankYouPage() {
    const router = useRouter();
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        // Generate particles
        const newParticles = Array.from({ length: 20 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            delay: Math.random() * 5,
            duration: Math.random() * 10 + 10,
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-x-hidden bg-gradient-to-br from-[#0b3d2e] via-[#0a2f23] to-[#083821]">
            {/* Animated background pattern */}
            <div className="absolute inset-0 bg-gradient-radial from-yellow-400/10 via-transparent to-transparent animate-pulse-slow" />
            
            {/* Floating particles */}
            {particles.map((particle) => (
                <div
                    key={particle.id}
                    className="absolute w-1 h-1 bg-yellow-400/40 rounded-full animate-float"
                    style={{
                        left: `${particle.left}%`,
                        animationDelay: `${particle.delay}s`,
                        animationDuration: `${particle.duration}s`,
                    }}
                />
            ))}

            {/* Main Container */}
            <div className="relative z-10 bg-white rounded-[30px] p-10 md:p-16 max-w-[500px] w-[90%] shadow-[0_50px_100px_rgba(0,0,0,0.3),0_0_0_1px_rgba(234,179,8,0.1),inset_0_1px_0_rgba(255,255,255,0.9)] animate-container-enter overflow-hidden">
                {/* Decorative corner */}
                <div className="absolute -top-12 -right-12 w-[150px] h-[150px] bg-gradient-to-br from-yellow-400 to-yellow-300 rounded-full opacity-20 animate-corner-pulse" />

                {/* IGL Logo */}
                <div className="w-[120px] h-[120px] mx-auto mb-8 bg-white rounded-full p-5 shadow-lg animate-logo-float">
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

                {/* Success Icon */}
                <div className="w-[100px] h-[100px] bg-gradient-to-br from-[#0b3d2e] to-[#0a5c3f] rounded-full mx-auto mb-8 flex items-center justify-center relative animate-icon-bounce shadow-[0_20px_40px_rgba(11,61,46,0.3),0_0_0_15px_rgba(234,179,8,0.1),inset_0_-5px_10px_rgba(0,0,0,0.2)]">
                    <div className="w-12 h-12 relative">
                        <div className="absolute w-5 h-12 border-r-[5px] border-b-[5px] border-yellow-400 rotate-45 animate-checkmark-draw" />
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-5xl md:text-6xl font-black text-center mb-4 bg-gradient-to-r from-[#0b3d2e] to-[#0a5c3f] bg-clip-text text-transparent animate-title-slide tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Thank You!
                </h1>

                {/* Subtitle */}
                <p className="text-lg text-gray-600 text-center mb-8 leading-relaxed animate-subtitle-fade">
                    Your meeting has been <span className="text-yellow-500 font-bold">successfully confirmed</span>. 
                    We&apos;re excited to serve you at IGL!
                </p>

                {/* Decorative Divider */}
                <div className="w-20 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto my-8 rounded animate-divider-expand" />

                {/* Info Text */}
                <p className="text-sm text-gray-500 text-center leading-relaxed animate-info-fade">
                    You will receive a confirmation message shortly with your meeting  details.<br />
                    
                </p>

                {/* Features */}
                
                {/* Action Button */}
                <div className="text-center mt-8">
                    <button
                        onClick={() => router.push('/')}
                        className="relative inline-block bg-gradient-to-r from-yellow-400 to-yellow-300 text-[#0b3d2e] font-bold text-base px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 active:translate-y-0 animate-button-pop overflow-hidden group"
                    >
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                        <span className="relative z-10">Back to Home</span>
                    </button>
                </div>
            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0) translateX(0);
                        opacity: 0;
                    }
                    10% {
                        opacity: 1;
                    }
                    90% {
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(-100vh) translateX(50px);
                        opacity: 0;
                    }
                }

                @keyframes container-enter {
                    from {
                        opacity: 0;
                        transform: scale(0.8) translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1) translateY(0);
                    }
                }

                @keyframes corner-pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.2); }
                }

                @keyframes icon-bounce {
                    from {
                        opacity: 0;
                        transform: scale(0) rotate(-180deg);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1) rotate(0deg);
                    }
                }

                @keyframes checkmark-draw {
                    from {
                        transform: rotate(45deg) scale(0);
                    }
                    to {
                        transform: rotate(45deg) scale(1);
                    }
                }

                @keyframes logo-float {
                    from {
                        opacity: 0;
                        transform: translateY(-50px) scale(0.5);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }

                @keyframes title-slide {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes subtitle-fade {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes divider-expand {
                    from {
                        width: 0;
                        opacity: 0;
                    }
                    to {
                        width: 5rem;
                        opacity: 1;
                    }
                }

                @keyframes info-fade {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                @keyframes features-slide {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes button-pop {
                    from {
                        opacity: 0;
                        transform: scale(0.8);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                .animate-float {
                    animation: float 15s infinite;
                }

                .animate-container-enter {
                    animation: container-enter 1s cubic-bezier(0.34, 1.56, 0.64, 1);
                }

                .animate-corner-pulse {
                    animation: corner-pulse 3s ease-in-out infinite;
                }

                .animate-icon-bounce {
                    animation: icon-bounce 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s;
                }

                .animate-checkmark-draw {
                    animation: checkmark-draw 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.8s forwards;
                }

                .animate-logo-float {
                    animation: logo-float 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s;
                }

                .animate-title-slide {
                    animation: title-slide 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s backwards;
                }

                .animate-subtitle-fade {
                    animation: subtitle-fade 0.8s ease 0.7s backwards;
                }

                .animate-divider-expand {
                    animation: divider-expand 0.8s ease 0.9s backwards;
                }

                .animate-info-fade {
                    animation: info-fade 0.8s ease 1.1s backwards;
                }

                .animate-features-slide {
                    animation: features-slide 0.8s ease 1.5s backwards;
                }

                .animate-button-pop {
                    animation: button-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 1.3s backwards;
                }

                .animate-pulse-slow {
                    animation: pulse 8s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}