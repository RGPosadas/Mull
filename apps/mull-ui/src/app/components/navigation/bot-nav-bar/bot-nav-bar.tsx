import React from 'react';
import NavButtons from '../nav-buttons/nav-buttons';
import './bot-nav-bar.scss';

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
