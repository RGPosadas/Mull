import React from 'react';

import './header.scss';

import { ReactComponent as ProfileIcon } from '../../../assets/icons/nav-bar-icons/ProfileIcon.svg';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../../constants';

import logo from '../../../assets/mull-logo.png';

/* eslint-disable-next-line */
export interface HeaderProps {}

/**
 * Component for mobile header.
 * Note it will not appear on desktop.
 *
 * @see ROUTES
 */
export const Header = (props: HeaderProps) => {
  return (
    <div className="header">
      <img src={logo} className="top-logo nav-element" alt="Mull logo" />
      <NavLink to={ROUTES.PROFILE} activeClassName="active" data-testid="profile-mobile-navlink">
        <ProfileIcon className="profile-button-mobile" />
      </NavLink>
    </div>
  );
};

export default Header;
