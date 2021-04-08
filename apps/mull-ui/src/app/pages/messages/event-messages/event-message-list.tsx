import { ISerializedEvent } from '@mull/types';
import React, { useState } from 'react';
import { useOwnedEventsQuery, useParticipantEventsQuery } from '../../../../generated/graphql';
import { getMediaUrl } from '../../../../utilities';
import { CustomTextInput, Spinner } from '../../../components';
import { EventBullet } from '../../../components/event-bullet/event-bullet';
import './event-message-list.scss';

export const EventMessageList = ({ history }) => {
  const { data: participatingData, loading: participatingLoading } = useParticipantEventsQuery();
  const { data: ownedData, loading: ownedLoading } = useOwnedEventsQuery();
  const [searchString, setSearchString] = useState<string>('');

  if (participatingLoading || ownedLoading) return <Spinner />;

  const events = (participatingData.participantEvents
    .concat(ownedData.hostEvents)
    .concat(ownedData.coHostEvents) as unknown) as Partial<ISerializedEvent>[];

  var eventBullets = events
    .filter((event) => event.title.toLowerCase().includes(searchString.toLowerCase()))
    .map((event, index) => (
      <EventBullet
        eventTitle={event.title}
        eventPicture={getMediaUrl(event.image.id)}
        eventDate={new Date(event.startDate)}
        key={'event-bullet-' + index}
        onClick={() => history.push(`/messages/event/${event.id}/announcements`)}
      />
    ));

  return (
    <div className="event-message-list">
      <CustomTextInput
        title={null}
        fieldName="searchField"
        value={searchString}
        hasErrors={null}
        errorMessage={null}
        onChange={(e) => setSearchString(e.target.value)}
        placeholder="Search"
      />
      {eventBullets.length ? (
        <div className="event-bullets">{eventBullets}</div>
      ) : (
        <p className="event-messages-not-found empty-array-msg">No results found</p>
      )}
    </div>
  );
};

export default EventMessageList;
