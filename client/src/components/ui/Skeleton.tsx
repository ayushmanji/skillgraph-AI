import React from 'react';

export const Skeleton: React.FC<{ className?: string }> = ({ className = 'h-4 w-full' }) => {
  return (
    <div
      className={`bg-slate-200 animate-pulse rounded-xl border border-slate-300/60 ${className}`}
    />
  );
};
