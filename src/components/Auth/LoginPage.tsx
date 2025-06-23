
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, TrendingUp, BarChart3, PieChart, Activity } from 'lucide-react';
import { Header } from '../Layout/Header';

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
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <div className="flex min-h-[calc(100vh-80px)]">
        {/* Left Side - Simulation/Features */}
        <div className="flex-1 p-8 flex items-center justify-center">
          <div className="max-w-lg">
            <h2 className="text-3xl font-bold mb-6 text-lime-500">Welcome Back</h2>
            <p className="text-gray-300 mb-8">Experience seamless and profitable trading with advanced features.</p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <Card className="bg-gray-900 border-gray-700 p-4">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="text-lime-500 w-6 h-6" />
                  <div>
                    <h3 className="text-white font-medium">Live Charts</h3>
                    <p className="text-gray-400 text-sm">Real-time data</p>
                  </div>
                </div>
              </Card>
              
              <Card className="bg-gray-900 border-gray-700 p-4">
                <div className="flex items-center space-x-3">
                  <BarChart3 className="text-lime-500 w-6 h-6" />
                  <div>
                    <h3 className="text-white font-medium">Analytics</h3>
                    <p className="text-gray-400 text-sm">Smart insights</p>
                  </div>
                </div>
              </Card>
              
              <Card className="bg-gray-900 border-gray-700 p-4">
                <div className="flex items-center space-x-3">
                  <PieChart className="text-lime-500 w-6 h-6" />
                  <div>
                    <h3 className="text-white font-medium">Portfolio</h3>
                    <p className="text-gray-400 text-sm">Track holdings</p>
                  </div>
                </div>
              </Card>
              
              <Card className="bg-gray-900 border-gray-700 p-4">
                <div className="flex items-center space-x-3">
                  <Activity className="text-lime-500 w-6 h-6" />
                  <div>
                    <h3 className="text-white font-medium">Alerts</h3>
                    <p className="text-gray-400 text-sm">Price notifications</p>
                  </div>
                </div>
              </Card>
            </div>
            
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">S&P 500 <span className="text-lime-500">Live</span></h3>
              <div className="text-2xl font-bold text-white">$2836.12</div>
              <div className="text-red-400 text-sm">-4.50(-0.16%)</div>
              <div className="mt-4 h-20 bg-gradient-to-r from-gray-800 to-gray-700 rounded flex items-end">
                <div className="w-full h-full bg-gradient-to-t from-lime-500/20 to-transparent rounded"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-96 p-8 flex items-center justify-center bg-gray-900/50">
          <Card className="w-full bg-gray-800 border-gray-700">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white">Sign In</CardTitle>
              <p className="text-gray-400">Start your trading journey today</p>
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
                      placeholder="Enter your password"
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
                
                <Button type="submit" className="w-full bg-lime-500 hover:bg-lime-600 text-black font-medium">
                  Sign In
                </Button>
                
                <div className="text-center">
                  <span className="text-gray-400">Don't have an account? </span>
                  <button
                    type="button"
                    onClick={onSwitchToSignup}
                    className="text-lime-500 hover:text-lime-400 underline"
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
