import React, { useRef, useEffect, useState } from 'react';
import { FileText, Star, Send } from 'lucide-react';
import motoLogo from '../../assets/moto_ai_prc.svg';
import { Chat } from '../Chat';
import { aiService } from '../../services/aiService';
import type { Message } from '../../types';
import { BarChart } from '../Charts/BarChart';
import { PieChart } from '../Charts/PieChart';
import { LineChart } from '../Charts/LineChart';

interface CenterContentProps {
  selectedThread?: number | null;
  isNewThread?: boolean;
}

export const CenterContent: React.FC<CenterContentProps> = ({ selectedThread, isNewThread }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  // Focus input field when component mounts for a new thread
  useEffect(() => {
    if (isNewThread || selectedThread === 0 || selectedThread === null) {
      // Small delay to ensure the component is fully rendered
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [selectedThread, isNewThread]);

  // Reset messages when switching to a new thread
  useEffect(() => {
    if (isNewThread) {
      setMessages([]);
    }
  }, [isNewThread]);

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
      const threadId = selectedThread?.toString() || 'new-thread';
      const aiResponse = await aiService.generateResponse(inputValue.trim(), threadId);
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

  // Lightweight parser to detect when to render charts from assistant text
  const renderAssistantContent = (content: string) => {
    // Fleet Analytics chart - more flexible detection
    if (content.includes('Enterprise Fleet Analytics Dashboard') || content.includes('Fleet Overview:') || content.includes('Device Distribution:')) {
      const labels = ['Active', 'Offline', 'Critical Issues'];
      const active = Math.floor(Math.random() * 10000) + 9000;
      const offline = Math.floor(Math.random() * 200) + 50;
      const critical = Math.floor(Math.random() * 50) + 5;
      return (
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
            <div className="h-60 w-full overflow-hidden">
              <BarChart title="Fleet Health" labels={labels} data={[active, offline, critical]} />
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
            <div className="h-56 w-full overflow-hidden">
              <PieChart title="Device Series Distribution" labels={["X1", "T", "E", "P"]} data={[32, 41, 57, 12]} />
            </div>
          </div>
          <div className="whitespace-pre-wrap text-sm leading-relaxed">{content}</div>
        </div>
      );
    }

    // Compliance chart - more flexible detection
    if (content.includes('Enterprise Compliance & Governance Analysis') || content.includes('Compliance Status:') || content.includes('Regulatory Compliance Status:')) {
      const compliant = Math.floor(Math.random() * 80) + 70;
      const nonCompliant = 100 - compliant;
      return (
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
            <div className="h-56 w-full overflow-hidden">
              <PieChart title="Compliance Status" labels={["Compliant", "Non-Compliant"]} data={[compliant, nonCompliant]} colors={["#10b981", "#ef4444"]} />
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
            <div className="h-60 w-full overflow-hidden">
              <LineChart title="Compliance Trend (Last 6 mo)" labels={["Mar","Apr","May","Jun","Jul","Aug"]} data={[72,76,81,84,88,compliant]} />
            </div>
          </div>
          <div className="whitespace-pre-wrap text-sm leading-relaxed">{content}</div>
        </div>
      );
    }

    // Software deployment chart - more flexible detection
    if (content.includes('Enterprise Software Deployment Analysis') || content.includes('Deployment Overview:') || content.includes('Software Inventory:')) {
      return (
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
            <div className="h-60 w-full overflow-hidden">
              <BarChart title="Deployment Channels" labels={["SCCM","Intune","Manual","Vantage"]} data={[68, 22, 4, 6]} color="#8b5cf6" />
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
            <div className="h-56 w-full overflow-hidden">
              <PieChart title="Success vs Failure" labels={["Success","Failure"]} data={[96,4]} colors={["#3b82f6","#ef4444"]} />
            </div>
          </div>
          <div className="whitespace-pre-wrap text-sm leading-relaxed">{content}</div>
        </div>
      );
    }

    // Device lifecycle chart
    if (content.includes('Enterprise Device Lifecycle Management') || content.includes('Asset Health Assessment:')) {
      return (
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
            <div className="h-60 w-full overflow-hidden">
              <BarChart title="Device Age Distribution" labels={["0-1 years", "1-2 years", "2-3 years", "3-4 years", "4+ years"]} data={[25, 35, 20, 15, 5]} color="#10b981" />
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
            <div className="h-56 w-full overflow-hidden">
              <PieChart title="Warranty Status" labels={["Active", "Expiring Soon", "Expired"]} data={[70, 20, 10]} colors={["#3b82f6", "#f59e0b", "#ef4444"]} />
            </div>
          </div>
          <div className="whitespace-pre-wrap text-sm leading-relaxed">{content}</div>
        </div>
      );
    }

    // BSOD pie chart for Lenovo over last 6 months segmented by crash types
    if (
      content.includes('Enterprise BSOD Fleet Analysis') ||
      content.includes('BSOD Analysis Summary')
    ) {
      const labels = [
        'MEMORY_MANAGEMENT',
        'IRQL_NOT_LESS_OR_EQUAL',
        'SYSTEM_SERVICE_EXCEPTION',
        'PAGE_FAULT_IN_NONPAGED_AREA',
        'KERNEL_SECURITY_CHECK_FAILURE'
      ];
      const data = [34, 28, 19, 12, 7]; // Percent distribution last 6 months
      const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];

      return (
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
            <div className="h-56 w-full overflow-hidden">
              <PieChart
                title="Lenovo BSOD Crash Types (Last 6 Months)"
                labels={labels}
                data={data}
                colors={colors}
              />
            </div>
          </div>
          <div className="whitespace-pre-wrap text-sm leading-relaxed">{content}</div>
        </div>
      );
    }

    // Corrupted CSME chart
    if (content.includes('Corrupted CSME devices:')) {
      const labels = ['Corrupted CSME', 'Healthy CSME'];
      const corruptedCount = 126;
      const totalDevices = 15234;
      const healthyCount = totalDevices - corruptedCount;
      const data = [corruptedCount, healthyCount];
      const colors = ['#ef4444', '#10b981'];

      return (
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
            <div className="h-60 w-full overflow-hidden">
              <BarChart 
                title="CSME Status Distribution" 
                labels={labels} 
                data={data} 
                colors={colors}
              />
            </div>
          </div>
          <div className="whitespace-pre-wrap text-sm leading-relaxed">{content}</div>
        </div>
      );
    }

    return <div className="whitespace-pre-wrap text-sm leading-relaxed">{content}</div>;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handlePromptClick = async (prompt: string) => {
    if (isLoading) return;
    
    console.log('Prompt clicked:', prompt); // Debug log
    console.log('Current state:', { isNewThread, selectedThread, messagesLength: messages.length }); // Debug log
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: prompt,
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const threadId = selectedThread?.toString() || 'new-thread';
      const aiResponse = await aiService.generateResponse(prompt, threadId);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error generating AI response:', error);
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

  // If a thread is selected and it's not a new thread, show the Chat component
  if (selectedThread !== null && selectedThread !== undefined && !isNewThread && selectedThread !== 0) {
    return (
      <div className="flex-1 flex flex-col h-full" style={{ backgroundColor: '#F8FAFC' }}>
        <Chat threadId={selectedThread} />
      </div>
    );
  }

  // For new threads, always show the FTU page (even if there are messages)
  // Otherwise show the welcome screen
  console.log('Rendering CenterContent:', { isNewThread, selectedThread, messagesLength: messages.length }); // Debug log
  
  return (
    <div className="flex-1 flex flex-col h-full" style={{ backgroundColor: '#F8FAFC' }}>
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            {/* Logo */}
            <div className="w-24 h-24 flex items-center justify-center mb-8">
              <img src={motoLogo} alt="Moto AI Logo" className="w-24 h-24" />
            </div>

            {/* Welcome Message */}
            <h1 
              className="font-semibold mb-2"
              style={{
                fontSize: '1.5rem',
                background: `
                  linear-gradient(to bottom right, #4625EB 16%, #A500BF 50%) bottom right / 50% 50% no-repeat,
                  linear-gradient(to bottom left, #4625EB 16%, #A500BF 50%) bottom left / 50% 50% no-repeat,
                  linear-gradient(to top left, #4625EB 16%, #A500BF 50%) top left / 50% 50% no-repeat,
                  linear-gradient(to top right, #4625EB 16%, #A500BF 50%) top right / 50% 50% no-repeat
                `,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
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
                <div 
                  key={i} 
                  onClick={() => handlePromptClick(prompt)}
                  className={`bg-white border border-gray-200 rounded-lg p-4 transition-all group ${
                    isLoading 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:shadow-md hover:border-blue-300 cursor-pointer'
                  }`}
                >
                  <p className={`text-sm transition-colors ${
                    isLoading 
                      ? 'text-gray-400' 
                      : 'text-gray-600 group-hover:text-gray-900'
                  }`}>
                    {prompt}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Show messages when there are messages and we're not showing the welcome screen */}
        {messages.length > 0 && (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex space-x-3 ${
                message.role === 'user' ? "justify-end" : "justify-start"
              }`}
            >
              {message.role === 'assistant' && (
                <img src={aiIcon} alt="AI Icon" className="w-8 h-8 flex-shrink-0" />
              )}
              
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.role === 'user' 
                  ? "bg-blue-600 text-white" 
                  : "bg-gray-100 text-gray-900"
              }`}>
                {message.role === 'assistant' ? (
                  renderAssistantContent(message.content)
                ) : (
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</div>
                )}
                <div className={`flex items-center justify-between mt-2 text-xs ${
                  message.role === 'user' ? "text-blue-100" : "text-gray-500"
                }`}>
                  <span>{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>

              {message.role === 'user' && (
                <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-medium">U</span>
                </div>
              )}
            </div>
          ))
        )}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex space-x-3">
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
      </div>

      {/* Chat Input Area */}
      <div className="border-t border-gray-200 p-6 bg-white flex-shrink-0">
        <div className="max-w-4xl mx-auto">
          <div className="relative mb-4">
            <input
              ref={inputRef}
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
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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