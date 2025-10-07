import React, { useRef, useEffect, useState } from 'react';
import ConfirmationNumberOutlined from '@mui/icons-material/ConfirmationNumberOutlined';
import PowerOutlined from '@mui/icons-material/PowerOutlined';
import AppsOutlined from '@mui/icons-material/AppsOutlined';
import RocketLaunchOutlined from '@mui/icons-material/RocketLaunchOutlined';
import BuildOutlined from '@mui/icons-material/BuildOutlined';
import InsertDriveFileOutlined from '@mui/icons-material/InsertDriveFileOutlined';
import { customAssistantService } from '../../services/customAssistantService';
import type { CustomAssistant } from '../AssistantForm';

export interface AssistantOption {
  key: string;
  name: string;
  icon: React.ReactNode;
  isCustom?: boolean;
}

export const ASSISTANT_OPTIONS: AssistantOption[] = [
  { key: 'ticket', name: 'Ticket', icon: <ConfirmationNumberOutlined fontSize="small" sx={{ color: '#0F172A' }} /> },
  { key: 'power', name: 'Power', icon: <PowerOutlined fontSize="small" sx={{ color: '#0F172A' }} /> },
  { key: 'application', name: 'Application', icon: <AppsOutlined fontSize="small" sx={{ color: '#0F172A' }} /> },
  { key: 'deployment', name: 'Deployment', icon: <RocketLaunchOutlined fontSize="small" sx={{ color: '#0F172A' }} /> },
  { key: 'device', name: 'Device Configuration', icon: <BuildOutlined fontSize="small" sx={{ color: '#0F172A' }} /> },
  { key: 'file', name: 'File', icon: <InsertDriveFileOutlined fontSize="small" sx={{ color: '#0F172A' }} /> },
];

interface AssistantMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (assistant: AssistantOption) => void;
  position?: 'top' | 'bottom';
}

export const AssistantMenu: React.FC<AssistantMenuProps> = ({
  isOpen,
  onClose,
  onSelect,
  position = 'bottom'
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [customAssistants, setCustomAssistants] = useState<CustomAssistant[]>([]);

  // Load custom assistants when menu opens
  useEffect(() => {
    if (isOpen) {
      const assistants = customAssistantService.getAll();
      setCustomAssistants(assistants);
    }
  }, [isOpen]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onClose]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'deployment':
        return <RocketLaunchOutlined fontSize="small" sx={{ color: '#0F172A' }} />;
      case 'ticketManagement':
        return <ConfirmationNumberOutlined fontSize="small" sx={{ color: '#0F172A' }} />;
      case 'powerManagement':
        return <PowerOutlined fontSize="small" sx={{ color: '#0F172A' }} />;
      case 'applicationManagement':
        return <AppsOutlined fontSize="small" sx={{ color: '#0F172A' }} />;
      case 'adaptiveDeviceConfiguration':
        return <BuildOutlined fontSize="small" sx={{ color: '#0F172A' }} />;
      default:
        return <RocketLaunchOutlined fontSize="small" sx={{ color: '#0F172A' }} />;
    }
  };

  return (
    <div
      ref={menuRef}
      className={`absolute left-2 z-50 w-80 bg-white border border-gray-200 rounded-2xl shadow-xl animate-in fade-in zoom-in-95 ${
        position === 'top' ? 'bottom-14' : 'top-14'
      }`}
      role="menu"
      aria-label="Select assistant"
    >
      <div className="p-2 overflow-y-auto max-h-96">
        {/* Custom Assistants Section */}
        {customAssistants.length > 0 && (
          <>
            <div className="px-3 py-2">
              <span className="text-xs font-semibold text-gray-500 uppercase">Custom Assistants</span>
            </div>
            {customAssistants.map((assistant) => (
              <button
                key={assistant.id}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                onClick={() => onSelect({
                  key: assistant.id,
                  name: assistant.name,
                  icon: getCategoryIcon(assistant.category),
                  isCustom: true,
                })}
                role="menuitem"
              >
                <span className="w-6 h-6 flex items-center justify-center rounded-md">
                  {getCategoryIcon(assistant.category)}
                </span>
                <span className="text-sm text-slate-900">{assistant.name}</span>
              </button>
            ))}
            <div className="my-2 mx-3 border-t border-gray-200" />
            <div className="px-3 py-2">
              <span className="text-xs font-semibold text-gray-500 uppercase">Assistants</span>
            </div>
          </>
        )}

        {/* Standard Assistants */}
        {ASSISTANT_OPTIONS.slice(0, 5).map((assistant) => (
          <button
            key={assistant.key}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
            onClick={() => onSelect(assistant)}
            role="menuitem"
          >
            <span className="w-6 h-6 flex items-center justify-center rounded-md">{assistant.icon}</span>
            <span className="text-sm text-slate-900">{assistant.name}</span>
          </button>
        ))}
        <div className="my-2 mx-3 border-t border-gray-200" />
        <button
          className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
          onClick={() => onSelect(ASSISTANT_OPTIONS[5])}
          role="menuitem"
        >
          <span className="w-6 h-6 flex items-center justify-center rounded-md">{ASSISTANT_OPTIONS[5].icon}</span>
          <span className="text-sm text-slate-900">{ASSISTANT_OPTIONS[5].name}</span>
        </button>
      </div>
    </div>
  );
};

