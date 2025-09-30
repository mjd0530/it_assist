import React, { useState, useRef, useEffect } from 'react';
import type { Message } from '../../types';
import { mockMessages, threadConversations } from '../../services/mockData';
import { aiService } from '../../services/aiService';
import aiIcon from '../../assets/ai_icon_color.svg';
import { AIInputField } from '../AIInputField';
import { RocketLaunchOutlined, QuestionAnswerOutlined, BuildOutlined } from '@mui/icons-material';
import { UserMessage, AIMessage, LoadingMessage } from '../MessageBubbles';

interface ChatProps {
  className?: string;
  threadId?: number;
}

export const Chat: React.FC<ChatProps> = ({ threadId = 0 }) => {
  const [messages, setMessages] = useState<Message[]>(() => {
    return threadConversations[threadId as keyof typeof threadConversations] || mockMessages;
  });
  const [inputValue, setInputValue] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAssistant, setSelectedAssistant] = useState<{ key: string; name: string; icon?: React.ReactNode } | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Assistant options
  const assistants = [
    { key: 'general', name: 'General Assistant', icon: <QuestionAnswerOutlined fontSize="small" sx={{ color: '#0F172A' }} /> },
    { key: 'deployment', name: 'Deployment', icon: <RocketLaunchOutlined fontSize="small" sx={{ color: '#0F172A' }} /> },
    { key: 'troubleshooting', name: 'Troubleshooting', icon: <BuildOutlined fontSize="small" sx={{ color: '#0F172A' }} /> },
  ];

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

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [menuOpen]);

  const handleSendMessage = async (message: string, _fileAttachments?: File[]) => {
    if (!message.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setAttachments([]);
    setIsLoading(true);

    // Generate AI response
    try {
      const aiResponse = await aiService.generateResponse(message, threadId.toString());
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

  const handleFileUpload = (files: File[]) => {
    console.log('Files uploaded:', files);
    // Handle file upload logic here
  };

  const handleVoiceRecord = (isRecording: boolean) => {
    console.log('Voice recording:', isRecording);
    // Handle voice recording logic here
  };

  const handleAssistantSelect = (assistant: { key: string; name: string; icon?: React.ReactNode }) => {
    setSelectedAssistant(assistant);
    setMenuOpen(false);
  };

  // Removed renderAssistantContent - now handled by AIMessage component

  
  

  return (
    <div className="flex flex-1 h-full">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full" style={{ backgroundColor: '#F8FAFC' }}>
        {/* Content Area */}
        <div className="flex-1 flex flex-col bg-gray-50 min-h-0">
          <div className="flex-1 overflow-y-auto p-8 pb-8 min-h-0">
            <div className="min-h-full flex flex-col justify-end">
              <div className="w-full max-w-2xl mx-auto space-y-6 pb-8">
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
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div key={message.id} className="animate-fade-in">
                        {message.role === 'user' ? (
                          <UserMessage content={message.content} />
                        ) : (
                          <AIMessage content={message.content} />
                        )}
                      </div>
                    ))}

                    {/* Loading indicator */}
                    {isLoading && <LoadingMessage className="animate-fade-in" />}

                    <div ref={messagesEndRef} />
                  </div>
                )}

                {/* Unified input at the bottom */}
                <div className="mt-4 sticky bottom-8 relative">
                  <AIInputField
                    value={inputValue}
                    onChange={setInputValue}
                    onSend={handleSendMessage}
                    onFileUpload={handleFileUpload}
                    onVoiceRecord={handleVoiceRecord}
                    placeholder="Ask me anything..."
                    disabled={isLoading}
                    isLoading={isLoading}
                    attachments={attachments}
                    onAttachmentsChange={setAttachments}
                    selectedAssistant={selectedAssistant}
                    onClearAssistant={() => setSelectedAssistant(null)}
                    onPlusClick={() => setMenuOpen((o) => !o)}
                  />

                  {/* Assistant selection menu */}
                  {menuOpen && (
                    <div
                      ref={menuRef}
                      className="absolute left-2 top-14 z-50 w-80 bg-white border border-gray-200 rounded-2xl shadow-xl p-2 animate-in fade-in zoom-in-95"
                      role="menu"
                      aria-label="Select assistant"
                    >
                      {assistants.map((a) => (
                        <button
                          key={a.key}
                          className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                          onClick={() => handleAssistantSelect(a)}
                          role="menuitem"
                        >
                          <span className="w-6 h-6 flex items-center justify-center rounded-md">{a.icon}</span>
                          <span className="text-sm text-slate-900">{a.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
