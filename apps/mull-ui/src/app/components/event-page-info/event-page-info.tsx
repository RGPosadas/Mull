import {
  faAlignLeft,
  faComments,
  faLock,
  faMap,
  faMapMarkerAlt,
  faUserFriends,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { EventRestrictionMap, ISerializedEvent } from '@mull/types';
import React from 'react';
import MullButton from '../mull-button/mull-button';
import { ExpandableText } from './../expandable-text/expandable-text';
import './event-page-info.scss';

export interface EventPageInfoProps {
  event: Partial<ISerializedEvent>;
  className?: string;
  isReview: boolean;
  buttonType?: 'submit' | 'button' | 'reset';
  handleMullButton?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

/**
 * @param handleMullButton Function called when button at bottom of event-page-info is pressed
 */
export const EventPageInfo = ({
  event,
  className = '',
  handleMullButton,
  isReview,
  buttonType,
}: EventPageInfoProps) => {
  return (
    <div className={`event-page-info-container ${className}`}>
      <div className="info-row">
        {/* TODO: Currently using placeholder. The US will need to actually fetch image from media server */}
        <img
          src="https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png"
          className="event-page-icon"
          alt="Event"
        ></img>

        {/* TODO: Remove placeholder text once users are implemented */}
        <p className="row-text" data-testid="event-host">
          Placeholder Host
        </p>
        {/* <p className="row-text">{event.host?.name}</p> */}

        <FontAwesomeIcon icon={faComments} className="event-page-icon color-green" />
      </div>
      <div className="info-row">
        <FontAwesomeIcon icon={faMapMarkerAlt} className="event-page-icon color-grey" />
        <p className="row-text" data-testid="event-location">
          {event.location.title}
        </p>
        {/* TODO: placeholder till TASK-33 is done uncomment the line below to see on preview page*/}
        {/* <p className="row-text">{event.location.title}</p> */}
        <FontAwesomeIcon icon={faMap} className="event-page-icon color-green" />
      </div>
      <div className="info-row">
        <FontAwesomeIcon icon={faAlignLeft} className="event-page-icon color-grey" />
        <ExpandableText className="row-text">{event.description}</ExpandableText>
      </div>

      <div className="info-row">
        <FontAwesomeIcon icon={faLock} className="event-page-icon color-grey" />
        <p className="row-text" data-testid="event-restriction">
          {EventRestrictionMap[event.restriction]}
        </p>
      </div>

      <div className="info-row">
        {/* TODO: Placeholder. Implement friend invitation and image fetching before doing this*/}
        <FontAwesomeIcon icon={faUserFriends} className="event-page-icon color-grey" />
        <p className="row-text">{event.participants?.map((p) => p.name).join(', ')}</p>
        <FontAwesomeIcon icon={faUserPlus} className="event-page-icon color-green" />
      </div>
      <MullButton className="event-page-button" onClick={handleMullButton} type={buttonType}>
        {isReview ? 'Create' : 'Join'}
      </MullButton>
    </div>
  );
};

export default EventPageInfo;
