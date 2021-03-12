import { ISerializedEvent } from '@mull/types';
import React from 'react';
import { useParticipantEventsQuery } from '../../../../generated/graphql';
import { EventCard } from '../../../components';

export const UpcomingPage = ({ history }) => {
  const { data } = useParticipantEventsQuery({});

  if (data) {
    const events = (data.participantEvents as unknown) as Partial<ISerializedEvent>[];
    const sortedEvents = events
      .slice()
      .sort(
        (event1, event2) =>
          new Date(event1.startDate).valueOf() - new Date(event2.startDate).valueOf()
      );

    var eventCards = sortedEvents.map((event, index) => (
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
