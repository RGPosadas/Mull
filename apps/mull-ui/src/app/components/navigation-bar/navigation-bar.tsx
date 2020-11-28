import React from 'react';

import './navigation-bar.scss';

import { ReactComponent as CreateEventIcon } from '../../../assets/icons/nav-bar-icons/CreateEventIcon.svg';
import { ReactComponent as HomeIcon } from '../../../assets/icons/nav-bar-icons/HomeIcon.svg';
import { ReactComponent as MapIcon } from '../../../assets/icons/nav-bar-icons/MapIcon.svg';
import { ReactComponent as ProfileIcon } from '../../../assets/icons/nav-bar-icons/ProfileIcon.svg';
import { ReactComponent as MessagesIcon } from '../../../assets/icons/nav-bar-icons/MessagesIcon.svg';
import { ReactComponent as MachineLearningIcon } from '../../../assets/icons/nav-bar-icons/MachineLearningIcon.svg';
import logo from '../../../assets/mull-logo.png';

import { NavLink, useLocation } from 'react-router-dom';
import { ROUTES } from '../../../constants';

/**
 * Component for navigation across the different routes of the application.
 *
 * @see ROUTES
 */
export const NavigationBar = () => {
  const { pathname } = useLocation<{}>();
  return (
    <div className="nav-container">
      <img src={logo} className="logo nav-element" alt="Mull logo" />
      <NavLink
        to={ROUTES.DISCOVER}
        isActive={() => [ROUTES.DISCOVER, ROUTES.UPCOMING, ROUTES.MYEVENTS].includes(pathname)}
        activeClassName="active"
        data-testid="home-navlink"
      >
        <HomeIcon className="nav-button" />
      </NavLink>
      <NavLink to={ROUTES.MAP} activeClassName="active" data-testid="map-navlink">
        <MapIcon className="nav-button" />
      </NavLink>
      <NavLink to={ROUTES.CREATE_EVENT} activeClassName="active" data-testid="create-event-navlink">
        <CreateEventIcon className="nav-button nav-middle-button" />
      </NavLink>
      <NavLink to={ROUTES.TOOLS} activeClassName="active" data-testid="tools-navlink">
        <MachineLearningIcon className="nav-button" />
      </NavLink>
      <NavLink to={ROUTES.MESSAGES} activeClassName="active" data-testid="messages-navlink">
        <MessagesIcon className="nav-button" />
      </NavLink>
      <NavLink
        to={ROUTES.PROFILE}
        className="profile"
        activeClassName="active"
        data-testid="profile-desktop-navlink"
      >
        <ProfileIcon className="nav-button" />
      </NavLink>
    </div>
  );
};

export default NavigationBar;
