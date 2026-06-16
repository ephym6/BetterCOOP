import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Column<T> {
  header: string;
  render: (item: T, index: number) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T, index: number) => string;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  emptyMessage?: string;
  totalRecordsLabel?: string;
}

export function DataTable<T>({
  data,
  columns,
  keyExtractor,
  currentPage,
  totalPages,
  onPageChange,
  emptyMessage = 'No records found matching your selection.',
  totalRecordsLabel
}: DataTableProps<T>) {
  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-md border border-slate-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low border-b border-slate-border">
              {columns.map((col, i) => (
                <th
                  key={i}
                  className={`px-6 py-4 font-label-md text-on-surface-variant uppercase tracking-wider ${
                    col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'
                  } ${col.className || ''}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-border">
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center text-on-surface-variant/70 italic">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={keyExtractor(item, index)} className="hover:bg-slate-surface/50 transition-colors duration-150">
                  {columns.map((col, i) => (
                    <td
                      key={i}
                      className={`px-6 py-4 text-body-sm font-body-sm text-on-surface ${
                        col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'
                      } ${col.className || ''}`}
                    >
                      {col.render(item, index)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination component block */}
      {totalPages && totalPages > 1 && onPageChange && currentPage && (
        <div className="px-6 py-4 border-t border-slate-border flex items-center justify-between bg-surface-container-low">
          <p className="text-body-sm text-on-surface-variant">
            {totalRecordsLabel || `Page ${currentPage} of ${totalPages}`}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-slate-border bg-white text-on-surface-variant hover:bg-surface-container-high transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            {Array.from({ length: Math.min(3, totalPages) }, (_, idx) => {
              const pageNumber = idx + 1;
              return (
                <button
                  key={pageNumber}
                  onClick={() => onPageChange(pageNumber)}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg text-label-md font-bold transition-all cursor-pointer ${
                    currentPage === pageNumber
                      ? 'bg-primary text-white shadow-xs'
                      : 'hover:bg-surface-container-high text-on-surface-variant'
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
            
            {totalPages > 3 && <span className="text-on-surface-variant inline-block px-1">...</span>}
            {totalPages > 3 && (
              <button
                onClick={() => onPageChange(totalPages)}
                className={`w-8 h-8 flex items-center justify-center rounded-lg text-label-md font-bold transition-all cursor-pointer ${
                  currentPage === totalPages
                    ? 'bg-primary text-white shadow-xs'
                    : 'hover:bg-surface-container-high text-on-surface-variant'
                }`}
              >
                {totalPages}
              </button>
            )}

            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-slate-border bg-white text-on-surface-variant hover:bg-surface-container-high transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
