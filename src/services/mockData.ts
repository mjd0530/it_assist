import type { Message, ChatSession, User, NavigationItem } from '../types';

export const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
};

export const mockNavigationItems: NavigationItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', path: '/dashboard' },
  { id: 'chat', label: 'Chat', icon: 'MessageSquare', path: '/chat' },
  { id: 'history', label: 'History', icon: 'History', path: '/history' },
  { id: 'settings', label: 'Settings', icon: 'Settings', path: '/settings' },
  { id: 'help', label: 'Help', icon: 'HelpCircle', path: '/help' }
];

export const mockMessages: Message[] = [
  {
    id: '1',
    content: 'Hello! How can I help you today?',
    role: 'assistant',
    timestamp: new Date(Date.now() - 1000 * 60 * 5)
  },
  {
    id: '2',
    content: 'I need help with React TypeScript best practices',
    role: 'user',
    timestamp: new Date(Date.now() - 1000 * 60 * 4)
  },
  {
    id: '3',
    content: `I'd be happy to help you with React TypeScript best practices! Here are some key recommendations:

## 1. Type Definitions
- Always define interfaces for your props
- Use generic types for reusable components
- Leverage TypeScript's strict mode

## 2. Component Structure
\`\`\`typescript
interface ButtonProps {
  variant: 'primary' | 'secondary';
  size: 'sm' | 'md' | 'lg';
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant, size, onClick, children }) => {
  return (
    <button 
      className={\`btn btn-\${variant} btn-\${size}\`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
\`\`\`

## 3. Hooks and State
- Use proper typing for useState and useEffect
- Create custom hooks with proper return types
- Leverage useCallback and useMemo with proper dependencies

Would you like me to elaborate on any of these points?`,
    role: 'assistant',
    timestamp: new Date(Date.now() - 1000 * 60 * 3)
  },
  {
    id: '4',
    content: 'Can you show me more examples of custom hooks?',
    role: 'user',
    timestamp: new Date(Date.now() - 1000 * 60 * 2)
  },
  {
    id: '5',
    content: `Absolutely! Here are some practical custom hook examples:

## useLocalStorage Hook
\`\`\`typescript
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}
\`\`\`

## useDebounce Hook
\`\`\`typescript
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
\`\`\`

These hooks provide reusable logic with proper TypeScript typing!`,
    role: 'assistant',
    timestamp: new Date(Date.now() - 1000 * 60 * 1)
  }
];

export const mockChatSessions: ChatSession[] = [
  {
    id: '1',
    title: 'React TypeScript Best Practices',
    messages: mockMessages,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    updatedAt: new Date(Date.now() - 1000 * 60 * 1)
  },
  {
    id: '2',
    title: 'CSS Grid Layout Help',
    messages: [
      {
        id: '1',
        content: 'How do I create a responsive grid layout?',
        role: 'user',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1)
      },
      {
        id: '2',
        content: 'I can help you with CSS Grid! Here are the basics...',
        role: 'assistant',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1 + 1000 * 30)
      }
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 1),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 1 + 1000 * 30)
  }
];
