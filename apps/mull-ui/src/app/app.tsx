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
import { setAccessToken } from './access-token';
import './app.scss';
import { BotNavBar, PrivateRoute, SubNavBar, TopNavBar } from './components';
import Spinner from './components/spinner/spinner';
import { UserProvider } from './context/user.context';
import NotFoundPage from './pages/404/not-found-page';
import CreateEventPage from './pages/create-event/create-event';
import EventPage from './pages/event-page/event-page';
import DiscoverPage from './pages/home/discover/discover-page';
import MyEventsPage from './pages/home/my-events/my-events';
import UpcomingPage from './pages/home/upcoming/upcoming';
import LoginPage from './pages/login/login';
import AddFriendsPage from './pages/profile/add-friends/add-friends';
import EditProfilePage from './pages/profile/edit-profile/edit-profile';
import MyFriends from './pages/profile/myFriends-profile/myFriends-profile';
import UserPortfolio from './pages/profile/user-portfolio/user-portfolio';
import UserProfilePage from './pages/profile/user-profile/user-profile';
import RegisterPage from './pages/register/register';
import SettingsPage from './pages/settings-page/settings-page';
import TokenRedirectPage from './pages/token-redirect/token-redirect';
import WasteRecognitionPage from './pages/waste-recognition-page/waste-recognition-page';
import MessagesRoute from './routes/messages.route';
import ProfilesRoute from './routes/profiles.route';

/**
 * Main component of the application
 */
export const App = () => {
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<number>(null);

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

  const getTopBarStyle = (): CSSProperties => {
    if (location.pathname.includes(ROUTES.HOME) || location.pathname.includes(ROUTES.MESSAGES)) {
      return { boxShadow: 'none' };
    }
    return {};
  };

  if (loading) return <Spinner />;

  return (
    <UserProvider value={{ userId, setUserId }}>
      <div>
        {/* Redirects to discover tab when user is home */}
        <PrivateRoute exact path={['/', ROUTES.HOME]}>
          {<Redirect to={ROUTES.DISCOVER.url} />}
        </PrivateRoute>
        {/* Switch for main page */}
        <Switch>
          <Route
            exact
            path={ROUTES.LOGIN}
            render={(props) => (userId ? <Redirect to={ROUTES.HOME} /> : <LoginPage {...props} />)}
          />
          <Route
            exact
            path={ROUTES.REGISTER}
            render={(props) =>
              userId ? <Redirect to={ROUTES.HOME} /> : <RegisterPage {...props} />
            }
          />
          <Route exact path={ROUTES.TOKEN_REDIRECT} component={TokenRedirectPage} />
          <PrivateRoute exact path={ROUTES.CREATE_EVENT} component={CreateEventPage} />
          <Route exact path={ROUTES.EVENT_BY_ID} children={<EventPage />} />
          <PrivateRoute path={[ROUTES.DISCOVER.url, ROUTES.UPCOMING.url, ROUTES.MY_EVENTS.url]}>
            <SubNavBar
              routes={[ROUTES.DISCOVER, ROUTES.UPCOMING, ROUTES.MY_EVENTS]}
              className="top-nav-bar-shadow"
            />
            <div className="page-container with-sub-nav-bar">
              <SwipeableRoutes>
                <PrivateRoute path={ROUTES.DISCOVER.url} component={DiscoverPage} />
                <PrivateRoute path={ROUTES.UPCOMING.url} component={UpcomingPage} />
                <PrivateRoute path={ROUTES.MY_EVENTS.url} component={MyEventsPage} />
              </SwipeableRoutes>
            </div>
          </PrivateRoute>
          <PrivateRoute path={ROUTES.MESSAGES} component={MessagesRoute} />
          <PrivateRoute path={ROUTES.CAMERA} component={WasteRecognitionPage} />
          <PrivateRoute path={ROUTES.MY_FRIENDS} component={MyFriends} />
          <PrivateRoute path={ROUTES.PROFILE.ADDFRIENDS} component={AddFriendsPage} />
          <PrivateRoute path={ROUTES.PROFILE.EDIT} component={EditProfilePage} />
          <PrivateRoute exact path={ROUTES.PROFILE.DISPLAY} component={UserProfilePage} />
          <PrivateRoute path={ROUTES.SETTINGS} component={SettingsPage} />
          <PrivateRoute exact path={ROUTES.USER_BY_ID} component={ProfilesRoute} />
          <PrivateRoute path={ROUTES.PROFILE.EDIT} component={EditProfilePage} />
          <PrivateRoute path={ROUTES.PROFILE.PORTFOLIO} component={UserPortfolio} />
          <PrivateRoute exact path={ROUTES.PROFILE.DISPLAY} component={UserProfilePage} />
          <PrivateRoute component={NotFoundPage} />
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

        {userId ? (
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
