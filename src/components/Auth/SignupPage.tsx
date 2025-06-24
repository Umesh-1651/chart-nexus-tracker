
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Shield, Lock, Users, TrendingUp } from 'lucide-react';
import { GlassHeader } from '../Layout/GlassHeader';

interface SignupPageProps {
  onSignup: (email: string, password: string, fullName: string) => void;
  onSwitchToLogin: () => void;
}

export function SignupPage({ onSignup, onSwitchToLogin }: SignupPageProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    onSignup(email, password, fullName);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white">
      <GlassHeader showAuth={true} />
      
      <div className="pt-20 flex min-h-[calc(100vh-80px)]">
        {/* Left Side - Features with better positioning */}
        <div className="flex-1 p-4 md:p-8 lg:p-12 flex items-center">
          <div className="w-full max-w-2xl">
            <div className="mb-8">
              <div className="inline-block px-4 py-2 bg-lime-500/20 rounded-full border border-lime-500/30 mb-6">
                <span className="text-lime-400 text-sm font-medium">🇮🇳 Join the future of Indian trading</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-500">
                Join TradeTracker India
              </h2>
              <p className="text-gray-300 text-lg md:text-xl mb-8 leading-relaxed">
                Get access to institutional-grade trading tools and analytics for NSE and BSE markets with real-time data in IST timezone.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4 p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <div className="w-12 h-12 bg-lime-500/20 rounded-lg flex items-center justify-center">
                  <Shield className="text-lime-500 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white font-medium text-lg">Secure Indian Trading</h3>
                  <p className="text-gray-400">SEBI-compliant platform with bank-level security for NSE/BSE trading</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <div className="w-12 h-12 bg-lime-500/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="text-lime-500 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white font-medium text-lg">Real-time NSE/BSE Data</h3>
                  <p className="text-gray-400">Live market data from National and Bombay Stock Exchanges in IST</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <div className="w-12 h-12 bg-lime-500/20 rounded-lg flex items-center justify-center">
                  <Users className="text-lime-500 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white font-medium text-lg">Indian Trading Community</h3>
                  <p className="text-gray-400">Connect with experienced Indian traders and share strategies</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <div className="w-12 h-12 bg-lime-500/20 rounded-lg flex items-center justify-center">
                  <Lock className="text-lime-500 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white font-medium text-lg">Portfolio Protection</h3>
                  <p className="text-gray-400">Advanced risk management with automated alerts for Indian markets</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-gradient-to-r from-lime-500/10 to-green-500/10 border border-lime-500/20 rounded-xl backdrop-blur-sm">
              <h4 className="text-lime-500 font-semibold mb-2">✨ Free for 30 days</h4>
              <p className="text-gray-300 text-sm">Get full access to NSE/BSE trading features. No credit card required.</p>
            </div>
          </div>
        </div>

        {/* Right Side - Signup Form with better positioning */}
        <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl p-4 md:p-8 flex items-center justify-center">
          <Card className="w-full bg-black/40 backdrop-blur-md border-white/20 shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white">Join TradeTracker</CardTitle>
              <p className="text-gray-400">Start your Indian trading journey today</p>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-400 mt-2">
                <span>🇮🇳</span>
                <span>Indian Markets • NSE • BSE</span>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">Full Name</label>
                  <Input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 backdrop-blur-sm"
                    required
                  />
                </div>
                
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">Email Address</label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="yourname@gmail.com"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 backdrop-blur-sm"
                    required
                  />
                </div>
                
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">Password</label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a strong password"
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 backdrop-blur-sm pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">Confirm Password</label>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 backdrop-blur-sm pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
                
                <Button type="submit" className="w-full bg-lime-500 hover:bg-lime-600 text-black font-medium py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  Create Trading Account
                </Button>
                
                <div className="text-center">
                  <span className="text-gray-400">Already have an account? </span>
                  <button
                    type="button"
                    onClick={onSwitchToLogin}
                    className="text-lime-500 hover:text-lime-400 underline font-medium"
                  >
                    Sign In
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
