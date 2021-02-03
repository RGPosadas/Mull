import { cloneDeep } from 'lodash';
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CreateEventInput, useEventPageQuery, useUserQuery } from '../../../generated/graphql';
import { EventPageHeader, EventPageInfo } from '../../components';
import UserContext from '../../context/user.context';
import './event-page.scss';

export interface EventPageProps {
  reviewEvent?: Partial<CreateEventInput>;
  prevPage: string;
  eventImageURL?: string;
  buttonType?: 'submit' | 'button' | 'reset';
  onBackButtonClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onButtonClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isReview?: boolean;
  isJoined?: boolean;
}

export const EventPage = ({
  reviewEvent,
  prevPage,
  onBackButtonClick,
  onButtonClick,
  eventImageURL,
  isReview = false,
  isJoined = false,
  buttonType,
}: EventPageProps) => {
  const { id } = useParams<{ id: string }>();
  const eventId = parseInt(id);

  const { userId } = useContext(UserContext);

  let event = cloneDeep(reviewEvent);

  const { loading: loadingEvent, error: errorEvent, data: dataEvent } = useEventPageQuery({
    variables: { eventId, userId },
    skip: !!reviewEvent,
  });

  const { loading: loadingUser, error: errorUser, data: dataUser } = useUserQuery({
    variables: { userId },
    skip: !reviewEvent,
  });

  if (!loadingEvent && dataEvent) {
    event = cloneDeep(dataEvent.event);
    isJoined = dataEvent.isParticipant;
  }

  if (!loadingUser && dataUser) {
    event.host = dataUser.user;
  }

  if (loadingEvent || loadingUser || !event.host) {
    // TODO: Replace with spinner or loading component
    return <div>Loading...</div>;
  }

  return (
    <div className="page-container no-padding event-page-container">
      <EventPageHeader
        event={event}
        prevPage={prevPage}
        handleBackButton={onBackButtonClick}
        eventImageURL={eventImageURL}
      />
      <div className="event-page-info">
        <EventPageInfo
          event={event}
          handleMullButton={onButtonClick}
          isReview={isReview}
          isJoined={isJoined}
          buttonType={buttonType}
        />
      </div>
    </div>
  );
};

export default EventPage;
