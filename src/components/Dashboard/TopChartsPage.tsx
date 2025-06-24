
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Activity, RefreshCw, Filter, BarChart3 } from 'lucide-react';
import { Header } from '../Layout/Header';

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
  const [filter, setFilter] = useState('TOP_GAINERS_LOSERS');
  const [count, setCount] = useState('10');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = 'NCYA0X8RS6I0W40Q';

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const url = `https://www.alphavantage.co/query?function=${filter}&apikey=${API_KEY}`;
      const response = await fetch(url);
      const result = await response.json();
      
      if (result['Error Message']) {
        throw new Error(result['Error Message']);
      }
      
      if (result['Note']) {
        throw new Error('API call frequency limit reached. Please try again later.');
      }
      
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filter]);

  const renderStockCard = (stock: StockData, index: number, type: 'gainer' | 'loser') => (
    <Card key={`${stock.ticker}-${index}`} className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 border-gray-700/50 backdrop-blur-sm hover:shadow-2xl hover:shadow-lime-500/10 transition-all duration-500 group cursor-pointer transform hover:scale-105">
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
              <h3 className="text-white font-bold text-lg group-hover:text-lime-400 transition-colors">{stock.ticker}</h3>
              <p className="text-gray-400 text-sm">Vol: {parseInt(stock.volume).toLocaleString()}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-white font-bold text-xl group-hover:text-lime-400 transition-colors">${parseFloat(stock.price).toFixed(2)}</p>
            <div className={`text-sm font-semibold px-2 py-1 rounded-full ${
              type === 'gainer' 
                ? 'text-lime-400 bg-lime-500/20' 
                : 'text-red-400 bg-red-500/20'
            }`}>
              {type === 'gainer' ? '+' : ''}{stock.change_percentage}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white">
      <Header 
        activeTab="topcharts" 
        onTabChange={onTabChange} 
        userEmail={userEmail} 
        onLogout={onLogout} 
      />
      
      <div className="p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-500 mb-4 flex items-center gap-3">
              <BarChart3 className="text-lime-400" />
              Top Charts
            </h1>
            
            {/* Enhanced Filter Section */}
            <div className="flex flex-col md:flex-row flex-wrap gap-4 items-start md:items-center p-6 bg-gradient-to-r from-gray-900/80 to-gray-800/80 rounded-xl border border-gray-700/50 backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <Filter className="text-lime-400 w-5 h-5" />
                <label className="text-gray-300 font-medium">Filter:</label>
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-48 bg-gray-800/80 border-gray-600 text-white hover:bg-gray-700/80 transition-colors">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    <SelectItem value="TOP_GAINERS_LOSERS" className="text-white hover:bg-gray-700">
                      Top Gainers & Losers
                    </SelectItem>
                    <SelectItem value="MOST_ACTIVELY_TRADED" className="text-white hover:bg-gray-700">
                      Most Active
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-3">
                <label className="text-gray-300 font-medium">Count:</label>
                <Select value={count} onValueChange={setCount}>
                  <SelectTrigger className="w-28 bg-gray-800/80 border-gray-600 text-white hover:bg-gray-700/80 transition-colors">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    <SelectItem value="5" className="text-white hover:bg-gray-700">Top 5</SelectItem>
                    <SelectItem value="10" className="text-white hover:bg-gray-700">Top 10</SelectItem>
                    <SelectItem value="20" className="text-white hover:bg-gray-700">Top 20</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                onClick={fetchData}
                disabled={loading}
                className="bg-gradient-to-r from-lime-500 to-emerald-500 hover:from-lime-400 hover:to-emerald-400 text-black font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <RefreshCw className="w-4 h-4 mr-2" />
                )}
                Refresh Data
              </Button>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <RefreshCw className="w-12 h-12 animate-spin text-lime-400 mx-auto mb-4" />
                <span className="text-gray-300 text-lg">Loading market data...</span>
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {/* Top Gainers */}
              {data.top_gainers && (
                <div className="space-y-4">
                  <h2 className="text-xl md:text-2xl font-bold text-lime-400 mb-6 flex items-center gap-2">
                    <TrendingUp className="w-6 h-6" />
                    Top Gainers
                    <span className="text-sm bg-lime-500/20 px-3 py-1 rounded-full">
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
                    Top Losers
                    <span className="text-sm bg-red-500/20 px-3 py-1 rounded-full">
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

              {/* Most Active */}
              {data.most_actively_traded && (
                <div className="lg:col-span-2 space-y-4">
                  <h2 className="text-xl md:text-2xl font-bold text-blue-400 mb-6 flex items-center gap-2">
                    <Activity className="w-6 h-6" />
                    Most Actively Traded
                    <span className="text-sm bg-blue-500/20 px-3 py-1 rounded-full">
                      {data.most_actively_traded.slice(0, parseInt(count)).length} stocks
                    </span>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {data.most_actively_traded.slice(0, parseInt(count)).map((stock: StockData, index: number) => (
                      <Card key={`${stock.ticker}-${index}`} className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 border-gray-700/50 backdrop-blur-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 group cursor-pointer transform hover:scale-105">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-white font-bold text-lg group-hover:text-blue-400 transition-colors">{stock.ticker}</h3>
                              <p className="text-gray-400 text-sm">Vol: {parseInt(stock.volume).toLocaleString()}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-white font-bold text-lg group-hover:text-blue-400 transition-colors">${parseFloat(stock.price).toFixed(2)}</p>
                              <div className={`text-sm font-semibold px-2 py-1 rounded-full ${
                                parseFloat(stock.change_percentage.replace('%', '')) >= 0 
                                  ? 'text-lime-400 bg-lime-500/20' 
                                  : 'text-red-400 bg-red-500/20'
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
          <div className="mt-12 p-6 bg-gradient-to-r from-gray-800/30 to-gray-700/20 border border-gray-700/30 rounded-xl backdrop-blur-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <p className="text-gray-400 text-sm font-medium">
                  Data provided by Alpha Vantage API. Market data may be delayed.
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Last updated: {data?.last_updated || new Date().toLocaleString()}
                </p>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></div>
                <span className="text-gray-400">Live Data</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
