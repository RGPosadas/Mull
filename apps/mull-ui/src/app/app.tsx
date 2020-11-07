import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
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
    <div>
      <Switch>
        <Route exact path="/">
          {<Redirect to={ROUTES.HOME} />}
        </Route>
        <Route exact path={ROUTES.CREATE_EVENT} component={CreateEventPage} />
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
      <NavigationBar />
    </div>
  );
};

export default App;
