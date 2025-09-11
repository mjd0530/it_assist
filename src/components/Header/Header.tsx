import React from 'react';
import { MessageCircle, RefreshCw, ChevronDown, Menu } from 'lucide-react';
import aiIcon from '../../assets/ai_icon_color.svg';

interface HeaderProps {
  onMenuClick: () => void;
  isMobileMenuOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 h-16">
      <div className="flex items-center justify-between h-full px-6">
        {/* Left side - Hamburger Menu & Branding */}
        <div className="flex items-center space-x-4">
          {/* Hamburger Menu - Mobile Only */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5 text-gray-600" />
          </button>
          
          <div className="flex items-center space-x-3">
            <h1 className="text-lg font-semibold text-gray-900 hidden sm:block">Lenovo Device Orchestration</h1>
            <div className="flex items-center space-x-2">
              {/* AI Icon */}
              <img src={aiIcon} alt="AI Icon" className="w-8 h-8" />
              <div className="flex items-center space-x-1">
                <span className="text-lg font-semibold text-gray-900">Lenovo IT Assist</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Icons */}
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <MessageCircle className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <RefreshCw className="w-5 h-5 text-gray-600" />
          </button>
          {/* User profile picture */}
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-red-500 rounded-full flex items-center justify-center">
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};