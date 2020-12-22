import React from 'react';
import { IEvent } from '@mull/types';
import { EventCard } from '../../../components';
import { gql, useQuery } from '@apollo/client';

import '../home-discover.scss';

interface MyEventData {
  coHostEvents: Partial<IEvent>[];
  hostEvents: Partial<IEvent>[];
}

export const GET_PARTICIPATING_EVENTS = gql`
  query getUsersEvents($UserId: Int!) {
    coHostEvents(userId: $UserId) {
      id
      title
      description
      startDate
      endDate
    }
    hostEvents(userId: $UserId) {
      id
      title
      description
      startDate
      endDate
    }
  }
`;

export const MyEventsPage = () => {
  const { data } = useQuery<MyEventData>(GET_PARTICIPATING_EVENTS, {
    variables: { UserId: 1 },
  });

  if (data) {
    const events: Partial<IEvent>[] = data.coHostEvents.concat(data.hostEvents);
    var eventCards = events.map((event, index) => <EventCard key={index} event={event} />);
  }
  return <div className="discover-page-tabs-container">{eventCards}</div>;
};

export default MyEventsPage;
