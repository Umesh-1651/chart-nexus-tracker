
import { useState } from 'react';
import { LoginPage } from './LoginPage';
import { SignupPage } from './SignupPage';
import { GlassHeader } from '../Layout/GlassHeader';

interface AuthPageProps {
  onLogin: (email: string, password: string) => void;
  onSignup: (email: string, password: string, fullName: string) => void;
  onStartTrading?: () => void;
}

export function AuthPage({ onLogin, onSignup, onStartTrading }: AuthPageProps) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-lime-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      <GlassHeader showAuth={true} onStartTrading={onStartTrading} />
      
      <div className="relative z-10 pt-20 px-4 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-5rem)]">
            {/* Left Side - Content */}
            <div className="order-2 lg:order-1 space-y-6 lg:space-y-8 text-center lg:text-left">
              <div className="space-y-4 lg:space-y-6">
                <div className="inline-block px-4 py-2 bg-lime-500/20 rounded-full border border-lime-500/30">
                  <span className="text-lime-400 text-sm font-medium">🇮🇳 India's Next-Gen Trading Platform</span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-emerald-500 to-lime-600 leading-tight">
                  {isLogin ? 'Welcome Back to' : 'Join'} TradeTracker
                </h1>
                
                <p className="text-gray-300 text-lg sm:text-xl lg:text-2xl leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Experience seamless trading on NSE & BSE with real-time analytics, 
                  institutional-grade security, and AI-powered insights.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 max-w-2xl mx-auto lg:mx-0">
                <div className="group p-4 lg:p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-lime-500/30 transition-all duration-300 hover:bg-white/10 transform hover:scale-105">
                  <div className="w-12 h-12 bg-lime-500/20 rounded-xl flex items-center justify-center mb-3 group-hover:bg-lime-500/30 transition-colors">
                    <span className="text-lime-400 text-xl">📈</span>
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">Real-time NSE Data</h3>
                  <p className="text-gray-400 text-sm">Live market data in IST timezone</p>
                </div>
                
                <div className="group p-4 lg:p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-lime-500/30 transition-all duration-300 hover:bg-white/10 transform hover:scale-105">
                  <div className="w-12 h-12 bg-lime-500/20 rounded-xl flex items-center justify-center mb-3 group-hover:bg-lime-500/30 transition-colors">
                    <span className="text-lime-400 text-xl">🛡️</span>
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">SEBI Compliant</h3>
                  <p className="text-gray-400 text-sm">Bank-level security standards</p>
                </div>
                
                <div className="group p-4 lg:p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-lime-500/30 transition-all duration-300 hover:bg-white/10 transform hover:scale-105">
                  <div className="w-12 h-12 bg-lime-500/20 rounded-xl flex items-center justify-center mb-3 group-hover:bg-lime-500/30 transition-colors">
                    <span className="text-lime-400 text-xl">🤖</span>
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">AI Analytics</h3>
                  <p className="text-gray-400 text-sm">Smart trading recommendations</p>
                </div>
                
                <div className="group p-4 lg:p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-lime-500/30 transition-all duration-300 hover:bg-white/10 transform hover:scale-105">
                  <div className="w-12 h-12 bg-lime-500/20 rounded-xl flex items-center justify-center mb-3 group-hover:bg-lime-500/30 transition-colors">
                    <span className="text-lime-400 text-xl">💰</span>
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">Zero Commission</h3>
                  <p className="text-gray-400 text-sm">Start with ₹0 trading fees</p>
                </div>
              </div>
            </div>

            {/* Right Side - Auth Form */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="w-full max-w-md">
                {isLogin ? (
                  <LoginPage 
                    onLogin={onLogin} 
                    onSwitchToSignup={() => setIsLogin(false)} 
                  />
                ) : (
                  <SignupPage 
                    onSignup={onSignup} 
                    onSwitchToLogin={() => setIsLogin(true)} 
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
