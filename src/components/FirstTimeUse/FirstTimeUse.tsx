import React, { useEffect, useRef, useState } from 'react';
import motoLogo from '../../assets/moto_ai_prc.svg';
import { AIInputField } from '../AIInputField';
import type { AIInputFieldHandle } from '../AIInputField';
import ConfirmationNumberOutlined from '@mui/icons-material/ConfirmationNumberOutlined';
import PowerOutlined from '@mui/icons-material/PowerOutlined';
import AppsOutlined from '@mui/icons-material/AppsOutlined';
import RocketLaunchOutlined from '@mui/icons-material/RocketLaunchOutlined';
import BuildOutlined from '@mui/icons-material/BuildOutlined';
import InsertDriveFileOutlined from '@mui/icons-material/InsertDriveFileOutlined';

interface FirstTimeUseProps {
  onPromptClick: (prompt: string) => void;
  isLoading?: boolean;
}

export const FirstTimeUse: React.FC<FirstTimeUseProps> = ({ onPromptClick, isLoading = false }) => {
  const [inputValue, setInputValue] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedAssistant, setSelectedAssistant] = useState<{ key: string; name: string; icon?: React.ReactNode } | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const plusBtnRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<AIInputFieldHandle>(null);

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

  // Assistant definitions
  const assistants = [
    { key: 'ticket', name: 'Ticket', icon: <ConfirmationNumberOutlined fontSize="small" sx={{ color: '#0F172A' }} /> },
    { key: 'power', name: 'Power', icon: <PowerOutlined fontSize="small" sx={{ color: '#0F172A' }} /> },
    { key: 'application', name: 'Application', icon: <AppsOutlined fontSize="small" sx={{ color: '#0F172A' }} /> },
    { key: 'deployment', name: 'Deployment', icon: <RocketLaunchOutlined fontSize="small" sx={{ color: '#0F172A' }} /> },
    { key: 'device', name: 'Device Configuration', icon: <BuildOutlined fontSize="small" sx={{ color: '#0F172A' }} /> },
    { key: 'file', name: 'File', icon: <InsertDriveFileOutlined fontSize="small" sx={{ color: '#0F172A' }} /> },
  ] as const;

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

  // Close on outside click / Esc
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!menuOpen) return;
      const target = e.target as Node;
      if (menuRef.current && !menuRef.current.contains(target) && !plusBtnRef.current?.contains(target)) {
        setMenuOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const handleAssistantSelect = (assistant: { key: string; name: string; icon?: React.ReactNode }) => {
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
        <div className="w-full max-w-2xl mb-8 relative">
          <AIInputField
            ref={inputRef}
            value={inputValue}
            onChange={setInputValue}
            onSend={handleSendMessage}
            placeholder="Ask me anything..."
            disabled={isLoading}
            isLoading={isLoading}
            autoFocus={true}
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
              {assistants.slice(0,5).map((a) => (
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
              <div className="my-2 mx-3 border-t border-gray-200" />
              <button
                className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                onClick={() => handleAssistantSelect(assistants[5])}
                role="menuitem"
              >
                <span className="w-6 h-6 flex items-center justify-center rounded-md">{assistants[5].icon}</span>
                <span className="text-sm text-slate-900">{assistants[5].name}</span>
              </button>
            </div>
          )}
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
