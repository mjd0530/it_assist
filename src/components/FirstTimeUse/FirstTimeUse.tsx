import React, { useEffect, useRef, useState } from 'react';
import motoLogo from '../../assets/moto_ai_prc.svg';
import { AIInputField } from '../AIInputField';
import type { AIInputFieldHandle } from '../AIInputField';
import { AssistantMenu, type AssistantOption } from '../AssistantMenu';
import { useMenuPosition } from '../../hooks/useMenuPosition';

interface FirstTimeUseProps {
  onPromptClick: (prompt: string) => void;
  onStartDeploymentPlan?: (initialQuery: string) => void;
  isLoading?: boolean;
  autoFocusInput?: boolean;
  initialAssistant?: AssistantOption | null;
}

export const FirstTimeUse: React.FC<FirstTimeUseProps> = ({ onPromptClick, onStartDeploymentPlan, isLoading = false, autoFocusInput = true, initialAssistant = null }) => {
  const [inputValue, setInputValue] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedAssistant, setSelectedAssistant] = useState<AssistantOption | null>(initialAssistant);
  const [attachments, setAttachments] = useState<File[]>([]);
  const inputRef = useRef<AIInputFieldHandle>(null);
  const inputContainerRef = useRef<HTMLDivElement>(null);

  // Update selectedAssistant when initialAssistant changes
  useEffect(() => {
    if (initialAssistant) {
      setSelectedAssistant(initialAssistant);
    }
  }, [initialAssistant]);

  // Use custom hook for menu positioning
  const menuPosition = useMenuPosition(menuOpen, inputContainerRef);

  const handleSendMessage = () => {
    if (!inputValue.trim() || isLoading) return;
    const trimmed = inputValue.trim();
    if (selectedAssistant?.key === 'deployment' && onStartDeploymentPlan) {
      onStartDeploymentPlan(trimmed);
    } else {
      onPromptClick(trimmed);
    }
    setInputValue('');
  };


  const suggestedPrompts = [
    "Give me a count of devices with Corrupted Backup",
    "How many have had Device Change events?",
    "How many Blue Screen Errors were reported for the previous 30 days?",
    "What are the key features available in Policy Management?",
    "How can I register a new Windows device?"
  ];

  // Prompts by assistant
  const defaultPrompts = suggestedPrompts;
  const promptsByAssistant: Record<string, string[]> = {
    ticket: [
      'Create a high-priority ticket for a BSOD incident on Finance laptop',
      'Summarize top recurring issues this week and link related tickets',
      'Assign a hardware replacement ticket to the Field Ops queue',
      'Escalate open network tickets older than 48 hours',
      'Auto-close resolved tickets after confirmation from user',
    ],
    power: [
      'Generate a power usage report for remote workers last 7 days',
      'Identify devices with abnormal battery drain and suggest actions',
      'Enforce power policy to reduce idle timeouts across marketing laptops',
      'Schedule hibernation during off-hours for shared lab devices',
      'Alert me to batteries below 70% health',
    ],
    application: [
      'List apps with the most crashes across the fleet this month',
      'Roll out Slack update to Engineering with a canary group first',
      'Find devices missing Microsoft 365 and schedule installation',
      'Report on app versions for Zoom across all regions',
      'Pause rollouts if crash rate exceeds 2%',
    ],
    deployment: [
      'Roll out driver updates gradually across all US-based PCs',
      'Schedule a test batch for Windows security updates this week',
      "Help me deploy all BIOS-related updates that don't require a reboot",
      'Create a maintenance window for APAC Wednesdays 1–3AM',
      'Notify device owners before deployment begins',
    ],
    device: [
      'Push Wi‑Fi configuration for guest network to conference rooms',
      'Apply BitLocker policy to all devices without encryption',
      'Create a baseline for new Windows devices with standard apps and settings',
      'Tag devices that fail baseline checks for follow-up',
      'Rotate local admin password on all kiosks',
    ],
    file: [
      'Search for devices with large temp files and clean up safely',
      'Show file integrity alerts for protected folders in the last 24 hours',
      'Collect logs from devices with recent backup failures',
      'Audit downloads of sensitive documents last 7 days',
      'List endpoints with low disk space below 10%',
    ],
  };

  // Pick 3–5 prompts for the current selection, stable until selection changes
  const [currentPrompts, setCurrentPrompts] = useState<string[]>(defaultPrompts);

  const pickPrompts = (list: string[]) => {
    const max = Math.min(5, list.length);
    const min = Math.min(3, max);
    const count = Math.floor(Math.random() * (max - min + 1)) + min;
    return [...list]
      .sort(() => Math.random() - 0.5)
      .slice(0, count);
  };

  useEffect(() => {
    if (selectedAssistant?.key) {
      const list = promptsByAssistant[selectedAssistant.key] || defaultPrompts;
      setCurrentPrompts(pickPrompts(list));
    } else {
      setCurrentPrompts(pickPrompts(defaultPrompts));
    }
  }, [selectedAssistant]);

  const handleAssistantSelect = (assistant: AssistantOption) => {
    if (assistant.key === 'file') {
      // Open file picker instead of adding a chip
      inputRef.current?.openFilePicker();
      setMenuOpen(false);
      return;
    }
    setSelectedAssistant(assistant);
    setMenuOpen(false);
  };

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
        <div ref={inputContainerRef} className={`w-full max-w-2xl mb-8 relative transition-transform duration-500 ease-in-out`}>
          <AIInputField
            ref={inputRef}
            value={inputValue}
            onChange={setInputValue}
            onSend={handleSendMessage}
            placeholder="Ask me anything..."
            disabled={isLoading}
            isLoading={isLoading}
            autoFocus={autoFocusInput}
            selectedAssistant={selectedAssistant}
            onClearAssistant={() => setSelectedAssistant(null)}
            onPlusClick={() => setMenuOpen((o) => !o)}
            attachments={attachments}
            onAttachmentsChange={setAttachments}
          />

          {/* Assistant selection menu */}
          <AssistantMenu
            isOpen={menuOpen}
            onClose={() => setMenuOpen(false)}
            onSelect={handleAssistantSelect}
            position={menuPosition}
          />
        </div>

        {/* Suggested Questions - Contained Card List (dynamic) */}
        <div className="w-full max-w-2xl">
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            {currentPrompts.map((prompt, index) => (
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
