
import { Loader2 } from 'lucide-react';
import { getFilterTitle } from './utils';
import { StockType } from './types';

interface LoadingStateProps {
  activeFilter: StockType;
}

export function LoadingState({ activeFilter }: LoadingStateProps) {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <Loader2 className="w-12 h-12 text-blue-400 animate-spin" />
          <div className="absolute inset-0 w-12 h-12 border-2 border-blue-500/20 rounded-full animate-pulse"></div>
        </div>
        <div className="text-center">
          <p className="text-gray-300 text-lg font-medium mb-1">Loading Data...</p>
          <p className="text-gray-500 text-sm">Fetching latest {getFilterTitle(activeFilter).toLowerCase()}</p>
        </div>
      </div>
    </div>
  );
}
