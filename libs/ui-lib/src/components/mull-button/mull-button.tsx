import React from 'react';

import './mull-button.scss';

export interface MullButtonProps {
  type?: 'submit' | 'reset' | 'button';
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
}

export const MullButton = ({
  type = 'submit',
  onClick = () => {},
  className = '',
}: MullButtonProps) => {
  return (
    <button
      type={type}
      className={`mull-button ${className}`}
      onClick={onClick}
      data-testid="mull-button"
    >
      Done
    </button>
  );
};

export default MullButton;
