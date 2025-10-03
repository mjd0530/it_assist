export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  isLoading?: boolean;
}

export interface Thread {
  id: number;
  name: string;
  date: string;
  status: 'idle' | 'loading' | 'completed' | 'error';
  lastMessage?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  isActive?: boolean;
}

export interface Workflow {
  id: string;
  name: string;
  icon: string;
  date?: string;
}

export interface Assistant {
  id: string;
  name: string;
  icon: string;
  workflows?: Workflow[];
  isExpanded?: boolean;
}

export interface ContentPanelTab {
  id: string;
  label: string;
  content: React.ReactNode;
}

export interface AppState {
  currentView: 'dashboard' | 'chat' | 'history' | 'settings' | 'help';
  isNavigationCollapsed: boolean;
  isMobileMenuOpen: boolean;
  currentChatSession?: ChatSession;
  user?: User;
}

export interface AIInputFieldProps {
  value: string;
  onChange: (value: string) => void;
  onSend: (message: string, attachments?: File[]) => void;
  onFileUpload?: (files: File[]) => void;
  onVoiceRecord?: (isRecording: boolean) => void;
  placeholder?: string;
  disabled?: boolean;
  isLoading?: boolean;
  autoFocus?: boolean;
  className?: string;
  maxHeight?: number;
  attachments?: File[];
  onAttachmentsChange?: (attachments: File[]) => void;
}
