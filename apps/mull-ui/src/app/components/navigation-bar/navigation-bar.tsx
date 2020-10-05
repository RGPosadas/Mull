import React from 'react';

import './navigation-bar.scss';

import { ReactComponent as NewEventIcon } from '../../../assets/icons/nav/NewEventIcon.svg';
import { ReactComponent as HomeIcon } from '../../../assets/icons/nav/HomeIcon.svg';
import { ReactComponent as MapIcon } from '../../../assets/icons/nav/MapIcon.svg';
import { ReactComponent as ToolMenuIcon } from '../../../assets/icons/nav/ToolMenuIcon.svg';
import { ReactComponent as ProfileIcon } from '../../../assets/icons/nav/ProfileIcon.svg';

import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../../constants';

/* eslint-disable-next-line */
export interface NavigationBarProps {}

export const NavigationBar = (props: NavigationBarProps) => {
  const location = useLocation();

  const routeisActive = (route: string): boolean => {
    return route === location.pathname;
  };

  return (
    <div className="nav-container">
      <Link to={ROUTES.HOME}>
        <HomeIcon fill={routeisActive(ROUTES.HOME) ? '#27B09A' : '#FFFFFF'} />
      </Link>
      <Link to={ROUTES.MAP}>
        <MapIcon fill={routeisActive(ROUTES.MAP) ? '#27B09A' : '#FFFFFF'} />
      </Link>
      <Link to={ROUTES.NEW_EVENT}>
        <NewEventIcon fill={routeisActive(ROUTES.NEW_EVENT) ? '#27B09A' : '#FFFFFF'} />
      </Link>
      <Link to={ROUTES.TOOLS}>
        <ToolMenuIcon fill={routeisActive(ROUTES.TOOLS) ? '#27B09A' : '#FFFFFF'} />
      </Link>
      <Link to={ROUTES.PROFILE}>
        <ProfileIcon fill={routeisActive(ROUTES.PROFILE) ? '#27B09A' : '#FFFFFF'} />
      </Link>
    </div>
  );
};

export default NavigationBar;

// Using the svg as a component cuts it off and idk how to fix it, I'm leaving this here for now
{
  /* <Link to={ROUTES.HOME}>
        <HomeIcon
          fill={routeisActive(ROUTES.HOME) ? '#00AA00' : '#FFFFFF'}
          className="nav-button"
        />
      </Link>
      <Link to={ROUTES.MAP} className="nav-button">
        <MapIcon fill={routeisActive(ROUTES.MAP) ? '#00AA00' : '#FFFFFF'} className="nav-button" />
      </Link>
      <Link to={ROUTES.NEW_EVENT}>
        <NewEventIcon
          fill={routeisActive(ROUTES.NEW_EVENT) ? '#00AA00' : '#FFFFFF'}
          className="nav-button"
        />
      </Link>
      <Link to={ROUTES.TOOLS}>
        <ToolMenuIcon fill={routeisActive(ROUTES.TOOLS) ? '#00AA00' : '#FFFFFF'} />
      </Link>
      <Link to={ROUTES.PROFILE}>
        <ProfileIcon fill={routeisActive(ROUTES.PROFILE) ? '#00AA00' : '#FFFFFF'} />
      </Link> */
}

// Using the svg as a img makes it hard to apply color
{
  /* <Link to={ROUTES.HOME}>
        <img
          className={`nav-button ${routeisActive(ROUTES.HOME) ? 'active' : ''}`}
          src={HomeIcon}
          alt="Home Button"
        />
      </Link>
      <Link to={ROUTES.MAP}>
        <img
          className={`nav-button ${routeisActive(ROUTES.MAP) ? 'active' : ''}`}
          src={MapIcon}
          alt="Map Button"
        />
      </Link>
      <Link to={ROUTES.NEW_EVENT}>
        <img
          className={`nav-button ${routeisActive(ROUTES.NEW_EVENT) ? 'active' : ''}`}
          src={NewEventIcon}
          alt="New Event Button"
        />
      </Link>
      <Link to={ROUTES.TOOLS}>
        <img
          className={`nav-button ${routeisActive(ROUTES.TOOLS) ? 'active' : ''}`}
          src={ToolMenuIcon}
          alt="Tools Menu"
        />
      </Link>
      <Link to={ROUTES.PROFILE}>
        <img
          className={`nav-button ${routeisActive(ROUTES.PROFILE) ? 'active' : ''}`}
          src={ProfileIcon}
          alt="Profile Button"
        />
      </Link> */
}
