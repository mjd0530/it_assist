import React, { useRef, useEffect } from 'react';
import { FileText, Star, Send } from 'lucide-react';
import aiIcon from '../../assets/ai_icon_color.svg';
import { Chat } from '../Chat';

interface CenterContentProps {
  selectedThread?: number | null;
  isNewThread?: boolean;
}

export const CenterContent: React.FC<CenterContentProps> = ({ selectedThread, isNewThread }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input field when component mounts for a new thread
  useEffect(() => {
    if (isNewThread || selectedThread === 0 || selectedThread === null) {
      // Small delay to ensure the component is fully rendered
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [selectedThread, isNewThread]);

  // If a thread is selected and it's not a new thread, show the Chat component
  if (selectedThread !== null && selectedThread !== undefined && !isNewThread && selectedThread !== 0) {
    return (
      <div className="flex-1 flex flex-col h-full">
        <Chat threadId={selectedThread} />
      </div>
    );
  }

  // Otherwise show the welcome screen
  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 min-h-0">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
          {[
            "Show me a pie chart of BSOD crashes over last 6 months for Lenovo segmented by crashtypes.",
            "Give me a count of devices with Corrupted CSME.",
            "What events were recorded with High severity level?",
            "Generate a stacked bar graph showing monthly charging deviations of the devices year to date.",
            "How many devices does not have TPM Owned?",
            "Explore more ways to interact with Lenovo IT Assist →"
          ].map((prompt, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
              <p className="text-sm text-gray-600">
                {prompt}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Input Area */}
      <div className="border-t border-gray-200 p-6 bg-white flex-shrink-0">
        <div className="max-w-4xl mx-auto">
          <div className="relative mb-4">
            <input
              ref={inputRef}
              type="text"
              placeholder="Ask Lenovo IT Assist a question..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Send className="w-5 h-5 text-gray-600" />
            </button>
          </div>

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

          <p className="text-xs text-gray-500 mt-4">
            Lenovo IT Assist uses AI. Please double-check results.
          </p>
        </div>
      </div>
    </div>
  );
};