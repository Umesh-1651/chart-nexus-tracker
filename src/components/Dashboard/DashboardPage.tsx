
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, DollarSign, Activity, Download, BarChart3, PieChart, Zap, Clock } from 'lucide-react';
import { GlassHeader } from '../Layout/GlassHeader';
import { FloatingChart } from './FloatingChart';

interface DashboardPageProps {
  userEmail: string;
  onTabChange: (tab: 'dashboard' | 'topcharts') => void;
  onLogout: () => void;
}

export function DashboardPage({ userEmail, onTabChange, onLogout }: DashboardPageProps) {
  const mockData = {
    portfolioValue: 245950.64,
    change: 2.34,
    volume: 584.42,
    marketCap: 804.42,
    avgMonthlyGrowth: 804.42,
    creditScore: 660,
    creditScoreChange: 2.34,
    nifty: {
      price: 22428,
      change: 0.84
    },
    paymentHistory: [
      { name: 'RELIANCE', change: 3.43, date: '12 Jun, 2024', amount: '₹14,92,333', status: 'Profit', exchange: 'NSE' },
      { name: 'TCS', change: 2.34, date: '16 May, 2024', amount: '₹24,57,900', status: 'Profit', exchange: 'BSE' },
      { name: 'HDFC BANK', change: -1.84, date: '21 Feb, 2024', amount: '₹9,85,450', status: 'Loss', exchange: 'NSE' },
      { name: 'INFOSYS', change: 4.34, date: '19 Dec, 2023', amount: '₹32,45,120', status: 'Profit', exchange: 'NSE' }
    ]
  };

  // Get current IST time
  const currentTime = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white">
      <GlassHeader 
        activeTab="dashboard" 
        onTabChange={onTabChange} 
        userEmail={userEmail} 
        onLogout={onLogout} 
      />
      
      <div className="pt-24 p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Header */}
          <div className="mb-8 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-500 mb-2">
                  Welcome back, {userEmail.split('@')[0]}
                </h1>
                <p className="text-gray-400 text-sm md:text-base">Here's your Indian market portfolio performance.</p>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>IST {currentTime}</span>
                </div>
                <div className="px-3 py-1 bg-lime-500/20 rounded-full border border-lime-500/30">
                  <span className="text-lime-400 font-medium">Market Open</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
            {/* Left Column - Main Stats */}
            <div className="lg:col-span-8 space-y-4 md:space-y-6">
              {/* Portfolio Value Card */}
              <Card className="bg-black/40 backdrop-blur-md border-white/20 hover:shadow-2xl hover:shadow-lime-500/10 transition-all duration-500 group">
                <CardContent className="p-4 md:p-6">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
                    <div className="flex-1">
                      <p className="text-gray-400 text-xs md:text-sm font-medium tracking-wider uppercase">PORTFOLIO VALUE (INR)</p>
                      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white group-hover:text-lime-400 transition-colors duration-300">
                        ₹{mockData.portfolioValue.toLocaleString('en-IN')}
                      </h2>
                      <div className="flex items-center mt-3">
                        <div className="flex items-center space-x-2 px-3 py-1 bg-lime-500/20 rounded-full">
                          <TrendingUp className="w-3 h-3 md:w-4 md:h-4 text-lime-400" />
                          <span className="text-lime-400 text-xs md:text-sm font-semibold">+{mockData.change}%</span>
                        </div>
                      </div>
                    </div>
                    <Button className="bg-lime-500/90 hover:bg-lime-400 text-black font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 backdrop-blur-sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download Report
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-6">
                    <div className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors backdrop-blur-sm border border-white/10">
                      <p className="text-gray-400 text-xs uppercase tracking-wide">NSE VOLUME (24H)</p>
                      <p className="text-white font-semibold text-lg">₹{mockData.volume}L</p>
                    </div>
                    <div className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors backdrop-blur-sm border border-white/10">
                      <p className="text-gray-400 text-xs uppercase tracking-wide">BSE EXPOSURE</p>
                      <p className="text-white font-semibold text-lg">₹{mockData.marketCap}L</p>
                    </div>
                    <div className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors backdrop-blur-sm border border-white/10">
                      <p className="text-gray-400 text-xs uppercase tracking-wide">MONTHLY GROWTH</p>
                      <p className="text-white font-semibold text-lg">₹{mockData.avgMonthlyGrowth}L</p>
                    </div>
                  </div>
                  
                  {/* Floating Chart */}
                  <FloatingChart />
                </CardContent>
              </Card>

              {/* Trading History */}
              <Card className="bg-black/40 backdrop-blur-md border-white/20 hover:shadow-2xl hover:shadow-lime-500/10 transition-all duration-500">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Activity className="w-5 h-5 text-lime-400" />
                    Recent Trades (NSE/BSE)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockData.paymentHistory.map((trade, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 group cursor-pointer border border-white/10 backdrop-blur-sm">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-lime-500/20 to-emerald-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <DollarSign className="w-6 h-6 text-lime-400" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h4 className="text-white font-semibold group-hover:text-lime-400 transition-colors">{trade.name}</h4>
                              <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full border border-blue-500/30">
                                {trade.exchange}
                              </span>
                            </div>
                            <p className="text-gray-400 text-sm">{trade.date} • IST</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-bold text-lg">{trade.amount}</p>
                          <div className="flex items-center justify-end space-x-2">
                            <span className={`text-sm font-semibold ${trade.change > 0 ? 'text-lime-400' : 'text-red-400'}`}>
                              {trade.change > 0 ? '+' : ''}{trade.change}%
                            </span>
                            <span className={`text-xs px-3 py-1 rounded-full font-medium backdrop-blur-sm ${
                              trade.status === 'Profit' 
                                ? 'bg-lime-500/20 text-lime-400 border border-lime-500/30' 
                                : 'bg-red-500/20 text-red-400 border border-red-500/30'
                            }`}>
                              {trade.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Side Stats */}
            <div className="lg:col-span-4 space-y-4 md:space-y-6">
              {/* Credit Score */}
              <Card className="bg-black/40 backdrop-blur-md border-white/20 hover:shadow-2xl hover:shadow-lime-500/10 transition-all duration-500 group">
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-gray-400 text-sm mb-4 uppercase tracking-wide">Trading Credit Score</p>
                    <div className="relative w-32 h-32 mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                      <div className="w-32 h-32 rounded-full border-8 border-gray-700 relative overflow-hidden">
                        <div className="absolute inset-0 rounded-full border-8 border-transparent bg-gradient-to-r from-lime-400 to-emerald-500 animate-pulse" style={{clipPath: 'polygon(0 0, 80% 0, 80% 100%, 0 100%)'}}></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-white group-hover:text-lime-400 transition-colors">{mockData.creditScore}</div>
                            <div className="text-lime-400 text-sm font-semibold">Excellent</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-3">Your trading score is excellent</p>
                    <div className="flex items-center justify-center">
                      <div className="flex items-center space-x-2 px-3 py-1 bg-lime-500/20 rounded-full">
                        <TrendingUp className="w-4 h-4 text-lime-400" />
                        <span className="text-lime-400 text-sm font-semibold">+{mockData.creditScoreChange}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* NIFTY 50 Widget */}
              <Card className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border-orange-500/30 backdrop-blur-sm hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 group">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <span className="text-white font-bold text-sm">NSE</span>
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg group-hover:text-orange-400 transition-colors">NIFTY 50</h3>
                      <p className="text-gray-400 text-sm">National Stock Exchange</p>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">
                    ₹{mockData.nifty.price.toLocaleString('en-IN')}
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center space-x-2 px-3 py-1 bg-lime-500/20 rounded-full">
                      <TrendingUp className="w-4 h-4 text-lime-400" />
                      <span className="text-lime-400 text-sm font-semibold">+{mockData.nifty.change}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-black/40 backdrop-blur-md border-white/20 hover:shadow-2xl hover:shadow-lime-500/10 transition-all duration-500">
                <CardHeader>
                  <CardTitle className="text-white text-lg flex items-center gap-2">
                    <Zap className="w-5 h-5 text-lime-400" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-lime-500/90 hover:bg-lime-400 text-black font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm">
                    <Activity className="w-4 h-4 mr-2" />
                    View NSE Portfolio
                  </Button>
                  <Button variant="outline" className="w-full border-2 border-white/20 text-gray-300 hover:bg-white/10 hover:text-white hover:border-lime-500/50 transform hover:scale-105 transition-all duration-300 backdrop-blur-sm">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    BSE Analysis
                  </Button>
                  <Button variant="outline" className="w-full border-2 border-white/20 text-gray-300 hover:bg-white/10 hover:text-white hover:border-lime-500/50 transform hover:scale-105 transition-all duration-300 backdrop-blur-sm">
                    <PieChart className="w-4 h-4 mr-2" />
                    Trade History
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
