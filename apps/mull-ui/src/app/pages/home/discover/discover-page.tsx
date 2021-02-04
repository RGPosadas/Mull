import { ISerializedEvent } from '@mull/types';
import React from 'react';
import { useDiscoverEventsQuery } from '../../../../generated/graphql';
import { EventCard } from '../../../components';
import '../home-discover.scss';

export const DiscoverPage = ({ history }) => {
  const { data } = useDiscoverEventsQuery({});

  if (data) {
    const events = (data.discoverEvents as unknown) as Partial<ISerializedEvent>[];
    var eventCards = events.map((event, index) => (
      <EventCard
        key={`discover-${index}`}
        isJoined={false}
        event={event}
        onClick={() => history.push(`/events/${event.id}`)}
      />
    ));
  }
  return (
    <div className="discover-page-tabs-container" data-testid="discover-tab">
      {eventCards}
    </div>
  );
};

export default DiscoverPage;
