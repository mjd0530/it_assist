import React, { useRef, useEffect, useState } from 'react';
import { Chat } from '../Chat';
import { FirstTimeUse } from '../FirstTimeUse';
import { aiService } from '../../services/aiService';
import type { Message } from '../../types';

interface CenterContentProps {
  selectedThread?: number | null;
  isNewThread?: boolean;
  onStartDeploymentPlan?: (initialQuery: string) => void;
}

export const CenterContent: React.FC<CenterContentProps> = ({ selectedThread, isNewThread, onStartDeploymentPlan }) => {
  const inputRef = useRef<HTMLInputElement>(null);
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
    // If user intent sounds like deployment planning, route to planner
    const lower = prompt.toLowerCase();
    const isDeploymentIntent =
      lower.includes('deploy') ||
      lower.includes('deployment') ||
      lower.includes('update plan') ||
      lower.includes('bios updates') ||
      lower.includes('driver updates');

    if (isDeploymentIntent && onStartDeploymentPlan) {
      onStartDeploymentPlan(prompt);
      return;
    }

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

  // For new threads or when no messages, show the FirstTimeUse component
  if (messages.length === 0) {
    return (
      <FirstTimeUse 
        onPromptClick={handlePromptClick}
        onStartDeploymentPlan={onStartDeploymentPlan}
        isLoading={isLoading}
      />
    );
  }

  // Show messages when there are messages - use Chat component for consistency
  return (
    <div className="flex-1 flex flex-col h-full" style={{ backgroundColor: '#F8FAFC' }}>
      <Chat threadId={selectedThread || 0} />
    </div>
  );
};