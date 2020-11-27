import { ROUTES } from 'apps/mull-ui/src/constants';
import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';

import './subnavigation-bar.scss';

export const SubNavigationBar = () => {
  return (
    <div className="page-container">
      <div className="subnavigation-container">
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
          to={ROUTES.MYEVENTS}
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

export default SubNavigationBar;
