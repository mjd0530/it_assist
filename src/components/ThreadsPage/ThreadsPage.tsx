import React, { useState, useEffect } from 'react';
import { FileText, Clock, MoreVertical, Trash2 } from 'lucide-react';
import { threadService } from '../../services/threadService';
import type { Thread } from '../../types';

interface ThreadsPageProps {
  onThreadSelect?: (threadId: number) => void;
  onNewThread?: () => void;
}

export const ThreadsPage: React.FC<ThreadsPageProps> = ({ onThreadSelect, onNewThread }) => {
  const [threads, setThreads] = useState<Thread[]>([]);

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

  const handleDeleteThread = (threadId: number, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent triggering thread selection
    if (window.confirm('Are you sure you want to delete this thread?')) {
      threadService.deleteThread(threadId);
      setThreads(threadService.getThreads());
    }
  };

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
      return "No messages yet";
    }
    // Get the last message content
    const lastMsg = messages[messages.length - 1];
    const content = lastMsg.content.slice(0, 100);
    return content + (lastMsg.content.length > 100 ? '...' : '');
  };

  const formatDate = (date: Date): string => {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
    } else {
      return date.toLocaleDateString('en-US', { 
        month: '2-digit', 
        day: '2-digit',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full" style={{ backgroundColor: '#F8FAFC' }}>
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Threads</h1>
            <p className="text-gray-600">Manage your conversation threads and chat history.</p>
          </div>
          
          <div className="space-y-4">
            {threads.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No threads yet</h3>
                <p className="text-gray-600 mb-4">Start a new conversation to create your first thread</p>
                <button 
                  onClick={handleNewThread}
                  className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Start New Thread
                </button>
              </div>
            ) : (
              threads.map((thread) => (
                <div 
                  key={thread.id} 
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleThreadClick(thread.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{thread.name}</h3>
                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{getLastMessage(thread)}</p>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          <span>{formatDate(thread.updatedAt)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <button 
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreVertical className="w-4 h-4 text-gray-500" />
                      </button>
                      <button 
                        className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                        onClick={(e) => handleDeleteThread(thread.id, e)}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          {threads.length > 0 && (
            <div className="mt-8 text-center">
              <button 
                onClick={handleNewThread}
                className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Start New Thread
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
