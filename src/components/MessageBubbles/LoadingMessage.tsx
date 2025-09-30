import React from 'react';
import { cn } from '../../utils/cn';

interface LoadingMessageProps {
  className?: string;
}

export const LoadingMessage: React.FC<LoadingMessageProps> = ({ className }) => {
  return (
    <div className={cn("flex justify-start", className)}>
      <div className="bg-secondary-50 border border-secondary-200 rounded-2xl px-4 py-3">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-secondary-400 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-secondary-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-secondary-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};
