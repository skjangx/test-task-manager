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
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-2">
      <Input
        placeholder="Add a new task..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 text-base h-12 sm:h-10"
      />
      <Button 
        type="submit" 
        disabled={!value.trim()}
        className="px-6 h-12 sm:h-10 text-base sm:text-sm"
      >
        <Plus className="w-4 h-4 mr-1" />
        <span className="sm:hidden">Add Task</span>
        <span className="hidden sm:inline">Add</span>
      </Button>
    </form>
  );
}