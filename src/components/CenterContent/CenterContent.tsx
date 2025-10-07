import React from 'react';
import { Chat } from '../Chat';
import type { AssistantOption } from '../AssistantMenu';

interface CenterContentProps {
  selectedThread?: number | null;
  isNewThread?: boolean;
  onStartDeploymentPlan?: (initialQuery: string) => void;
  initialAssistant?: AssistantOption | null;
}

export const CenterContent: React.FC<CenterContentProps> = ({ selectedThread, isNewThread, onStartDeploymentPlan, initialAssistant }) => {
  console.log('CenterContent - initialAssistant:', initialAssistant);

  // All threads use the Chat component, which handles empty state (FirstTimeUse) internally
  return (
    <div className="flex-1 flex flex-col h-full" style={{ backgroundColor: '#F8FAFC' }}>
      <Chat 
        threadId={selectedThread || 0} 
        isNewThread={isNewThread}
        onStartDeploymentPlan={onStartDeploymentPlan}
        initialAssistant={initialAssistant}
      />
    </div>
  );
};