import React from 'react';
import './mull-button.scss';

export interface MullButtonProps {
  type?: 'submit' | 'reset' | 'button';
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  altStyle?: boolean;
  children?: string;
}

export const MullButton = ({
  type = 'submit',
  onClick = () => {
    /* Do nothing */
  },
  className = '',
  altStyle = false,
  children = '',
}: MullButtonProps) => {
  return (
    <button
      type={type}
      className={`mull-button ${className} ${altStyle ? 'mull-button-alt-style' : ''}`}
      onClick={onClick}
      data-testid="mull-button"
    >
      {children}
    </button>
  );
};

export default MullButton;
