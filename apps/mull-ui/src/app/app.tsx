import React, { useEffect, useState } from 'react';
import { Message } from '@mull/types';
import { environment } from '../environments/environment';

<<<<<<< HEAD
import CreateEventPage from './pages/create-event/create-event';
=======
import CreateEventPage from './pages/create-event/create-event.component';
>>>>>>> 1f180a8... Add Create Event page #27

import NavigationBar from './components/navigation-bar/navigation-bar';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ROUTES } from '../constants';
import './app.scss';

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
<<<<<<< HEAD
          <Route exact path={ROUTES.CREATE_EVENT} component={CreateEventPage} />
=======
          <Route exact path="/create-event" component={CreateEventPage} />
>>>>>>> 1f180a8... Add Create Event page #27
        </Switch>
      </div>
      <NavigationBar />
    </div>
  );
};

export default App;
