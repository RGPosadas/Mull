import { IEvent } from '@mull/types';
import React from 'react';
import { EventCard } from '../../components';
import { dummyEvent } from '../../../constants';

import './discover.scss';
import { Redirect } from 'react-router-dom';

export const DiscoverPage = ({ history }) => {
  const events: [IEvent] = Array(5).fill(dummyEvent) as [IEvent]; // will be replaced with a query call

  const eventCards = events.map((event, index) => (
    <EventCard key={index} event={event} onClick={() => history.push(`/events/${event.id}`)} />
  ));
  return <div className="discover-page-container">{eventCards}</div>;
};

export default DiscoverPage;
