import React, { useState, useRef, useEffect } from 'react';
import type { Message } from '../../types';
import { threadConversations } from '../../services/mockData';
import { aiService } from '../../services/aiService';
import { threadService } from '../../services/threadService';
import { AIInputField, type AIInputFieldHandle } from '../AIInputField';
import { UserMessage, AIMessage, LoadingMessage } from '../MessageBubbles';
import { FirstTimeUse } from '../FirstTimeUse';
import { AssistantMenu, type AssistantOption } from '../AssistantMenu';
import { useMenuPosition } from '../../hooks/useMenuPosition';

interface ChatProps {
  className?: string;
  threadId?: number;
  isNewThread?: boolean;
  onStartDeploymentPlan?: (initialQuery: string) => void;
  initialAssistant?: AssistantOption | null;
}

export const Chat: React.FC<ChatProps> = ({ threadId = 0, isNewThread = false, onStartDeploymentPlan, initialAssistant = null }) => {
  // Load messages for this thread
  const loadMessagesForThread = (id: number) => {
    console.log(`Loading messages for thread ${id}`);
    
    // Check threadService first
    const savedMessages = threadService.getThreadMessages(id);
    console.log(`Regular thread messages:`, savedMessages);
    if (savedMessages.length > 0) {
      return savedMessages;
    }
    
    // Check if there are deployment messages stored in deployment state
    const deploymentState = threadService.getDeploymentState(id);
    console.log(`Deployment state:`, deploymentState);
    if (deploymentState && deploymentState.messages.length > 0) {
      console.log(`Found deployment messages:`, deploymentState.messages);
      return deploymentState.messages;
    }
    
    // Fall back to demo data for pre-existing threads
    const demoMessages = threadConversations[id as keyof typeof threadConversations] || [];
    console.log(`Demo messages:`, demoMessages);
    return demoMessages;
  };

  // Save messages to both regular thread messages and deployment state if it exists
  const saveMessagesToThread = (id: number, messages: Message[]) => {
    console.log(`Saving messages to thread ${id}:`, messages);
    
    // Always save to regular thread messages
    threadService.setThreadMessages(id, messages);
    
    // Also save to deployment state if it exists
    const deploymentState = threadService.getDeploymentState(id);
    if (deploymentState) {
      console.log(`Also saving to deployment state for thread ${id}`);
      threadService.saveDeploymentState(id, {
        ...deploymentState,
        messages: messages
      });
    } else {
      console.log(`No deployment state found for thread ${id}`);
    }
  };

  const [messages, setMessages] = useState<Message[]>(() => {
    return isNewThread ? [] : loadMessagesForThread(threadId);
  });
  const [inputValue, setInputValue] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAssistant, setSelectedAssistant] = useState<AssistantOption | null>(initialAssistant);
  const [menuOpen, setMenuOpen] = useState(false);
  const [shouldAutoFocus, setShouldAutoFocus] = useState(isNewThread);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputContainerRef = useRef<HTMLDivElement>(null);
  const inputFieldRef = useRef<AIInputFieldHandle>(null);

  // Use custom hook for menu positioning
  const menuPosition = useMenuPosition(menuOpen, inputContainerRef);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // When threadId or isNewThread changes, load the appropriate messages
  useEffect(() => {
    if (isNewThread) {
      setMessages([]);
      setShouldAutoFocus(true);
      // Set initial assistant if provided
      if (initialAssistant) {
        setSelectedAssistant(initialAssistant);
      }
    } else {
      const loadedMessages = loadMessagesForThread(threadId);
      setMessages(loadedMessages);
      setShouldAutoFocus(false);
    }
  }, [threadId, isNewThread, initialAssistant]);


  const handleSendMessage = async (message: string, _fileAttachments?: File[]) => {
    if (!message.trim() || isLoading) return;

    // Check if this is deployment intent
    const lower = message.toLowerCase();
    const isDeploymentIntent =
      lower.includes('deploy') ||
      lower.includes('deployment') ||
      lower.includes('update plan') ||
      lower.includes('bios updates') ||
      lower.includes('driver updates');

    if (isDeploymentIntent && onStartDeploymentPlan) {
      onStartDeploymentPlan(message);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      role: 'user',
      timestamp: new Date()
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue('');
    setAttachments([]);
    setIsLoading(true);

    // Save messages immediately after user sends
    saveMessagesToThread(threadId, newMessages);

    // Generate AI response
    try {
      const aiResponse = await aiService.generateResponse(message, threadId.toString());
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        role: 'assistant',
        timestamp: new Date()
      };
      
      const messagesWithAI = [...newMessages, aiMessage];
      setMessages(messagesWithAI);
      
      // Save messages after AI response
      saveMessagesToThread(threadId, messagesWithAI);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I encountered an error while processing your request. Please try again.",
        role: 'assistant',
        timestamp: new Date()
      };
      
      const messagesWithError = [...newMessages, errorMessage];
      setMessages(messagesWithError);
      
      // Save messages even with error
      saveMessagesToThread(threadId, messagesWithError);
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

  const handleAssistantSelect = (assistant: AssistantOption) => {
    if (assistant.key === 'file') {
      // Open file picker instead of adding a chip
      inputFieldRef.current?.openFilePicker();
      setMenuOpen(false);
      return;
    }
    setSelectedAssistant(assistant);
    setMenuOpen(false);
  };

  // Removed renderAssistantContent - now handled by AIMessage component

  
  

  // Show FirstTimeUse for new threads or empty threads
  if (messages.length === 0) {
    return (
      <FirstTimeUse 
        key={`first-time-${threadId}`}
        onPromptClick={handleSendMessage}
        onStartDeploymentPlan={onStartDeploymentPlan}
        isLoading={isLoading}
        autoFocusInput={shouldAutoFocus}
      />
    );
  }

  return (
    <div className="flex flex-1 h-full">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full" style={{ backgroundColor: '#F8FAFC' }}>
        {/* Content Area */}
        <div className="flex-1 flex flex-col bg-gray-50 min-h-0">
          <div className="flex-1 overflow-y-auto p-8 pb-8 min-h-0">
            <div className="min-h-full flex flex-col justify-end">
              <div className="w-full max-w-2xl mx-auto space-y-6 pb-8">
                {messages.length > 0 && (
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
                <div ref={inputContainerRef} className="mt-4 sticky bottom-8 relative">
                  <AIInputField
                    ref={inputFieldRef}
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
                  <AssistantMenu
                    isOpen={menuOpen}
                    onClose={() => setMenuOpen(false)}
                    onSelect={handleAssistantSelect}
                    position={menuPosition}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
