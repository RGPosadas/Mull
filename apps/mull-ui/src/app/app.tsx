import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Redirect, Route, Switch } from 'react-router-dom';

import CreateEventPage from './pages/create-event/create-event';
import NavigationBar from './components/navigation-bar/navigation-bar';
import { ROUTES } from '../constants';

import 'react-toastify/dist/ReactToastify.min.css';
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
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <NavigationBar />
    </div>
  );
};

export default App;
