'use client';

import React, { useState } from 'react';

export default function LoginForm() {
  const [employeeId, setEmployeeId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log('Login submitted:', { employeeId, email, password });
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    // Add your login logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
      
      <div className="relative w-full max-w-md bg-white/80 backdrop-blur-xl border border-white/40 rounded-3xl shadow-2xl p-8 sm:p-10 space-y-8 transform hover:scale-[1.02] transition-all duration-500">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Employee Portal
            </h2>
            <p className="text-gray-600 text-sm">Sign in to your account securely</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Employee ID */}
          <div className="relative">
            <label htmlFor="employeeId" className="block text-sm font-semibold text-gray-800 mb-2">
              Employee ID
            </label>
            <input
              id="employeeId"
              type="text"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              placeholder="EMP-12345"
              className="w-full px-4 py-4 bg-gradient-to-r from-gray-50/50 to-white/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 text-gray-800 placeholder-gray-400 backdrop-blur-sm shadow-sm hover:shadow-md"
              required
            />
          </div>

          {/* Email */}
          <div className="relative">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className="w-full px-4 py-4 bg-gradient-to-r from-gray-50/50 to-white/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 text-gray-800 placeholder-gray-400 backdrop-blur-sm shadow-sm hover:shadow-md"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-800 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-4 pr-12 bg-gradient-to-r from-gray-50/50 to-white/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 text-gray-800 placeholder-gray-400 backdrop-blur-sm shadow-sm hover:shadow-md"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-indigo-600 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Forgot Password & Remember Me */}
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 text-sm">
              <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
              <span className="text-gray-700 font-medium">Remember me</span>
            </label>
            <a href="#" className="text-sm font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="group w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white font-bold py-4 px-6 rounded-2xl shadow-xl hover:shadow-2xl hover:from-indigo-700 hover:via-purple-700 hover:to-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                <span>Sign In</span>
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center pt-6 border-t border-gray-200/50">
          <p className="text-xs text-gray-500">
            © 2026 Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
