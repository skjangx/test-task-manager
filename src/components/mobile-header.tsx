'use client';

import { MobileSidebar } from './mobile-sidebar';

interface MobileHeaderProps {
  title: string;
  activeView: string;
  onViewChange: (view: string) => void;
  stats: {
    total: number;
    todo: number;
    inProgress: number;
    done: number;
  };
}

export function MobileHeader({ title, activeView, onViewChange, stats }: MobileHeaderProps) {
  return (
    <div className="md:hidden bg-white border-b px-4 py-3 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center space-x-3">
        <MobileSidebar
          activeView={activeView}
          onViewChange={onViewChange}
          stats={stats}
        />
        <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
      </div>
      <div className="text-sm text-gray-500">
        {stats.done}/{stats.total}
      </div>
    </div>
  );
}