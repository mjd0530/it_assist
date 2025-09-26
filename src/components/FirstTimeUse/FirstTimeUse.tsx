import React, { useRef, useState } from 'react';
import motoLogo from '../../assets/moto_ai_prc.svg';

interface FirstTimeUseProps {
  onPromptClick: (prompt: string) => void;
  isLoading?: boolean;
}

export const FirstTimeUse: React.FC<FirstTimeUseProps> = ({ onPromptClick, isLoading = false }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (!inputValue.trim() || isLoading) return;
    onPromptClick(inputValue.trim());
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
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
          <div className="relative bg-white border border-gray-300 rounded-2xl shadow-sm">
            {/* Placeholder text inside input */}
            <div className="absolute left-14 top-4 text-gray-500 text-lg pointer-events-none">
              Ask me anything...
            </div>
            
            {/* Left Side - Plus Button */}
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <button className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors">
                <span className="text-gray-600 text-lg font-medium">+</span>
              </button>
            </div>
            
            
            {/* Right Side - Microphone and Send */}
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
              <button className="w-8 h-8 hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors">
                <span className="text-gray-600 text-lg">🎤</span>
              </button>
              <button 
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 rounded-full flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                <span className="text-white text-lg">✈️</span>
              </button>
            </div>
            
            {/* Hidden input for functionality */}
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full h-16 px-6 py-4 text-lg bg-transparent focus:outline-none opacity-0"
              style={{ fontSize: '1.125rem' }}
            />
          </div>
        </div>

        {/* Suggested Questions */}
        <div className="w-full max-w-2xl space-y-3">
          {suggestedPrompts.map((prompt, index) => (
            <div 
              key={index}
              onClick={() => onPromptClick(prompt)}
              className={`bg-white border border-gray-200 rounded-xl p-4 transition-all cursor-pointer group ${
                isLoading 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:shadow-md hover:border-blue-300'
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
  );
};
