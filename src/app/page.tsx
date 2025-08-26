'use client';

import { useState } from 'react';
import { useTodos } from '@/hooks/use-todos';
import { AddTodo } from '@/components/add-todo';
import { TodoFilters } from '@/components/todo-filters';
import { TodoItem } from '@/components/todo-item';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
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

  const completionPercentage = allTasks.length > 0 ? Math.round((completedTasks.length / allTasks.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Todo App
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Stay organized and get things done
          </p>
        </div>

        {/* Add Todo Card */}
        <Card className="mb-6 bg-white/80 backdrop-blur-sm border-white/50 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold text-gray-800">Add New Task</CardTitle>
            <CardDescription className="text-gray-600">
              What would you like to accomplish today?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AddTodo onAdd={addTask} />
          </CardContent>
        </Card>

        {/* Progress Card */}
        {allTasks.length > 0 && (
          <Card className="mb-6 bg-white/70 backdrop-blur-sm border-white/40">
            <CardContent className="py-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                <span className="text-sm font-bold text-blue-600">{completionPercentage}%</span>
              </div>
              <Progress 
                value={completionPercentage} 
                className="h-2.5"
              />
              <p className="text-xs text-gray-500 mt-2 text-center">
                {completedTasks.length} of {allTasks.length} tasks completed
              </p>
            </CardContent>
          </Card>
        )}

        {/* Filters */}
        {allTasks.length > 0 && (
          <Card className="mb-6 bg-white/70 backdrop-blur-sm border-white/40">
            <CardContent className="py-4">
              <TodoFilters
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
                activeCount={activeCount}
                completedCount={completedTasks.length}
                onClearCompleted={clearCompleted}
              />
            </CardContent>
          </Card>
        )}

        {/* Task List */}
        <Card className="bg-white/70 backdrop-blur-sm border-white/40 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold text-gray-800">
              {activeFilter === 'active' && 'Active Tasks'}
              {activeFilter === 'completed' && 'Completed Tasks'}  
              {activeFilter === 'all' && 'Your Tasks'}
              {filteredTasks.length > 0 && (
                <span className="text-lg font-normal text-gray-500 ml-2">
                  ({filteredTasks.length})
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredTasks.length === 0 ? (
              <div className="text-center py-8">
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
                <p className="text-gray-500 text-sm">
                  {activeFilter === 'active' && 'All tasks are completed! Great work! 🎉'}
                  {activeFilter === 'completed' && 'Complete some tasks to see them here.'}
                  {activeFilter === 'all' && 'Add your first task above to get started.'}
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredTasks.map((task, index) => (
                  <div key={task.id}>
                    <TodoItem
                      task={task}
                      onToggle={toggleTask}
                      onUpdate={updateTask}
                      onDelete={deleteTask}
                    />
                    {index < filteredTasks.length - 1 && (
                      <Separator className="my-2 bg-gray-100" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Completion Celebration */}
        {allTasks.length > 0 && activeCount === 0 && (
          <Card className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardContent className="py-6 text-center">
              <p className="text-lg text-green-700 font-medium">
                🎉 All tasks completed! Great work!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
