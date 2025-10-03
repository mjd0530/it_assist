import React from 'react';
import { Plus } from 'lucide-react';

interface AddThreadButtonProps {
  onAddThread: () => void;
  disabled?: boolean;
}

export const AddThreadButton: React.FC<AddThreadButtonProps> = ({
  onAddThread,
  disabled = false
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent parent button click
    e.preventDefault();
    onAddThread();
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`
        flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors text-sm font-medium
        ${disabled 
          ? 'text-gray-400 cursor-not-allowed bg-gray-50' 
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
        }
      `}
    >
      <div className={`
        p-1 rounded
        ${disabled ? 'bg-gray-200' : 'bg-blue-100 hover:bg-blue-200'}
      `}>
        <Plus className={`w-4 h-4 ${disabled ? 'text-gray-400' : 'text-blue-600'}`} />
      </div>
      <span>Add new</span>
    </button>
  );
};
