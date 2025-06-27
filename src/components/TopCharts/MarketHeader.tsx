
import { useState, useEffect } from 'react';
import { getCurrentTime, getMarketStatus } from './utils';

export function MarketHeader() {
  const [currentTime, setCurrentTime] = useState(getCurrentTime());
  const [marketStatus, setMarketStatus] = useState(getMarketStatus());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime());
      setMarketStatus(getMarketStatus());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <h1 className="text-white text-2xl lg:text-3xl font-bold">
        <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Current Market Trends
        </span>
      </h1>
      
      <div className="flex items-center gap-4 text-sm">
        <div className="text-gray-300">
          IST: {currentTime}
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
          marketStatus === 'Open' 
            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
            : 'bg-red-500/20 text-red-400 border border-red-500/30'
        }`}>
          Market {marketStatus}
        </div>
      </div>
    </div>
  );
}
