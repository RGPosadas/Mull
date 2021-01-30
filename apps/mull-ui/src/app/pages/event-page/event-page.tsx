import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CreateEventInput, useEventPageQuery } from '../../../generated/graphql';
import { EventPageHeader, EventPageInfo } from '../../components';
import UserContext from '../../context/user.context';
import './event-page.scss';

export interface EventPageProps {
  event?: Partial<CreateEventInput>;
  prevPage: string;
  eventImageURL?: string;
  buttonType?: 'submit' | 'button' | 'reset';
  onBackButtonClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onButtonClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isReview?: boolean;
  isJoined?: boolean;
}

export const EventPage = ({
  event,
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

  const { loading, error, data } = useEventPageQuery({
    variables: { eventId, userId },
    skip: !!event,
  });

  if (!loading && data) {
    event = data.event;
    isJoined = data.isParticipant;
  }

  if (error) {
    console.error(error);
  }

  return event ? (
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
  ) : null;
};

export default EventPage;
