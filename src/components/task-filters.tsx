'use client';

import { TaskStatus } from '@/types/task';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface TaskFiltersProps {
  activeFilter: TaskStatus | 'all';
  onFilterChange: (filter: TaskStatus | 'all') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  stats: {
    total: number;
    todo: number;
    inProgress: number;
    done: number;
  };
}

export function TaskFilters({ 
  activeFilter, 
  onFilterChange, 
  searchQuery, 
  onSearchChange, 
  stats 
}: TaskFiltersProps) {
  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filter Tabs */}
      <Tabs value={activeFilter} onValueChange={(value) => onFilterChange(value as TaskStatus | 'all')}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all" className="text-sm">
            All ({stats.total})
          </TabsTrigger>
          <TabsTrigger value="todo" className="text-sm">
            To Do ({stats.todo})
          </TabsTrigger>
          <TabsTrigger value="in-progress" className="text-sm">
            In Progress ({stats.inProgress})
          </TabsTrigger>
          <TabsTrigger value="done" className="text-sm">
            Done ({stats.done})
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}