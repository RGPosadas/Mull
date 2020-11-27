import { IEvent } from '@mull/types';
import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faShareAlt, faCheck, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

import { formatDate } from '../../../utilities';

import './event-card.scss';

/* eslint-disable-next-line */
export interface EventCardProps {
  event: Partial<IEvent>;
  style?: React.CSSProperties;
}

export const EventCard = ({ event, style = {} }: EventCardProps) => {
  // TODO; set joined based on if current user is part of event
  const [joined, setJoined] = useState<boolean>(false);

  let { day, month, time } = formatDate(event.startDate);
  return (
    <div className="event-card-container" style={style}>
      <img
        className="event-card-image"
        // TODO: Replace placeholder
        src="https://www.citywindsor.ca/residents/parksandforestry/City-Parks/PublishingImages/Assumption%20Park%20Street%20View.JPG"
      />
      <div className="event-card-datetime" data-testid="event-card-datetime">
        <div>{`${month} ${day}`}</div>
        <div>{time}</div>
      </div>
      {/* TODO: Add/remove user to event on press */}
      <button
        onClick={() => setJoined(!joined)}
        className={`event-card-join ${joined ? 'joined' : ''}`}
      >
        <FontAwesomeIcon icon={joined ? faCheck : faSignInAlt} />
      </button>
      <div className="event-card-description">
        <div className="event-card-text">
          <div className="event-card-title">{event.title}</div>
          {/* TODO: Replace placeholder distance*/}
          <div className="event-card-location">14km • {event.location.point}</div>
        </div>
        {/* TODO: Replace placeholder */}
        <div className="event-card-friends">friends</div>
        {/* TODO: Implement share */}
        <button className="event-card-share">
          <FontAwesomeIcon icon={faShareAlt} />
        </button>
      </div>
    </div>
  );
};

export default EventCard;
