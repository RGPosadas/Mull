import {
  faAlignLeft,
  faComments,
  faLock,
  faMap,
  faMapMarkerAlt,
  faTimes,
  faUserFriends,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog } from '@material-ui/core';
import { EventRestrictionMap, ISerializedEvent } from '@mull/types';
import React, { useState } from 'react';
import { useJoinEventMutation, useLeaveEventMutation } from '../../../../generated/graphql';
import { mediaUrl } from '../../../../utilities';
import { ExpandableText, MullButton } from '../../../components';
import './event-page-info.scss';
export interface EventPageInfoProps {
  event: Partial<ISerializedEvent>;
  className?: string;
  eventImageURL?: string;
  style?: React.CSSProperties;
  isReview: boolean;
  isJoined: boolean;
  isEventOwner?: boolean;
  buttonType?: 'submit' | 'button' | 'reset';
  handleMullButton?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

/**
 * @param handleMullButton Function called when button at bottom of event-page-info is pressed
 */
export const EventPageInfo = ({
  event,
  className = '',
  style = {},
  isReview,
  isJoined,
  isEventOwner,
  buttonType,
  eventImageURL,
}: EventPageInfoProps) => {
  const [joinEvent] = useJoinEventMutation();
  const [leaveEvent] = useLeaveEventMutation();
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [joined, setJoined] = useState<boolean>(isJoined);

  const currentDate = new Date();

  const handleJoinEventButton = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.stopPropagation();
    setJoined(!joined);
    if (joined) {
      leaveEvent({ variables: { eventId: event.id } });
    } else {
      joinEvent({ variables: { eventId: event.id } });
    }
  };
  const isPassed = currentDate.getTime() > new Date(event.endDate).getTime();
  return (
    <div className={`event-page-info-container ${className}`} style={style}>
      <div className="info-row">
        {/* TODO: Currently using placeholder for the profile picture. The US will need to actually fetch image from media server */}
        <img
          src="https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png"
          className="event-page-icon"
          alt="Event"
        ></img>
        {/* TODO: Remove placeholder text once users are implemented */}
        <p className="row-text" data-testid="event-page-host">
          {event.host.name}
        </p>
        {/* <p className="row-text">{event.host?.name}</p> */}

        <FontAwesomeIcon icon={faComments} className="event-page-icon color-green" />
      </div>
      <div className="info-row">
        <FontAwesomeIcon icon={faMapMarkerAlt} className="event-page-icon color-grey" />
        <p className="row-text" data-testid="event-page-location">
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
      {
        <Dialog
          open={modalIsOpen}
          onClose={() => setIsOpen(false)}
          classes={{
            paperWidthSm: 'cancel-modal-container',
          }}
          maxWidth="sm"
        >
          <button className="close-button" onClick={() => setIsOpen(false)}>
            <FontAwesomeIcon icon={faTimes} className="color-grey" size="2x" />
          </button>

          <p className="cancel-event-title">Cancel event?</p>

          <img
            className="cancel-modal-event-image"
            data-testid="event-page-image"
            src={eventImageURL ? eventImageURL : mediaUrl(event)}
            alt="Event Page"
          />

          {/*TODO: Cancel event functionality */}
          <MullButton className="event-page-button event-page-cancel-button" type={buttonType}>
            Yes
          </MullButton>
          <MullButton
            onClick={() => setIsOpen(false)}
            className="event-page-button event-page-cancel-button"
            type={buttonType}
          >
            No
          </MullButton>
        </Dialog>
      }

      {isPassed ? null : (
        <MullButton
          className={`event-page-button ${
            joined && !isEventOwner && !isReview ? 'event-page-joined-button' : ''
          }`}
          onClick={isReview ? null : isEventOwner ? () => setIsOpen(true) : handleJoinEventButton}
          type={buttonType}
        >
          {isReview ? 'Create' : isEventOwner ? 'Cancel' : joined ? 'Leave' : 'Join'}
        </MullButton>
      )}
    </div>
  );
};

export default EventPageInfo;
