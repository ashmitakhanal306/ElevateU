import React from 'react';

export default function PageHeader({ title, description, action }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-text-primary">
          {title}
        </h1>
        {description && (
          <p className="text-sm text-text-secondary mt-1 leading-relaxed max-w-3xl">
            {description}
          </p>
        )}
      </div>
      {action && (
        <div className="shrink-0 self-start sm:self-auto">
          {action}
        </div>
      )}
    </div>
  );
}
