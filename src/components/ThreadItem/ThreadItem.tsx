import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical, Trash2, Loader2, CheckCircle } from 'lucide-react';
import QuestionAnswerOutlined from '../../assets/QuestionAnswerOutlined.svg';
import type { Thread } from '../../types';

interface ThreadItemProps {
  thread: Thread;
  isSelected: boolean;
  onSelect: (threadId: number) => void;
  onDelete: (threadId: number) => void;
}

export const ThreadItem: React.FC<ThreadItemProps> = ({
  thread,
  isSelected,
  onSelect,
  onDelete
}) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isMenuOpen]);

  const handleMenuToggle = (event: React.MouseEvent) => {
    event.stopPropagation();
    setMenuOpen(!isMenuOpen);
  };

  const handleDelete = (event: React.MouseEvent) => {
    event.stopPropagation();
    
    // Don't allow deleting the default thread (id: 0)
    if (thread.id === 0) {
      return;
    }
    
    // Style confirmation as a modern UI modal
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 flex items-center justify-center bg-black/50 z-50';
    modal.innerHTML = `
      <div class="bg-white rounded-lg shadow-lg p-6 w-80">
        <h2 class="text-lg font-semibold mb-4">Confirm Deletion</h2>
        <p class="mb-4">Are you sure you want to delete this thread?</p>
        <div class="flex justify-end space-x-2">
          <button class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300" id="cancelBtn">Cancel</button>
          <button class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" id="confirmBtn">Delete</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    
    const confirmBtn = document.getElementById('confirmBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    
    confirmBtn?.addEventListener('click', () => {
      onDelete(thread.id);
      setMenuOpen(false);
      document.body.removeChild(modal);
    });
    
    cancelBtn?.addEventListener('click', () => {
      document.body.removeChild(modal);
    });
    
    return;
  };


  return (
    <div className="relative" id={`thread-${thread.id}`}>
      <div
        className={`flex items-center justify-between px-3 py-3 rounded-lg group cursor-pointer transition-colors ${
          isSelected 
            ? 'bg-blue-50' 
            : 'hover:bg-gray-50'
        }`}
        onClick={() => onSelect(thread.id)}
      >
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <img 
            src={QuestionAnswerOutlined} 
            alt="Thread" 
            className="w-6 h-6 flex-shrink-0"
            style={{ 
              filter: isSelected 
                ? 'brightness(0) saturate(100%) invert(38%) sepia(95%) saturate(2476%) hue-rotate(215deg) brightness(98%) contrast(101%)'
                : 'brightness(0) saturate(100%) invert(9%) sepia(4%) saturate(1554%) hue-rotate(169deg) brightness(95%) contrast(89%)'
            }}
          />
          <div className="flex-1 min-w-0">
            <div className={`text-base font-normal truncate ${isSelected ? 'text-blue-600' : 'text-gray-900'}`}>
              {thread.name}
            </div>
            <div className={`text-xs mt-0.5 ${isSelected ? 'text-blue-500' : 'text-gray-500'}`}>
              {thread.date}
            </div>
          </div>
          {thread.deploymentProgress?.isActive && (
            <Loader2 className={`w-4 h-4 animate-spin flex-shrink-0 ${isSelected ? 'text-blue-600' : 'text-gray-600'}`} />
          )}
          {thread.deploymentProgress && !thread.deploymentProgress.isActive && (
            <CheckCircle className={`w-5 h-5 flex-shrink-0 ${isSelected ? 'text-green-600' : 'text-green-500'}`} />
          )}
        </div>
        
        {thread.id !== 0 && (
          <button
            onClick={handleMenuToggle}
            className={`p-1 rounded transition-all flex-shrink-0 ${
              isSelected 
                ? 'opacity-100' 
                : 'opacity-0 group-hover:opacity-100'
            }`}
          >
            <MoreVertical className={`w-5 h-5 ${isSelected ? 'text-gray-700' : 'text-gray-600'}`} />
          </button>
        )}
      </div>
      
      {isMenuOpen && (
        <div 
          ref={menuRef}
          className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50"
        >
          <button 
            className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2 transition-colors"
            onClick={handleDelete}
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      )}
    </div>
  );
};
