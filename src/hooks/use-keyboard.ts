'use client';

import { useEffect } from 'react';

export function useKeyboard() {
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      
      // Focus add task input on 'n' key (when not in input)
      if (e.key === 'n' && target?.tagName !== 'INPUT' && target?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        const input = document.querySelector('input[placeholder*="Add a new task"]') as HTMLInputElement;
        if (input) {
          input.focus();
        }
      }
      
      // Clear completed on 'c' key (when not in input)
      if (e.key === 'c' && target?.tagName !== 'INPUT' && target?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        const clearButton = document.querySelector('[data-testid="clear-completed"]') as HTMLButtonElement;
        if (clearButton) {
          clearButton.click();
        }
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, []);
}