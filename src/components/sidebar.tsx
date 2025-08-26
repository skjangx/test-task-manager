'use client';

import { TaskStatus } from '@/types/task';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckSquare, 
  Clock, 
  Square, 
  Calendar,
  BarChart3
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  stats: {
    total: number;
    todo: number;
    inProgress: number;
    done: number;
  };
}

export function Sidebar({ activeView, onViewChange, stats }: SidebarProps) {
  const menuItems = [
    {
      id: 'all',
      label: 'All Tasks',
      icon: BarChart3,
      count: stats.total,
    },
    {
      id: 'today',
      label: 'Today',
      icon: Calendar,
      count: 0, // Could be implemented to show today's tasks
    },
    {
      id: 'todo',
      label: 'To Do',
      icon: Square,
      count: stats.todo,
    },
    {
      id: 'in-progress',
      label: 'In Progress',
      icon: Clock,
      count: stats.inProgress,
    },
    {
      id: 'done',
      label: 'Completed',
      icon: CheckSquare,
      count: stats.done,
    },
  ];

  return (
    <div className="w-64 h-screen bg-gray-50 border-r p-4 hidden md:block">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-gray-900">Task Manager</h1>
        <p className="text-sm text-gray-500">Stay organized and productive</p>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => onViewChange(item.id)}
            >
              <Icon className="mr-2 h-4 w-4" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.count > 0 && (
                <Badge variant="secondary" className="ml-auto">
                  {item.count}
                </Badge>
              )}
            </Button>
          );
        })}
      </nav>

      <div className="mt-8 p-4 bg-white rounded-lg border">
        <h3 className="font-medium text-gray-900 mb-2">Progress</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Total:</span>
            <span className="font-medium">{stats.total}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Completed:</span>
            <span className="font-medium text-green-600">{stats.done}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Remaining:</span>
            <span className="font-medium text-blue-600">
              {stats.todo + stats.inProgress}
            </span>
          </div>
          {stats.total > 0 && (
            <div className="mt-2">
              <div className="flex justify-between text-xs mb-1">
                <span>Progress</span>
                <span>{Math.round((stats.done / stats.total) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{ width: `${(stats.done / stats.total) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}