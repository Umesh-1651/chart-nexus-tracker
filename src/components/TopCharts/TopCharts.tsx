
import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { StockType, RowCount, StockData, TopChartsProps } from './types';
import { MarketHeader } from './MarketHeader';
import { FilterControls } from './FilterControls';
import { StockTable } from './StockTable';
import { EmptyState } from './EmptyState';
import { LoadingState } from './LoadingState';

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

  const handleRowCountChange = (count: RowCount) => {
    if (count !== rowCount) {
      setRowCount(count);
    }
  };

  return (
    <Card className={`bg-black/50 backdrop-blur-xl border-white/10 shadow-2xl hover:shadow-3xl transition-all duration-700 ${className}`}>
      <CardContent className="p-6">
        <MarketHeader />
        
        <FilterControls
          activeFilter={activeFilter}
          rowCount={rowCount}
          isLoading={isLoading}
          onFilterChange={handleFilterChange}
          onRowCountChange={handleRowCountChange}
          onRefresh={handleRefresh}
        />

        {error && (
          <div className="text-red-400 text-sm mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
              {error}
            </div>
          </div>
        )}

        {isLoading ? (
          <LoadingState activeFilter={activeFilter} />
        ) : data.length === 0 ? (
          <EmptyState onRefresh={handleRefresh} hasApi={!!onDataFetch} />
        ) : (
          <StockTable data={data} activeFilter={activeFilter} />
        )}
      </CardContent>
    </Card>
  );
}
