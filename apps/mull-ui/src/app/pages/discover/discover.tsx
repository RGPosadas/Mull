import { IEvent } from '@mull/types';
import React from 'react';
import { EventCard } from '../../components';
import { dummyEvent } from '../../../constants';

import './discover.scss';
import { Link } from 'react-router-dom';

export const DiscoverPage = () => {
  const events: [IEvent] = Array(5).fill(dummyEvent) as [IEvent]; // will be replaced with a query call
  const eventCards = events.map((event, index) => (
    <Link to={`/events/${event.id}`} key={index}>
      <EventCard key={index} event={event} />
    </Link>
  ));
  return <div className="discover-page-container">{eventCards}</div>;
};

export default DiscoverPage;
