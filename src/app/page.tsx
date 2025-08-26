'use client';

import { useState } from 'react';
import { useTodos } from '@/hooks/use-todos';
import { useKeyboard } from '@/hooks/use-keyboard';
import { AddTodo } from '@/components/add-todo';
import { TodoFilters } from '@/components/todo-filters';
import { TodoItem } from '@/components/todo-item';
import { Task } from '@/types/task';

type FilterType = 'all' | 'active' | 'completed';

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  
  const {
    allTasks,
    activeTasks, 
    completedTasks,
    activeCount,
    addTask,
    toggleTask,
    updateTask,
    deleteTask,
    clearCompleted,
  } = useTodos();

  // Get filtered tasks based on current filter
  const getFilteredTasks = (): Task[] => {
    switch (activeFilter) {
      case 'active':
        return activeTasks;
      case 'completed':
        return completedTasks;
      default:
        return allTasks;
    }
  };

  const filteredTasks = getFilteredTasks();
  
  // Enable keyboard shortcuts
  useKeyboard();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Todo App
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Stay organized and get things done
          </p>
        </div>

        {/* Add Todo */}
        <div className="mb-4 sm:mb-6 bg-white rounded-xl shadow-sm border p-4 sm:p-6">
          <AddTodo onAdd={addTask} />
        </div>

        {/* Filters */}
        {allTasks.length > 0 && (
          <div className="mb-4 sm:mb-6">
            <TodoFilters
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              activeCount={activeCount}
              completedCount={completedTasks.length}
              onClearCompleted={clearCompleted}
            />
          </div>
        )}

        {/* Task List */}
        <div className="space-y-2">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm border">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {activeFilter === 'active' && 'No active tasks'}
                {activeFilter === 'completed' && 'No completed tasks'}
                {activeFilter === 'all' && 'No tasks yet'}
              </h3>
              <p className="text-gray-500">
                {activeFilter === 'active' && 'All tasks are completed! 🎉'}
                {activeFilter === 'completed' && 'Complete some tasks to see them here.'}
                {activeFilter === 'all' && 'Add your first task above to get started.'}
              </p>
            </div>
          ) : (
            <>
              {filteredTasks.map(task => (
                <TodoItem
                  key={task.id}
                  task={task}
                  onToggle={toggleTask}
                  onUpdate={updateTask}
                  onDelete={deleteTask}
                />
              ))}
            </>
          )}
        </div>

        {/* Footer Stats */}
        {allTasks.length > 0 && (
          <div className="mt-8 text-center text-sm text-gray-500">
            {activeCount === 0 
              ? 'All tasks completed! Great job! 🎉' 
              : `${activeCount} ${activeCount === 1 ? 'task' : 'tasks'} remaining`
            }
          </div>
        )}

        {/* Keyboard Shortcuts */}
        <div className="mt-12 pt-6 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-400 mb-2">Keyboard Shortcuts</p>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
            <span><kbd className="px-2 py-1 bg-gray-100 rounded text-gray-700">N</kbd> New task</span>
            <span><kbd className="px-2 py-1 bg-gray-100 rounded text-gray-700">C</kbd> Clear completed</span>
            <span><kbd className="px-2 py-1 bg-gray-100 rounded text-gray-700">Enter</kbd> Save</span>
            <span><kbd className="px-2 py-1 bg-gray-100 rounded text-gray-700">Esc</kbd> Cancel</span>
          </div>
        </div>
      </div>
    </div>
  );
}
