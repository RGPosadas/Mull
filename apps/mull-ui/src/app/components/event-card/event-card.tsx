import { IEvent } from '@mull/types';
import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faShareAlt, faCheck, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

import './event-card.scss';

/* eslint-disable-next-line */
export interface EventCardProps {
  event: Partial<IEvent>;
  style?: React.CSSProperties;
}

export const EventCard = ({ event, style = {} }: EventCardProps) => {
  const [joined, setJoined] = useState<boolean>(false);

  const dateToString = (date: Date): string => {
    const dateString = Intl.DateTimeFormat('en-us', {
      month: 'short',
      day: 'numeric',
    }).format(date);
    const timeString = Intl.DateTimeFormat('en-us', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);

    return `${dateString}\n${timeString}`;
  };

  return (
    <div className="event-card-container" style={style}>
      <img
        className="event-card-image"
        // TODO: Replace placeholder
        src="https://www.citywindsor.ca/residents/parksandforestry/City-Parks/PublishingImages/Assumption%20Park%20Street%20View.JPG"
      />
      <div className="event-card-datetime">{dateToString(event.startDate)}</div>
      <button
        onClick={() => setJoined(!joined)}
        className={`event-card-join ${joined ? 'joined' : ''}`}
      >
        <FontAwesomeIcon icon={joined ? faCheck : faSignInAlt} />
      </button>
      <div className="event-card-description">
        <div className="event-card-text">
          <div className="event-card-title">{event.title}</div>
          {/* TODO: Replace placeholder */}
          <div className="event-card-location">14km • {event.location.point}</div>
        </div>
        {/* TODO: Replace placeholder */}
        <div className="event-card-friends">friends</div>
        <button className="event-card-share">
          <FontAwesomeIcon icon={faShareAlt} />
        </button>
      </div>
    </div>
  );
};

export default EventCard;
