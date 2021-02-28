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
    eventPicture: 'https://i.pinimg.com/originals/c9/a1/44/c9a144b70e175c0361c6e2725677e55a.jpg',
    eventDate: new Date(2021, 1, 1, 8, 20, 30, 1),
  },
  {
    eventTitle: 'Lets do this guys!',
    eventPicture: 'https://i.pinimg.com/originals/c9/a1/44/c9a144b70e175c0361c6e2725677e55a.jpg',
    eventDate: new Date(2021, 1, 5, 8, 20, 30, 1),
  },
  {
    eventTitle: 'My god please clean this...',
    eventPicture: 'https://i.pinimg.com/originals/c9/a1/44/c9a144b70e175c0361c6e2725677e55a.jpg',
    eventDate: new Date(2021, 1, 7, 8, 20, 30, 0),
  },
];

export const EventMessageList = (props: EventMessageListProps) => {
  const [searchString, setSearchString] = useState<string>('');

  return (
    <div className="event-messages-container">
      <ChatHeader eventTitle="Event Messages" />
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
        {messageChannels.map((messageChannel) => {
          if (messageChannel.eventTitle.toLowerCase().includes(searchString.toLowerCase()))
            return (
              <EventBullet
                eventTitle={messageChannel.eventTitle}
                eventPicture={messageChannel.eventPicture}
                eventDate={messageChannel.eventDate}
              />
            );
        })}
      </div>
    </div>
  );
};

export default EventMessageList;
