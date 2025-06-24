
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Shield, Lock, Users, TrendingUp } from 'lucide-react';
import { GlassHeader } from '../Layout/GlassHeader';
import { AnimatedChart } from './AnimatedChart';

interface AuthPageProps {
  onLogin: (email: string, password: string) => void;
  onSignup: (email: string, password: string, fullName: string) => void;
}

export function AuthPage({ onLogin, onSignup }: AuthPageProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      onLogin(email, password);
    } else {
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      onSignup(email, password, fullName);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setFullName('');
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white overflow-hidden">
      <GlassHeader showAuth={true} />
      
      <div className="pt-24 px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-96px)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 h-full items-center">
            {/* Left Side - Features & Charts */}
            <div className="order-2 lg:order-1">
              <div className="mb-6 lg:mb-8">
                <div className="inline-block px-3 py-1 sm:px-4 sm:py-2 bg-lime-500/20 rounded-full border border-lime-500/30 mb-4 lg:mb-6">
                  <span className="text-lime-400 text-xs sm:text-sm font-medium">🇮🇳 Next-gen AI assisted trading platform</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 lg:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-500">
                  {isLogin ? 'Trade assets with confidence & security' : 'Join TradeTracker India'}
                </h2>
                <p className="text-gray-300 text-sm sm:text-base lg:text-lg xl:text-xl mb-6 lg:mb-8 leading-relaxed">
                  {isLogin 
                    ? 'Experience seamless and profitable trading with advanced features, real-time analytics, and institutional-grade security.'
                    : 'Get access to institutional-grade trading tools and analytics for NSE and BSE markets with real-time data in IST timezone.'
                  }
                </p>
              </div>
              
              {isLogin ? (
                <AnimatedChart />
              ) : (
                <div className="space-y-4 lg:space-y-6">
                  <div className="flex items-start space-x-3 lg:space-x-4 p-3 lg:p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                    <div className="w-8 h-8 lg:w-12 lg:h-12 bg-lime-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield className="text-lime-500 w-4 h-4 lg:w-6 lg:h-6" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium text-sm lg:text-lg">Secure Indian Trading</h3>
                      <p className="text-gray-400 text-xs lg:text-sm">SEBI-compliant platform with bank-level security for NSE/BSE trading</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 lg:space-x-4 p-3 lg:p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                    <div className="w-8 h-8 lg:w-12 lg:h-12 bg-lime-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="text-lime-500 w-4 h-4 lg:w-6 lg:h-6" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium text-sm lg:text-lg">Real-time NSE/BSE Data</h3>
                      <p className="text-gray-400 text-xs lg:text-sm">Live market data from National and Bombay Stock Exchanges in IST</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 lg:space-x-4 p-3 lg:p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                    <div className="w-8 h-8 lg:w-12 lg:h-12 bg-lime-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="text-lime-500 w-4 h-4 lg:w-6 lg:h-6" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium text-sm lg:text-lg">Indian Trading Community</h3>
                      <p className="text-gray-400 text-xs lg:text-sm">Connect with experienced Indian traders and share strategies</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Side - Auth Form */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <Card className="w-full max-w-md bg-black/40 backdrop-blur-md border-white/20 shadow-2xl">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl lg:text-2xl text-white">
                    {isLogin ? 'Welcome Back' : 'Join TradeTracker'}
                  </CardTitle>
                  <p className="text-gray-400 text-sm">
                    {isLogin ? 'Sign in to your trading account' : 'Start your Indian trading journey today'}
                  </p>
                  {!isLogin && (
                    <div className="flex items-center justify-center space-x-2 text-xs text-gray-400 mt-2">
                      <span>🇮🇳</span>
                      <span>Indian Markets • NSE • BSE</span>
                    </div>
                  )}
                </CardHeader>
                <CardContent className="px-4 lg:px-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                      <div>
                        <label className="text-xs lg:text-sm text-gray-300 mb-2 block">Full Name</label>
                        <Input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Enter your full name"
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 backdrop-blur-sm text-sm lg:text-base"
                          required
                        />
                      </div>
                    )}
                    
                    <div>
                      <label className="text-xs lg:text-sm text-gray-300 mb-2 block">Email Address</label>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="yourname@gmail.com"
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 backdrop-blur-sm text-sm lg:text-base"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="text-xs lg:text-sm text-gray-300 mb-2 block">Password</label>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder={isLogin ? "Enter your password" : "Create a strong password"}
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 backdrop-blur-sm pr-10 text-sm lg:text-base"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                    
                    {!isLogin && (
                      <div>
                        <label className="text-xs lg:text-sm text-gray-300 mb-2 block">Confirm Password</label>
                        <div className="relative">
                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm your password"
                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 backdrop-blur-sm pr-10 text-sm lg:text-base"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                          >
                            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>
                    )}
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-lime-500 hover:bg-lime-600 text-black font-medium py-2 lg:py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-sm lg:text-base"
                    >
                      {isLogin ? 'Sign In to Dashboard' : 'Create Trading Account'}
                    </Button>
                    
                    <div className="text-center">
                      <span className="text-gray-400 text-xs lg:text-sm">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                      </span>
                      <button
                        type="button"
                        onClick={toggleMode}
                        className="text-lime-500 hover:text-lime-400 underline font-medium text-xs lg:text-sm"
                      >
                        {isLogin ? 'Sign Up' : 'Sign In'}
                      </button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
