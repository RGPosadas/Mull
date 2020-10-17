import React, { useEffect, useState } from 'react';
import { Message } from '@mull/types';
import { environment } from '../environments/environment';

import CreateEventPage from './pages/create-event/create-event';
import NavigationBar from './components/navigation-bar/navigation-bar';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ROUTES } from '../constants';

import './app.scss';

/**
 * Main component of the application
 */
export const App = () => {
  return (
    <div className="main-content">
      <Switch>
        <Route exact path="/">
          {<Redirect to={ROUTES.HOME} />}
        </Route>
        <Route exact path={ROUTES.CREATE_EVENT} component={CreateEventPage} />
      </Switch>
      <NavigationBar />
    </div>
  );
};

export default App;
