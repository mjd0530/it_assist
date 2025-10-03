import React from 'react';
import SquareEditOutline from '../../assets/square-edit-outline.svg';

interface AddThreadButtonProps {
  onAddThread: () => void;
  disabled?: boolean;
}

export const AddThreadButton: React.FC<AddThreadButtonProps> = ({
  onAddThread,
  disabled = false
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent parent button click
    e.preventDefault();
    onAddThread();
  };

  return (
    <img 
      src={SquareEditOutline} 
      alt="Add new thread" 
      className={`w-5 h-5 ${
        disabled ? 'opacity-30 cursor-not-allowed' : 'opacity-60 group-hover:opacity-100'
      } transition-opacity cursor-pointer`} 
      style={{ filter: 'brightness(0) saturate(100%) invert(9%) sepia(4%) saturate(1554%) hue-rotate(169deg) brightness(95%) contrast(89%)' }}
      onClick={handleClick}
    />
  );
};
