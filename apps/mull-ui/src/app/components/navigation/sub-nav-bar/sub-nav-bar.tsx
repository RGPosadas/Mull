import { IRoutes } from '@mull/types';
import React, { CSSProperties } from 'react';
import { NavLink } from 'react-router-dom';
import './sub-nav-bar.scss';

export interface SubNavBarProps {
  style?: CSSProperties;
  className?: string;
  routes?: IRoutes[];
}

// var homeTabs = [ROUTES.DISCOVER, ROUTES.UPCOMING, ROUTES.MY_EVENTS];

// var messagesTabs = [ROUTES.GROUPCHAT, ROUTES.ANNOUNCEMENTS];

export const SubNavBar = ({ style, className, routes }: SubNavBarProps) => {
  var nbOfTabs = routes.map((page) => {
    var testid = 'subnavigation-' + page.displayName.toLowerCase().replace(' ', '') + '-button';
    return (
      <NavLink
        key={page.url}
        to={page.url}
        className="subnavigation-link"
        activeClassName="active"
        data-testid={testid}
      >
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

export default SubNavBar;
