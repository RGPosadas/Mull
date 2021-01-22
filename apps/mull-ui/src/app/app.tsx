import { IAuthToken, IRefreshResponse } from '@mull/types';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { CSSProperties, useEffect, useState } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import SwipeableRoutes from 'react-swipeable-routes';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { ROUTES } from '../constants';
import { environment } from '../environments/environment';
import './app.scss';
import { BotNavBar, SubNavBar, TopNavBar } from './components';
import PrivateRoute from './components/private-route/private-route';
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
  const [loading, setLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<number>(null);
  const [accessToken, setAccessToken] = useState<string>(null);

  useEffect(() => {
    axios
      .post(`${environment.backendUrl}/api/auth/refresh`, null, { withCredentials: true })
      .then(async (res) => {
        const { ok, accessToken }: IRefreshResponse = res.data;
        if (ok) {
          try {
            const decodedToken: IAuthToken = jwtDecode(accessToken);
            setAccessToken(accessToken);
            setUserId(decodedToken.id);
          } catch (err) {
            toast('Invalid Login Token', { type: toast.TYPE.ERROR });
          }
        }
        setLoading(false);
      });
  }, []);

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

  // TODO: Replace with spinner or loading component
  if (loading) return <div>Loading...</div>;

  return (
    <UserProvider value={{ userId, setUserId, accessToken, setAccessToken }}>
      <div>
        {/* Redirects to discover tab when user is home */}
        <PrivateRoute exact path={['/', ROUTES.HOME]}>
          {<Redirect to={ROUTES.DISCOVER} />}
        </PrivateRoute>

        {/* Switch for main page */}
        <Switch>
          <Route exact path={ROUTES.LOGIN} component={LoginPage} />
          <Route exact path={ROUTES.REGISTER} component={RegisterPage} />
          <Route exact path={ROUTES.TOKEN_REDIRECT} component={TokenRedirectPage} />
          <PrivateRoute exact path={ROUTES.CREATE_EVENT} component={CreateEventPage} />
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
          <PrivateRoute path={ROUTES.HOME}>
            <SubNavBar className="top-nav-bar-shadow" />
            <div className="page-container with-sub-nav-bar">
              <SwipeableRoutes>
                <PrivateRoute path={ROUTES.DISCOVER} component={DiscoverPage} />
                <PrivateRoute path={ROUTES.UPCOMING} component={UpcomingPage} />
                <PrivateRoute path={ROUTES.MY_EVENTS} component={MyEventsPage} />
                <PrivateRoute exact path={ROUTES.HOME}>
                  <Redirect to={ROUTES.DISCOVER} />
                </PrivateRoute>
              </SwipeableRoutes>
            </div>
          </PrivateRoute>
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
