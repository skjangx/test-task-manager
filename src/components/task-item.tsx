'use client';

import { useState } from 'react';
import { Task, TaskPriority, TaskStatus } from '@/types/task';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Trash2, Edit3, Check, X, MoreHorizontal } from 'lucide-react';

interface TaskItemProps {
  task: Task;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onDelete: (id: string) => void;
}

export function TaskItem({ task, onUpdate, onDelete }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const handleSave = () => {
    onUpdate(task.id, { title: editTitle, updatedAt: new Date() });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setIsEditing(false);
  };

  const handleStatusChange = (status: TaskStatus) => {
    onUpdate(task.id, { status, updatedAt: new Date() });
  };

  const handlePriorityChange = (priority: TaskPriority) => {
    onUpdate(task.id, { priority, updatedAt: new Date() });
  };

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
    }
  };

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case 'done': return 'outline';
      case 'in-progress': return 'default';
      case 'todo': return 'secondary';
    }
  };

  const formatDueDate = (date?: Date) => {
    if (!date) return null;
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    return date.toLocaleDateString();
  };

  const getPriorityIcon = (priority: TaskPriority) => {
    switch (priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🔵';
    }
  };

  return (
    <div className={`group border rounded-lg hover:bg-gray-50 transition-colors ${
      task.status === 'done' ? 'opacity-75' : ''
    }`}>
      <div className="flex items-start p-3 md:p-4">
        {/* Checkbox */}
        <input
          type="checkbox"
          checked={task.status === 'done'}
          onChange={(e) => 
            handleStatusChange(e.target.checked ? 'done' : 'todo')
          }
          className="h-5 w-5 text-blue-600 rounded mt-0.5 flex-shrink-0"
        />
        
        {/* Content */}
        <div className="flex-1 ml-3 min-w-0">
          {isEditing ? (
            <div className="flex items-center space-x-2">
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSave();
                  if (e.key === 'Escape') handleCancel();
                }}
                autoFocus
              />
              <Button size="sm" onClick={handleSave}>
                <Check className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={handleCancel}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <>
              <div className="flex items-center space-x-2">
                <span 
                  className={`text-sm md:text-base font-medium ${
                    task.status === 'done' ? 'line-through text-gray-500' : 'text-gray-900'
                  }`}
                >
                  {task.title}
                </span>
                <span className="text-lg">{getPriorityIcon(task.priority)}</span>
              </div>
              
              {/* Meta info */}
              <div className="flex items-center space-x-3 mt-1">
                {task.dueDate && (
                  <span className={`text-xs px-2 py-1 rounded ${
                    task.dueDate < new Date() && task.status !== 'done'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {formatDueDate(task.dueDate)}
                  </span>
                )}
                <Badge variant={getStatusColor(task.status)} className="text-xs">
                  {task.status.replace('-', ' ')}
                </Badge>
              </div>
            </>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsEditing(true)}
            className="h-8 w-8 p-0"
          >
            <Edit3 className="h-3 w-3" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleStatusChange('todo')}>
                To Do
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange('in-progress')}>
                In Progress
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange('done')}>
                Done
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handlePriorityChange('low')}>
                🔵 Low Priority
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handlePriorityChange('medium')}>
                🟡 Medium Priority
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handlePriorityChange('high')}>
                🔴 High Priority
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDelete(task.id)}
                className="text-red-600"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}