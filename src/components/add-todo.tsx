'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';

interface AddTodoProps {
  onAdd: (title: string) => void;
}

export function AddTodo({ onAdd }: AddTodoProps) {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onAdd(value.trim());
      setValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-3">
      <div className="relative flex-1">
        <Input
          placeholder="What needs to be done?"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 text-base h-12 sm:h-11 bg-white/80 border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
        />
        {value && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          </div>
        )}
      </div>
      <Button 
        type="submit" 
        disabled={!value.trim()}
        className="px-6 h-12 sm:h-11 text-base sm:text-sm bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:shadow-none"
      >
        <Plus className="w-4 h-4 mr-2" />
        <span className="sm:hidden">Add Task</span>
        <span className="hidden sm:inline">Add Task</span>
      </Button>
    </form>
  );
}