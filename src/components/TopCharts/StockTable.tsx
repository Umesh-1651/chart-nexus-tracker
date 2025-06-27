
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StockData, StockType } from './types';
import { formatChange, formatVolume } from './utils';

interface StockTableProps {
  data: StockData[];
  activeFilter: StockType;
}

export function StockTable({ data, activeFilter }: StockTableProps) {
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

  const currentColor = getFilterColor(activeFilter);

  return (
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
          {data.map((stock, index) => {
            const changeData = formatChange(stock.change, stock.changePercent);
            return (
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
                  <div className={`${changeData.colorClass} font-semibold text-sm`}>
                    <div>{changeData.changeText}</div>
                    <div className="text-xs opacity-90">{changeData.percentText}</div>
                  </div>
                </TableCell>
                {activeFilter === 'active' && (
                  <TableCell className="text-gray-300 text-sm text-right hidden lg:table-cell font-medium">
                    {formatVolume(stock.volume)}
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
