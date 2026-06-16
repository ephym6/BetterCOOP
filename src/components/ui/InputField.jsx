import React from 'react';

export const InputField = ({
  label,
  error,
  icon,
  hint,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || `input_${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="w-full flex flex-col gap-1.5 text-left">
      <label htmlFor={inputId} className="font-label-md text-label-md text-on-surface-variant/95">
        {label}
      </label>
      
      <div className="relative flex items-center rounded-lg shadow-sm">
        {icon && (
          <span className="absolute left-3.5 text-on-surface-variant/60 flex items-center pointer-events-none">
            {icon}
          </span>
        )}
        <input
          id={inputId}
          className={`w-full bg-surface-container-low border ${
            error ? 'border-danger focus:ring-danger' : 'border-outline-variant focus:border-primary focus:ring-primary'
          } rounded-lg ${
            icon ? 'pl-11' : 'pl-4'
          } pr-4 h-touch-target text-body-md text-on-surface placeholder:text-on-surface-variant/40 focus:ring-1 outline-none transition-all ${className}`}
          {...props}
        />
      </div>

      {error ? (
        <p className="text-danger font-label-xs text-label-xs mt-0.5">{error}</p>
      ) : hint ? (
        <p className="text-on-surface-variant/60 font-label-xs text-label-xs mt-0.5 italic">{hint}</p>
      ) : null}
    </div>
  );
};
