import React, { ReactNode } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import './mull-back-button.scss';
import { useHistory } from 'react-router-dom';

export interface MullBackButtonProps {
  children?: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const MullBackButton = ({
  children = 'Back',
  onClick = null,
  className,
  style,
}: MullBackButtonProps) => {
  const history = useHistory();

  const defaultOnClick = () => {
    history.goBack();
  };

  return (
    <button
      data-testid="mull-back-button"
      className={`mull-back-button ${className}`}
      onClick={onClick ? onClick : defaultOnClick}
      style={style}
    >
      <FontAwesomeIcon icon={faChevronLeft} className="mull-back-button-icon" />
      <div className="mull-back-button-text">{children}</div>
    </button>
  );
};

export default MullBackButton;
