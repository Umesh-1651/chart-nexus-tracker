
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Activity, RefreshCw } from 'lucide-react';
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
    <Card key={`${stock.ticker}-${index}`} className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              type === 'gainer' ? 'bg-lime-500/20' : 'bg-red-500/20'
            }`}>
              {type === 'gainer' ? 
                <TrendingUp className="w-4 h-4 text-lime-500" /> : 
                <TrendingDown className="w-4 h-4 text-red-500" />
              }
            </div>
            <div>
              <h3 className="text-white font-semibold">{stock.ticker}</h3>
              <p className="text-gray-400 text-sm">Vol: {parseInt(stock.volume).toLocaleString()}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-white font-semibold">${parseFloat(stock.price).toFixed(2)}</p>
            <div className={`text-sm ${type === 'gainer' ? 'text-lime-500' : 'text-red-500'}`}>
              {type === 'gainer' ? '+' : ''}{stock.change_percentage}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <Header 
        activeTab="topcharts" 
        onTabChange={onTabChange} 
        userEmail={userEmail} 
        onLogout={onLogout} 
      />
      
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-4">Top Charts</h1>
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center space-x-2">
                <label className="text-gray-300 text-sm">Filter:</label>
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-48 bg-gray-800 border-gray-600 text-white">
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
              
              <div className="flex items-center space-x-2">
                <label className="text-gray-300 text-sm">Count:</label>
                <Select value={count} onValueChange={setCount}>
                  <SelectTrigger className="w-24 bg-gray-800 border-gray-600 text-white">
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
                className="bg-lime-500 hover:bg-lime-600 text-black"
              >
                {loading ? (
                  <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <RefreshCw className="w-4 h-4 mr-2" />
                )}
                Refresh
              </Button>
            </div>
          </div>

          {/* Content */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <RefreshCw className="w-8 h-8 animate-spin text-lime-500" />
              <span className="ml-2 text-gray-300">Loading market data...</span>
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
              <p className="text-red-400">{error}</p>
            </div>
          )}

          {data && !loading && !error && (
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Top Gainers */}
              {data.top_gainers && (
                <div>
                  <h2 className="text-xl font-semibold text-lime-500 mb-4 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Top Gainers
                  </h2>
                  <div className="space-y-3">
                    {data.top_gainers.slice(0, parseInt(count)).map((stock: StockData, index: number) =>
                      renderStockCard(stock, index, 'gainer')
                    )}
                  </div>
                </div>
              )}

              {/* Top Losers */}
              {data.top_losers && (
                <div>
                  <h2 className="text-xl font-semibold text-red-500 mb-4 flex items-center">
                    <TrendingDown className="w-5 h-5 mr-2" />
                    Top Losers
                  </h2>
                  <div className="space-y-3">
                    {data.top_losers.slice(0, parseInt(count)).map((stock: StockData, index: number) =>
                      renderStockCard(stock, index, 'loser')
                    )}
                  </div>
                </div>
              )}

              {/* Most Active */}
              {data.most_actively_traded && (
                <div className="lg:col-span-2">
                  <h2 className="text-xl font-semibold text-blue-500 mb-4 flex items-center">
                    <Activity className="w-5 h-5 mr-2" />
                    Most Actively Traded
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {data.most_actively_traded.slice(0, parseInt(count)).map((stock: StockData, index: number) => (
                      <Card key={`${stock.ticker}-${index}`} className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-white font-semibold">{stock.ticker}</h3>
                              <p className="text-gray-400 text-sm">Vol: {parseInt(stock.volume).toLocaleString()}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-white font-semibold">${parseFloat(stock.price).toFixed(2)}</p>
                              <div className={`text-sm ${
                                parseFloat(stock.change_percentage.replace('%', '')) >= 0 ? 'text-lime-500' : 'text-red-500'
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
          <div className="mt-8 p-4 bg-gray-800/50 border border-gray-700 rounded-lg">
            <p className="text-gray-400 text-sm">
              Data provided by Alpha Vantage API. Market data may be delayed.
              <br />
              Last updated: {data?.last_updated || new Date().toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
