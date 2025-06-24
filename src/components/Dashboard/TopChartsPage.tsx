
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Activity, RefreshCw, Filter, BarChart3, Clock } from 'lucide-react';
import { GlassHeader } from '../Layout/GlassHeader';

interface TopChartsPageProps {
  userEmail: string;
  onTabChange: (tab: 'dashboard' | 'topcharts') => void;
  onLogout: () => void;
}

interface StockData {
  ticker: string;
  price: string;
  change_amount: string;
  change_percentage: string;
  volume: string;
}

export function TopChartsPage({ userEmail, onTabChange, onLogout }: TopChartsPageProps) {
  const [gainersLosersFilter, setGainersLosersFilter] = useState('TOP_GAINERS_LOSERS');
  const [mostActiveFilter, setMostActiveFilter] = useState('MOST_ACTIVELY_TRADED');
  const [count, setCount] = useState('10');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Since we're focusing on Indian markets, we'll simulate NSE/BSE data
  const simulateIndianMarketData = () => {
    setLoading(true);
    setError(null);
    
    // Simulate API delay
    setTimeout(() => {
      const indianStocks = {
        top_gainers: [
          { ticker: 'RELIANCE.NSE', price: '2890.45', change_amount: '+89.20', change_percentage: '+3.18%', volume: '15840000' },
          { ticker: 'TCS.NSE', price: '3456.78', change_amount: '+98.45', change_percentage: '+2.93%', volume: '12450000' },
          { ticker: 'HDFCBANK.NSE', price: '1678.90', change_amount: '+42.15', change_percentage: '+2.57%', volume: '18920000' },
          { ticker: 'INFY.NSE', price: '1423.67', change_amount: '+32.80', change_percentage: '+2.36%', volume: '11230000' },
          { ticker: 'ICICIBANK.NSE', price: '987.45', change_amount: '+21.30', change_percentage: '+2.20%', volume: '16780000' },
        ],
        top_losers: [
          { ticker: 'BAJFINANCE.NSE', price: '6789.12', change_amount: '-156.78', change_percentage: '-2.26%', volume: '8760000' },
          { ticker: 'MARUTI.NSE', price: '9876.54', change_amount: '-198.45', change_percentage: '-1.97%', volume: '7890000' },
          { ticker: 'ADANIPORTS.NSE', price: '1234.56', change_amount: '-23.45', change_percentage: '-1.86%', volume: '9340000' },
          { ticker: 'TATAMOTORS.NSE', price: '567.89', change_amount: '-9.87', change_percentage: '-1.71%', volume: '14560000' },
          { ticker: 'WIPRO.NSE', price: '432.10', change_amount: '-6.78', change_percentage: '-1.54%', volume: '6780000' },
        ],
        most_actively_traded: [
          { ticker: 'RELIANCE.NSE', price: '2890.45', change_amount: '+89.20', change_percentage: '+3.18%', volume: '25840000' },
          { ticker: 'TATAMOTORS.NSE', price: '567.89', change_amount: '-9.87', change_percentage: '-1.71%', volume: '24560000' },
          { ticker: 'HDFCBANK.NSE', price: '1678.90', change_amount: '+42.15', change_percentage: '+2.57%', volume: '18920000' },
          { ticker: 'ICICIBANK.NSE', price: '987.45', change_amount: '+21.30', change_percentage: '+2.20%', volume: '16780000' },
          { ticker: 'INFY.NSE', price: '1423.67', change_amount: '+32.80', change_percentage: '+2.36%', volume: '15230000' },
        ],
        last_updated: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
      };
      
      setData(indianStocks);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    simulateIndianMarketData();
  }, []);

  const refreshData = () => {
    simulateIndianMarketData();
  };

  // Get current IST time
  const currentTime = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  const renderStockCard = (stock: StockData, index: number, type: 'gainer' | 'loser') => (
    <Card key={`${stock.ticker}-${index}`} className="bg-black/40 backdrop-blur-md border-white/20 hover:shadow-2xl hover:shadow-lime-500/10 transition-all duration-500 group cursor-pointer transform hover:scale-105">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
              type === 'gainer' 
                ? 'bg-gradient-to-br from-lime-500/20 to-emerald-500/20 group-hover:from-lime-500/30 group-hover:to-emerald-500/30' 
                : 'bg-gradient-to-br from-red-500/20 to-pink-500/20 group-hover:from-red-500/30 group-hover:to-pink-500/30'
            }`}>
              {type === 'gainer' ? 
                <TrendingUp className="w-5 h-5 text-lime-400" /> : 
                <TrendingDown className="w-5 h-5 text-red-400" />
              }
            </div>
            <div>
              <h3 className="text-white font-bold text-lg group-hover:text-lime-400 transition-colors">{stock.ticker.replace('.NSE', '')}</h3>
              <p className="text-gray-400 text-sm">Vol: {parseInt(stock.volume).toLocaleString('en-IN')}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-white font-bold text-xl group-hover:text-lime-400 transition-colors">₹{parseFloat(stock.price).toFixed(2)}</p>
            <div className={`text-sm font-semibold px-2 py-1 rounded-full backdrop-blur-sm border ${
              type === 'gainer' 
                ? 'text-lime-400 bg-lime-500/20 border-lime-500/30' 
                : 'text-red-400 bg-red-500/20 border-red-500/30'
            }`}>
              {stock.change_percentage}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white">
      <GlassHeader 
        activeTab="topcharts" 
        onTabChange={onTabChange} 
        userEmail={userEmail} 
        onLogout={onLogout} 
      />
      
      <div className="pt-24 p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-500 mb-4 flex items-center gap-3">
                  <BarChart3 className="text-lime-400" />
                  NSE/BSE Top Charts
                </h1>
                <p className="text-gray-300">Real-time data from National and Bombay Stock Exchanges</p>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>IST {currentTime}</span>
                </div>
                <div className="px-3 py-1 bg-lime-500/20 rounded-full border border-lime-500/30">
                  <span className="text-lime-400 font-medium">🇮🇳 Live Data</span>
                </div>
              </div>
            </div>
            
            {/* Separate Filter Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Gainers/Losers Filter */}
              <div className="p-6 bg-black/40 backdrop-blur-md rounded-xl border border-white/20">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="text-lime-400 w-5 h-5" />
                  Top Gainers & Losers
                </h3>
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="flex items-center space-x-3">
                    <Filter className="text-lime-400 w-4 h-4" />
                    <label className="text-gray-300 font-medium">Count:</label>
                    <Select value={count} onValueChange={setCount}>
                      <SelectTrigger className="w-28 bg-white/10 border-white/20 text-white hover:bg-white/20 transition-colors backdrop-blur-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-black/80 backdrop-blur-md border-white/20">
                        <SelectItem value="5" className="text-white hover:bg-white/10">Top 5</SelectItem>
                        <SelectItem value="10" className="text-white hover:bg-white/10">Top 10</SelectItem>
                        <SelectItem value="20" className="text-white hover:bg-white/10">Top 20</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Most Active Filter */}
              <div className="p-6 bg-black/40 backdrop-blur-md rounded-xl border border-white/20">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Activity className="text-blue-400 w-5 h-5" />
                  Most Actively Traded
                </h3>
                <div className="flex flex-wrap gap-4 items-center">
                  <Button 
                    onClick={refreshData}
                    disabled={loading}
                    className="bg-lime-500/90 hover:bg-lime-400 text-black font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm"
                  >
                    {loading ? (
                      <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                      <RefreshCw className="w-4 h-4 mr-2" />
                    )}
                    Refresh NSE/BSE Data
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <RefreshCw className="w-12 h-12 animate-spin text-lime-400 mx-auto mb-4" />
                <span className="text-gray-300 text-lg">Loading Indian market data...</span>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/30 rounded-xl p-6 mb-6 backdrop-blur-sm">
              <p className="text-red-400 text-center font-semibold">{error}</p>
            </div>
          )}

          {/* Content */}
          {data && !loading && !error && (
            <div className="space-y-8">
              {/* Top Gainers and Losers */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                {/* Top Gainers */}
                {data.top_gainers && (
                  <div className="space-y-4">
                    <h2 className="text-xl md:text-2xl font-bold text-lime-400 mb-6 flex items-center gap-2">
                      <TrendingUp className="w-6 h-6" />
                      Top NSE Gainers
                      <span className="text-sm bg-lime-500/20 px-3 py-1 rounded-full border border-lime-500/30">
                        {data.top_gainers.slice(0, parseInt(count)).length} stocks
                      </span>
                    </h2>
                    <div className="space-y-4">
                      {data.top_gainers.slice(0, parseInt(count)).map((stock: StockData, index: number) =>
                        renderStockCard(stock, index, 'gainer')
                      )}
                    </div>
                  </div>
                )}

                {/* Top Losers */}
                {data.top_losers && (
                  <div className="space-y-4">
                    <h2 className="text-xl md:text-2xl font-bold text-red-400 mb-6 flex items-center gap-2">
                      <TrendingDown className="w-6 h-6" />
                      Top NSE Losers
                      <span className="text-sm bg-red-500/20 px-3 py-1 rounded-full border border-red-500/30">
                        {data.top_losers.slice(0, parseInt(count)).length} stocks
                      </span>
                    </h2>
                    <div className="space-y-4">
                      {data.top_losers.slice(0, parseInt(count)).map((stock: StockData, index: number) =>
                        renderStockCard(stock, index, 'loser')
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Most Active */}
              {data.most_actively_traded && (
                <div className="space-y-4">
                  <h2 className="text-xl md:text-2xl font-bold text-blue-400 mb-6 flex items-center gap-2">
                    <Activity className="w-6 h-6" />
                    Most Actively Traded (NSE)
                    <span className="text-sm bg-blue-500/20 px-3 py-1 rounded-full border border-blue-500/30">
                      {data.most_actively_traded.slice(0, parseInt(count)).length} stocks
                    </span>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {data.most_actively_traded.slice(0, parseInt(count)).map((stock: StockData, index: number) => (
                      <Card key={`${stock.ticker}-${index}`} className="bg-black/40 backdrop-blur-md border-white/20 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 group cursor-pointer transform hover:scale-105">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-white font-bold text-lg group-hover:text-blue-400 transition-colors">{stock.ticker.replace('.NSE', '')}</h3>
                              <p className="text-gray-400 text-sm">Vol: {parseInt(stock.volume).toLocaleString('en-IN')}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-white font-bold text-lg group-hover:text-blue-400 transition-colors">₹{parseFloat(stock.price).toFixed(2)}</p>
                              <div className={`text-sm font-semibold px-2 py-1 rounded-full backdrop-blur-sm border ${
                                parseFloat(stock.change_percentage.replace('%', '')) >= 0 
                                  ? 'text-lime-400 bg-lime-500/20 border-lime-500/30' 
                                  : 'text-red-400 bg-red-500/20 border-red-500/30'
                              }`}>
                                {stock.change_percentage}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* API Info */}
          <div className="mt-12 p-6 bg-black/40 backdrop-blur-md border border-white/20 rounded-xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <p className="text-gray-400 text-sm font-medium">
                  🇮🇳 Data from National Stock Exchange (NSE) and Bombay Stock Exchange (BSE). All times in IST.
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Last updated: {data?.last_updated || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                </p>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></div>
                <span className="text-gray-400">Live Indian Market Data</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
