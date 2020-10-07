import React, { useEffect, useState } from 'react';

import './app.scss';

import { environment } from '../environments/environment';
import { Message } from '@mull/types';

import NavigationBar from './components/navigation-bar/navigation-bar';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ROUTES } from '../constants';

export const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          {<Redirect to={ROUTES.HOME} />}
        </Route>
      </Switch>
      <NavigationBar />
    </div>
  );
};

export default App;
