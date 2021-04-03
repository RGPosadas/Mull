import { faAlignLeft, faLock, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { EventRestrictionMap, ISerializedEvent } from '@mull/types';
import React, { useState } from 'react';
import { useJoinEventMutation, useLeaveEventMutation, User } from '../../../../generated/graphql';
import { avatarUrl, getMediaUrl } from '../../../../utilities';
import { ExpandableText, MullButton, MullModal } from '../../../components';
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
  const [modalOpen, setModalOpen] = useState<boolean>(false);
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
  const isEventExpired = currentDate.getTime() > new Date(event.endDate).getTime();
  return (
    <div className={`event-page-info-container ${className}`} style={style}>
      <div className="info-row">
        <img src={avatarUrl(event.host as User)} className="event-page-avatar" alt="Event"></img>
        <p className="row-text" data-testid="event-page-host">
          {event.host.name}
        </p>
        {/* <FontAwesomeIcon icon={faComments} className="event-page-icon color-green" /> */}
      </div>
      <div className="info-row">
        <FontAwesomeIcon icon={faMapMarkerAlt} className="event-page-icon color-grey" />
        <p className="row-text" data-testid="event-page-location">
          {event.location.title}
        </p>
        {/* <FontAwesomeIcon icon={faMap} className="event-page-icon color-green" /> */}
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

      {/* <div className="info-row">
        {/* TODO: Placeholder. Implement friend invitation and image fetching before doing this}
        <FontAwesomeIcon icon={faUserFriends} className="event-page-icon color-grey" />
        <p className="row-text">{event.participants?.map((p) => p.name).join(', ')}</p>
        <FontAwesomeIcon icon={faUserPlus} className="event-page-icon color-green" />
      </div> */}

      {
        <MullModal
          open={modalOpen}
          setOpen={setModalOpen}
          paperClasses="cancel-modal-container"
          maxWidth="sm"
        >
          <p className="cancel-event-title">Cancel event?</p>

          <img
            className="cancel-modal-event-image"
            data-testid="event-page-image"
            src={eventImageURL ? eventImageURL : getMediaUrl(event.image.id)}
            alt="Event Page"
          />

          {/*TODO: Cancel event functionality */}
          <MullButton className="event-page-button" type={buttonType} altStyle>
            Yes
          </MullButton>
          <MullButton
            onClick={() => setModalOpen(false)}
            className="event-page-button"
            type={buttonType}
            altStyle
          >
            No
          </MullButton>
        </MullModal>
      }
      {isEventExpired && !isReview ? null : (
        <MullButton
          className="event-page-button"
          altStyle={(joined || isEventOwner) && !isReview}
          onClick={
            isReview ? null : isEventOwner ? () => setModalOpen(true) : handleJoinEventButton
          }
          type={buttonType}
        >
          {isReview ? 'Create' : isEventOwner ? 'Cancel' : joined ? 'Leave' : 'Join'}
        </MullButton>
      )}
    </div>
  );
};

export default EventPageInfo;
