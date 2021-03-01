import React, { useState } from 'react';
import { ChatHeader, CustomTextInput } from '../../../components';
import EventBullet from '../../../components/event-bullet/event-bullet';
import './event-message-list.scss';

/* eslint-disable-next-line */
export interface EventMessageListProps {}

/*TODO: Remove this and replace with query of event message channels*/

const messageChannels = [
  {
    eventTitle: 'Clean up of Rogers Park',
    eventPicture:
      'https://www.visitsavannah.com/sites/default/files/styles/large_square/public/chippewa_square.jpg?itok=FRu5WGIl',
    eventDate: new Date(2021, 1, 1, 8, 20, 30, 1),
  },
  {
    eventTitle: 'Lets do this guys!',
    eventPicture:
      'https://www.visitsavannah.com/sites/default/files/styles/large_square/public/chippewa_square.jpg?itok=FRu5WGIl',
    eventDate: new Date(2021, 1, 5, 8, 20, 30, 1),
  },
  {
    eventTitle: 'My god please clean this...',
    eventPicture:
      'https://www.visitsavannah.com/sites/default/files/styles/large_square/public/chippewa_square.jpg?itok=FRu5WGIl',
    eventDate: new Date(2021, 1, 7, 8, 20, 30, 0),
  },
];

export const EventMessageList = (props: EventMessageListProps) => {
  const [searchString, setSearchString] = useState<string>('');

  return (
    <div className="event-messages-container">
      <ChatHeader
        eventTitle="Event Messages"
        style={{ zIndex: 9 }}
        className="top-nav-bar-shadow"
      />
      <div className="page-container">
        <CustomTextInput
          title=""
          fieldName="searchField"
          value={searchString}
          hasErrors={null}
          errorMessage={null}
          onChange={(e) => setSearchString(e.target.value)}
          placeholder="Search"
        />
        {messageChannels.map((messageChannel, idx) => {
          if (messageChannel.eventTitle.toLowerCase().includes(searchString.toLowerCase()))
            return (
              <EventBullet
                eventTitle={messageChannel.eventTitle}
                eventPicture={messageChannel.eventPicture}
                eventDate={messageChannel.eventDate}
                key={idx}
              />
            );
        })}
      </div>
    </div>
  );
};

export default EventMessageList;
