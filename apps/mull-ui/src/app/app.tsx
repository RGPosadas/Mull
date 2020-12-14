import React from 'react';
import SwipeableRoutes from 'react-swipeable-routes';

import { ToastContainer, toast } from 'react-toastify';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';

import CreateEventPage from './pages/create-event/create-event';
import { NavigationBar, Header, SubNavigationBar, EventCard } from './components';
import LoginPage from './pages/login/login';
import RegisterPage from './pages/register/register';

import { ROUTES } from '../constants';

import 'react-toastify/dist/ReactToastify.min.css';
import './app.scss';
import { dummyEvent } from '../constants';
import DiscoverPage from './pages/discover/discover';

/**
 * Main component of the application
 */

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
        <Route exact path={['/', ROUTES.HOME]}>
          {<Redirect to={ROUTES.DISCOVER} />}
        </Route>
        <Route exact path={ROUTES.CREATE_EVENT} component={CreateEventPage} />
        {/* Temporary, to be removed */}
        <Route exact path={'/test-event-card'}>
          <div className="page-container">
            <EventCard event={dummyEvent} style={{ marginBottom: '1rem' }} />
            <EventCard event={dummyEvent} style={{ marginBottom: '1rem' }} />
          </div>
        </Route>
        <Route path={ROUTES.HOME}>
          <div className="page-container">
            <SubNavigationBar />
            <SwipeableRoutes>
              <Route path={ROUTES.DISCOVER} component={DiscoverPage} />
              <Route path={ROUTES.UPCOMING} component={() => <div>UPCOMING!</div>} />
              <Route path={ROUTES.MY_EVENTS} component={() => <div>MY_EVENTS!</div>} />
              <Route exact path={ROUTES.HOME} render={() => <Redirect to={ROUTES.DISCOVER} />} />
            </SwipeableRoutes>
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
