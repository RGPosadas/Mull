import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Redirect, Route, Switch } from 'react-router-dom';

import CreateEventPage from './pages/create-event/create-event';
import { NavigationBar, Header } from './components';
import { ROUTES } from '../constants';

import 'react-toastify/dist/ReactToastify.min.css';
import './app.scss';
import { EventPageHeader } from './components';
import { EventRestriction, IEvent } from '@mull/types';
import EventPageInfo from './components/event-page-info/event-page-info';

/**
 * Main component of the application
 */
export const App = () => {
  //Temporary, querying an event

  const dummyEvent: IEvent = {
    id: 1,
    title: 'Test title',
    description:
      'Lorem ipsum dolor sit amet, regione invidunt democritum vim in, movet antiopam gubergren ne per. Est nibh magna scribentur ea, vel te munere deseruisse disputationi, eros meis ludus ne sea. Odio prompta legendos in sea, ut mei scripta labores theophrastus, id molestie probatus periculis mea. Noluisse invenire splendide sed ne, at erat quando laudem nec, possim apeirian vix at. At eam animal efficiendi interpretaris, eirmod offendit adversarium per et, summo qualisque efficiendi in has. Vel detraxit accusata ea.',
    endDate: new Date(),
    startDate: new Date(),
    location: {
      id: 1,
      point: '1260 Remembrance Road Montreal, Qc',
    },
    restriction: EventRestriction.NONE,
    host: {
      name: 'Test user',
    },
  };

  return (
    <>
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
        <Route exact path={'/test-event-page-info'}>
          <div className="page-container">
            <EventPageInfo event={dummyEvent} />
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
