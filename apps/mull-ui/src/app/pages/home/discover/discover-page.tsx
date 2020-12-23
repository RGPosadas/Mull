import React from 'react';
import { IEvent } from '@mull/types';
import { EventCard } from '../../../components';
import { gql, useQuery } from '@apollo/client';

import '../home-discover.scss';

interface DiscoverData {
  discoverEvents: Partial<IEvent>[];
}

export const GET_DISCOVER_EVENTS = gql`
  query DiscoverEvents($discoverEventsUserId: Int!) {
    discoverEvents(userId: $discoverEventsUserId) {
      id
      title
      description
      startDate
      endDate
    }
  }
`;

export const DiscoverPage = ({ history }) => {
  const { data } = useQuery<DiscoverData>(GET_DISCOVER_EVENTS, {
    fetchPolicy: 'network-only',
    // TODO: dynamically pass current UserId
    variables: { discoverEventsUserId: 1 },
  });

  if (data) {
    const events: Partial<IEvent>[] = data.discoverEvents;
    var eventCards = events.map((event, index) => <EventCard key={index} event={event} />);
  }
  return <div className="discover-page-tabs-container">{eventCards}</div>;
};

export default DiscoverPage;
