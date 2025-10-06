import React, { useState, useEffect } from 'react';
import { MessageSquare, Search } from 'lucide-react';
import { threadService } from '../../services/threadService';
import type { Thread } from '../../types';
import motoLogo from '../../assets/moto_ai_prc.svg';

interface ThreadsPageProps {
  onThreadSelect?: (threadId: number) => void;
  onNewThread?: () => void;
}

export const ThreadsPage: React.FC<ThreadsPageProps> = ({ onThreadSelect, onNewThread }) => {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Load threads on mount and refresh periodically
  useEffect(() => {
    const loadThreads = () => {
      const allThreads = threadService.getThreads();
      setThreads(allThreads);
    };

    loadThreads();

    // Refresh threads periodically to catch updates
    const intervalId = setInterval(loadThreads, 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  const handleThreadClick = (threadId: number) => {
    if (onThreadSelect) {
      onThreadSelect(threadId);
    }
  };

  const handleNewThread = () => {
    if (onNewThread) {
      onNewThread();
    }
  };

  const getLastMessage = (thread: Thread): string => {
    const messages = threadService.getThreadMessages(thread.id);
    if (messages.length === 0) {
      // Return a more descriptive placeholder based on thread name
      if (thread.name.toLowerCase().includes('deployment')) {
        return "Deployment planning and configuration management discussion.";
      } else if (thread.name.toLowerCase().includes('ticket')) {
        return "IT support ticket resolution and troubleshooting.";
      } else if (thread.name.toLowerCase().includes('device')) {
        return "Device configuration and management assistance.";
      } else if (thread.name.toLowerCase().includes('windows')) {
        return "Windows system configuration and deployment assistance.";
      } else if (thread.name.toLowerCase().includes('printer')) {
        return "Printer configuration and troubleshooting support.";
      } else if (thread.name.toLowerCase().includes('mobile')) {
        return "Mobile device management and configuration help.";
      } else if (thread.name.toLowerCase().includes('network')) {
        return "Network security and configuration assistance.";
      } else if (thread.name.toLowerCase().includes('software')) {
        return "Software update and troubleshooting support.";
      } else {
        return "Start a conversation to begin working with your assistant.";
      }
    }
    // Get the last message content
    const lastMsg = messages[messages.length - 1];
    const content = lastMsg.content.slice(0, 100);
    return content + (lastMsg.content.length > 100 ? '...' : '');
  };


  // Filter threads based on search query
  const filteredThreads = threads.filter(thread => {
    if (!searchQuery.trim()) return true;
    
    const query = searchQuery.toLowerCase().trim();
    const threadName = thread.name.toLowerCase();
    const lastMessage = getLastMessage(thread).toLowerCase();
    
    return threadName.includes(query) || lastMessage.includes(query);
  });

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto" style={{ backgroundColor: '#F8FAFC' }}>
      <div className="flex-1 p-8" style={{ paddingTop: '6rem' }}>
        <div className="max-w-[640px] mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <img src={motoLogo} alt="IT Assist Logo" className="w-24 h-24" />
            </div>
            <h1 
              className="font-bold mb-4"
              style={{
                fontSize: '1.5rem',
                background: 'linear-gradient(135deg, #4625EB 0%, #A500BF 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Welcome to threads
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto" style={{ fontSize: '1rem' }}>
              Manage and organize all your conversations in one place. Search through past threads or create new ones to continue your work.
            </p>
          </div>

          {/* Threads List Section */}
          <div>
            {/* Header with Title and Create Button */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-bold text-gray-900" style={{ fontSize: '1.125rem' }}>Threads</h2>
              <button 
                onClick={handleNewThread}
                className="text-white transition-colors font-medium"
                style={{
                  background: 'linear-gradient(135deg, #4625EB 0%, #A500BF 100%)',
                  borderRadius: '9999px',
                  fontSize: '0.875rem',
                  padding: '0.5rem 1rem'
                }}
              >
                Create new
              </button>
            </div>

            {/* Search Bar */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search threads..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Search Results Info */}
            {searchQuery && (
              <div className="mb-4 text-sm text-gray-600">
                {filteredThreads.length === 0 ? (
                  <span>No threads found for "{searchQuery}"</span>
                ) : (
                  <span>Found {filteredThreads.length} thread{filteredThreads.length !== 1 ? 's' : ''} matching "{searchQuery}"</span>
                )}
              </div>
            )}

            {/* Thread List */}
            <div className="space-y-2">
              {filteredThreads.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
                  <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {searchQuery ? 'No threads found' : 'No threads yet'}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {searchQuery ? 'Try a different search term or create a new thread' : 'Start a new conversation to create your first thread'}
                  </p>
                  {searchQuery && (
                    <button 
                      onClick={handleNewThread}
                      className="text-white transition-colors font-medium"
                      style={{
                        background: 'linear-gradient(135deg, #4625EB 0%, #A500BF 100%)',
                        borderRadius: '9999px',
                        fontSize: '0.875rem',
                        padding: '0.5rem 1rem'
                      }}
                    >
                      Create new thread
                    </button>
                  )}
                </div>
              ) : (
                filteredThreads.map((thread) => (
                  <div 
                    key={thread.id} 
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => handleThreadClick(thread.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        <MessageSquare className="w-6 h-6 text-gray-700" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-base font-medium text-gray-900">
                            {thread.name === 'New thread' ? 'New thread' : thread.name}
                          </h3>
                          <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                            {thread.date}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-1">{getLastMessage(thread)}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
