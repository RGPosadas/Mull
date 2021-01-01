import React from 'react';

import './bot-nav-bar.scss';
import NavButtons from '../nav-buttons/nav-buttons';

/**
 * Component for mobile header.
 * Note it will not appear on desktop.
 *
 * @see ROUTES
 */
export const BotNavBar = () => {
  return (
    <div className="bot-nav-container">
      <NavButtons />
    </div>
  );
};

export default BotNavBar;
