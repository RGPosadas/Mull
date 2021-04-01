import { faCheck, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ISerializedEvent } from '@mull/types';
import React, { useState } from 'react';
import { useJoinEventMutation, useLeaveEventMutation } from '../../../generated/graphql';
import { dummyProfilePictures } from '../../../mockdata'; // TODO query the participants profile pictures
import { formatDate, getMediaUrl } from '../../../utilities';
import EventMembers from '../event-members/event-members';
import './event-card.scss';

export interface EventCardProps {
  event: Partial<ISerializedEvent>;
  style?: React.CSSProperties;
  isJoined?: boolean;
  isEventOwner?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const EventCard = ({
  event,
  style = {},
  onClick,
  isJoined = false,
  isEventOwner,
}: EventCardProps) => {
  const { day, month, time } = formatDate(new Date(event.startDate));

  const [joined, setJoined] = useState<boolean>(isJoined);

  const [joinEvent] = useJoinEventMutation();
  const [leaveEvent] = useLeaveEventMutation();

  // TODO: Implement distance calculator
  const distance = 15;

  const currentDate = new Date();
  const isEventExpired = currentDate.getTime() > new Date(event.endDate).getTime();
  return (
    <div className="event-card-container button" onClick={onClick} style={style}>
      <img className="event-card-image" src={getMediaUrl(event.image.id)} alt="Event" />
      <div className="event-card-datetime" data-testid="event-card-datetime">
        <div className="date-style">{`${day} ${month.toUpperCase()}`}</div>
        <div>{time.replace(/\s/g, '')}</div>
      </div>
      {isEventExpired || isEventOwner ? null : (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setJoined(!joined);
            if (joined === false) {
              joinEvent({ variables: { eventId: event.id } });
            } else {
              leaveEvent({ variables: { eventId: event.id } });
            }
          }}
          className={`event-card-join ${joined ? 'joined' : 'not-joined'}`}
          id={'event-card-join'}
        >
          {joined ? (
            <FontAwesomeIcon icon={faCheck} />
          ) : (
            <img src="../../../assets/icons/join-icon.svg" className="join-icon" alt="Join" />
          )}
        </button>
      )}

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
