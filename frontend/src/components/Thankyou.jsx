"use client";
import { useRouter } from 'next/navigation';

export default function ThankYouPage() {
    const router = useRouter();

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0b3d2e] via-[#0a2f23] to-[#083821]">
            {/* Main Container */}
            <div className="relative z-10 bg-white rounded-[30px] p-10 md:p-16 max-w-[500px] w-[90%] shadow-[0_50px_100px_rgba(0,0,0,0.3)]">
                {/* IGL Logo */}
                <div className="w-[120px] h-[120px] mx-auto mb-8 bg-white rounded-full p-5 shadow-lg">
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
                <div className="w-[100px] h-[100px] bg-gradient-to-br from-[#0b3d2e] to-[#0a5c3f] rounded-full mx-auto mb-8 flex items-center justify-center shadow-[0_20px_40px_rgba(11,61,46,0.3)]">
                    <div className="w-12 h-12 relative">
                        <div className="absolute w-5 h-12 border-r-[5px] border-b-[5px] border-yellow-400 rotate-45" />
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-5xl md:text-6xl font-black text-center mb-4 bg-gradient-to-r from-[#0b3d2e] to-[#0a5c3f] bg-clip-text text-transparent tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Thank You!
                </h1>

                {/* Subtitle */}
                <p className="text-lg text-gray-600 text-center mb-8 leading-relaxed">
                    Your meeting has been <span className="text-yellow-500 font-bold">successfully confirmed</span>. 
                    We&apos;re excited to serve you at IGL!
                </p>

                {/* Decorative Divider */}
                <div className="w-20 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto my-8 rounded" />

                {/* Info Text */}
                <p className="text-sm text-gray-500 text-center leading-relaxed">
                    You will receive a confirmation message shortly with your meeting details.<br />
                </p>

                {/* Action Button */}
                <div className="text-center mt-8">
                    <button
                        onClick={() => router.push('/')}
                        className="bg-gradient-to-r from-yellow-400 to-yellow-300 text-[#0b3d2e] font-bold text-base px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 active:translate-y-0"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
}