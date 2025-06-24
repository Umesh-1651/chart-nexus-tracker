import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Activity, DollarSign, Clock, Filter } from 'lucide-react';
import { GlassHeader } from '../Layout/GlassHeader';

interface TopChartsPageProps {
  userEmail: string;
  onTabChange: (tab: 'dashboard' | 'topcharts') => void;
  onLogout: () => void;
  onStartTrading?: () => void;
}

export function TopChartsPage({ userEmail, onTabChange, onLogout, onStartTrading }: TopChartsPageProps) {
  const [filterOpen, setFilterOpen] = useState(false);

  const topGainers = [
    { name: 'Reliance', price: 2950, change: 2.5, symbol: 'RELIANCE' },
    { name: 'HDFC Bank', price: 1720, change: 1.8, symbol: 'HDFCBANK' },
    { name: 'Infosys', price: 1550, change: 1.5, symbol: 'INFY' },
  ];

  const topLosers = [
    { name: 'TCS', price: 3820, change: -2.0, symbol: 'TCS' },
    { name: 'ICICI Bank', price: 980, change: -1.5, symbol: 'ICICIBANK' },
    { name: 'Axis Bank', price: 1120, change: -1.2, symbol: 'AXISBANK' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white">
      <GlassHeader 
        activeTab="topcharts" 
        onTabChange={onTabChange} 
        userEmail={userEmail} 
        onLogout={onLogout}
        onStartTrading={onStartTrading}
      />
      
      <div className="pt-24 px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6 lg:mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-500 mb-2">
                Top Charts
              </h1>
              <p className="text-gray-400 text-sm lg:text-base">Explore top performing stocks in the Indian market.</p>
            </div>
            <Button variant="outline" className="border-white/20 text-gray-300 hover:bg-white/10 hover:text-white hover:border-lime-500/50 text-sm" onClick={() => setFilterOpen(!filterOpen)}>
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          {/* Top Gainers */}
          <Card className="bg-black/40 backdrop-blur-md border-white/20 hover:shadow-2xl hover:shadow-lime-500/10 transition-all duration-500">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2 text-lg lg:text-xl">
                <TrendingUp className="w-5 h-5 text-lime-400" />
                Top Gainers
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="text-left text-gray-400">
                      <th className="py-2">Name</th>
                      <th className="py-2">Symbol</th>
                      <th className="py-2">Price</th>
                      <th className="py-2">Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topGainers.map((gainer, index) => (
                      <tr key={index} className="hover:bg-white/5 transition-colors duration-200">
                        <td className="py-3">
                          <div className="flex items-center space-x-3">
                            <div className="flex-1">
                              <div className="text-sm font-medium text-white">{gainer.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3">
                          <div className="text-sm text-gray-300">{gainer.symbol}</div>
                        </td>
                        <td className="py-3">
                          <div className="text-sm text-white">₹{gainer.price}</div>
                        </td>
                        <td className="py-3">
                          <div className="text-sm font-medium text-lime-400">+{gainer.change}%</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Top Losers */}
          <Card className="bg-black/40 backdrop-blur-md border-white/20 hover:shadow-2xl hover:shadow-red-500/10 transition-all duration-500">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2 text-lg lg:text-xl">
                <TrendingDown className="w-5 h-5 text-red-400" />
                Top Losers
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="text-left text-gray-400">
                      <th className="py-2">Name</th>
                      <th className="py-2">Symbol</th>
                      <th className="py-2">Price</th>
                      <th className="py-2">Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topLosers.map((loser, index) => (
                      <tr key={index} className="hover:bg-white/5 transition-colors duration-200">
                        <td className="py-3">
                          <div className="flex items-center space-x-3">
                            <div className="flex-1">
                              <div className="text-sm font-medium text-white">{loser.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3">
                          <div className="text-sm text-gray-300">{loser.symbol}</div>
                        </td>
                        <td className="py-3">
                          <div className="text-sm text-white">₹{loser.price}</div>
                        </td>
                        <td className="py-3">
                          <div className="text-sm font-medium text-red-400">{loser.change}%</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
