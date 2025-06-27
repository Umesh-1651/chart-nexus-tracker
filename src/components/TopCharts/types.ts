
export type StockType = 'gainers' | 'losers' | 'active';
export type RowCount = 5 | 10 | 20;

export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume?: number;
}

export interface TopChartsProps {
  onDataFetch?: (type: StockType, limit: RowCount) => Promise<StockData[]>;
  className?: string;
}
