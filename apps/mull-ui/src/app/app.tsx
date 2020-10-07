import React from 'react';

import './app.scss';

import NavigationBar from './components/navigation-bar/navigation-bar';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ROUTES } from '../constants';

/**
 * Main component of the application
 */
export const App = () => {
  return (
    <div className="container">
      <div className="main-content">
        <Switch>
          <Route exact path="/">
            {<Redirect to={ROUTES.HOME} />}
          </Route>
        </Switch>
      </div>

      <NavigationBar />
    </div>
  );
};

export default App;
