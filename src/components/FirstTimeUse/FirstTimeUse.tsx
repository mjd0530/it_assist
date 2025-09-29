import React, { useState } from 'react';
import motoLogo from '../../assets/moto_ai_prc.svg';
import { AIInputField } from '../AIInputField';

interface FirstTimeUseProps {
  onPromptClick: (prompt: string) => void;
  isLoading?: boolean;
}

export const FirstTimeUse: React.FC<FirstTimeUseProps> = ({ onPromptClick, isLoading = false }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (!inputValue.trim() || isLoading) return;
    onPromptClick(inputValue.trim());
    setInputValue('');
  };


  const suggestedPrompts = [
    "Give me a count of devices with Corrupted Backup",
    "How many have had Device Change events?",
    "How many Blue Screen Errors were reported for the previous 30 days?",
    "What are the key features available in Policy Management?",
    "How can I register a new Windows device?"
  ];

  return (
    <div className="flex-1 flex flex-col h-full" style={{ backgroundColor: '#F8FAFC' }}>
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        {/* Central Logo */}
        <div className="w-24 h-24 flex items-center justify-center mb-8">
          <img src={motoLogo} alt="Moto AI Logo" className="w-24 h-24" />
        </div>

        {/* Greeting */}
        <h1 
          className="font-semibold mb-8 text-center"
          style={{
            fontSize: '1.5rem',
            background: 'linear-gradient(135deg, #4625EB 0%, #A500BF 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Hello, how may I assist you today?
        </h1>

        {/* Input Field */}
        <div className="w-full max-w-2xl mb-8">
          <AIInputField
            value={inputValue}
            onChange={setInputValue}
            onSend={handleSendMessage}
            placeholder="Ask me anything..."
            disabled={isLoading}
            isLoading={isLoading}
            autoFocus={true}
          />
        </div>

        {/* Suggested Questions - Contained Card List */}
        <div className="w-full max-w-2xl">
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            {suggestedPrompts.map((prompt, index) => (
              <div 
                key={index}
                onClick={() => !isLoading && onPromptClick(prompt)}
                className={`px-4 py-3 transition-all cursor-pointer group border-b border-gray-100 last:border-b-0 ${
                  isLoading 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <p className={`text-sm transition-colors ${
                  isLoading 
                    ? 'text-gray-400' 
                    : 'text-gray-700 group-hover:text-gray-900'
                }`}>
                  {prompt}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
