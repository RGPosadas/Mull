import React from 'react';
import SwipeableRoutes from 'react-swipeable-routes';

import { ToastContainer, toast } from 'react-toastify';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';

import CreateEventPage from './pages/create-event/create-event';
import { TopNavBar, BottomNavBar, EventCard, SubNavBar } from './components';
import LoginPage from './pages/login/login';
import RegisterPage from './pages/register/register';

import { ROUTES } from '../constants';

import 'react-toastify/dist/ReactToastify.min.css';
import './app.scss';
import { dummyEvent } from '../constants';
import DiscoverPage from './pages/discover/discover';
import EventPage from './pages/event-page/event-page';

/**
 * Main component of the application
 */

/* Temporary, to be removed */
const showNavigation = (location) => {
  if ([ROUTES.LOGIN, ROUTES.REGISTER].includes(location.pathname)) {
    return false;
  }
  return true;
};

export const App = () => {
  const location = useLocation();

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
        <Route
          exact
          path="/events/:id"
          children={
            <EventPage
              // TODO: Remove placeholder once file download is done
              eventImageURL={'https://i.ytimg.com/vi/-Mb3FoIlTCY/maxresdefault.jpg'}
              prevPage="Discover"
            />
          }
        />
        <Route exact path={'/test-event-page'}>
          <EventPage
            event={dummyEvent}
            eventImageURL="https://www.citywindsor.ca/residents/parksandforestry/City-Parks/PublishingImages/Assumption%20Park%20Street%20View.JPG"
            prevPage="home"
          />
        </Route>
        <Route path={ROUTES.HOME}>
          <div className="page-container discover-page">
            <SubNavBar />
            <div style={{ overflowY: 'auto', display: 'block' }}>
              <SwipeableRoutes>
                <Route path={ROUTES.DISCOVER} component={DiscoverPage} />
                <Route path={ROUTES.UPCOMING} component={() => <div>UPCOMING!</div>} />
                <Route path={ROUTES.MY_EVENTS} component={() => <div>MY_EVENTS!</div>} />
                <Route exact path={ROUTES.HOME} render={() => <Redirect to={ROUTES.DISCOVER} />} />
              </SwipeableRoutes>
            </div>
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

      {showNavigation(location) ? (
        <>
          <TopNavBar />
          <BottomNavBar />
        </>
      ) : null}
    </div>
  );
};

export default App;
