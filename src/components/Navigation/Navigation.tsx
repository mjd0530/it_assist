import React from 'react';
import { 
  LayoutDashboard, 
  MessageSquare, 
  History, 
  Settings, 
  HelpCircle,
  ChevronLeft,
  Plus
} from 'lucide-react';
import { cn } from '../../utils/cn';
import type { NavigationItem } from '../../types';

interface NavigationProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  currentView: string;
  onViewChange: (view: string) => void;
  isMobileMenuOpen: boolean;
  onCloseMobileMenu: () => void;
}

const navigationItems: NavigationItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', path: '/dashboard' },
  { id: 'chat', label: 'Chat', icon: 'MessageSquare', path: '/chat' },
  { id: 'history', label: 'History', icon: 'History', path: '/history' },
  { id: 'settings', label: 'Settings', icon: 'Settings', path: '/settings' },
  { id: 'help', label: 'Help', icon: 'HelpCircle', path: '/help' }
];

const iconMap = {
  LayoutDashboard,
  MessageSquare,
  History,
  Settings,
  HelpCircle
};

export const Navigation: React.FC<NavigationProps> = ({
  isCollapsed,
  onToggleCollapse,
  currentView,
  onViewChange,
  isMobileMenuOpen,
  onCloseMobileMenu
}) => {
  const handleItemClick = (itemId: string) => {
    onViewChange(itemId);
    onCloseMobileMenu();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onCloseMobileMenu}
        />
      )}

      {/* Navigation Sidebar */}
      <nav className={cn(
        "fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 transition-all duration-300 z-50",
        "lg:relative lg:top-0 lg:h-full lg:z-auto",
        isCollapsed ? "w-16" : "w-64",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="flex flex-col h-full">
          {/* Toggle Button (Desktop only) */}
          <div className="hidden lg:flex items-center justify-between p-4 border-b border-gray-200">
            {!isCollapsed && (
              <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Navigation
              </h2>
            )}
            <button
              onClick={onToggleCollapse}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              aria-label={isCollapsed ? "Expand navigation" : "Collapse navigation"}
            >
              <ChevronLeft className={cn(
                "h-4 w-4 text-gray-500 transition-transform duration-200",
                isCollapsed && "rotate-180"
              )} />
            </button>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 p-4 space-y-2">
            {navigationItems.map((item) => {
              const IconComponent = iconMap[item.icon as keyof typeof iconMap];
              const isActive = currentView === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={cn(
                    "w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                    "hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
                    isActive 
                      ? "bg-primary-50 text-primary-700 border border-primary-200" 
                      : "text-gray-700 hover:text-gray-900"
                  )}
                >
                  <IconComponent className={cn(
                    "h-5 w-5 flex-shrink-0 transition-colors duration-200",
                    isActive ? "text-primary-600" : "text-gray-500 group-hover:text-gray-700"
                  )} />
                  {!isCollapsed && (
                    <span className="text-sm font-medium truncate">
                      {item.label}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* New Chat Button */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={() => handleItemClick('chat')}
              className={cn(
                "w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                "bg-primary-600 text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              )}
            >
              <Plus className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && (
                <span className="text-sm font-medium">
                  New Chat
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};
