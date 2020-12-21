import React from 'react';
import { NavLink } from 'react-router-dom';

import { ReactComponent as CreateEventIcon } from '../../../../assets/icons/nav-bar-icons/CreateEventIcon.svg';
import { ReactComponent as HomeIcon } from '../../../../assets/icons/nav-bar-icons/HomeIcon.svg';
import { ReactComponent as MapIcon } from '../../../../assets/icons/nav-bar-icons/MapIcon.svg';
import { ReactComponent as MessagesIcon } from '../../../../assets/icons/nav-bar-icons/MessagesIcon.svg';
import { ReactComponent as MachineLearningIcon } from '../../../../assets/icons/nav-bar-icons/MachineLearningIcon.svg';
import { ROUTES } from 'apps/mull-ui/src/constants';

import './nav-buttons.scss';

/* eslint-disable-next-line */
export interface NavButtonsProps {}

export const NavButtons = ({}: NavButtonsProps) => {
  return (
    <div className="nav-buttons-container">
      <NavLink to={ROUTES.HOME} activeClassName="active" data-testid="home-navlink">
        <HomeIcon className="nav-button" />
      </NavLink>
      <NavLink to={ROUTES.MAP} activeClassName="active" data-testid="map-navlink">
        <MapIcon className="nav-button" />
      </NavLink>
      <NavLink to={ROUTES.CREATE_EVENT} activeClassName="active" data-testid="create-event-navlink">
        <CreateEventIcon className="nav-middle-button" />
      </NavLink>
      <NavLink to={ROUTES.TOOLS} activeClassName="active" data-testid="tools-navlink">
        <MachineLearningIcon className="nav-button" />
      </NavLink>
      <NavLink to={ROUTES.MESSAGES} activeClassName="active" data-testid="messages-navlink">
        <MessagesIcon className="nav-button" />
      </NavLink>
    </div>
  );
};

export default NavButtons;
