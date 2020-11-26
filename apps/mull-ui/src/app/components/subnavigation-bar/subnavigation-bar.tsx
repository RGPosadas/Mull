import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';

import './subnavigation-bar.scss';

export const SubNavigationBar = () => {
  return (
    <div className="page-container">
      <div className="subnavigation-container">
        <NavLink to={`/discover`} className="subnavigation-link" activeClassName="active">
          Discover
        </NavLink>
        <NavLink to={`/upcoming`} className="subnavigation-link" activeClassName="active">
          Upcoming
        </NavLink>
        <NavLink to={`/myevents`} className="subnavigation-link" activeClassName="active">
          My Events
        </NavLink>
      </div>
    </div>
  );
};

export default SubNavigationBar;
