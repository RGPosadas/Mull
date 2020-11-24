import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';

import './subnavigation-bar.scss';

export const SubNavigationBar = () => {
  let { path } = useRouteMatch<{}>();
  return (
    <div className="subnavigation-container">
      {/* Manually override the isActive functionality to prevent /home from always being active */}
      <NavLink
        to={`/home`}
        isActive={() => ['/home'].includes(path)}
        className="subnavigation-link"
      >
        Discover
      </NavLink>
      <NavLink to={`/home/upcoming`} className="subnavigation-link" activeClassName="active">
        Upcoming
      </NavLink>
      <NavLink to={`/home/myevents`} className="subnavigation-link" activeClassName="active">
        My Events
      </NavLink>
    </div>
  );
};

export default SubNavigationBar;
