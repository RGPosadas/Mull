import { ROUTES } from '../../../../constants';
import React, { CSSProperties } from 'react';
import { NavLink } from 'react-router-dom';

import './sub-nav-bar.scss';

export interface SubNavBarProps {
  style?: CSSProperties;
  className?: string;
}

export const SubNavBar = ({ style, className }: SubNavBarProps) => {
  return (
    <div className={`sub-nav-bar-container ${className}`} style={style}>
      <div className="inner-cont">
        <NavLink
          to={ROUTES.DISCOVER}
          className="subnavigation-link"
          data-testid="subnavigation-discover-button"
        >
          Discover
        </NavLink>
        <NavLink
          to={ROUTES.UPCOMING}
          className="subnavigation-link"
          activeClassName="active"
          data-testid="subnavigation-upcoming-button"
        >
          Upcoming
        </NavLink>
        <NavLink
          to={ROUTES.MY_EVENTS}
          className="subnavigation-link"
          activeClassName="active"
          data-testid="subnavigation-myEvents-button"
        >
          My Events
        </NavLink>
      </div>
    </div>
  );
};

export default SubNavBar;
