
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, ArrowRight, Shield, CheckCircle } from 'lucide-react';
import { Header } from '../Layout/Header';

interface LinkDematPageProps {
  onComplete: () => void;
  onSkip: () => void;
  userEmail: string;
}

export function LinkDematPage({ onComplete, onSkip, userEmail }: LinkDematPageProps) {
  const [broker, setBroker] = useState('');
  const [userId, setUserId] = useState('');
  const [clientId, setClientId] = useState('');

  const brokers = [
    'Zerodha',
    'Upstox',
    'Angel One',
    'ICICI Direct',
    'HDFC Securities',
    'Kotak Securities',
    'Groww',
    'Paytm Money',
    'Other'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete();
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header userEmail={userEmail} />
      
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-8">
        <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Information */}
          <div>
            <h1 className="text-4xl font-bold mb-6">
              Link Your <span className="text-lime-500">Demat Account</span>
            </h1>
            <p className="text-gray-300 text-lg mb-8">
              Connect your existing trading account to sync your portfolio and get personalized insights.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-lime-500 w-5 h-5" />
                <span className="text-gray-300">Secure connection with bank-level encryption</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-lime-500 w-5 h-5" />
                <span className="text-gray-300">Real-time portfolio synchronization</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-lime-500 w-5 h-5" />
                <span className="text-gray-300">Advanced analytics and insights</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-lime-500 w-5 h-5" />
                <span className="text-gray-300">Automated trade notifications</span>
              </div>
            </div>
            
            <div className="p-4 bg-lime-500/10 border border-lime-500/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="text-lime-500 w-5 h-5" />
                <span className="text-lime-500 font-medium">Secure & Private</span>
              </div>
              <p className="text-gray-300 text-sm">
                We use read-only API access. We cannot execute trades or access your funds.
              </p>
            </div>
          </div>

          {/* Right Side - Form */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center space-x-2">
                <Building2 className="text-lime-500" />
                <span>Link Demat Account</span>
              </CardTitle>
              <p className="text-gray-400">Choose your broker and enter your credentials</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">Select Your Broker</label>
                  <Select value={broker} onValueChange={setBroker}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Choose your trading platform" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      {brokers.map((brokerName) => (
                        <SelectItem key={brokerName} value={brokerName} className="text-white hover:bg-gray-600">
                          {brokerName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">User ID / Login ID</label>
                  <Input
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="Enter your trading account user ID"
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>
                
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">Client ID (if applicable)</label>
                  <Input
                    type="text"
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                    placeholder="Enter your client ID (optional)"
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>
                
                <div className="flex space-x-3">
                  <Button 
                    type="submit" 
                    className="flex-1 bg-lime-500 hover:bg-lime-600 text-black font-medium"
                  >
                    Link Account
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={onSkip}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    Skip for Now
                  </Button>
                </div>
                
                <p className="text-xs text-gray-400 text-center">
                  You can always link your account later from the settings page
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
