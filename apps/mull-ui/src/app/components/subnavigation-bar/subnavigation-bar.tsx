import { ROUTES } from '../../../constants';
import React from 'react';
import { NavLink } from 'react-router-dom';

import './subnavigation-bar.scss';

export const SubNavigationBar = () => {
  return (
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
        to={ROUTES.MY_EVENTS}
        className="subnavigation-link"
        activeClassName="active"
        data-testid="subnavigation-myEvents-button"
      >
        My Events
      </NavLink>
    </div>
  );
};

export default SubNavigationBar;
