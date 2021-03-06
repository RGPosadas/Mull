import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ReactComponent as CreateEventIcon } from '../../../../assets/icons/nav-bar-icons/CreateEventIcon.svg';
import { ReactComponent as HomeIcon } from '../../../../assets/icons/nav-bar-icons/HomeIcon.svg';
import { ReactComponent as MachineLearningIcon } from '../../../../assets/icons/nav-bar-icons/MachineLearningIcon.svg';
import { ReactComponent as MessagesIcon } from '../../../../assets/icons/nav-bar-icons/MessagesIcon.svg';
import { ReactComponent as ProfileIcon } from '../../../../assets/icons/nav-bar-icons/ProfileIcon.svg';
import { ROUTES } from '../../../../constants';
import './nav-buttons.scss';

export const NavButtons = () => {
  const { pathname } = useLocation();
  return (
    <div className="nav-buttons-container">
      <NavLink
        to={ROUTES.HOME}
        aria-label="Home"
        className="nav-button-container"
        activeClassName="active"
        data-testid="home-navlink"
        isActive={() => pathname.includes('/events/') || pathname.includes(ROUTES.HOME)}
      >
        <HomeIcon className="nav-button" />
      </NavLink>
      <NavLink
        to={ROUTES.CAMERA}
        aria-label="Camera"
        className="nav-button-container"
        activeClassName="active"
        data-testid="camera-navlink"
      >
        <MachineLearningIcon className="nav-button" />
      </NavLink>
      <NavLink
        to={ROUTES.CREATE_EVENT}
        aria-label="Create Event"
        className="nav-button-container"
        activeClassName="active"
        data-testid="create-event-navlink"
      >
        <CreateEventIcon className="nav-middle-button" />
      </NavLink>
      <NavLink
        to={ROUTES.MESSAGES}
        aria-label="Messages"
        className="nav-button-container"
        activeClassName="active"
        data-testid="messages-navlink"
      >
        <MessagesIcon className="nav-button" />
      </NavLink>
      <NavLink
        to={ROUTES.PROFILE.DISPLAY}
        aria-label="Profile"
        className="nav-button-container"
        activeClassName="active"
        data-testid="profile-navlink"
      >
        <ProfileIcon className="nav-button" />
      </NavLink>
    </div>
  );
};

export default NavButtons;
