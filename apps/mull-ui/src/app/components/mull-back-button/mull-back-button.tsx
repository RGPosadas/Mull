import React, { ReactNode } from 'react';
import { History } from 'history';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import './mull-back-button.scss';

export interface MullBackButtonProps {
  children?: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  style?: React.CSSProperties;
  history: History;
}

export const MullBackButton = ({
  history,
  children = null,
  onClick = () => {
    history.goBack();
  },
  className,
  style,
}: MullBackButtonProps) => {
  return (
    <button
      data-testid="mull-back-button"
      className={`mull-back-button ${className}`}
      onClick={onClick}
      style={style}
    >
      <FontAwesomeIcon icon={faChevronLeft} className="mull-back-button-icon" />
      <div className="mull-back-button-text">{children}</div>
    </button>
  );
};

export default MullBackButton;
