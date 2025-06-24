
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';

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
    <Card className="w-full bg-black/30 backdrop-blur-xl border-white/20 shadow-2xl shadow-black/20 hover:shadow-lime-500/10 transition-all duration-500">
      <CardHeader className="text-center space-y-3">
        <div className="w-16 h-16 bg-gradient-to-br from-lime-400 to-lime-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
          <span className="text-black font-bold text-xl">TT</span>
        </div>
        <CardTitle className="text-2xl lg:text-3xl text-white font-bold">Join TradeTracker</CardTitle>
        <p className="text-gray-400 text-sm lg:text-base">Start your trading journey today</p>
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
          <span>🇮🇳</span>
          <span>NSE • BSE • Indian Markets</span>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-5">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-300 font-medium">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 backdrop-blur-sm pl-10 h-11 rounded-xl hover:border-lime-500/30 focus:border-lime-500/50 transition-all duration-200"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm text-gray-300 font-medium">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 backdrop-blur-sm pl-10 h-11 rounded-xl hover:border-lime-500/30 focus:border-lime-500/50 transition-all duration-200"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm text-gray-300 font-medium">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 backdrop-blur-sm pl-10 pr-12 h-11 rounded-xl hover:border-lime-500/30 focus:border-lime-500/50 transition-all duration-200"
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
          
          <div className="space-y-2">
            <label className="text-sm text-gray-300 font-medium">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 backdrop-blur-sm pl-10 pr-12 h-11 rounded-xl hover:border-lime-500/30 focus:border-lime-500/50 transition-all duration-200"
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
          
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-lime-500 to-lime-600 hover:from-lime-400 hover:to-lime-500 text-black font-semibold h-11 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] text-base mt-6"
          >
            Create Trading Account
          </Button>
        </form>
        
        <div className="text-center pt-4 border-t border-white/10">
          <span className="text-gray-400">Already have an account? </span>
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-lime-400 hover:text-lime-300 font-semibold transition-colors hover:underline"
          >
            Sign In
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
