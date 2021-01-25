import React, { CSSProperties } from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../../../constants';
import './sub-nav-bar.scss';

export interface SubNavBarProps {
  style?: CSSProperties;
  className?: string;
}

var homeTabs = [ROUTES.DISCOVER, ROUTES.UPCOMING, ROUTES.MY_EVENTS];

var messagesTabs = [ROUTES.GROUPCHAT, ROUTES.ANNOUNCEMENTS];

export const SubNavBar = ({ style, className }: SubNavBarProps) => {
  var nbOfTabs = (location.pathname.includes('home') ? homeTabs : messagesTabs).map((page) => {
    return (
      <NavLink to={page.url} className="subnavigation-link" activeClassName="active">
        {page.displayName}
      </NavLink>
    );
  });
  return (
    <div className={`sub-nav-bar-container ${className}`} style={style}>
      <div className="inner-cont">{nbOfTabs}</div>
    </div>
  );
};

{
  /* 
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
        </NavLink> */
}

export default SubNavBar;
