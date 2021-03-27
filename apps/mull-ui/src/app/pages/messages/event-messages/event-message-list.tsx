import { ISerializedEvent } from '@mull/types';
import React, { useState } from 'react';
import { ROUTES } from '../../../../constants';
import { useOwnedEventsQuery, useParticipantEventsQuery } from '../../../../generated/graphql';
import { getMediaUrl } from '../../../../utilities';
import { CustomTextInput } from '../../../components';
import { EventBullet } from '../../../components/event-bullet/event-bullet';
import './event-message-list.scss';

export const EventMessageList = ({ history }) => {
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
        eventPicture={getMediaUrl(event.image.id)}
        eventDate={new Date(event.startDate)}
        key={'event-bullet-' + index}
        onClick={() => history.push(`${ROUTES.ANNOUNCEMENTS.url.replace(':id', `${event.id}`)}`)}
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
      <div className="event-bullets">{eventBullets}</div>
    </div>
  );
};

export default EventMessageList;
