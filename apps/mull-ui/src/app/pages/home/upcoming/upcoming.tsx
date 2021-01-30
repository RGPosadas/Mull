import { ISerializedEvent } from '@mull/types';
import { useParticipantEventsQuery } from 'apps/mull-ui/src/generated/graphql';
import React, { useContext } from 'react';
import { EventCard } from '../../../components';
import UserContext from '../../../context/user.context';

export const UpcomingPage = ({ history }) => {
  const { userId } = useContext(UserContext);

  const { data } = useParticipantEventsQuery({
    variables: { userId },
  });

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
