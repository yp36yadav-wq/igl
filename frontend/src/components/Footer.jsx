import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-black text-white p-9 px-6 border-t border-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Connect With Us Section */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-6">
            Connect With Us
          </h2>
          <div className="w-16 h-1 bg-white mb-8"></div>
          
          <div className="space-y-6">
            {/* Email */}
            <div className="flex items-start gap-4 group cursor-pointer">
              <svg className="w-6 h-6 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
              </svg>
              <a 
                href="mailto:support@iglsmartcard.com" 
                className="text-lg transition-colors duration-300 group-hover:text-gray-400"
              >
                support@iglsmartcard.com
              </a>
            </div>

            {/* Phone 1 */}
            <div className="flex items-start gap-4 group cursor-pointer">
              <svg className="w-6 h-6 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
              </svg>
              <a 
                href="tel:+911204844761" 
                className="text-lg transition-colors duration-300 group-hover:text-gray-400"
              >
                +91-120-4844761
              </a>
            </div>

            {/* Address */}
            <div className="flex items-start gap-4 group cursor-pointer">
              <svg className="w-6 h-6 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
              </svg>
              <p className="text-lg transition-colors duration-300 group-hover:text-gray-400">
                IGL Bhawan, Plot No 4, Community Center, R. K. Puram, Sector 9, RK Puram, New Delhi, Delhi 110022
              </p>
            </div>

            {/* Phone 2 */}
            <div className="flex items-start gap-4 group cursor-pointer">
              <svg className="w-6 h-6 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
              </svg>
              <a 
                href="tel:+911146074607" 
                className="text-lg transition-colors duration-300 group-hover:text-gray-400"
              >
                +91-11-46074607
              </a>
            </div>
          </div>
        </div>

        {/* Our Location Section */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-6">
            Our Location
          </h2>
          <div className="w-16 h-1 bg-white mb-8"></div>
          
          <div className="rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.8739087631844!2d77.18153631508076!3d28.558885582445757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1d9b1c6f6f6f%3A0x1c6f6f6f6f6f6f6f!2sIndraprastha%20Gas%20Limited!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Our Location Map"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-700 text-center">
        <p className="text-gray-400">
          © {new Date().getFullYear()} IGL Smart Card. All rights reserved.
        </p>
      </div>
    </footer>
  );
}