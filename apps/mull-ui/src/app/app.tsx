import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Redirect, Route, Switch } from 'react-router-dom';

import CreateEventPage from './pages/create-event/create-event';
import { NavigationBar, Header } from './components';
import { ROUTES } from '../constants';

import 'react-toastify/dist/ReactToastify.min.css';
import './app.scss';
import { EventPageHeader } from './components';
import { gql, useQuery } from '@apollo/client';
import { IEvent } from '@mull/types';
import { date } from 'yup';

/**
 * Main component of the application
 */
export const App = () => {
  //Temporary, querying an event

  const dummyEvent: IEvent = {
    id: 1,
    title: 'Test title',
    description: 'Test Desc',
    endDate: new Date(),
    startDate: new Date(),
  };

  return (
    <div>
      <Switch>
        <Route exact path="/">
          {<Redirect to={ROUTES.HOME} />}
        </Route>
        <Route exact path={ROUTES.CREATE_EVENT} component={CreateEventPage} />
        <Route exact path={'/test-event-page-header'}>
          <div className="page-container">
            <EventPageHeader event={dummyEvent} />
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
    </div>
  );
};

export default App;
