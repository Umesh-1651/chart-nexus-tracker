
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Activity, BarChart3, PieChart, Zap, Clock, Plus } from 'lucide-react';
import { GlassHeader } from '../Layout/GlassHeader';
import { UserProfile } from './UserProfile';

interface DashboardPageProps {
  userEmail: string;
  onTabChange: (tab: 'dashboard' | 'topcharts') => void;
  onLogout: () => void;
}

export function DashboardPage({ userEmail, onTabChange, onLogout }: DashboardPageProps) {
  const currentTime = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  const niftyData = {
    price: 22428,
    change: 0.84
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white">
      <GlassHeader 
        activeTab="dashboard" 
        onTabChange={onTabChange} 
        userEmail={userEmail} 
        onLogout={onLogout} 
      />
      
      <div className="pt-24 px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Header */}
          <div className="mb-6 lg:mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4 gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-500 mb-2">
                  Welcome back, {userEmail.split('@')[0]}
                </h1>
                <p className="text-gray-400 text-sm lg:text-base">Here's your Indian market portfolio performance.</p>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>IST {currentTime}</span>
                </div>
                <div className="px-3 py-1 bg-lime-500/20 rounded-full border border-lime-500/30">
                  <span className="text-lime-400 font-medium text-xs sm:text-sm">Market Open</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-8 space-y-4 lg:space-y-6">
              {/* User Profile */}
              <UserProfile userEmail={userEmail} />

              {/* Portfolio Overview */}
              <Card className="bg-black/40 backdrop-blur-md border-white/20 hover:shadow-2xl hover:shadow-lime-500/10 transition-all duration-500">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2 text-lg lg:text-xl">
                    <Activity className="w-5 h-5 text-lime-400" />
                    Portfolio Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 lg:py-12">
                    <div className="w-16 h-16 lg:w-20 lg:h-20 bg-lime-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Plus className="w-8 h-8 lg:w-10 lg:h-10 text-lime-400" />
                    </div>
                    <h3 className="text-white font-semibold text-lg lg:text-xl mb-2">Start Your Trading Journey</h3>
                    <p className="text-gray-400 text-sm lg:text-base mb-6">Connect your demat account to view your portfolio and start trading on NSE/BSE</p>
                    <Button className="bg-lime-500/90 hover:bg-lime-400 text-black font-semibold px-6 py-2 lg:px-8 lg:py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                      Add First Investment
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Trading History */}
              <Card className="bg-black/40 backdrop-blur-md border-white/20 hover:shadow-2xl hover:shadow-lime-500/10 transition-all duration-500">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2 text-lg lg:text-xl">
                    <Activity className="w-5 h-5 text-lime-400" />
                    Recent Trades
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 lg:py-12">
                    <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gray-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BarChart3 className="w-8 h-8 lg:w-10 lg:h-10 text-gray-400" />
                    </div>
                    <h3 className="text-white font-semibold text-lg lg:text-xl mb-2">No Trades Yet</h3>
                    <p className="text-gray-400 text-sm lg:text-base">Your trading history will appear here once you start trading</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Side Stats */}
            <div className="lg:col-span-4 space-y-4 lg:space-y-6">
              {/* NIFTY 50 Widget */}
              <Card className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border-orange-500/30 backdrop-blur-sm hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 group">
                <CardContent className="p-4 lg:p-6">
                  <div className="flex items-center space-x-3 lg:space-x-4 mb-4">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <span className="text-white font-bold text-xs lg:text-sm">NSE</span>
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-base lg:text-lg group-hover:text-orange-400 transition-colors">NIFTY 50</h3>
                      <p className="text-gray-400 text-xs lg:text-sm">National Stock Exchange</p>
                    </div>
                  </div>
                  <div className="text-xl lg:text-2xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">
                    ₹{niftyData.price.toLocaleString('en-IN')}
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center space-x-2 px-3 py-1 bg-lime-500/20 rounded-full">
                      <TrendingUp className="w-3 h-3 lg:w-4 lg:h-4 text-lime-400" />
                      <span className="text-lime-400 text-xs lg:text-sm font-semibold">+{niftyData.change}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-black/40 backdrop-blur-md border-white/20 hover:shadow-2xl hover:shadow-lime-500/10 transition-all duration-500">
                <CardHeader>
                  <CardTitle className="text-white text-base lg:text-lg flex items-center gap-2">
                    <Zap className="w-4 h-4 lg:w-5 lg:h-5 text-lime-400" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-lime-500/90 hover:bg-lime-400 text-black font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm text-sm lg:text-base py-2 lg:py-3">
                    <Activity className="w-4 h-4 mr-2" />
                    View NSE Portfolio
                  </Button>
                  <Button variant="outline" className="w-full border-2 border-white/20 text-gray-300 hover:bg-white/10 hover:text-white hover:border-lime-500/50 transform hover:scale-105 transition-all duration-300 backdrop-blur-sm text-sm lg:text-base py-2 lg:py-3">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    BSE Analysis
                  </Button>
                  <Button variant="outline" className="w-full border-2 border-white/20 text-gray-300 hover:bg-white/10 hover:text-white hover:border-lime-500/50 transform hover:scale-105 transition-all duration-300 backdrop-blur-sm text-sm lg:text-base py-2 lg:py-3">
                    <PieChart className="w-4 h-4 mr-2" />
                    Market Analysis
                  </Button>
                </CardContent>
              </Card>

              {/* Trading Tips */}
              <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20 backdrop-blur-sm">
                <CardContent className="p-4 lg:p-6">
                  <h3 className="text-blue-400 font-semibold mb-3 text-sm lg:text-base">💡 Trading Tip</h3>
                  <p className="text-gray-300 text-xs lg:text-sm leading-relaxed">
                    Indian markets operate from 9:15 AM to 3:30 PM IST. Pre-market trading starts at 9:00 AM.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
