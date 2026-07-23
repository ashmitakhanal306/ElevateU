import React from 'react';
import { AlertCircle, RefreshCcw } from 'lucide-react';
import Card from './Card';
import Button from './Button';

/**
 * Generic Error State component to render when data fetching fails.
 */
export default function ErrorState({ title = "Something went wrong", message = "We couldn't load this data. Please try again.", onRetry }) {
  return (
    <Card className="p-8 flex flex-col items-center justify-center text-center border-danger/20 bg-danger/5 min-h-[300px]">
      <div className="h-12 w-12 rounded-full bg-danger/10 text-danger flex items-center justify-center mb-4">
        <AlertCircle className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-bold text-text-primary mb-2">{title}</h3>
      <p className="text-sm text-text-secondary max-w-sm mb-6">
        {message}
      </p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" className="gap-2">
          <RefreshCcw className="h-4 w-4" /> Try Again
        </Button>
      )}
    </Card>
  );
}
