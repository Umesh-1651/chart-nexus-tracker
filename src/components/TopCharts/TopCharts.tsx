
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingUp, TrendingDown, Activity, RefreshCcw, Loader2, Database } from 'lucide-react';

type StockType = 'gainers' | 'losers' | 'active';
type RowCount = 5 | 10 | 20;

interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume?: number;
}

interface TopChartsProps {
  onDataFetch?: (type: StockType, limit: RowCount) => Promise<StockData[]>;
  className?: string;
}

export function TopCharts({ onDataFetch, className = '' }: TopChartsProps) {
  const [activeFilter, setActiveFilter] = useState<StockType>('gainers');
  const [rowCount, setRowCount] = useState<RowCount>(10);
  const [data, setData] = useState<StockData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (type: StockType, limit: RowCount) => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (onDataFetch) {
        const result = await onDataFetch(type, limit);
        setData(result || []);
      } else {
        // No API connected - set empty data
        setData([]);
      }
    } catch (err) {
      setError('Failed to fetch data. Please try again.');
      setData([]);
      console.error('Error fetching stock data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(activeFilter, rowCount);
  }, [activeFilter, rowCount, onDataFetch]);

  const handleRefresh = () => {
    fetchData(activeFilter, rowCount);
  };

  const handleFilterChange = (type: StockType) => {
    if (type !== activeFilter) {
      setActiveFilter(type);
    }
  };

  const getFilterIcon = (type: StockType) => {
    switch (type) {
      case 'gainers':
        return <TrendingUp className="w-4 h-4 text-emerald-400" />;
      case 'losers':
        return <TrendingDown className="w-4 h-4 text-red-400" />;
      case 'active':
        return <Activity className="w-4 h-4 text-blue-400" />;
    }
  };

  const getFilterTitle = (type: StockType) => {
    switch (type) {
      case 'gainers':
        return 'Top Gainers';
      case 'losers':
        return 'Top Losers';
      case 'active':
        return 'Most Traded';
    }
  };

  const getFilterColor = (type: StockType) => {
    switch (type) {
      case 'gainers':
        return 'emerald';
      case 'losers':
        return 'red';
      case 'active':
        return 'blue';
    }
  };

  const formatChange = (change: number, changePercent: number) => {
    const isPositive = change >= 0;
    const colorClass = isPositive ? 'text-emerald-400' : 'text-red-400';
    const symbol = isPositive ? '+' : '';
    
    return (
      <div className={`${colorClass} font-semibold text-sm`}>
        <div>{symbol}₹{Math.abs(change).toFixed(2)}</div>
        <div className="text-xs opacity-90">({symbol}{changePercent.toFixed(2)}%)</div>
      </div>
    );
  };

  const formatVolume = (volume?: number) => {
    if (!volume) return '-';
    if (volume >= 10000000) return `${(volume / 10000000).toFixed(1)}Cr`;
    if (volume >= 100000) return `${(volume / 100000).toFixed(1)}L`;
    if (volume >= 1000) return `${(volume / 1000).toFixed(1)}K`;
    return volume.toString();
  };

  const currentColor = getFilterColor(activeFilter);

  return (
    <Card className={`bg-black/50 backdrop-blur-xl border-white/10 shadow-2xl hover:shadow-3xl hover:shadow-${currentColor}-500/5 transition-all duration-700 ${className}`}>
      <CardHeader className="pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <CardTitle className="text-white flex items-center gap-3 text-xl lg:text-2xl font-bold">
            <div className={`p-2 rounded-lg bg-${currentColor}-500/20 border border-${currentColor}-500/30`}>
              {getFilterIcon(activeFilter)}
            </div>
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {getFilterTitle(activeFilter)}
            </span>
          </CardTitle>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
            {/* Filter Buttons */}
            <div className="flex gap-2 p-1.5 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
              {(['gainers', 'losers', 'active'] as StockType[]).map((type) => {
                const isActive = activeFilter === type;
                const color = getFilterColor(type);
                return (
                  <Button
                    key={type}
                    variant="ghost"
                    size="sm"
                    onClick={() => handleFilterChange(type)}
                    className={`px-4 py-2.5 text-sm font-medium transition-all duration-300 rounded-lg ${
                      isActive
                        ? `bg-${color}-500/20 text-${color}-400 border border-${color}-500/40 shadow-lg shadow-${color}-500/20`
                        : 'text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20'
                    }`}
                  >
                    {getFilterIcon(type)}
                    <span className="ml-2 hidden sm:inline">
                      {type === 'gainers' ? 'Gainers' : type === 'losers' ? 'Losers' : 'Most Traded'}
                    </span>
                  </Button>
                );
              })}
            </div>

            {/* Row Count & Refresh */}
            <div className="flex gap-3 items-center">
              <Select value={rowCount.toString()} onValueChange={(value) => setRowCount(Number(value) as RowCount)}>
                <SelectTrigger className="w-20 h-10 bg-white/5 border-white/20 text-white text-sm font-medium rounded-lg backdrop-blur-sm hover:bg-white/10 transition-colors">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-black/95 backdrop-blur-xl border-white/20 rounded-lg">
                  <SelectItem value="5" className="text-white hover:bg-white/10 rounded-md">5</SelectItem>
                  <SelectItem value="10" className="text-white hover:bg-white/10 rounded-md">10</SelectItem>
                  <SelectItem value="20" className="text-white hover:bg-white/10 rounded-md">20</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleRefresh}
                disabled={isLoading}
                className={`h-10 w-10 p-0 rounded-lg bg-white/5 border border-white/20 hover:bg-${currentColor}-500/20 hover:border-${currentColor}-500/40 disabled:opacity-50 transition-all duration-300`}
              >
                <RefreshCcw className={`w-4 h-4 ${isLoading ? 'animate-spin text-' + currentColor + '-400' : 'text-gray-400 hover:text-white'}`} />
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 pt-0">
        {error && (
          <div className="text-red-400 text-sm mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
              {error}
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <Loader2 className={`w-12 h-12 text-${currentColor}-400 animate-spin`} />
                <div className={`absolute inset-0 w-12 h-12 border-2 border-${currentColor}-500/20 rounded-full animate-pulse`}></div>
              </div>
              <div className="text-center">
                <p className="text-gray-300 text-lg font-medium mb-1">Loading Data...</p>
                <p className="text-gray-500 text-sm">Fetching latest {getFilterTitle(activeFilter).toLowerCase()}</p>
              </div>
            </div>
          </div>
        ) : data.length === 0 ? (
          <div className="flex items-center justify-center py-16">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className={`p-4 rounded-xl bg-${currentColor}-500/10 border border-${currentColor}-500/20`}>
                <Database className={`w-12 h-12 text-${currentColor}-400 opacity-60`} />
              </div>
              <div>
                <p className="text-gray-300 text-lg font-medium mb-1">No Data Available</p>
                <p className="text-gray-500 text-sm">
                  {onDataFetch ? 'No data returned from API' : 'API connection not configured'}
                </p>
              </div>
              <Button
                onClick={handleRefresh}
                variant="outline"
                size="sm"
                className={`mt-2 border-${currentColor}-500/30 text-${currentColor}-400 hover:bg-${currentColor}-500/10 hover:border-${currentColor}-500/50`}
              >
                <RefreshCcw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="text-gray-300 font-semibold text-sm bg-white/5">Symbol</TableHead>
                  <TableHead className="text-gray-300 font-semibold text-sm hidden sm:table-cell bg-white/5">Company</TableHead>
                  <TableHead className="text-gray-300 font-semibold text-sm text-right bg-white/5">Price</TableHead>
                  <TableHead className="text-gray-300 font-semibold text-sm text-right bg-white/5">Change</TableHead>
                  {activeFilter === 'active' && (
                    <TableHead className="text-gray-300 font-semibold text-sm text-right hidden lg:table-cell bg-white/5">Volume</TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((stock, index) => (
                  <TableRow 
                    key={stock.symbol} 
                    className="border-white/10 hover:bg-white/5 transition-all duration-200 group"
                  >
                    <TableCell className="font-bold text-white text-sm">
                      <div>
                        <div className={`font-bold text-${currentColor}-400 group-hover:text-${currentColor}-300 transition-colors`}>
                          {stock.symbol}
                        </div>
                        <div className="text-gray-400 text-xs sm:hidden truncate max-w-[100px]">
                          {stock.name}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-300 text-sm hidden sm:table-cell">
                      <div className="truncate max-w-[200px] lg:max-w-none font-medium">{stock.name}</div>
                    </TableCell>
                    <TableCell className="text-white font-bold text-sm text-right">
                      ₹{stock.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatChange(stock.change, stock.changePercent)}
                    </TableCell>
                    {activeFilter === 'active' && (
                      <TableCell className="text-gray-300 text-sm text-right hidden lg:table-cell font-medium">
                        {formatVolume(stock.volume)}
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
