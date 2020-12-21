import React from 'react';

import './bot-nav-bar.scss';
import NavButtons from '../nav-buttons/nav-buttons';

export interface HeaderProps {}

/**
 * Component for mobile header.
 * Note it will not appear on desktop.
 *
 * @see ROUTES
 */
export const BottomNavBar = ({}: HeaderProps) => {
  return (
    <div className="header-container">
      <NavButtons />
    </div>
  );
};

export default BottomNavBar;
