import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { CSSProperties } from 'react';
import './sub-nav-bar-header.scss';

export interface SubNavBarHeaderProps {
  style?: CSSProperties;
  className?: string;
  eventTitle?: string;
}

export const SubNavBarHeader = ({ style, className, eventTitle }: SubNavBarHeaderProps) => {
  return (
    <div className={`header ${className}`} style={style}>
      <button className="hamburger-button">
        {<FontAwesomeIcon icon={faBars} size="2x" color="grey" className="hamburger-menu" />}
      </button>
      <h1>{eventTitle}</h1>
    </div>
  );
};

export default SubNavBarHeader;
