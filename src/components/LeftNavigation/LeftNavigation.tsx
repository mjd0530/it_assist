import React, { useState, useEffect } from 'react';
import motoLogo from '../../assets/moto_ai_prc.svg';
import SquareEditOutline from '../../assets/square-edit-outline.svg';
import { ThreadItem } from '../ThreadItem';
import { AddThreadButton } from '../AddThreadButton';
import { threadService } from '../../services/threadService';
import type { Thread } from '../../types';

interface LeftNavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
  onThreadSelect: (threadId: number, isNew?: boolean) => void;
  onWorkflowSelect: (workflowId: string) => void;
  selectedThread: number | null;
}

export const LeftNavigation: React.FC<LeftNavigationProps> = ({ currentView, onViewChange, onThreadSelect, selectedThread }) => {
  const [threads, setThreads] = useState<Thread[]>([]);

  // Load threads on mount
  useEffect(() => {
    setThreads(threadService.getThreads());
  }, []);

  // Refresh threads periodically to catch updates (like name changes)
  useEffect(() => {
    const intervalId = setInterval(() => {
      setThreads(threadService.getThreads());
    }, 1000); // Refresh every second
    
    return () => clearInterval(intervalId);
  }, []);

  const handleThreadClick = (threadId: number) => {
    onThreadSelect(threadId, false);
  };

  const handleAddThread = () => {
    const newThread = threadService.addThread();
    setThreads(threadService.getThreads());
    // Select the new thread and mark it as new to show FirstTimeUse screen
    onThreadSelect(newThread.id, true);
    
    // Scroll the new thread into view after a brief delay to allow rendering
    setTimeout(() => {
      const newThreadElement = document.getElementById(`thread-${newThread.id}`);
      newThreadElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const handleDeleteThread = (threadId: number) => {
    threadService.deleteThread(threadId);
    setThreads(threadService.getThreads());
    
    // If we deleted the currently selected thread, clear selection
    if (selectedThread === threadId) {
      onThreadSelect(0, false); // Go back to default thread
    }
  };






  return (
    <>
      {/* Mobile Overlay */}
      {currentView === 'home' && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => onViewChange('home')}
        />
      )}

      {/* Navigation Sidebar */}
      <div className={`
        fixed top-0 left-0 h-screen bg-white border-r border-gray-200 flex flex-col z-50
        lg:relative lg:top-0 lg:h-full lg:z-auto
        w-80 pt-6 px-6
        ${currentView === 'home' ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        transition-transform duration-300 ease-in-out
      `} style={{ width: '320px' }} role="navigation" aria-label="Main Navigation">
        
        {/* Header Section */}
        <div className="pb-4" role="banner">
          <div className="flex items-center space-x-3">
            <img src={motoLogo} alt="Moto AI Logo" className="w-8 h-8" />
            <span className="text-xl font-semibold text-gray-900">IT Assist</span>
          </div>
        </div>
        
        {/* Assistants Section */}
        <div className="flex-1 overflow-y-auto" role="main">
          <div className="py-4">
            <button
              onClick={() => onViewChange('assistants')}
              className={`flex items-center justify-between w-full text-left mb-2 group p-2 rounded-lg transition-colors ${
                currentView === 'assistants' 
                  ? 'bg-blue-50 text-blue-700' 
                  : 'hover:bg-gray-50'
              }`}
              aria-pressed={currentView === 'assistants'}
            >
              <span className={`text-base font-medium ${
                currentView === 'assistants' ? 'text-blue-700' : 'text-gray-900'
              }`}>Assistants</span>
              <img 
                src={SquareEditOutline} 
                alt="Edit" 
                className={`w-5 h-5 ${
                  currentView === 'assistants' ? 'opacity-100' : 'opacity-60'
                } group-hover:opacity-100 transition-opacity`} 
                style={{ filter: 'brightness(0) saturate(100%) invert(9%) sepia(4%) saturate(1554%) hue-rotate(169deg) brightness(95%) contrast(89%)' }}
              />
            </button>

            {/* Threads Section */}
            <div className="mb-2">
              <button
                onClick={() => onViewChange('threads')}
                className={`flex items-center justify-between w-full text-left group p-2 rounded-lg transition-colors ${
                  currentView === 'threads' 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <span className={`text-base font-medium ${
                  currentView === 'threads' ? 'text-blue-700' : 'text-gray-900'
                }`}>Threads</span>
                <AddThreadButton 
                  onAddThread={handleAddThread}
                  disabled={false}
                />
              </button>
            </div>

            {/* Thread Items */}
            <div className="space-y-1 mt-2">
              {threads.length === 0 ? (
                <div className="text-xs text-gray-500 p-2">No threads available</div>
              ) : (
                threads.map((thread) => (
                  <ThreadItem
                    key={thread.id}
                    thread={thread}
                    isSelected={selectedThread === thread.id}
                    onSelect={handleThreadClick}
                    onDelete={handleDeleteThread}
                  />
                ))
              )}
            </div>

          </div>
        </div>
      </div>

    </>
  );
};