import React, { CSSProperties } from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../../../constants';
import './sub-nav-bar.scss';

export interface SubNavBarMsgProps {
  style?: CSSProperties;
  className?: string;
}

export const SubNavBarMsg = ({ style, className }: SubNavBarMsgProps) => {
  return (
    <div className={`sub-nav-bar-container ${className}`} style={style}>
      <div className="inner-cont-msg">
        <NavLink
          to={ROUTES.GROUPCHAT}
          className="subnavigation-link"
          // data-testid="subnavigation-discover-button"
        >
          Group Chat
        </NavLink>
        <NavLink
          to={ROUTES.ANNOUNCEMENTS}
          className="subnavigation-link"
          activeClassName="active"
          // data-testid="subnavigation-myEvents-button"
        >
          Announcements
        </NavLink>
      </div>
    </div>
  );
};

export default SubNavBarMsg;
