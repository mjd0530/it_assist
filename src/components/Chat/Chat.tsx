import React, { useState, useRef, useEffect } from 'react';
import { Send, Copy, Trash2, Bot, User, FileText, Star } from 'lucide-react';
import { cn } from '../../utils/cn';
import type { Message } from '../../types';
import { mockMessages, threadConversations } from '../../services/mockData';
import { aiService } from '../../services/aiService';
import aiIcon from '../../assets/ai_icon_color.svg';

interface ChatProps {
  className?: string;
  threadId?: number;
}

export const Chat: React.FC<ChatProps> = ({ className, threadId = 0 }) => {
  const [messages, setMessages] = useState<Message[]>(() => {
    return threadConversations[threadId as keyof typeof threadConversations] || mockMessages;
  });
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const threadMessages = threadConversations[threadId as keyof typeof threadConversations] || mockMessages;
    setMessages(threadMessages);
  }, [threadId]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Generate AI response
    try {
      const aiResponse = await aiService.generateResponse(inputValue.trim());
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I encountered an error while processing your request. Please try again.",
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const clearChat = () => {
    setMessages([]);
  };

  const formatTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={cn("flex flex-col h-full w-full bg-white", className)}>
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 flex items-center justify-center mb-4">
              <img src={aiIcon} alt="AI Icon" className="w-16 h-16" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Start a conversation</h3>
            <p className="text-gray-500 max-w-sm">
              Ask me anything! I can help with coding, problem-solving, creative writing, and much more.
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex space-x-3 animate-fade-in",
                message.role === 'user' ? "justify-end" : "justify-start"
              )}
            >
              {message.role === 'assistant' && (
                <img src={aiIcon} alt="AI Icon" className="w-8 h-8 flex-shrink-0" />
              )}
              
              <div className={cn(
                "max-w-[80%] rounded-2xl px-4 py-3 relative group",
                message.role === 'user' 
                  ? "bg-primary-600 text-white" 
                  : "bg-gray-100 text-gray-900"
              )}>
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {message.content}
                </div>
                <div className={cn(
                  "flex items-center justify-between mt-2 text-xs",
                  message.role === 'user' ? "text-primary-100" : "text-gray-500"
                )}>
                  <span>{formatTimestamp(message.timestamp)}</span>
                  <button
                    onClick={() => copyMessage(message.content)}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/20 rounded transition-all duration-200"
                    title="Copy message"
                  >
                    <Copy className="h-3 w-3" />
                  </button>
                </div>
              </div>

              {message.role === 'user' && (
                <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
          ))
        )}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex space-x-3 animate-fade-in">
            <img src={aiIcon} alt="AI Icon" className="w-8 h-8 flex-shrink-0" />
            <div className="bg-gray-100 rounded-2xl px-4 py-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="relative mb-4">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask Lenovo IT Assist a question..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
            />
            <button 
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
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
