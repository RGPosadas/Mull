import React from 'react';

import './bot-nav-bar.scss';
import NavButtons from '../nav-buttons/nav-buttons';

/**
 * Component for mobile header.
 * Note it will not appear on desktop.
 *
 * @see ROUTES
 */
export const BottomNavBar = () => {
  return (
    <div className="header-container">
      <NavButtons data-testid="bot-mobile-navlink" />
    </div>
  );
};

export default BottomNavBar;
