export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  isLoading?: boolean;
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
