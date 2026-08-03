import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'cyan' | 'pink' | 'emerald' | 'amber' | 'slate';
  className?: string;
}

const VARIANTS = {
  primary: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  cyan: 'bg-sky-50 text-sky-700 border-sky-200',
  pink: 'bg-pink-50 text-pink-700 border-pink-200',
  emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  amber: 'bg-amber-50 text-amber-800 border-amber-200',
  slate: 'bg-slate-100 text-slate-700 border-slate-200',
};

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'primary', className = '' }) => {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold border ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
