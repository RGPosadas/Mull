import React from 'react';

import './top-nav-bar.scss';

import { ReactComponent as ProfileIcon } from '../../../../assets/icons/nav-bar-icons/ProfileIcon.svg';
import logo from '../../../../assets/mull-logo.png';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../../../constants';
import NavButtons from '../nav-buttons/nav-buttons';
import SubNavBar from '../sub-nav-bar/sub-nav-bar';

/**
 * Component for navigation across the different routes of the application.
 *
 * @see ROUTES
 */
export const TopNavBar = () => {
  return (
    <div className="top-nav-container">
      <img src={logo} className="logo nav-element" alt="Mull logo" />
      <div className="extra-buttons">
        <NavButtons />
      </div>
      <NavLink
        to={ROUTES.PROFILE}
        className="profile-button"
        activeClassName="active"
        data-testid="profile-desktop-navlink"
      >
        <ProfileIcon className="nav-button" />
      </NavLink>
    </div>
  );
};

export default TopNavBar;
