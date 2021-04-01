import React, { CSSProperties } from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as ProfileIcon } from '../../../../assets/icons/nav-bar-icons/ProfileIcon.svg';
import logo from '../../../../assets/mull-logo.png';
import { ROUTES } from '../../../../constants';
import NavButtons from '../nav-buttons/nav-buttons';
import './top-nav-bar.scss';

export interface TopNavBarProps {
  style?: CSSProperties;
}

/**
 * Component for navigation across the different routes of the application.
 *
 * @see ROUTES
 */
export const TopNavBar = ({ style }: TopNavBarProps) => {
  return (
    <div className="top-nav-container top-nav-bar-shadow" style={style}>
      <NavLink to={ROUTES.DISCOVER.url} className="top-nav-logo-container">
        <img src={logo} className="top-nav-logo" alt="Mull logo" />
      </NavLink>
      <div className="extra-buttons">
        <NavButtons />
      </div>
      <NavLink
        to={ROUTES.PROFILE.DISPLAY}
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
