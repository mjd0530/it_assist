import React from 'react';
import { FileText, Clock, MoreVertical, Trash2 } from 'lucide-react';

export const ThreadsPage: React.FC = () => {
  const threads = [
    { id: 0, name: "New thread on 09/08 2:50 PM", date: "09/08 2:50 PM", lastMessage: "How can I help you with your IT needs today?" },
    { id: 1, name: "Windows Update deployment strategy", date: "09/07 4:23 PM", lastMessage: "Let's discuss the Windows Update deployment strategy for your organization." },
    { id: 2, name: "BIOS update troubleshooting", date: "09/07 11:15 AM", lastMessage: "I can help you troubleshoot BIOS update issues." },
    { id: 3, name: "Network driver compatibility issues", date: "09/06 3:42 PM", lastMessage: "Let's resolve the network driver compatibility problems." },
    { id: 4, name: "Laptop battery optimization settings", date: "09/06 9:30 AM", lastMessage: "I'll help you optimize your laptop battery settings." }
  ];

  return (
    <div className="flex-1 flex flex-col h-full" style={{ backgroundColor: '#F8FAFC' }}>
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Threads</h1>
            <p className="text-gray-600">Manage your conversation threads and chat history.</p>
          </div>
          
          <div className="space-y-4">
            {threads.map((thread) => (
              <div key={thread.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{thread.name}</h3>
                      <p className="text-gray-600 text-sm mb-2 line-clamp-2">{thread.lastMessage}</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{thread.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4 text-gray-500" />
                    </button>
                    <button className="p-2 hover:bg-red-100 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <button className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Start New Thread
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
