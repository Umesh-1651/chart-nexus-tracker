
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, DollarSign, Activity, Download, BarChart3, PieChart, Zap } from 'lucide-react';
import { Header } from '../Layout/Header';
import { FloatingChart } from './FloatingChart';

interface DashboardPageProps {
  userEmail: string;
  onTabChange: (tab: 'dashboard' | 'topcharts') => void;
  onLogout: () => void;
}

export function DashboardPage({ userEmail, onTabChange, onLogout }: DashboardPageProps) {
  const mockData = {
    spentThisMonth: 5950.64,
    change: 2.34,
    volume: 584.42,
    marketCap: 804.42,
    avgMonthlyGrowth: 804.42,
    creditScore: 660,
    creditScoreChange: 2.34,
    bitcoin: {
      price: 52291,
      change: 0.26
    },
    paymentHistory: [
      { name: 'Achain', change: -8.43, date: '12 Jun, 2024', amount: '$1492.33', status: 'Success' },
      { name: 'Cardano', change: 2.34, date: '16 May, 2024', amount: '$2457.90', status: 'Success' },
      { name: 'Digibyte', change: 16.84, date: '21 Feb, 2024', amount: '$985.45', status: 'Success' },
      { name: 'Ethereum', change: -34.34, date: '19 Dec, 2023', amount: '$3245.12', status: 'Failed' }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white">
      <Header 
        activeTab="dashboard" 
        onTabChange={onTabChange} 
        userEmail={userEmail} 
        onLogout={onLogout} 
      />
      
      <div className="p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-500 mb-2">
              Welcome back, {userEmail.split('@')[0]}
            </h1>
            <p className="text-gray-400 text-sm md:text-base">Here's a look at your performance and analytics.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
            {/* Left Column - Main Stats */}
            <div className="lg:col-span-8 space-y-4 md:space-y-6">
              {/* Spent This Month Card */}
              <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 border-gray-700/50 backdrop-blur-sm hover:shadow-2xl hover:shadow-lime-500/10 transition-all duration-500 group">
                <CardContent className="p-4 md:p-6">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
                    <div className="flex-1">
                      <p className="text-gray-400 text-xs md:text-sm font-medium tracking-wider uppercase">SPENT THIS MONTH</p>
                      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white group-hover:text-lime-400 transition-colors duration-300">
                        ${mockData.spentThisMonth.toFixed(2)}
                      </h2>
                      <div className="flex items-center mt-3">
                        <div className="flex items-center space-x-2 px-3 py-1 bg-lime-500/20 rounded-full">
                          <TrendingUp className="w-3 h-3 md:w-4 md:h-4 text-lime-400" />
                          <span className="text-lime-400 text-xs md:text-sm font-semibold">+{mockData.change}%</span>
                        </div>
                      </div>
                    </div>
                    <Button className="bg-gradient-to-r from-lime-500 to-emerald-500 hover:from-lime-400 hover:to-emerald-400 text-black font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                      <Download className="w-4 h-4 mr-2" />
                      Download Report
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-6">
                    <div className="p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors">
                      <p className="text-gray-400 text-xs uppercase tracking-wide">VOLUME (24H)</p>
                      <p className="text-white font-semibold text-lg">${mockData.volume}</p>
                    </div>
                    <div className="p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors">
                      <p className="text-gray-400 text-xs uppercase tracking-wide">MARKET CAP</p>
                      <p className="text-white font-semibold text-lg">${mockData.marketCap}</p>
                    </div>
                    <div className="p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors">
                      <p className="text-gray-400 text-xs uppercase tracking-wide">AVG MONTHLY GROWING</p>
                      <p className="text-white font-semibold text-lg">${mockData.avgMonthlyGrowth}</p>
                    </div>
                  </div>
                  
                  {/* Floating Chart */}
                  <FloatingChart />
                </CardContent>
              </Card>

              {/* Payment History */}
              <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 border-gray-700/50 backdrop-blur-sm hover:shadow-2xl hover:shadow-lime-500/10 transition-all duration-500">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Activity className="w-5 h-5 text-lime-400" />
                    Payment History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockData.paymentHistory.map((payment, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/30 rounded-xl hover:from-gray-700/60 hover:to-gray-600/40 transition-all duration-300 group cursor-pointer border border-gray-700/30 hover:border-lime-500/30">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-lime-500/20 to-emerald-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <DollarSign className="w-6 h-6 text-lime-400" />
                          </div>
                          <div>
                            <h4 className="text-white font-semibold group-hover:text-lime-400 transition-colors">{payment.name}</h4>
                            <p className="text-gray-400 text-sm">{payment.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-bold text-lg">{payment.amount}</p>
                          <div className="flex items-center justify-end space-x-2">
                            <span className={`text-sm font-semibold ${payment.change > 0 ? 'text-lime-400' : 'text-red-400'}`}>
                              {payment.change > 0 ? '+' : ''}{payment.change}%
                            </span>
                            <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                              payment.status === 'Success' 
                                ? 'bg-lime-500/20 text-lime-400 border border-lime-500/30' 
                                : 'bg-red-500/20 text-red-400 border border-red-500/30'
                            }`}>
                              {payment.status}
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
              <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 border-gray-700/50 backdrop-blur-sm hover:shadow-2xl hover:shadow-lime-500/10 transition-all duration-500 group">
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-gray-400 text-sm mb-4 uppercase tracking-wide">Your credit score</p>
                    <div className="relative w-32 h-32 mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                      <div className="w-32 h-32 rounded-full border-8 border-gray-700 relative overflow-hidden">
                        <div className="absolute inset-0 rounded-full border-8 border-transparent bg-gradient-to-r from-lime-400 to-emerald-500 mask-half-circle animate-pulse"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-white group-hover:text-lime-400 transition-colors">{mockData.creditScore}</div>
                            <div className="text-lime-400 text-sm font-semibold">80%</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-3">Your credit score is average</p>
                    <div className="flex items-center justify-center">
                      <div className="flex items-center space-x-2 px-3 py-1 bg-lime-500/20 rounded-full">
                        <TrendingUp className="w-4 h-4 text-lime-400" />
                        <span className="text-lime-400 text-sm font-semibold">+{mockData.creditScoreChange}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Bitcoin Widget */}
              <Card className="bg-gradient-to-br from-orange-900/20 to-gray-800/80 border-orange-500/30 backdrop-blur-sm hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 group">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <span className="text-white font-bold text-lg">₿</span>
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg group-hover:text-orange-400 transition-colors">Bitcoin</h3>
                      <p className="text-gray-400 text-sm">BTC</p>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">
                    ${mockData.bitcoin.price.toLocaleString()}
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center space-x-2 px-3 py-1 bg-lime-500/20 rounded-full">
                      <TrendingUp className="w-4 h-4 text-lime-400" />
                      <span className="text-lime-400 text-sm font-semibold">+{mockData.bitcoin.change}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 border-gray-700/50 backdrop-blur-sm hover:shadow-2xl hover:shadow-lime-500/10 transition-all duration-500">
                <CardHeader>
                  <CardTitle className="text-white text-lg flex items-center gap-2">
                    <Zap className="w-5 h-5 text-lime-400" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-gradient-to-r from-lime-500 to-emerald-500 hover:from-lime-400 hover:to-emerald-400 text-black font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <Activity className="w-4 h-4 mr-2" />
                    View Portfolio
                  </Button>
                  <Button variant="outline" className="w-full border-2 border-gray-600 text-gray-300 hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-600 hover:text-white hover:border-lime-500/50 transform hover:scale-105 transition-all duration-300">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Market Analysis
                  </Button>
                  <Button variant="outline" className="w-full border-2 border-gray-600 text-gray-300 hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-600 hover:text-white hover:border-lime-500/50 transform hover:scale-105 transition-all duration-300">
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
