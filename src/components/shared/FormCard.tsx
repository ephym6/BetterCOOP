import React from 'react';

interface FormCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  footerActions?: React.ReactNode;
}

export const FormCard: React.FC<FormCardProps> = ({
  title,
  description,
  children,
  footerActions
}) => {
  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-md p-8 md:p-10 border border-slate-border flex flex-col gap-8 text-left">
      <div>
        <h2 className="font-headline-sm text-headline-sm text-on-surface mb-1">{title}</h2>
        {description && (
          <p className="text-on-surface-variant text-body-sm leading-relaxed">{description}</p>
        )}
      </div>

      <div className="space-y-6">
        {children}
      </div>

      {footerActions && (
        <div className="flex items-center justify-between pt-6 border-t border-slate-border">
          {footerActions}
        </div>
      )}
    </div>
  );
};
