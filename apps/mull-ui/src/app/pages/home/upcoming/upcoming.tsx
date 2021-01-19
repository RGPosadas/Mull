import { ISerializedEvent } from '@mull/types';
import React from 'react';
import { useParticipantEventsQuery } from '../../../../generated/graphql';
import { EventCard } from '../../../components';
import '../home-discover.scss';

export const UpcomingPage = ({ history }) => {
  const { data } = useParticipantEventsQuery({
    fetchPolicy: 'network-only',
    // TODO: dynamically pass current UserId
    variables: { userId: 1 },
  });

  if (data) {
    const events = (data.participantEvents as unknown) as Partial<ISerializedEvent>[];
    var eventCards = events.map((event, index) => (
      <EventCard
        key={`upcoming-${index}`}
        event={event}
        onClick={() => history.push(`/events/${event.id}`)}
      />
    ));
  }
  return <div className="discover-page-tabs-container">{eventCards}</div>;
};

export default UpcomingPage;
