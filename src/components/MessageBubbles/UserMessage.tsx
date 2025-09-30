import React from 'react';
import { cn } from '../../utils/cn';

interface UserMessageProps {
  content: string;
  className?: string;
}

export const UserMessage: React.FC<UserMessageProps> = ({ content, className }) => {
  return (
    <div className={cn("flex justify-end", className)}>
      <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-white text-gray-900 border border-gray-200">
        <div className="whitespace-pre-wrap text-[0.875rem] leading-relaxed">
          {content}
        </div>
      </div>
    </div>
  );
};
