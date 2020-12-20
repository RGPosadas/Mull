import React from 'react';
import { IEvent } from '@mull/types';
import { EventCard } from '../../components';
import { gql, useQuery } from '@apollo/client';

import './upcoming.scss';

export const UpcomingPage = () => {
  const GET_PARTICIPATING_EVENTS = gql`
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
  const { loading, data } = useQuery(GET_PARTICIPATING_EVENTS, {
    variables: { participatingEventsUserId: 3 },
  });

  if (!loading) {
    const events: [Partial<IEvent>] = data.participatingEvents as [Partial<IEvent>];
    var eventCards = events.map((event, index) => <EventCard key={index} event={event} />);
  }
  return <div className="discover-page-tabs-container">{eventCards}</div>;
};

export default UpcomingPage;
