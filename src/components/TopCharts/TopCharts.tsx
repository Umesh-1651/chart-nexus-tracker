
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingUp, TrendingDown, Activity, RefreshCcw, Loader2 } from 'lucide-react';

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

  // Mock data for demonstration
  const mockData: Record<StockType, StockData[]> = {
    gainers: [
      { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2950.50, change: 75.25, changePercent: 2.62 },
      { symbol: 'HDFCBANK', name: 'HDFC Bank', price: 1720.80, change: 32.40, changePercent: 1.92 },
      { symbol: 'INFY', name: 'Infosys', price: 1550.30, change: 28.60, changePercent: 1.88 },
      { symbol: 'TCS', name: 'Tata Consultancy Services', price: 3820.45, change: 65.15, changePercent: 1.74 },
      { symbol: 'ICICIBANK', name: 'ICICI Bank', price: 980.20, change: 15.80, changePercent: 1.64 },
    ],
    losers: [
      { symbol: 'BAJFINANCE', name: 'Bajaj Finance', price: 6850.30, change: -142.70, changePercent: -2.04 },
      { symbol: 'AXISBANK', name: 'Axis Bank', price: 1120.15, change: -22.85, changePercent: -2.00 },
      { symbol: 'MARUTI', name: 'Maruti Suzuki', price: 10200.50, change: -195.50, changePercent: -1.88 },
      { symbol: 'LT', name: 'Larsen & Toubro', price: 3450.80, change: -62.20, changePercent: -1.77 },
      { symbol: 'WIPRO', name: 'Wipro', price: 420.75, change: -7.25, changePercent: -1.69 },
    ],
    active: [
      { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2950.50, change: 75.25, changePercent: 2.62, volume: 12500000 },
      { symbol: 'HDFCBANK', name: 'HDFC Bank', price: 1720.80, change: 32.40, changePercent: 1.92, volume: 8750000 },
      { symbol: 'ICICIBANK', name: 'ICICI Bank', price: 980.20, change: 15.80, changePercent: 1.64, volume: 7200000 },
      { symbol: 'TCS', name: 'Tata Consultancy Services', price: 3820.45, change: 65.15, changePercent: 1.74, volume: 6800000 },
      { symbol: 'AXISBANK', name: 'Axis Bank', price: 1120.15, change: -22.85, changePercent: -2.00, volume: 5900000 },
    ]
  };

  const fetchData = async (type: StockType, limit: RowCount) => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (onDataFetch) {
        const result = await onDataFetch(type, limit);
        setData(result);
      } else {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockResult = mockData[type].slice(0, limit);
        setData(mockResult);
      }
    } catch (err) {
      setError('Failed to fetch data. Please try again.');
      console.error('Error fetching stock data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(activeFilter, rowCount);
  }, [activeFilter, rowCount]);

  const handleRefresh = () => {
    fetchData(activeFilter, rowCount);
  };

  const getFilterIcon = (type: StockType) => {
    switch (type) {
      case 'gainers':
        return <TrendingUp className="w-4 h-4 text-lime-400" />;
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

  const formatChange = (change: number, changePercent: number) => {
    const isPositive = change >= 0;
    const colorClass = isPositive ? 'text-lime-400' : 'text-red-400';
    const symbol = isPositive ? '+' : '';
    
    return (
      <div className={`${colorClass} font-medium text-sm`}>
        <div>{symbol}₹{Math.abs(change).toFixed(2)}</div>
        <div className="text-xs opacity-80">({symbol}{changePercent.toFixed(2)}%)</div>
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

  return (
    <Card className={`bg-black/40 backdrop-blur-md border-white/20 hover:shadow-2xl hover:shadow-lime-500/10 transition-all duration-500 ${className}`}>
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="text-white flex items-center gap-2 text-lg lg:text-xl">
            {getFilterIcon(activeFilter)}
            {getFilterTitle(activeFilter)}
          </CardTitle>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            {/* Filter Buttons */}
            <div className="flex gap-1 p-1 bg-white/5 rounded-lg backdrop-blur-sm">
              {(['gainers', 'losers', 'active'] as StockType[]).map((type) => (
                <Button
                  key={type}
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveFilter(type)}
                  className={`px-3 py-1.5 text-xs sm:text-sm transition-all duration-200 ${
                    activeFilter === type
                      ? 'bg-lime-500/20 text-lime-400 border border-lime-500/30'
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {getFilterIcon(type)}
                  <span className="ml-1 hidden sm:inline">
                    {type === 'gainers' ? 'Gainers' : type === 'losers' ? 'Losers' : 'Active'}
                  </span>
                </Button>
              ))}
            </div>

            {/* Row Count & Refresh */}
            <div className="flex gap-2 items-center">
              <Select value={rowCount.toString()} onValueChange={(value) => setRowCount(Number(value) as RowCount)}>
                <SelectTrigger className="w-16 h-8 bg-white/5 border-white/20 text-white text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-black/90 backdrop-blur-md border-white/20">
                  <SelectItem value="5" className="text-white hover:bg-white/10">5</SelectItem>
                  <SelectItem value="10" className="text-white hover:bg-white/10">10</SelectItem>
                  <SelectItem value="20" className="text-white hover:bg-white/10">20</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleRefresh}
                disabled={isLoading}
                className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-50"
              >
                <RefreshCcw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        {error && (
          <div className="text-red-400 text-sm mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-8 h-8 text-lime-400 animate-spin" />
              <p className="text-gray-400 text-sm">Loading stock data...</p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="text-gray-400 font-medium text-xs sm:text-sm">Symbol</TableHead>
                  <TableHead className="text-gray-400 font-medium text-xs sm:text-sm hidden sm:table-cell">Name</TableHead>
                  <TableHead className="text-gray-400 font-medium text-xs sm:text-sm text-right">Price</TableHead>
                  <TableHead className="text-gray-400 font-medium text-xs sm:text-sm text-right">Change</TableHead>
                  {activeFilter === 'active' && (
                    <TableHead className="text-gray-400 font-medium text-xs sm:text-sm text-right hidden lg:table-cell">Volume</TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((stock, index) => (
                  <TableRow 
                    key={stock.symbol} 
                    className="border-white/10 hover:bg-white/5 transition-colors duration-200"
                  >
                    <TableCell className="font-medium text-white text-xs sm:text-sm">
                      <div>
                        <div className="font-bold">{stock.symbol}</div>
                        <div className="text-gray-400 text-xs sm:hidden truncate max-w-[80px]">
                          {stock.name}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-300 text-xs sm:text-sm hidden sm:table-cell">
                      <div className="truncate max-w-[150px] lg:max-w-none">{stock.name}</div>
                    </TableCell>
                    <TableCell className="text-white font-medium text-xs sm:text-sm text-right">
                      ₹{stock.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatChange(stock.change, stock.changePercent)}
                    </TableCell>
                    {activeFilter === 'active' && (
                      <TableCell className="text-gray-300 text-xs sm:text-sm text-right hidden lg:table-cell">
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
