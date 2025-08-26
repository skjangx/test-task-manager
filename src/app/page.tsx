'use client';

import { useState } from 'react';
import { TaskStatus } from '@/types/task';
import { useTasks } from '@/hooks/use-tasks';
import { Sidebar } from '@/components/sidebar';
import { MobileHeader } from '@/components/mobile-header';
import { QuickAddTask } from '@/components/quick-add-task';
import { AddTaskForm } from '@/components/add-task-form';
import { TaskFilters } from '@/components/task-filters';
import { TaskItem } from '@/components/task-item';

export default function Home() {
  const [activeView, setActiveView] = useState<string>('today');
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
    
    // Handle Today view
    if (activeView === 'today') {
      const today = new Date();
      const isToday = task.dueDate && 
        task.dueDate.toDateString() === today.toDateString();
      const isOverdue = task.dueDate && 
        task.dueDate < today && task.status !== 'done';
      return matchesSearch && (isToday || isOverdue);
    }
    
    // Handle status filters
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
    <div className="flex h-screen bg-gray-50 md:bg-gray-100">
      {/* Desktop Sidebar */}
      <Sidebar
        activeView={activeView}
        onViewChange={setActiveView}
        stats={stats}
      />
      
      {/* Main Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Mobile Header */}
        <MobileHeader
          title={getViewTitle()}
          activeView={activeView}
          onViewChange={setActiveView}
          stats={stats}
        />
        
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-4 md:space-y-6">
            {/* Desktop Header + Quick Add */}
            <div className="bg-white rounded-lg shadow-sm border p-4 md:p-6">
              <h1 className="hidden md:block text-2xl font-bold text-gray-900 mb-6">
                {getViewTitle()}
              </h1>
              
              {/* Mobile-First Quick Add */}
              <div className="md:hidden mb-4">
                <QuickAddTask onAdd={addTask} />
              </div>
              
              {/* Desktop Add Task Form */}
              <div className="hidden md:block">
                <AddTaskForm onAdd={addTask} />
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border p-4 md:p-6">
              <TaskFilters
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                stats={stats}
              />
            </div>

            {/* Task List */}
            <div className="bg-white rounded-lg shadow-sm border">
              {filteredTasks.length === 0 ? (
                <div className="p-6 md:p-8 text-center text-gray-500">
                  <div className="mb-2">
                    {searchQuery ? 'No tasks match your search.' : 'No tasks yet.'}
                  </div>
                  {!searchQuery && (
                    <div className="text-sm">
                      {activeView === 'today' ? 'No tasks due today!' : 'Create your first task above to get started!'}
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-2 md:p-4 space-y-2">
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
