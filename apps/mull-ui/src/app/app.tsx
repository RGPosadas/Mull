import React, { CSSProperties, useState } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import SwipeableRoutes from 'react-swipeable-routes';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { ROUTES } from '../constants';
import './app.scss';
import { BotNavBar, SubNavBar, TopNavBar } from './components';
import { UserProvider } from './context/user.context';
import CreateEventPage from './pages/create-event/create-event';
import EventPage from './pages/event-page/event-page';
import DiscoverPage from './pages/home/discover/discover-page';
import MyEventsPage from './pages/home/my-events/my-events';
import UpcomingPage from './pages/home/upcoming/upcoming';
import LoginPage from './pages/login/login';
import RegisterPage from './pages/register/register';
import TokenRedirectPage from './pages/token-redirect/token-redirect';

/**
 * Main component of the application
 */
export const App = () => {
  const location = useLocation();

  const [userId, setUserId] = useState<number>(null);
  const [accessToken, setAccessToken] = useState<string>(null);

  const showNavigation = () => {
    if ([ROUTES.LOGIN, ROUTES.REGISTER].includes(location.pathname)) {
      return false;
    }
    return true;
  };

  const getTopBarStyle = (): CSSProperties => {
    if (location.pathname.includes(ROUTES.HOME)) {
      return { boxShadow: 'none' };
    }
    return {};
  };

  return (
    <UserProvider value={{ userId, setUserId, accessToken, setAccessToken }}>
      <div>
        {/* Redirects to discover tab when user is home */}
        <Route exact path={['/', ROUTES.HOME]}>
          {<Redirect to={ROUTES.DISCOVER} />}
        </Route>

        {/* Switch for main page */}
        <Switch>
          <Route exact path={ROUTES.LOGIN} component={LoginPage} />
          <Route exact path={ROUTES.REGISTER} component={RegisterPage} />
          <Route exact path={ROUTES.TOKEN_REDIRECT} component={TokenRedirectPage} />

          {/* If accessToken isn't set, redirect user to login page. Disabled for now as it will break e2e tests, will be implemented properly in US-7.6 */}
          {/* {!accessToken ? <Redirect to={ROUTES.LOGIN} /> : null} */}

          <Route exact path={ROUTES.CREATE_EVENT} component={CreateEventPage} />
          <Route
            exact
            path={ROUTES.EVENT_BY_ID}
            children={
              <EventPage
                // TODO: Remove placeholder once file download is done
                eventImageURL={'https://i.ytimg.com/vi/-Mb3FoIlTCY/maxresdefault.jpg'}
                prevPage="Discover"
              />
            }
          />
          <Route path={ROUTES.HOME}>
            <SubNavBar className="top-nav-bar-shadow" />
            <div className="page-container with-sub-nav-bar">
              <SwipeableRoutes>
                <Route path={ROUTES.DISCOVER} component={DiscoverPage} />
                <Route path={ROUTES.UPCOMING} component={UpcomingPage} />
                <Route path={ROUTES.MY_EVENTS} component={MyEventsPage} />
                <Route exact path={ROUTES.HOME} render={() => <Redirect to={ROUTES.DISCOVER} />} />
              </SwipeableRoutes>
            </div>
          </Route>
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
            <TopNavBar style={getTopBarStyle()} />
            <BotNavBar />
          </>
        ) : null}
      </div>
    </UserProvider>
  );
};

export default App;
