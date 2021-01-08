import { ISerializedEvent } from '@mull/types';
import React from 'react';
import { useGetUsersEventsQuery } from '../../../../generated/graphql';
import { EventCard } from '../../../components';
import '../home-discover.scss';

export const MyEventsPage = ({ history }) => {
  const { data } = useGetUsersEventsQuery({
    fetchPolicy: 'network-only',
    // TODO: dynamically pass current UserId
    variables: { UserId: 1 },
  });

  if (data) {
    const events: Partial<ISerializedEvent>[] = (data.coHostEvents.concat(
      data.hostEvents
    ) as unknown) as Partial<ISerializedEvent>[];
    var eventCards = events.map((event, index) => (
      <EventCard key={index} event={event} onClick={() => history.push(`/events/${event.id}`)} />
    ));
  }
  return <div className="discover-page-tabs-container">{eventCards}</div>;
};

export default MyEventsPage;
