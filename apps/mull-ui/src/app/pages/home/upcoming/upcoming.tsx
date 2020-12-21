import React from 'react';
import { IEvent } from '@mull/types';
import { EventCard } from '../../../components';
import { gql, useQuery } from '@apollo/client';

import '../home-discover.scss';

interface UpcomingEventData {
  participatingEvents: IEvent[];
}

export const GET_PARTICIPATING_EVENTS = gql`
  query getParticipatingEvents($participatingEventsUserId: Int!) {
    participatingEvents(userId: $participatingEventsUserId) {
      id
      endDate
      description
      startDate
      title
    }
  }
`;

export const UpcomingPage = () => {
  const { data } = useQuery<UpcomingEventData>(GET_PARTICIPATING_EVENTS, {
    variables: { participatingEventsUserId: 1 },
  });

  if (data) {
    const events: [Partial<IEvent>] = data.participatingEvents as [Partial<IEvent>];
    var eventCards = events.map((event, index) => <EventCard key={index} event={event} />);
  }
  return <div className="discover-page-tabs-container">{eventCards}</div>;
};

export default UpcomingPage;
