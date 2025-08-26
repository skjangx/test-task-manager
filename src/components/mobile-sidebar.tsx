'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  CheckSquare, 
  Clock, 
  Square, 
  Calendar,
  BarChart3,
  Menu
} from 'lucide-react';

interface MobileSidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  stats: {
    total: number;
    todo: number;
    inProgress: number;
    done: number;
  };
}

export function MobileSidebar({ activeView, onViewChange, stats }: MobileSidebarProps) {
  const menuItems = [
    {
      id: 'today',
      label: 'Today',
      icon: Calendar,
      count: 0, 
    },
    {
      id: 'all',
      label: 'All Tasks',
      icon: BarChart3,
      count: stats.total,
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
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64">
        <div className="py-4">
          <div className="mb-6">
            <h1 className="text-xl font-bold text-gray-900">Task Manager</h1>
            <p className="text-sm text-gray-500">Stay organized</p>
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

          <div className="mt-6 p-3 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 text-sm mb-2">Progress</h3>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-600">Total:</span>
                <span className="font-medium">{stats.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Done:</span>
                <span className="font-medium text-green-600">{stats.done}</span>
              </div>
              {stats.total > 0 && (
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-green-600 h-1.5 rounded-full"
                      style={{ width: `${(stats.done / stats.total) * 100}%` }}
                    />
                  </div>
                  <div className="text-center mt-1 text-gray-500">
                    {Math.round((stats.done / stats.total) * 100)}% complete
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}