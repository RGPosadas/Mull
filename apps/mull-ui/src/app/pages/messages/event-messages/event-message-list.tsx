import { ISerializedEvent } from '@mull/types';
import React, { useState } from 'react';
import { useOwnedEventsQuery, useParticipantEventsQuery } from '../../../../generated/graphql';
import { mediaUrl } from '../../../../utilities';
import { CustomTextInput } from '../../../components';
import { EventBullet } from '../../../components/event-bullet/event-bullet';

export const EventMessageList = () => {
  const { data: participatingData, loading: participatingLoading } = useParticipantEventsQuery();
  const { data: ownedData, loading: ownedLoading } = useOwnedEventsQuery();
  const [searchString, setSearchString] = useState<string>('');

  if (participatingLoading || ownedLoading) return <div className="page-container">Loading...</div>;

  const events = (participatingData.participantEvents
    .concat(ownedData.hostEvents)
    .concat(ownedData.coHostEvents) as unknown) as Partial<ISerializedEvent>[];

  var eventBullets = events
    .filter((event) => event.title.toLowerCase().includes(searchString.toLowerCase()))
    .map((event, index) => (
      <EventBullet
        eventTitle={event.title}
        eventPicture={mediaUrl(event)}
        eventDate={new Date(event.startDate)}
        key={'event-bullet-' + index}
      />
    ));

  return (
    <div className="page-container">
      <CustomTextInput
        title={null}
        fieldName="searchField"
        value={searchString}
        hasErrors={null}
        errorMessage={null}
        onChange={(e) => setSearchString(e.target.value)}
        placeholder="Search"
      />
      <div>{eventBullets}</div>
    </div>
  );
};

export default EventMessageList;
