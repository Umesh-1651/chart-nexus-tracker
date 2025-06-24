
import { useEffect, useState } from 'react';
import { TrendingUp, BarChart3 } from 'lucide-react';

export function AnimatedChart() {
  const [barData, setBarData] = useState<number[]>([]);
  const [lineData, setLineData] = useState<number[]>([]);

  useEffect(() => {
    // Generate dynamic bar chart data
    const generateBarData = () => {
      const newData = Array.from({ length: 8 }, () => Math.random() * 80 + 20);
      setBarData(newData);
    };

    // Generate dynamic line chart data
    const generateLineData = () => {
      const newData = Array.from({ length: 20 }, (_, i) => {
        const base = 50 + Math.sin(i * 0.3) * 25;
        const noise = (Math.random() - 0.5) * 15;
        return Math.max(10, Math.min(90, base + noise));
      });
      setLineData(newData);
    };

    generateBarData();
    generateLineData();

    const interval = setInterval(() => {
      generateBarData();
      generateLineData();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const linePathData = lineData.reduce((path, point, index) => {
    const x = (index / (lineData.length - 1)) * 100;
    const y = 100 - point;
    return path + (index === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`);
  }, '');

  return (
    <div className="space-y-6">
      {/* Live NSE/BSE Tracker */}
      <div className="bg-gradient-to-br from-lime-500/10 to-emerald-500/10 border border-lime-500/20 rounded-xl p-6 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-lime-400 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              NSE NIFTY 50
            </h3>
            <p className="text-gray-400 text-sm">Live Indian Market</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-white">₹22,428.65</div>
            <div className="text-lime-400 text-sm font-semibold">+186.20 (+0.84%)</div>
          </div>
        </div>
        
        {/* Animated Line Chart */}
        <div className="h-24 mb-4">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="nse-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" className="text-lime-400" stopColor="currentColor" stopOpacity="0.6" />
                <stop offset="100%" className="text-lime-400" stopColor="currentColor" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            
            {/* Area under curve */}
            <path
              d={`${linePathData} L 100 100 L 0 100 Z`}
              fill="url(#nse-gradient)"
              className="animate-pulse"
            />
            
            {/* Line */}
            <path
              d={linePathData}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-lime-400 animate-pulse"
            />
          </svg>
        </div>
        
        <div className="text-xs text-gray-400">
          Market Hours: 9:15 AM - 3:30 PM IST
        </div>
      </div>

      {/* BSE Sensex */}
      <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-blue-400 flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              BSE SENSEX
            </h3>
            <p className="text-gray-400 text-sm">Mumbai Stock Exchange</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-white">₹73,952.08</div>
            <div className="text-blue-400 text-sm font-semibold">+594.42 (+0.81%)</div>
          </div>
        </div>
        
        {/* Animated Bar Chart */}
        <div className="h-24 flex items-end justify-between space-x-1">
          {barData.map((height, index) => (
            <div
              key={index}
              className="bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-sm transition-all duration-1000 ease-out animate-pulse"
              style={{
                height: `${height}%`,
                width: '10%',
                animationDelay: `${index * 0.1}s`
              }}
            />
          ))}
        </div>
        
        <div className="text-xs text-gray-400 mt-2">
          Real-time Indian equities data
        </div>
      </div>

      {/* Market Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-green-500/10 to-lime-500/10 border border-green-500/20 rounded-lg p-4 backdrop-blur-sm">
          <div className="text-green-400 text-sm font-medium">Top Gainer</div>
          <div className="text-white font-bold">RELIANCE</div>
          <div className="text-green-400 text-sm">+5.67%</div>
        </div>
        <div className="bg-gradient-to-br from-red-500/10 to-pink-500/10 border border-red-500/20 rounded-lg p-4 backdrop-blur-sm">
          <div className="text-red-400 text-sm font-medium">Top Loser</div>
          <div className="text-white font-bold">HDFC</div>
          <div className="text-red-400 text-sm">-2.34%</div>
        </div>
      </div>
    </div>
  );
}
