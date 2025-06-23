
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Shield, Lock, Users, TrendingUp } from 'lucide-react';
import { Header } from '../Layout/Header';

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
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <div className="flex min-h-[calc(100vh-80px)]">
        {/* Left Side - Features */}
        <div className="flex-1 p-8 flex items-center justify-center">
          <div className="max-w-lg">
            <h2 className="text-3xl font-bold mb-6 text-lime-500">Join TradeTracker</h2>
            <p className="text-gray-300 mb-8">Get access to institutional-grade trading tools and analytics.</p>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-lime-500/20 rounded-lg flex items-center justify-center">
                  <Shield className="text-lime-500 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white font-medium text-lg">Secure Trading</h3>
                  <p className="text-gray-400">Bank-level security with institutional-grade encryption</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-lime-500/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="text-lime-500 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white font-medium text-lg">Advanced Analytics</h3>
                  <p className="text-gray-400">Real-time market data and predictive insights</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-lime-500/20 rounded-lg flex items-center justify-center">
                  <Users className="text-lime-500 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white font-medium text-lg">Community</h3>
                  <p className="text-gray-400">Connect with experienced traders and share strategies</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-lime-500/20 rounded-lg flex items-center justify-center">
                  <Lock className="text-lime-500 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white font-medium text-lg">Portfolio Protection</h3>
                  <p className="text-gray-400">Advanced risk management and automated alerts</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-gradient-to-r from-lime-500/10 to-green-500/10 border border-lime-500/20 rounded-lg">
              <h4 className="text-lime-500 font-semibold mb-2">✨ Free for 30 days</h4>
              <p className="text-gray-300 text-sm">Get full access to all premium features. No credit card required.</p>
            </div>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="w-96 p-8 flex items-center justify-center bg-gray-900/50">
          <Card className="w-full bg-gray-800 border-gray-700">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white">Join TradeTracker</CardTitle>
              <p className="text-gray-400">Start your trading journey today</p>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-400 mt-2">
                <span>📧</span>
                <span>Gmail Verification Required</span>
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
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                    required
                  />
                </div>
                
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">Gmail Address</label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="yourname@gmail.com"
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
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
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
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
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
                
                <Button type="submit" className="w-full bg-lime-500 hover:bg-lime-600 text-black font-medium">
                  Create Account
                </Button>
                
                <div className="text-center">
                  <span className="text-gray-400">Already have an account? </span>
                  <button
                    type="button"
                    onClick={onSwitchToLogin}
                    className="text-lime-500 hover:text-lime-400 underline"
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
