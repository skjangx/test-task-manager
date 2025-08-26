'use client';

import { useState } from 'react';
import { Task, TaskPriority } from '@/types/task';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Zap } from 'lucide-react';

interface QuickAddTaskProps {
  onAdd: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

export function QuickAddTask({ onAdd }: QuickAddTaskProps) {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const parseNaturalLanguage = (input: string) => {
    let title = input;
    let priority: TaskPriority = 'medium';
    let dueDate: Date | undefined;

    // Parse priority (p1, p2, p3 or !, !!, !!!)
    if (/\bp1\b|!!!/.test(input)) {
      priority = 'high';
      title = title.replace(/\bp1\b|!!!/g, '').trim();
    } else if (/\bp2\b|!!/.test(input)) {
      priority = 'medium';
      title = title.replace(/\bp2\b|!!/g, '').trim();
    } else if (/\bp3\b|!/.test(input)) {
      priority = 'low';
      title = title.replace(/\bp3\b|!/g, '').trim();
    }

    // Parse dates (today, tomorrow, monday, etc.)
    const today = new Date();
    if (/\btoday\b/i.test(input)) {
      dueDate = today;
      title = title.replace(/\btoday\b/gi, '').trim();
    } else if (/\btomorrow\b/i.test(input)) {
      dueDate = new Date(today);
      dueDate.setDate(today.getDate() + 1);
      title = title.replace(/\btomorrow\b/gi, '').trim();
    } else if (/\bnext week\b/i.test(input)) {
      dueDate = new Date(today);
      dueDate.setDate(today.getDate() + 7);
      title = title.replace(/\bnext week\b/gi, '').trim();
    }

    return { title: title.trim(), priority, dueDate };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;

    setIsLoading(true);
    
    const parsed = parseNaturalLanguage(value);
    
    onAdd({
      title: parsed.title || value.trim(),
      status: 'todo',
      priority: parsed.priority,
      dueDate: parsed.dueDate,
    });

    setValue('');
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex space-x-2">
        <div className="relative flex-1">
          <Input
            placeholder="Add task... (try 'Meeting tomorrow p1' or 'Buy groceries today !!')"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="pr-8 text-base md:text-sm"
          />
          {value && (
            <Zap className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-amber-500" />
          )}
        </div>
        <Button 
          type="submit" 
          disabled={!value.trim() || isLoading}
          size="default"
          className="px-4"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </div>
      
      {value && (
        <div className="mt-2 text-xs text-gray-500">
          💡 Try: "p1" for high priority, "today/tomorrow" for dates
        </div>
      )}
    </form>
  );
}