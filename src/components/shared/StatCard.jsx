import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

export const StatCard = ({
  title,
  value,
  trend,
  icon,
  iconBgColor = 'bg-primary-fixed',
  iconTextColor = 'text-primary'
}) => {
  return (
    <div className="bg-surface-container-lowest p-6 rounded-xl shadow-md border border-slate-border flex flex-col gap-3 group hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
      <div className="flex justify-between items-start">
        <div className={`w-12 h-12 rounded-lg ${iconBgColor} ${iconTextColor} flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:scale-110`}>
          {icon}
        </div>
        
        {trend && (
          <div className="flex flex-col items-end">
            <span className={`font-label-md flex items-center gap-0.5 ${
              trend.direction === 'up' ? 'text-success' : trend.direction === 'down' ? 'text-danger' : 'text-warning'
            }`}>
              {trend.direction === 'up' && <ArrowUpRight className="w-4 h-4" />}
              {trend.direction === 'down' && <ArrowDownRight className="w-4 h-4" />}
              {trend.direction === 'stable' && <Minus className="w-4 h-4" />}
              {trend.value}
            </span>
          </div>
        )}
      </div>

      <div>
        <p className="text-on-surface-variant font-label-md text-label-md">{title}</p>
        <h4 className="font-display-kpi text-display-kpi text-on-surface tracking-tight leading-none mt-1">
          {value}
        </h4>
        {trend?.subtext && (
          <p className="text-on-surface-variant/60 font-label-xs text-label-xs mt-1.5 leading-snug">
            {trend.subtext}
          </p>
        )}
      </div>
    </div>
  );
};
