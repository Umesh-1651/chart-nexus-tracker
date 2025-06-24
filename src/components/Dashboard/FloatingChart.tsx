
import { useEffect, useState } from 'react';

export function FloatingChart() {
  const [points, setPoints] = useState<number[]>([]);

  useEffect(() => {
    // Generate random data points for the floating chart
    const generatePoints = () => {
      const newPoints = Array.from({ length: 50 }, (_, i) => {
        const base = 50 + Math.sin(i * 0.2) * 20;
        const noise = (Math.random() - 0.5) * 10;
        return Math.max(10, Math.min(90, base + noise));
      });
      setPoints(newPoints);
    };

    generatePoints();
    const interval = setInterval(generatePoints, 3000);
    return () => clearInterval(interval);
  }, []);

  const pathData = points.reduce((path, point, index) => {
    const x = (index / (points.length - 1)) * 100;
    const y = 100 - point;
    return path + (index === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`);
  }, '');

  const gradientId = 'chart-gradient';

  return (
    <div className="relative h-48 md:h-64 bg-gradient-to-br from-gray-800/30 to-gray-700/20 rounded-xl overflow-hidden border border-gray-700/30 group">
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-lime-400/40 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      {/* SVG Chart */}
      <div className="absolute inset-0 p-4">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" className="text-lime-400" stopColor="currentColor" stopOpacity="0.8" />
              <stop offset="50%" className="text-emerald-500" stopColor="currentColor" stopOpacity="0.4" />
              <stop offset="100%" className="text-blue-500" stopColor="currentColor" stopOpacity="0.1" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Area under curve */}
          <path
            d={`${pathData} L 100 100 L 0 100 Z`}
            fill={`url(#${gradientId})`}
            className="opacity-60 group-hover:opacity-80 transition-opacity duration-500"
          />
          
          {/* Main line */}
          <path
            d={pathData}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-lime-400 group-hover:text-lime-300 transition-colors duration-300 animate-pulse"
            filter="url(#glow)"
          />
          
          {/* Data points */}
          {points.map((point, index) => (
            <circle
              key={index}
              cx={(index / (points.length - 1)) * 100}
              cy={100 - point}
              r="0.3"
              fill="currentColor"
              className="text-lime-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                animationDelay: `${index * 0.05}s`
              }}
            />
          ))}
        </svg>
      </div>
      
      {/* Chart info overlay */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="text-xs">
          <div className="text-lime-400 font-semibold">+12.5%</div>
          <div className="text-gray-400">24h change</div>
        </div>
        <div className="text-xs text-right">
          <div className="text-white font-semibold">$52,340</div>
          <div className="text-gray-400">Current value</div>
        </div>
      </div>
      
      {/* Animated grid lines */}
      <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
        <svg className="w-full h-full">
          {[...Array(5)].map((_, i) => (
            <line
              key={`h-${i}`}
              x1="0"
              y1={`${(i + 1) * 20}%`}
              x2="100%"
              y2={`${(i + 1) * 20}%`}
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-gray-400 animate-pulse"
              style={{
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}
          {[...Array(4)].map((_, i) => (
            <line
              key={`v-${i}`}
              x1={`${(i + 1) * 25}%`}
              y1="0"
              x2={`${(i + 1) * 25}%`}
              y2="100%"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-gray-400 animate-pulse"
              style={{
                animationDelay: `${i * 0.3}s`
              }}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
