import React from 'react';

import './mull-button.scss';

export interface MullButtonProps {
  type?: 'submit' | 'reset' | 'button';
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  children?: string;
}

export const MullButton = ({
  type = 'submit',
  onClick = () => {
    /* Do nothing */
  },
  className = '',
  children = '',
}: MullButtonProps) => {
  return (
    <button
      type={type}
      className={`mull-button ${className}`}
      onClick={onClick}
      data-testid="mull-button"
    >
      {children}
    </button>
  );
};

export default MullButton;
