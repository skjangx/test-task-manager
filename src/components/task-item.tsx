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

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
      <div className="flex items-center space-x-4 flex-1">
        <input
          type="checkbox"
          checked={task.status === 'done'}
          onChange={(e) => 
            handleStatusChange(e.target.checked ? 'done' : 'todo')
          }
          className="h-4 w-4 text-blue-600 rounded"
        />
        
        {isEditing ? (
          <div className="flex items-center space-x-2 flex-1">
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
          <span 
            className={`flex-1 ${task.status === 'done' ? 'line-through text-gray-500' : ''}`}
          >
            {task.title}
          </span>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Badge variant={getStatusColor(task.status)}>
          {task.status.replace('-', ' ')}
        </Badge>
        <Badge variant={getPriorityColor(task.priority)}>
          {task.priority}
        </Badge>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setIsEditing(true)}>
              <Edit3 className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
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
              Low Priority
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handlePriorityChange('medium')}>
              Medium Priority
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handlePriorityChange('high')}>
              High Priority
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
  );
}