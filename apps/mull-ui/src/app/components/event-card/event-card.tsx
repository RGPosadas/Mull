import { ISerializedEvent } from '@mull/types';
import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt, faCheck, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

import { formatDate } from '../../../utilities';

import './event-card.scss';
import { dummyProfilePictures } from '../../../constants'; // TODO query the participants profile pictures
import EventMembers from '../event-members/event-members';

export interface EventCardProps {
  event: Partial<ISerializedEvent>;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const EventCard = ({ event, style = {}, onClick }: EventCardProps) => {
  // TODO; set joined based on if current user is part of event
  const [joined, setJoined] = useState<boolean>(false);
  const { day, month, time } = formatDate(new Date(event.startDate));
  return (
    <div className="event-card-container button" onClick={onClick} style={style}>
      <img
        className="event-card-image"
        // TODO: Replace placeholder
        src="https://www.citywindsor.ca/residents/parksandforestry/City-Parks/PublishingImages/Assumption%20Park%20Street%20View.JPG"
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
        }}
        className={`event-card-join ${joined ? 'joined' : ''}`}
      >
        <FontAwesomeIcon icon={joined ? faCheck : faSignInAlt} />
      </button>
      <div className="event-card-description" onClick={onClick}>
        <div className="event-card-text">
          <div className="event-card-title">{event.title}</div>

          <div className="event-card-location">
            {/* TODO: Dynamically add address. Currently not available in the data from the query*/}
            15km • 1455 Boulevard de Maisonneuve O, Montréal, QC H3G 1M8
          </div>
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
