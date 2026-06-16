import React from 'react';

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const cleanStatus = status.trim().toUpperCase();

  let styles = 'px-3 py-1 rounded-full text-label-xs font-bold uppercase tracking-wider inline-flex items-center justify-center';

  switch (cleanStatus) {
    case 'ACTIVE':
    case 'COMPLETED':
    case 'SUCCESS':
    case 'BOARD APPROVED':
      styles += ' bg-success/10 text-success';
      break;
    case 'PROBATION':
    case 'PROBATIONARY':
    case 'PENDING REVIEW':
    case 'PROCESSING':
      styles += ' bg-warning/10 text-warning';
      break;
    case 'INACTIVE':
    case 'SUSPENDED':
    case 'FAILED':
    case 'VERIFICATION FAIL':
      styles += ' bg-danger/10 text-danger';
      break;
    default:
      styles += ' bg-surface-container-high text-on-surface-variant';
      break;
  }

  return (
    <span className={styles}>
      <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current" />
      {status}
    </span>
  );
};
