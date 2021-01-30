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
import React, { useContext, useState } from 'react';
import { useJoinEventMutation, useLeaveEventMutation } from '../../../generated/graphql';
import UserContext from '../../context/user.context';
import MullButton from '../mull-button/mull-button';
import { ExpandableText } from './../expandable-text/expandable-text';
import './event-page-info.scss';

export interface EventPageInfoProps {
  event: Partial<ISerializedEvent>;
  className?: string;
  isReview: boolean;
  isJoined: boolean;
  buttonType?: 'submit' | 'button' | 'reset';
  handleMullButton?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

/**
 * @param handleMullButton Function called when button at bottom of event-page-info is pressed
 */
export const EventPageInfo = ({
  event,
  className = '',
  isReview,
  isJoined,
  buttonType,
}: EventPageInfoProps) => {
  const [joinEvent] = useJoinEventMutation();
  const [leaveEvent] = useLeaveEventMutation();

  const eventId = parseInt(event.id);
  const { userId } = useContext(UserContext);
  const [joined, setJoined] = useState<boolean>(isJoined);

  const handleJoinEventButton = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.stopPropagation();
    setJoined(!joined);
    if (joined) {
      leaveEvent({ variables: { eventId, userId } });
    } else {
      joinEvent({ variables: { eventId, userId } });
    }
  };

  return (
    <div className={`event-page-info-container ${className}`}>
      <div className="info-row">
        {/* TODO: Currently using placeholder for the profile picture. The US will need to actually fetch image from media server */}
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
      <MullButton
        className={`event-page-button ${joined ? 'event-page-joined-button' : ''}`}
        onClick={isReview ? null : handleJoinEventButton}
        type={buttonType}
      >
        {joined ? 'Leave' : isReview ? 'Create' : 'Join'}
      </MullButton>
    </div>
  );
};

export default EventPageInfo;
