import React from 'react';
import { FileText, Star, Send } from 'lucide-react';
import aiIcon from '../../assets/ai_icon_color.svg';

export const CenterContent: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        {/* Logo */}
        <div className="w-24 h-24 flex items-center justify-center mb-8">
          <img src={aiIcon} alt="AI Icon" className="w-24 h-24" />
        </div>

        {/* Welcome Message */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Hello, how may I assist you today?
        </h1>
        <p className="text-base text-gray-600 mb-8">
          Below are some ideas to get you started.
        </p>

        {/* Suggested Prompts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
              <p className="text-sm text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Input Area */}
      <div className="p-6 border-t border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center border border-gray-300 rounded-lg p-2 bg-gray-50">
            <input
              type="text"
              placeholder="Ask Lenovo IT Assist a question..."
              className="flex-1 bg-transparent outline-none text-base text-gray-800 placeholder-gray-400"
            />
            <button className="ml-2 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              <Send className="w-5 h-5" />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
                <FileText className="w-4 h-4" />
                <span className="text-sm">Explore</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Star className="w-4 h-4" />
                <span className="text-sm">Favorite prompts</span>
              </button>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-gray-500 mt-4">
            Lenovo IT Assist uses AI. Please double-check results.
          </p>
        </div>
      </div>
    </div>
  );
};