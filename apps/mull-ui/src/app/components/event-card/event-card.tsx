import { faCheck, faShareAlt, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ISerializedEvent } from '@mull/types';
import React, { useState } from 'react';
import { dummyProfilePictures } from '../../../constants'; // TODO query the participants profile pictures
import { useJoinEventMutation, useLeaveEventMutation } from '../../../generated/graphql';
import { formatDate } from '../../../utilities';
import EventMembers from '../event-members/event-members';
import './event-card.scss';

export interface EventCardProps {
  event: Partial<ISerializedEvent>;
  style?: React.CSSProperties;
  isJoined?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const EventCard = ({ event, style = {}, onClick, isJoined = false }: EventCardProps) => {
  const { day, month, time } = formatDate(new Date(event.startDate));

  const [joined, setJoined] = useState<boolean>(isJoined);
  const eventId = parseInt(event.id);
  // TODO: Have a user object when logged in to access userId
  const userId = 1;

  const [joinEvent] = useJoinEventMutation();
  const [leaveEvent] = useLeaveEventMutation();

  // TODO: Implement distance calculator
  const distance = 15;

  return (
    <div className="event-card-container button" onClick={onClick} style={style}>
      <img
        className="event-card-image"
        // TODO: Replace placeholder
        src="https://uptownalmanac.com/sites/default/files/styles/full-post-width/public/images-on-cdn/dptrash.jpg?itok=N7RFjtgc"
        alt="Event"
      />
      <div className="event-card-datetime" data-testid="event-card-datetime">
        <div className="date-style">{`${day} ${month.toUpperCase()}`}</div>
        <div>{time.replace(/\s/g, '')}</div>
      </div>
      {/* TODO: Add/remove user to event on press */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setJoined(!joined);
          if (joined === false) {
            joinEvent({ variables: { eventId, userId } });
          } else {
            leaveEvent({ variables: { eventId, userId } });
          }
        }}
        className={`event-card-join ${joined ? 'joined' : ''}`}
        id={'event-card-join'}
      >
        <FontAwesomeIcon icon={joined ? faCheck : faSignInAlt} />
      </button>
      <div className="event-card-description" onClick={onClick}>
        <div className="event-card-text">
          <div className="event-card-title">{event.title}</div>

          <div className="event-card-location">{`${distance}km • ${event.location.title}`}</div>
        </div>
        <EventMembers profilePictures={dummyProfilePictures} />
        {/* TODO: Implement share */}
        <button
          className="event-card-share"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <FontAwesomeIcon icon={faShareAlt} />
        </button>
      </div>
    </div>
  );
};

export default EventCard;
