import React from 'react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  ...props
}) => {
  let baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer';
  
  let variantStyles = '';
  switch (variant) {
    case 'primary':
      variantStyles = 'bg-primary hover:bg-emerald-dark text-white focus:ring-primary shadow-sm';
      break;
    case 'secondary':
      variantStyles = 'bg-secondary-container hover:bg-amber-dark text-on-secondary-container hover:text-white focus:ring-secondary shadow-sm';
      break;
    case 'outline':
      variantStyles = 'border border-outline hover:bg-surface-container-low text-primary focus:ring-primary';
      break;
    case 'danger':
      variantStyles = 'bg-danger hover:bg-red-800 text-white focus:ring-danger shadow-sm';
      break;
    case 'ghost':
      variantStyles = 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface';
      break;
  }

  let sizeStyles = '';
  switch (size) {
    case 'sm':
      sizeStyles = 'px-3 h-8 text-xs';
      break;
    case 'md':
      sizeStyles = 'px-5 h-touch-target text-sm'; // maintaining 48px height minimum for mobile touch
      break;
    case 'lg':
      sizeStyles = 'px-8 h-12 text-base';
      break;
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
      {...props}
    >
      {icon && <span className="mr-2 inline-flex items-center">{icon}</span>}
      {children}
    </button>
  );
};
