// components/Footer.jsx

export default function Footer() {
  return (
    <footer className="bg-[#0b3d2e] text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Logo & About */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center text-[#0b3d2e] font-bold text-xl">
              ILG
            </div>
            <h2 className="text-2xl font-bold text-yellow-400">ILG Company</h2>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">
            ILG is a modern platform for easy appointment booking with smart scheduling and user-friendly experience.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-yellow-400 mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="hover:text-yellow-400 cursor-pointer transition">Home</li>
            <li className="hover:text-yellow-400 cursor-pointer transition">About Us</li>
            <li className="hover:text-yellow-400 cursor-pointer transition">Services</li>
            <li className="hover:text-yellow-400 cursor-pointer transition">Contact</li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold text-yellow-400 mb-4">Our Services</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="hover:text-yellow-400 transition">Online Appointment</li>
            <li className="hover:text-yellow-400 transition">Time Slot Booking</li>
            <li className="hover:text-yellow-400 transition">Customer Support</li>
            <li className="hover:text-yellow-400 transition">Smart Scheduling</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-yellow-400 mb-4">Contact Us</h3>
          <p className="text-gray-300 text-sm mb-2">📍 New Delhi, India</p>
          <p className="text-gray-300 text-sm mb-2">📞 +91 98765 43210</p>
          <p className="text-gray-300 text-sm mb-4">✉️ info@ilg.com</p>

          {/* Social Icons */}
          <div className="flex gap-3">
            <div className="w-9 h-9 rounded-full bg-yellow-400 text-[#0b3d2e] flex items-center justify-center font-bold cursor-pointer hover:scale-110 transition">
              F
            </div>
            <div className="w-9 h-9 rounded-full bg-yellow-400 text-[#0b3d2e] flex items-center justify-center font-bold cursor-pointer hover:scale-110 transition">
              I
            </div>
            <div className="w-9 h-9 rounded-full bg-yellow-400 text-[#0b3d2e] flex items-center justify-center font-bold cursor-pointer hover:scale-110 transition">
              T
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-green-700 mt-10 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} ILG Company. All Rights Reserved.
      </div>
    </footer>
  );
}