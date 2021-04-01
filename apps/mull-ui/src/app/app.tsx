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
import { UserProvider } from './context/user.context';
import NotFoundPage from './pages/404/not-found-page';
import CreateEventPage from './pages/create-event/create-event';
import DirectMessagePage from './pages/direct-message/direct-message';
import EventPage from './pages/event-page/event-page';
import DiscoverPage from './pages/home/discover/discover-page';
import MyEventsPage from './pages/home/my-events/my-events';
import UpcomingPage from './pages/home/upcoming/upcoming';
import LoginPage from './pages/login/login';
import EventMessageList from './pages/messages/event-messages/event-message-list';
import AddFriendsPage from './pages/profile/add-friends/add-friends';
import EditProfilePage from './pages/profile/edit-profile/edit-profile';
import MyFriends from './pages/profile/myFriends-profile/myFriends-profile';
import OtherUserProfilePage from './pages/profile/other-user-profile/other-user-profile';
import UserProfilePage from './pages/profile/user-profile/user-profile';
import RegisterPage from './pages/register/register';
import SettingsPage from './pages/settings-page/settings-page';
import TokenRedirectPage from './pages/token-redirect/token-redirect';
import WasteRecognitionPage from './pages/waste-recognition-page/waste-recognition-page';
import MessagesRoute from './routes/messages.route';

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

  // TODO: Replace with spinner or loading component
  if (loading) return <div>Loading...</div>;

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
          <Route exact path={ROUTES.EVENT_BY_ID} children={<EventPage prevPage="Discover" />} />
          <PrivateRoute path={ROUTES.HOME}>
            <SubNavBar
              routes={[ROUTES.DISCOVER, ROUTES.UPCOMING, ROUTES.MY_EVENTS]}
              className="top-nav-bar-shadow"
            />
            <div className="page-container with-sub-nav-bar">
              <SwipeableRoutes>
                <PrivateRoute path={ROUTES.DISCOVER.url} component={DiscoverPage} />
                <PrivateRoute path={ROUTES.UPCOMING.url} component={UpcomingPage} />
                <PrivateRoute path={ROUTES.MY_EVENTS.url} component={MyEventsPage} />
                <PrivateRoute exact path={ROUTES.HOME}>
                  <Redirect to={ROUTES.DISCOVER.url} />
                </PrivateRoute>
              </SwipeableRoutes>
            </div>
          </PrivateRoute>
          <PrivateRoute path={ROUTES.MESSAGES} component={MessagesRoute} />
          <PrivateRoute path={ROUTES.CAMERA} component={WasteRecognitionPage} />
          <PrivateRoute path={ROUTES.MY_FRIENDS} component={MyFriends} />
          {/* TODO: Messages main page: Add swipeable routes for DM + Event Message page */}
          <PrivateRoute path={ROUTES.DIRECT_MESSAGES.url} component={DirectMessagePage} />
          <PrivateRoute path={ROUTES.EVENT_MESSAGE_LIST.url} component={EventMessageList} />
          <PrivateRoute path={ROUTES.PROFILE.ADDFRIENDS} component={AddFriendsPage} />
          <PrivateRoute path={ROUTES.PROFILE.EDIT} component={EditProfilePage} />
          <PrivateRoute exact path={ROUTES.PROFILE.DISPLAY} component={UserProfilePage} />
          <PrivateRoute path={ROUTES.SETTINGS} component={SettingsPage} />
          {/*TODO in TASK-83: route user profiles to /user/${user.id} */}
          <PrivateRoute path={ROUTES.OTHER_USER_PROFILE} component={OtherUserProfilePage} />
          <PrivateRoute>
            <PrivateRoute path={ROUTES.PROFILE.EDIT} component={EditProfilePage} />
            <PrivateRoute exact path={ROUTES.PROFILE.DISPLAY} component={UserProfilePage} />
          </PrivateRoute>
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
