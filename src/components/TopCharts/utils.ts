
import { StockType } from './types';

export const formatChange = (change: number, changePercent: number) => {
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

export const formatVolume = (volume?: number) => {
  if (!volume) return '-';
  if (volume >= 10000000) return `${(volume / 10000000).toFixed(1)}Cr`;
  if (volume >= 100000) return `${(volume / 100000).toFixed(1)}L`;
  if (volume >= 1000) return `${(volume / 1000).toFixed(1)}K`;
  return volume.toString();
};

export const getFilterTitle = (type: StockType) => {
  switch (type) {
    case 'gainers':
      return 'Top Gainers';
    case 'losers':
      return 'Top Losers';
    case 'active':
      return 'Most Traded';
  }
};

export const getCurrentTime = () => {
  return new Date().toLocaleTimeString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour12: true,
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const getMarketStatus = () => {
  const now = new Date();
  const istTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  const currentHour = istTime.getHours();
  const currentMinute = istTime.getMinutes();
  const currentTime = currentHour * 60 + currentMinute;
  
  // Market opens at 9:15 AM and closes at 3:30 PM IST
  const marketOpen = 9 * 60 + 15; // 9:15 AM
  const marketClose = 15 * 60 + 30; // 3:30 PM
  
  return currentTime >= marketOpen && currentTime <= marketClose ? 'Open' : 'Closed';
};
