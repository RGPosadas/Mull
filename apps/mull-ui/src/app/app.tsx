import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Redirect, Route, Switch } from 'react-router-dom';

import CreateEventPage from './pages/create-event/create-event';
import { NavigationBar, Header } from './components';
import { ROUTES } from '../constants';

import 'react-toastify/dist/ReactToastify.min.css';
import './app.scss';
import EventPage from './pages/event-page/event-page';
import { dummyEvent } from '../constants';

/**
 * Main component of the application
 */
export const App = () => {
  return (
    <>
      <Switch>
        <Route exact path="/">
          {<Redirect to={ROUTES.HOME} />}
        </Route>
        <Route exact path={ROUTES.CREATE_EVENT} component={CreateEventPage} />
        {/* Temporary, to be removed */}
        <Route exact path={'/test-event-page'}>
          <div className="page-container">
            <EventPage event={dummyEvent} />
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
      <Header />
      <NavigationBar />
    </>
  );
};

export default App;
