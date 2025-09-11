import React from 'react';
import { 
  MessageSquare, 
  TrendingUp,
  Clock,
  Star,
  FileText,
  Code,
  Lightbulb
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface ContentPanelProps {
  currentView: string;
  className?: string;
}

const DashboardContent = () => (
  <div className="space-y-6">
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h2>
      <p className="text-gray-600">Welcome to your AI Assistant dashboard</p>
    </div>

    {/* Stats Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Chats</p>
            <p className="text-2xl font-bold text-gray-900">24</p>
          </div>
          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
            <MessageSquare className="h-6 w-6 text-primary-600" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">This Week</p>
            <p className="text-2xl font-bold text-gray-900">8</p>
          </div>
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <TrendingUp className="h-6 w-6 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Avg Response</p>
            <p className="text-2xl font-bold text-gray-900">1.2s</p>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Clock className="h-6 w-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Satisfaction</p>
            <p className="text-2xl font-bold text-gray-900">4.8</p>
          </div>
          <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
            <Star className="h-6 w-6 text-yellow-600" />
          </div>
        </div>
      </div>
    </div>

    {/* Recent Activity */}
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
      </div>
      <div className="p-6 space-y-4">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
            <Code className="h-5 w-5 text-primary-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">React TypeScript Help</p>
            <p className="text-sm text-gray-500">2 hours ago</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <FileText className="h-5 w-5 text-green-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">Documentation Review</p>
            <p className="text-sm text-gray-500">5 hours ago</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
            <Lightbulb className="h-5 w-5 text-yellow-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">Creative Writing</p>
            <p className="text-sm text-gray-500">1 day ago</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ChatContent = () => (
  <div className="space-y-6">
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Chat Details</h2>
      <p className="text-gray-600">Extended information about your current conversation</p>
    </div>

    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Response Analysis</h3>
      </div>
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">Confidence Score</span>
          <span className="text-sm font-bold text-green-600">94%</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">Response Time</span>
          <span className="text-sm font-bold text-blue-600">1.2s</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">Sources Used</span>
          <span className="text-sm font-bold text-purple-600">3</span>
        </div>
      </div>
    </div>

    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Suggested Follow-ups</h3>
      </div>
      <div className="p-6 space-y-3">
        <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200">
          <p className="text-sm font-medium text-gray-900">Can you provide more examples?</p>
        </button>
        <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200">
          <p className="text-sm font-medium text-gray-900">How does this compare to other approaches?</p>
        </button>
        <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200">
          <p className="text-sm font-medium text-gray-900">What are the best practices?</p>
        </button>
      </div>
    </div>
  </div>
);

const HistoryContent = () => (
  <div className="space-y-6">
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Chat History</h2>
      <p className="text-gray-600">Browse your previous conversations</p>
    </div>

    <div className="space-y-4">
      {[
        { title: "React TypeScript Best Practices", time: "2 hours ago", preview: "I need help with React TypeScript best practices..." },
        { title: "CSS Grid Layout Help", time: "1 day ago", preview: "How do I create a responsive grid layout?" },
        { title: "API Integration Guide", time: "3 days ago", preview: "Can you help me integrate a REST API?" },
        { title: "Database Design", time: "1 week ago", preview: "What's the best way to design a user database?" }
      ].map((chat, index) => (
        <div key={index} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">{chat.title}</h3>
              <p className="text-sm text-gray-500 mb-2">{chat.preview}</p>
              <p className="text-xs text-gray-400">{chat.time}</p>
            </div>
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <MessageSquare className="h-4 w-4 text-gray-600" />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SettingsContent = () => (
  <div className="space-y-6">
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Settings</h2>
      <p className="text-gray-600">Customize your AI Assistant experience</p>
    </div>

    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Preferences</h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Dark Mode</p>
              <p className="text-sm text-gray-500">Switch to dark theme</p>
            </div>
            <button className="w-12 h-6 bg-gray-200 rounded-full relative">
              <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform duration-200"></div>
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Auto-save Chats</p>
              <p className="text-sm text-gray-500">Automatically save conversation history</p>
            </div>
            <button className="w-12 h-6 bg-primary-600 rounded-full relative">
              <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-transform duration-200"></div>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">AI Model</h3>
        </div>
        <div className="p-6">
          <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
            <option>GPT-4</option>
            <option>GPT-3.5 Turbo</option>
            <option>Claude 3</option>
          </select>
        </div>
      </div>
    </div>
  </div>
);

const HelpContent = () => (
  <div className="space-y-6">
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Help & Support</h2>
      <p className="text-gray-600">Get help and learn how to use the AI Assistant</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Getting Started</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Start a new conversation by typing in the chat</li>
            <li>• Use specific questions for better responses</li>
            <li>• Try different conversation topics</li>
            <li>• Save important conversations</li>
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Tips & Tricks</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Be specific in your questions</li>
            <li>• Provide context when needed</li>
            <li>• Use follow-up questions</li>
            <li>• Experiment with different prompts</li>
          </ul>
        </div>
      </div>
    </div>

    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Support</h3>
        <p className="text-sm text-gray-600 mb-4">Need more help? Contact our support team.</p>
        <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200">
          Contact Support
        </button>
      </div>
    </div>
  </div>
);

export const ContentPanel: React.FC<ContentPanelProps> = ({ currentView, className }) => {
  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardContent />;
      case 'chat':
        return <ChatContent />;
      case 'history':
        return <HistoryContent />;
      case 'settings':
        return <SettingsContent />;
      case 'help':
        return <HelpContent />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className={cn("flex-1 overflow-y-auto bg-gray-50", className)}>
      <div className="p-6 max-w-4xl mx-auto">
        {renderContent()}
      </div>
    </div>
  );
};
