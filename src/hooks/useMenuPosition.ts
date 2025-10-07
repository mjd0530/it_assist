import { useState, useEffect, type RefObject } from 'react';

export const useMenuPosition = (
  isOpen: boolean,
  containerRef: RefObject<HTMLDivElement | null>,
  menuHeight: number = 350
): 'top' | 'bottom' => {
  const [position, setPosition] = useState<'top' | 'bottom'>('bottom');

  useEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      
      // If not enough space below, show menu above
      if (spaceBelow < menuHeight) {
        setPosition('top');
      } else {
        setPosition('bottom');
      }
    }
  }, [isOpen, containerRef, menuHeight]);

  return position;
};

