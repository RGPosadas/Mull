import React from 'react';
import { useParams } from 'react-router-dom';
import { CreateEventInput, useEventQuery } from '../../../generated/graphql';
import { EventPageHeader, EventPageInfo } from '../../components';
import './event-page.scss';

export interface EventPageProps {
  event?: Partial<CreateEventInput>;
  prevPage: string;
  eventImageURL: string;
  buttonType?: 'submit' | 'button' | 'reset';
  onBackButtonClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onButtonClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isReview?: boolean;
}

export const EventPage = ({
  event,
  prevPage,
  onBackButtonClick,
  onButtonClick,
  eventImageURL,
  isReview = false,
  buttonType,
}: EventPageProps) => {
  const { id } = useParams<{ id: string }>();
  const eventId = parseInt(id);

  const { loading, error, data } = useEventQuery({
    variables: { id: eventId },
    skip: !!event,
  });

  if (!loading && data) {
    event = data.event;
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
          buttonType={buttonType}
        />
      </div>
    </div>
  ) : null;
};

export default EventPage;
