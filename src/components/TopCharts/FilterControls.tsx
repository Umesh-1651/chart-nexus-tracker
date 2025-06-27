
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Filter, RefreshCcw, TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { StockType, RowCount } from './types';

interface FilterControlsProps {
  activeFilter: StockType;
  rowCount: RowCount;
  isLoading: boolean;
  onFilterChange: (type: StockType) => void;
  onRowCountChange: (count: RowCount) => void;
  onRefresh: () => void;
}

export function FilterControls({
  activeFilter,
  rowCount,
  isLoading,
  onFilterChange,
  onRowCountChange,
  onRefresh
}: FilterControlsProps) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30 backdrop-blur-sm"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-black/95 backdrop-blur-xl border-white/20 rounded-lg shadow-2xl">
          <DropdownMenuLabel className="text-gray-300 text-xs uppercase tracking-wider">Type</DropdownMenuLabel>
          <DropdownMenuItem 
            onClick={() => onFilterChange('gainers')}
            className={`text-white hover:bg-emerald-500/20 cursor-pointer ${activeFilter === 'gainers' ? 'bg-emerald-500/20' : ''}`}
          >
            <TrendingUp className="w-4 h-4 mr-2 text-emerald-400" />
            Top Gainers
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => onFilterChange('losers')}
            className={`text-white hover:bg-red-500/20 cursor-pointer ${activeFilter === 'losers' ? 'bg-red-500/20' : ''}`}
          >
            <TrendingDown className="w-4 h-4 mr-2 text-red-400" />
            Top Losers
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => onFilterChange('active')}
            className={`text-white hover:bg-blue-500/20 cursor-pointer ${activeFilter === 'active' ? 'bg-blue-500/20' : ''}`}
          >
            <Activity className="w-4 h-4 mr-2 text-blue-400" />
            Most Traded
          </DropdownMenuItem>
          
          <DropdownMenuSeparator className="bg-white/20" />
          
          <DropdownMenuLabel className="text-gray-300 text-xs uppercase tracking-wider">Count</DropdownMenuLabel>
          <DropdownMenuItem 
            onClick={() => onRowCountChange(5)}
            className={`text-white hover:bg-white/10 cursor-pointer ${rowCount === 5 ? 'bg-white/10' : ''}`}
          >
            5 rows
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => onRowCountChange(10)}
            className={`text-white hover:bg-white/10 cursor-pointer ${rowCount === 10 ? 'bg-white/10' : ''}`}
          >
            10 rows
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => onRowCountChange(20)}
            className={`text-white hover:bg-white/10 cursor-pointer ${rowCount === 20 ? 'bg-white/10' : ''}`}
          >
            20 rows
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        variant="ghost"
        size="sm"
        onClick={onRefresh}
        disabled={isLoading}
        className="h-10 w-10 p-0 rounded-lg bg-white/5 border border-white/20 hover:bg-white/10 hover:border-white/30 disabled:opacity-50 transition-all duration-300"
      >
        <RefreshCcw className={`w-4 h-4 ${isLoading ? 'animate-spin text-blue-400' : 'text-gray-400 hover:text-white'}`} />
      </Button>
    </div>
  );
}
