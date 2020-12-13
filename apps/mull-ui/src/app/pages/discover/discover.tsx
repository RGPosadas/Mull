import { IEvent } from '@mull/types';
import React from 'react';
import { EventCard } from '../../components';
import { dummyEvent } from 'apps/mull-ui/src/constants';

import './discover.scss';

export const DiscoverPage = () => {
  const events: [IEvent] = Array(5).fill(dummyEvent) as [IEvent]; // will be replaced with a query call
  const eventCards = events.map((event, index) => <EventCard key={index} event={event} />);
  return <div className="discover-page-container">{eventCards}</div>;
};

export default DiscoverPage;
