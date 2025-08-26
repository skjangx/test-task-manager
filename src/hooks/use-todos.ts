'use client';

import { useState, useEffect } from 'react';
import { Task } from '@/types/task';

export function useTodos() {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('todos');
    if (saved) {
      try {
        const parsed = JSON.parse(saved).map((task: Task & { createdAt: string }) => ({
          ...task,
          createdAt: new Date(task.createdAt),
        }));
        setTasks(parsed);
      } catch (error) {
        console.error('Failed to load todos:', error);
      }
    }
  }, []);

  // Save to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string) => {
    if (!title.trim()) return;
    
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: title.trim(),
      completed: false,
      createdAt: new Date(),
    };
    
    setTasks(prev => [newTask, ...prev]);
  };

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const updateTask = (id: string, title: string) => {
    if (!title.trim()) {
      deleteTask(id);
      return;
    }
    
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, title: title.trim() } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const clearCompleted = () => {
    setTasks(prev => prev.filter(task => !task.completed));
  };

  // Computed values
  const allTasks = tasks;
  const activeTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);
  const activeCount = activeTasks.length;

  return {
    tasks,
    allTasks,
    activeTasks,
    completedTasks,
    activeCount,
    addTask,
    toggleTask,
    updateTask,
    deleteTask,
    clearCompleted,
  };
}