import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';

import CreateEventPage from './pages/create-event/create-event';
import { NavigationBar, Header } from './components';
import LoginPage from './pages/login/login';
import RegisterPage from './pages/register/register';

import { ROUTES } from '../constants';

import 'react-toastify/dist/ReactToastify.min.css';
import './app.scss';
import EventPage from './pages/event-page/event-page';
import { dummyEvent } from '../constants';
import { hotjar } from 'react-hotjar';

/**
 * Main component of the application
 */

/* Gather usability testing data */
hotjar.initialize(2113433, 6);

/* Temporary, to be removed */
const showNavigation = () => {
  const location = useLocation();
  if ([ROUTES.LOGIN, ROUTES.REGISTER].includes(location.pathname)) {
    return false;
  }
  return true;
};

export const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          {<Redirect to={ROUTES.HOME} />}
        </Route>
        <Route exact path={ROUTES.CREATE_EVENT} component={CreateEventPage} />
        {/* Temporary, to be removed */}
        <Route exact path={'/test-event-page'}>
          <div className="page-container">
            <EventPage event={dummyEvent} prevPage={'Review'} />
          </div>
        </Route>
        <Route exact path={ROUTES.LOGIN} component={LoginPage} />
        <Route exact path={ROUTES.REGISTER} component={RegisterPage} />
      </Switch>
      <ToastContainer
        position={toast.POSITION.TOP_RIGHT}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {showNavigation() ? (
        <>
          <Header />
          <NavigationBar />
        </>
      ) : null}
    </div>
  );
};

export default App;
