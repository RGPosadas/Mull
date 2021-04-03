import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './settings-button.scss';

export interface setttingsButtonProps {
  icon?: IconProp;
  text?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const SettingsButton = ({ icon, text, onClick }: setttingsButtonProps) => {
  return (
    <button className="settings-button-container" onClick={onClick}>
      <FontAwesomeIcon className="settings-icon" icon={icon} />
      {text}
    </button>
  );
};

export default SettingsButton;
