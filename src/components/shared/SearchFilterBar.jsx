import React from 'react';
import { Search, Filter } from 'lucide-react';

export const SearchFilterBar = ({
  searchText,
  onSearchChange,
  searchPlaceholder = 'Search...',
  filterValue1,
  onFilterChange1,
  filterLabel1,
  filterOptions1,
  filterValue2,
  onFilterChange2,
  filterLabel2,
  filterOptions2,
  onAdvancedClick
}) => {
  return (
    <div className="bg-surface p-4 rounded-xl shadow-xs border border-slate-border flex flex-wrap gap-4 items-end">
      {/* Search Input */}
      <div className="flex-1 min-w-[200px] flex flex-col gap-1">
        <label className="text-label-md font-bold text-on-surface-variant">General Search</label>
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/50 pointer-events-none" />
          <input
            type="text"
            value={searchText}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full pl-11 pr-4 py-2.5 bg-surface-container-low border border-slate-border rounded-lg text-body-sm text-on-surface placeholder:text-on-surface-variant/40 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
          />
        </div>
      </div>

      {/* Filter Dropdown 1 */}
      {filterOptions1 && onFilterChange1 && (
        <div className="w-full sm:w-48 flex flex-col gap-1">
          <label className="text-label-md font-bold text-on-surface-variant">{filterLabel1 || 'Filter 1'}</label>
          <select
            value={filterValue1}
            onChange={(e) => onFilterChange1(e.target.value)}
            className="w-full px-4 py-2.5 bg-surface-container-low border border-slate-border rounded-lg text-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all cursor-pointer"
          >
            {filterOptions1.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Filter Dropdown 2 */}
      {filterOptions2 && onFilterChange2 && (
        <div className="w-full sm:w-48 flex flex-col gap-1">
          <label className="text-label-md font-bold text-on-surface-variant">{filterLabel2 || 'Filter 2'}</label>
          <select
            value={filterValue2}
            onChange={(e) => onFilterChange2(e.target.value)}
            className="w-full px-4 py-2.5 bg-surface-container-low border border-slate-border rounded-lg text-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all cursor-pointer"
          >
            {filterOptions2.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Advanced Action Toggle */}
      {onAdvancedClick && (
        <button
          onClick={onAdvancedClick}
          type="button"
          className="bg-surface-container-high hover:bg-surface-container-highest text-on-surface px-6 py-2.5 h-touch-target rounded-lg font-label-md transition-colors flex items-center justify-center gap-2 border border-slate-border active:scale-95 cursor-pointer"
        >
          <Filter className="w-4 h-4 text-primary" />
          Advanced
        </button>
      )}
    </div>
  );
};
