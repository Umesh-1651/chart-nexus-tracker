
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { GlassHeader } from '../Layout/GlassHeader';

interface TopChartsPageProps {
  userEmail: string;
  onTabChange: (tab: 'dashboard' | 'topcharts') => void;
  onLogout: () => void;
}

export function TopChartsPage({ userEmail, onTabChange, onLogout }: TopChartsPageProps) {
  const [activeFilter, setActiveFilter] = useState<'gainers' | 'losers' | 'active'>('gainers');

  // Sample Indian stock data
  const stockData = {
    gainers: [
      { symbol: 'RELIANCE', name: 'Reliance Industries Ltd', price: '₹2,845.60', change: '+5.67%', changeValue: '+152.80', volume: '45.2L', exchange: 'NSE' },
      { symbol: 'INFY', name: 'Infosys Limited', price: '₹1,542.30', change: '+4.23%', changeValue: '+62.50', volume: '32.8L', exchange: 'NSE' },
      { symbol: 'TCS', name: 'Tata Consultancy Services', price: '₹3,678.90', change: '+3.89%', changeValue: '+137.20', volume: '28.4L', exchange: 'BSE' },
      { symbol: 'HDFCBANK', name: 'HDFC Bank Limited', price: '₹1,634.75', change: '+3.45%', changeValue: '+54.50', volume: '67.9L', exchange: 'NSE' },
      { symbol: 'WIPRO', name: 'Wipro Limited', price: '₹445.80', change: '+2.98%', changeValue: '+12.90', volume: '22.1L', exchange: 'BSE' }
    ],
    losers: [
      { symbol: 'HDFC', name: 'Housing Development Finance Corp', price: '₹2,456.30', change: '-2.34%', changeValue: '-58.90', volume: '38.7L', exchange: 'NSE' },
      { symbol: 'BAJFINANCE', name: 'Bajaj Finance Limited', price: '₹6,789.45', change: '-1.87%', changeValue: '-129.30', volume: '15.6L', exchange: 'BSE' },
      { symbol: 'MARUTI', name: 'Maruti Suzuki India Ltd', price: '₹10,234.60', change: '-1.65%', changeValue: '-171.80', volume: '12.4L', exchange: 'NSE' },
      { symbol: 'ASIANPAINT', name: 'Asian Paints Limited', price: '₹3,245.70', change: '-1.23%', changeValue: '-40.40', volume: '18.9L', exchange: 'BSE' },
      { symbol: 'BHARTIARTL', name: 'Bharti Airtel Limited', price: '₹1,087.25', change: '-0.98%', changeValue: '-10.75', volume: '25.3L', exchange: 'NSE' }
    ],
    active: [
      { symbol: 'HDFCBANK', name: 'HDFC Bank Limited', price: '₹1,634.75', change: '+3.45%', changeValue: '+54.50', volume: '89.2L', exchange: 'NSE' },
      { symbol: 'RELIANCE', name: 'Reliance Industries Ltd', price: '₹2,845.60', change: '+5.67%', changeValue: '+152.80', volume: '78.5L', exchange: 'BSE' },
      { symbol: 'ICICIBANK', name: 'ICICI Bank Limited', price: '₹1,145.30', change: '+2.15%', changeValue: '+24.10', volume: '65.7L', exchange: 'NSE' },
      { symbol: 'SBIN', name: 'State Bank of India', price: '₹623.80', change: '+1.89%', changeValue: '+11.60', volume: '58.4L', exchange: 'BSE' },
      { symbol: 'LT', name: 'Larsen & Toubro Limited', price: '₹3,456.90', change: '+2.67%', changeValue: '+89.80', volume: '42.3L', exchange: 'NSE' }
    ]
  };

  const currentData = stockData[activeFilter];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white">
      <GlassHeader 
        activeTab="topcharts" 
        onTabChange={onTabChange} 
        userEmail={userEmail} 
        onLogout={onLogout} 
      />
      
      <div className="pt-24 px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6 lg:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-500 mb-2">
              Top Charts - Indian Markets
            </h1>
            <p className="text-gray-400 text-sm lg:text-base">Live NSE & BSE stock performance in INR</p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 lg:mb-8">
            <Button
              onClick={() => setActiveFilter('gainers')}
              className={`flex-1 sm:flex-none justify-center sm:justify-start ${
                activeFilter === 'gainers'
                  ? 'bg-lime-500/90 text-black font-medium shadow-lg'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white border border-white/20'
              } transition-all duration-300 backdrop-blur-sm text-sm lg:text-base py-2 lg:py-3 px-4 lg:px-6`}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Top Gainers
            </Button>
            <Button
              onClick={() => setActiveFilter('losers')}
              className={`flex-1 sm:flex-none justify-center sm:justify-start ${
                activeFilter === 'losers'
                  ? 'bg-lime-500/90 text-black font-medium shadow-lg'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white border border-white/20'
              } transition-all duration-300 backdrop-blur-sm text-sm lg:text-base py-2 lg:py-3 px-4 lg:px-6`}
            >
              <TrendingDown className="w-4 h-4 mr-2" />
              Top Losers
            </Button>
            <Button
              onClick={() => setActiveFilter('active')}
              className={`flex-1 sm:flex-none justify-center sm:justify-start ${
                activeFilter === 'active'
                  ? 'bg-lime-500/90 text-black font-medium shadow-lg'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white border border-white/20'
              } transition-all duration-300 backdrop-blur-sm text-sm lg:text-base py-2 lg:py-3 px-4 lg:px-6`}
            >
              <Activity className="w-4 h-4 mr-2" />
              Most Active
            </Button>
          </div>

          {/* Stock List */}
          <Card className="bg-black/40 backdrop-blur-md border-white/20 hover:shadow-2xl hover:shadow-lime-500/10 transition-all duration-500">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2 text-lg lg:text-xl">
                {activeFilter === 'gainers' && <><TrendingUp className="w-5 h-5 text-lime-400" /> Top Gainers - NSE/BSE</>}
                {activeFilter === 'losers' && <><TrendingDown className="w-5 h-5 text-red-400" /> Top Losers - NSE/BSE</>}
                {activeFilter === 'active' && <><Activity className="w-5 h-5 text-blue-400" /> Most Active - NSE/BSE</>}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 lg:space-y-4">
                {currentData.map((stock, index) => (
                  <div key={stock.symbol} className="flex items-center justify-between p-3 lg:p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 group cursor-pointer border border-white/10 backdrop-blur-sm">
                    <div className="flex items-center space-x-3 lg:space-x-4 flex-1 min-w-0">
                      <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-lime-500/20 to-emerald-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                        <span className="text-lime-400 font-bold text-xs lg:text-sm">#{index + 1}</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                          <h4 className="text-white font-semibold group-hover:text-lime-400 transition-colors text-sm lg:text-base truncate">
                            {stock.symbol}
                          </h4>
                          <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full border border-blue-500/30 w-fit">
                            {stock.exchange}
                          </span>
                        </div>
                        <p className="text-gray-400 text-xs lg:text-sm truncate">{stock.name}</p>
                        <p className="text-gray-500 text-xs">Vol: {stock.volume}</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-white font-bold text-sm lg:text-lg">{stock.price}</p>
                      <div className="flex items-center justify-end space-x-1 lg:space-x-2">
                        {activeFilter === 'gainers' ? (
                          <ArrowUpRight className="w-3 h-3 lg:w-4 lg:h-4 text-lime-400" />
                        ) : activeFilter === 'losers' ? (
                          <ArrowDownRight className="w-3 h-3 lg:w-4 lg:h-4 text-red-400" />
                        ) : (
                          <Activity className="w-3 h-3 lg:w-4 lg:h-4 text-blue-400" />
                        )}
                        <span className={`text-xs lg:text-sm font-semibold ${
                          stock.change.startsWith('+') ? 'text-lime-400' : 'text-red-400'
                        }`}>
                          {stock.change}
                        </span>
                      </div>
                      <p className={`text-xs ${
                        stock.changeValue.startsWith('+') ? 'text-lime-400' : 'text-red-400'
                      }`}>
                        {stock.changeValue}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Market Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 lg:mt-8">
            <Card className="bg-gradient-to-br from-lime-500/10 to-green-500/10 border-lime-500/20 backdrop-blur-sm">
              <CardContent className="p-4 lg:p-6 text-center">
                <TrendingUp className="w-8 h-8 lg:w-10 lg:h-10 text-lime-400 mx-auto mb-3" />
                <h3 className="text-lime-400 font-semibold mb-2 text-sm lg:text-base">Market Sentiment</h3>
                <p className="text-white font-bold text-lg lg:text-xl">Bullish</p>
                <p className="text-gray-400 text-xs lg:text-sm">NSE & BSE Trending Up</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20 backdrop-blur-sm">
              <CardContent className="p-4 lg:p-6 text-center">
                <Activity className="w-8 h-8 lg:w-10 lg:h-10 text-blue-400 mx-auto mb-3" />
                <h3 className="text-blue-400 font-semibold mb-2 text-sm lg:text-base">Trading Volume</h3>
                <p className="text-white font-bold text-lg lg:text-xl">High</p>
                <p className="text-gray-400 text-xs lg:text-sm">Above Average Activity</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border-orange-500/20 backdrop-blur-sm sm:col-span-2 lg:col-span-1">
              <CardContent className="p-4 lg:p-6 text-center">
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-xs lg:text-sm">₹</span>
                </div>
                <h3 className="text-orange-400 font-semibold mb-2 text-sm lg:text-base">Market Cap</h3>
                <p className="text-white font-bold text-lg lg:text-xl">₹2.8L Cr</p>
                <p className="text-gray-400 text-xs lg:text-sm">Combined NSE/BSE</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
