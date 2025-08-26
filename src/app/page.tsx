'use client';

import { useState } from 'react';
import { TaskStatus } from '@/types/task';
import { useTasks } from '@/hooks/use-tasks';
import { Sidebar } from '@/components/sidebar';
import { AddTaskForm } from '@/components/add-task-form';
import { TaskFilters } from '@/components/task-filters';
import { TaskItem } from '@/components/task-item';

export default function Home() {
  const [activeView, setActiveView] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<TaskStatus | 'all'>('all');
  
  const { 
    tasks, 
    addTask, 
    updateTask, 
    deleteTask, 
    getTaskStats 
  } = useTasks();

  const stats = getTaskStats();

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeView === 'all' || activeFilter === 'all') {
      return matchesSearch;
    }
    
    const statusFilter = activeView as TaskStatus;
    return task.status === statusFilter && matchesSearch;
  });

  const getViewTitle = () => {
    switch (activeView) {
      case 'today': return 'Today\'s Tasks';
      case 'todo': return 'To Do';
      case 'in-progress': return 'In Progress';
      case 'done': return 'Completed';
      default: return 'All Tasks';
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        activeView={activeView}
        onViewChange={setActiveView}
        stats={stats}
      />
      
      <div className="flex-1 overflow-hidden">
        <div className="h-full p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">
                {getViewTitle()}
              </h1>
              
              <AddTaskForm onAdd={addTask} />
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <TaskFilters
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                stats={stats}
              />
            </div>

            <div className="bg-white rounded-lg shadow-sm border">
              {filteredTasks.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <div className="mb-2">
                    {searchQuery ? 'No tasks match your search.' : 'No tasks yet.'}
                  </div>
                  {!searchQuery && (
                    <div className="text-sm">
                      Create your first task above to get started!
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-4 space-y-2">
                  {filteredTasks.map(task => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onUpdate={updateTask}
                      onDelete={deleteTask}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
