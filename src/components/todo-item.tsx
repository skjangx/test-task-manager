'use client';

import { useState } from 'react';
import { Task } from '@/types/task';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Check, X, Edit3, Trash2, Clock } from 'lucide-react';

interface TodoItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onUpdate: (id: string, title: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ task, onToggle, onUpdate, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const handleSave = () => {
    onUpdate(task.id, editTitle);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <TooltipProvider>
      <div className={`group flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 ${
        task.completed 
          ? 'bg-green-50/50 border-green-200/50 hover:bg-green-50' 
          : 'bg-white/50 border-gray-200/50 hover:bg-white hover:shadow-md'
      }`}>
        {/* Checkbox */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => onToggle(task.id)}
              className={`flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
                task.completed
                  ? 'bg-green-500 border-green-500 text-white shadow-sm'
                  : 'border-gray-300 hover:border-green-400 hover:bg-green-50'
              }`}
            >
              {task.completed && <Check className="w-4 h-4" />}
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{task.completed ? 'Mark as incomplete' : 'Mark as complete'}</p>
          </TooltipContent>
        </Tooltip>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="flex items-center gap-2">
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-white border-blue-200 focus:border-blue-400"
                autoFocus
                onBlur={handleSave}
              />
              <Button size="sm" variant="ghost" onClick={handleSave} className="text-green-600">
                <Check className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={handleCancel} className="text-gray-500">
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div>
              <span
                className={`block text-sm font-medium cursor-pointer select-none transition-all duration-200 ${
                  task.completed
                    ? 'text-gray-500 line-through'
                    : 'text-gray-900 hover:text-blue-600'
                }`}
                onClick={() => setIsEditing(true)}
              >
                {task.title}
              </span>
              <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                <Clock className="w-3 h-3" />
                <span>Created {formatTimeAgo(task.createdAt)}</span>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        {!isEditing && (
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsEditing(true)}
                  className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                >
                  <Edit3 className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit task</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onDelete(task.id)}
                  className="h-8 w-8 p-0 hover:bg-red-50 text-red-400 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete task</p>
              </TooltipContent>
            </Tooltip>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}