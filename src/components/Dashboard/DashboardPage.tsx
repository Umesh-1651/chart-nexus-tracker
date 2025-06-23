
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, DollarSign, Activity, Download } from 'lucide-react';
import { Header } from '../Layout/Header';

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
    <div className="min-h-screen bg-black text-white">
      <Header 
        activeTab="dashboard" 
        onTabChange={onTabChange} 
        userEmail={userEmail} 
        onLogout={onLogout} 
      />
      
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome back, {userEmail.split('@')[0]}
            </h1>
            <p className="text-gray-400">Here's a look at your performance and analytics.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Main Stats */}
            <div className="lg:col-span-2 space-y-6">
              {/* Spent This Month Card */}
              <Card className="bg-gray-900 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-gray-400 text-sm">SPENT THIS MONTH</p>
                      <h2 className="text-3xl font-bold text-white">${mockData.spentThisMonth.toFixed(2)}</h2>
                      <div className="flex items-center mt-2">
                        <TrendingUp className="w-4 h-4 text-lime-500 mr-1" />
                        <span className="text-lime-500 text-sm">+{mockData.change}%</span>
                      </div>
                    </div>
                    <Button className="bg-lime-500 hover:bg-lime-600 text-black">
                      <Download className="w-4 h-4 mr-2" />
                      Download Report
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">VOLUME (24H)</p>
                      <p className="text-white font-semibold">${mockData.volume}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">MARKET CAP</p>
                      <p className="text-white font-semibold">${mockData.marketCap}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">AVG MONTHLY GROWING</p>
                      <p className="text-white font-semibold">${mockData.avgMonthlyGrowth}</p>
                    </div>
                  </div>
                  
                  {/* Chart Area */}
                  <div className="mt-6 h-48 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg flex items-center justify-center">
                    <div className="text-gray-400">Chart visualization area</div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment History */}
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Payment History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockData.paymentHistory.map((payment, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                            <DollarSign className="w-5 h-5 text-lime-500" />
                          </div>
                          <div>
                            <h4 className="text-white font-medium">{payment.name}</h4>
                            <p className="text-gray-400 text-sm">{payment.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-semibold">{payment.amount}</p>
                          <div className="flex items-center space-x-2">
                            <span className={`text-sm ${payment.change > 0 ? 'text-lime-500' : 'text-red-500'}`}>
                              {payment.change > 0 ? '+' : ''}{payment.change}%
                            </span>
                            <span className={`text-xs px-2 py-1 rounded ${
                              payment.status === 'Success' ? 'bg-lime-500/20 text-lime-500' : 'bg-red-500/20 text-red-500'
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
            <div className="space-y-6">
              {/* Credit Score */}
              <Card className="bg-gray-900 border-gray-700">
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-gray-400 text-sm mb-2">Your credit score</p>
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <div className="w-32 h-32 rounded-full border-8 border-gray-700 relative">
                        <div className="absolute inset-0 rounded-full border-8 border-lime-500 border-r-transparent border-b-transparent transform rotate-45"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-white">{mockData.creditScore}</div>
                            <div className="text-lime-500 text-sm">80%</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm">Your credit score is average</p>
                    <div className="flex items-center justify-center mt-2">
                      <TrendingUp className="w-4 h-4 text-lime-500 mr-1" />
                      <span className="text-lime-500 text-sm">+{mockData.creditScoreChange}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Bitcoin Widget */}
              <Card className="bg-gray-900 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">₿</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Bitcoin</h3>
                      <p className="text-gray-400 text-sm">BTC</p>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-2">
                    ${mockData.bitcoin.price.toLocaleString()}
                  </div>
                  <div className="flex items-center">
                    <TrendingUp className="w-4 h-4 text-lime-500 mr-1" />
                    <span className="text-lime-500 text-sm">+{mockData.bitcoin.change}%</span>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-lime-500 hover:bg-lime-600 text-black">
                    <Activity className="w-4 h-4 mr-2" />
                    View Portfolio
                  </Button>
                  <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-700">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Market Analysis
                  </Button>
                  <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-700">
                    <DollarSign className="w-4 h-4 mr-2" />
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
