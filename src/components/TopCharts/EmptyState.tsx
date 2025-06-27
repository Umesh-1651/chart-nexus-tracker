
import { Button } from "@/components/ui/button";
import { Database, RefreshCcw } from 'lucide-react';

interface EmptyStateProps {
  onRefresh: () => void;
  hasApi: boolean;
}

export function EmptyState({ onRefresh, hasApi }: EmptyStateProps) {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="p-4 rounded-xl bg-gray-500/10 border border-gray-500/20">
          <Database className="w-12 h-12 text-gray-400 opacity-60" />
        </div>
        <div>
          <p className="text-gray-300 text-lg font-medium mb-1">No Data Available</p>
          <p className="text-gray-500 text-sm">
            {hasApi ? 'No data returned from API' : 'API connection not configured'}
          </p>
        </div>
        <Button
          onClick={onRefresh}
          variant="outline"
          size="sm"
          className="mt-2 border-gray-500/30 text-gray-400 hover:bg-gray-500/10 hover:border-gray-500/50"
        >
          <RefreshCcw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
      </div>
    </div>
  );
}
