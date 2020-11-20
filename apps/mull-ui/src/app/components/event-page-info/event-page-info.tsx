import { EventRestrictionMap, IEvent } from '@mull/types';
import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComments,
  faMapMarkerAlt,
  faAlignLeft,
  faMap,
  faLock,
  faUserFriends,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';

import './event-page-info.scss';
import { ExpandableText } from './../expandable-text/expandable-text';
import MullButton from '../mull-button/mull-button';

export interface EventPageInfoProps {
  event: IEvent;
  className?: string;
}

export const EventPageInfo = ({ event, className = '' }: EventPageInfoProps) => {
  return (
    <div className={`event-page-info-container ${className}`}>
      <div className="info-row">
        {/* TODO: Currently using placeholder. The US will need to actually fetch image from media server */}
        <img
          src="https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png"
          className="event-page-icon"
          alt="Event"
        ></img>

        <p className="row-text">{event.host.name}</p>

        <FontAwesomeIcon icon={faComments} className="event-page-icon color-green" />
      </div>
      <div className="info-row">
        <FontAwesomeIcon icon={faMapMarkerAlt} className="event-page-icon color-grey" />
        <p className="row-text">{event.location.point}</p>
        <FontAwesomeIcon icon={faMap} className="event-page-icon color-green" />
      </div>
      <div className="info-row">
        <FontAwesomeIcon icon={faAlignLeft} className="event-page-icon color-grey" />
        <ExpandableText className="row-text">{event.description}</ExpandableText>
      </div>

      <div className="info-row">
        <FontAwesomeIcon icon={faLock} className="event-page-icon color-grey" />
        <p className="row-text">{EventRestrictionMap[event.restriction]}</p>
      </div>

      <div className="info-row">
        {/* TODO: Placeholder. Implement friend invitation and image fetching before doing this*/}
        <FontAwesomeIcon icon={faUserFriends} className="event-page-icon color-grey" />
        <p className="row-text">{event.participants.map((p) => p.name).join(', ')}</p>
        <FontAwesomeIcon icon={faUserPlus} className="event-page-icon color-green" />
      </div>
      <MullButton className="event-page-button" />
    </div>
  );
};

export default EventPageInfo;
