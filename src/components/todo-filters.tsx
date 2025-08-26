'use client';

import { Button } from '@/components/ui/button';

type FilterType = 'all' | 'active' | 'completed';

interface TodoFiltersProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => void;
}

export function TodoFilters({ 
  activeFilter, 
  onFilterChange, 
  activeCount, 
  completedCount,
  onClearCompleted 
}: TodoFiltersProps) {
  const filters: { key: FilterType; label: string; count?: number }[] = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active', count: activeCount },
    { key: 'completed', label: 'Completed', count: completedCount },
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-gray-50 rounded-lg">
      {/* Filter Tabs */}
      <div className="flex gap-1">
        {filters.map((filter) => (
          <Button
            key={filter.key}
            variant={activeFilter === filter.key ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onFilterChange(filter.key)}
            className="relative"
          >
            {filter.label}
            {filter.count !== undefined && (
              <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
                activeFilter === filter.key 
                  ? 'bg-white/20 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {filter.count}
              </span>
            )}
          </Button>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 text-sm text-gray-600">
        {activeCount > 0 && (
          <span>
            {activeCount} {activeCount === 1 ? 'task' : 'tasks'} left
          </span>
        )}
        
        {completedCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearCompleted}
            className="text-red-600 hover:text-red-700 text-xs sm:text-sm"
            data-testid="clear-completed"
          >
            Clear completed ({completedCount})
          </Button>
        )}
      </div>
    </div>
  );
}