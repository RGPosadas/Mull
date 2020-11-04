import React from 'react';

import './app.scss';

import NavigationBar from './components/navigation-bar/navigation-bar';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ROUTES } from '../constants';
import { GET_LOGIN } from './operations/queries/login';
import { useQuery } from '@apollo/client';

/**
 * Main component of the application
 */
export const App = () => {
  const loginResults = useQuery(GET_LOGIN);

  console.log(loginResults.data);
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
