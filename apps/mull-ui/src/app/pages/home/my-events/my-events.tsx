import { ISerializedEvent } from '@mull/types';
import React, { useContext } from 'react';
import { useOwnedEventsQuery } from '../../../../generated/graphql';
import { EventCard } from '../../../components';
import UserContext from '../../../context/user.context';
import '../home-discover.scss';

export const MyEventsPage = ({ history }) => {
  const { userId } = useContext(UserContext);

  const { data } = useOwnedEventsQuery({
    variables: { userId },
  });

  if (data) {
    const events = (data.coHostEvents.concat(data.hostEvents) as unknown) as Partial<
      ISerializedEvent
    >[];
    var eventCards = events.map((event, index) => (
      <EventCard
        key={`myEvents-${index}`}
        isJoined={true}
        event={event}
        onClick={() => history.push(`/events/${event.id}`)}
      />
    ));
  }
  return (
    <div className="discover-page-tabs-container" data-testid="my-events-tab">
      {eventCards}
    </div>
  );
};

export default MyEventsPage;
