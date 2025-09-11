import { useState, useCallback } from 'react';
import type { AppState } from '../types';

export const useAppState = () => {
  const [state, setState] = useState<AppState>({
    currentView: 'dashboard',
    isNavigationCollapsed: false,
    isMobileMenuOpen: false,
  });

  const setCurrentView = useCallback((view: AppState['currentView']) => {
    setState(prev => ({ ...prev, currentView: view }));
  }, []);

  const toggleNavigationCollapse = useCallback(() => {
    setState(prev => ({ ...prev, isNavigationCollapsed: !prev.isNavigationCollapsed }));
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setState(prev => ({ ...prev, isMobileMenuOpen: !prev.isMobileMenuOpen }));
  }, []);

  const closeMobileMenu = useCallback(() => {
    setState(prev => ({ ...prev, isMobileMenuOpen: false }));
  }, []);

  return {
    ...state,
    setCurrentView,
    toggleNavigationCollapse,
    toggleMobileMenu,
    closeMobileMenu,
  };
};
