import React, { useState, useEffect } from 'react';
import motoLogo from '../../assets/moto_ai_prc.svg';
import QuestionAnswerOutlined from '../../assets/QuestionAnswerOutlined.svg';
import SquareEditOutline from '../../assets/square-edit-outline.svg';

interface LeftNavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
  onThreadSelect: (threadId: number, isNew?: boolean) => void;
  onWorkflowSelect: (workflowId: string) => void;
}

export const LeftNavigation: React.FC<LeftNavigationProps> = ({ currentView, onViewChange, onThreadSelect }) => {
  const [selectedThread, setSelectedThread] = useState<number | null>(0);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  // Initialize with first thread selected on component mount
  useEffect(() => {
    onThreadSelect(0, false);
  }, []);

  // Thread data
  const threads = [
    { id: 0, name: "New thread on 09/08 2:50 PM", date: "09/08 2:50 PM" }
  ];

  const handleThreadClick = (threadId: number) => {
    setSelectedThread(threadId);
    onThreadSelect(threadId, false);
  };

  const handleMenuToggle = (threadId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setOpenMenuId(openMenuId === threadId ? null : threadId);
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
      `} style={{ width: '320px' }}>
        
        {/* Header Section */}
        <div className="p-4">
          <div className="flex items-center space-x-3">
            <img src={motoLogo} alt="Moto AI Logo" className="w-8 h-8" />
            <span className="text-xl font-semibold text-gray-900">IT Assist</span>
          </div>
        </div>
        
        {/* Assistants Section */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <button
              onClick={() => onViewChange('assistants')}
              className={`flex items-center justify-between w-full text-left mb-2 group p-2 rounded-lg transition-colors ${
                currentView === 'assistants' 
                  ? 'bg-blue-50 text-blue-700' 
                  : 'hover:bg-gray-50'
              }`}
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
            <button
              onClick={() => onViewChange('threads')}
              className={`flex items-center justify-between w-full text-left mb-2 group p-2 rounded-lg transition-colors ${
                currentView === 'threads' 
                  ? 'bg-blue-50 text-blue-700' 
                  : 'hover:bg-gray-50'
              }`}
            >
              <span className={`text-base font-medium ${
                currentView === 'threads' ? 'text-blue-700' : 'text-gray-900'
              }`}>Threads</span>
              <img 
                src={SquareEditOutline} 
                alt="Edit" 
                className={`w-5 h-5 ${
                  currentView === 'threads' ? 'opacity-100' : 'opacity-60'
                } group-hover:opacity-100 transition-opacity`} 
                style={{ filter: 'brightness(0) saturate(100%) invert(9%) sepia(4%) saturate(1554%) hue-rotate(169deg) brightness(95%) contrast(89%)' }}
              />
            </button>

            {/* Thread Items */}
            <div className="space-y-1 mt-2">
              {threads.map((thread) => {
                const isSelected = selectedThread === thread.id;
                const isMenuOpen = openMenuId === thread.id;
                
                return (
                  <div key={thread.id} className="relative">
                    <div
                      className={`flex items-center justify-between p-2 rounded-lg group cursor-pointer transition-colors ${
                        isSelected 
                          ? 'bg-blue-50 text-blue-700' 
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => handleThreadClick(thread.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <img 
                          src={QuestionAnswerOutlined} 
                          alt="Question Answer" 
                          className="w-5 h-5" 
                          style={{ filter: 'brightness(0) saturate(100%) invert(9%) sepia(4%) saturate(1554%) hue-rotate(169deg) brightness(95%) contrast(89%)' }}
                        />
                        <div>
                          <div className="text-sm text-gray-700">{thread.name}</div>
                          <div className="text-xs text-gray-500">{thread.date}</div>
                        </div>
                      </div>
                      <button
                        onClick={(e) => handleMenuToggle(thread.id, e)}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded"
                      >
                        <svg className="w-5 h-5" fill="#171717" viewBox="0 0 24 24">
                          <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                        </svg>
                      </button>
                    </div>
                    
                    {isMenuOpen && (
                      <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50">
                        <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2">
                          <span>Delete</span>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>

    </>
  );
};