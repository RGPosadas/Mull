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

export interface NavigationBarProps {}

export const NavigationBar = ({}: NavigationBarProps) => {
  return (
    <div className="nav-container">
      <img src={logo} className="logo nav-element" />
      <NavLink to={ROUTES.HOME} activeClassName="active">
        <HomeIcon className="nav-button nav-element" />
      </NavLink>
      <NavLink to={ROUTES.MAP} activeClassName="active">
        <MapIcon className="nav-button nav-element" />
      </NavLink>
      <NavLink to={ROUTES.NEW_EVENT} activeClassName="active">
        <NewEventIcon className="nav-button nav-element" />
      </NavLink>
      <NavLink to={ROUTES.TOOLS} activeClassName="active">
        <ToolMenuIcon className="nav-button nav-element" />
      </NavLink>
      <NavLink to={ROUTES.PROFILE} activeClassName="active">
        <ProfileIcon className="nav-button nav-element" />
      </NavLink>
    </div>
  );
};

export default NavigationBar;
