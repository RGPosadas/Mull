import React from 'react';

import './navigation-bar.scss';

import { ReactComponent as NewEventIcon } from '../../../assets/icons/nav-bar-icons/NewEventIcon.svg';
import { ReactComponent as HomeIcon } from '../../../assets/icons/nav-bar-icons/HomeIcon.svg';
import { ReactComponent as MapIcon } from '../../../assets/icons/nav-bar-icons/MapIcon.svg';
import { ReactComponent as ToolMenuIcon } from '../../../assets/icons/nav-bar-icons/ToolMenuIcon.svg';
import { ReactComponent as ProfileIcon } from '../../../assets/icons/nav-bar-icons/ProfileIcon.svg';

import logo from '../../../assets/mull-logo.png';

import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../../constants';

/**
 * Component for navigation across the different routes of the application.
 *
 * @see ROUTES
 */
export const NavigationBar = () => {
  return (
    <div className="nav-container">
      <img src={logo} className="logo nav-element" alt="Mull logo" />
      <NavLink to={ROUTES.HOME} activeClassName="active" data-testid="home-navlink">
        <HomeIcon className="nav-button mobile-button" />
      </NavLink>
      <NavLink to={ROUTES.MAP} activeClassName="active" data-testid="map-navlink">
        <MapIcon className="nav-button mobile-button" />
      </NavLink>
      <NavLink to={ROUTES.CREATE_EVENT} activeClassName="active" data-testid="new-event-navlink">
        <NewEventIcon className="nav-button mobile-middle-button" />
      </NavLink>
      <NavLink to={ROUTES.TOOLS} activeClassName="active" data-testid="tools-navlink">
        <ToolMenuIcon className="nav-button mobile-button" />
      </NavLink>
      <NavLink to={ROUTES.PROFILE} activeClassName="active" data-testid="profile-navlink">
        <ProfileIcon className="nav-button mobile-button" />
      </NavLink>
    </div>
  );
};

export default NavigationBar;
