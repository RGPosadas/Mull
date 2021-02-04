import { ISerializedEvent } from '@mull/types';
import React from 'react';
import { useParticipantEventsQuery } from '../../../../generated/graphql';
import { EventCard } from '../../../components';

export const UpcomingPage = ({ history }) => {
  const { data } = useParticipantEventsQuery({});

  if (data) {
    const events = (data.participantEvents as unknown) as Partial<ISerializedEvent>[];
    var eventCards = events.map((event, index) => (
      <EventCard
        key={`upcoming-${index}`}
        isJoined={true}
        event={event}
        onClick={() => history.push(`/events/${event.id}`)}
      />
    ));
  }
  return (
    <div className="discover-page-tabs-container" data-testid="upcoming-tab">
      {eventCards}
    </div>
  );
};

export default UpcomingPage;
