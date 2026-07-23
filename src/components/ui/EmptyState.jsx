import React from 'react';
import { SearchX } from 'lucide-react';

/**
 * Generic Empty State component to render when lists have no data.
 */
export default function EmptyState({ icon: Icon = SearchX, title = "No results found", message = "Try adjusting your filters or check back later.", action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center border-2 border-dashed border-border rounded-xl">
      <div className="h-12 w-12 rounded-full bg-bg-surface border border-border text-text-secondary flex items-center justify-center mb-4">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-bold text-text-primary mb-2">{title}</h3>
      <p className="text-sm text-text-secondary max-w-sm mb-6">
        {message}
      </p>
      {action}
    </div>
  );
}
