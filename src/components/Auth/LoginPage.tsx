
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff } from 'lucide-react';
import { GlassHeader } from '../Layout/GlassHeader';
import { AnimatedChart } from './AnimatedChart';

interface LoginPageProps {
  onLogin: (email: string, password: string) => void;
  onSwitchToSignup: () => void;
}

export function LoginPage({ onLogin, onSwitchToSignup }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white">
      <GlassHeader showAuth={true} />
      
      <div className="pt-20 flex min-h-[calc(100vh-80px)]">
        {/* Left Side - Enhanced with animations and better positioning */}
        <div className="flex-1 p-4 md:p-8 lg:p-12 flex items-center">
          <div className="w-full max-w-2xl">
            <div className="mb-8">
              <div className="inline-block px-4 py-2 bg-lime-500/20 rounded-full border border-lime-500/30 mb-6">
                <span className="text-lime-400 text-sm font-medium">🇮🇳 Next-gen AI assisted trading platform</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-500">
                Trade assets with confidence & security
              </h2>
              <p className="text-gray-300 text-lg md:text-xl mb-8 leading-relaxed">
                Experience seamless and profitable trading with advanced features, real-time analytics, and institutional-grade security. Start enhancing your trades in minutes.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button className="bg-lime-500 hover:bg-lime-400 text-black font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  Start Trading Now
                </Button>
                <Button variant="outline" className="border-2 border-gray-600 text-gray-300 hover:bg-white/10 hover:text-white hover:border-lime-500/50 px-8 py-3 rounded-lg transition-all duration-300">
                  View Markets →
                </Button>
              </div>
            </div>
            
            {/* Animated Charts */}
            <AnimatedChart />
          </div>
        </div>

        {/* Right Side - Login Form with better positioning */}
        <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl p-4 md:p-8 flex items-center justify-center">
          <Card className="w-full bg-black/40 backdrop-blur-md border-white/20 shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white">Welcome Back</CardTitle>
              <p className="text-gray-400">Sign in to your trading account</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
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
                      placeholder="Enter your password"
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
                
                <Button type="submit" className="w-full bg-lime-500 hover:bg-lime-600 text-black font-medium py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  Sign In to Dashboard
                </Button>
                
                <div className="text-center">
                  <span className="text-gray-400">Don't have an account? </span>
                  <button
                    type="button"
                    onClick={onSwitchToSignup}
                    className="text-lime-500 hover:text-lime-400 underline font-medium"
                  >
                    Sign Up
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
