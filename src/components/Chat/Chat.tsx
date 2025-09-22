import React, { useState, useRef, useEffect } from 'react';
import { Send, Copy, Trash2, Bot, User, FileText, Star } from 'lucide-react';
import { cn } from '../../utils/cn';
import type { Message } from '../../types';
import { mockMessages, threadConversations } from '../../services/mockData';
import { aiService } from '../../services/aiService';
import aiIcon from '../../assets/ai_icon_color.svg';
import { BarChart } from '../Charts/BarChart';
import { PieChart } from '../Charts/PieChart';
import { LineChart } from '../Charts/LineChart';

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
      const aiResponse = await aiService.generateResponse(inputValue.trim(), threadId.toString());
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
      const data = [34, 28, 19, 12, 7];
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
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
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
                {message.role === 'assistant' ? (
                  renderAssistantContent(message.content)
                ) : (
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</div>
                )}
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
      <div className="border-t border-gray-200 p-6 bg-white flex-shrink-0">
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
