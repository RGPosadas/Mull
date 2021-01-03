import { IEvent } from '@mull/types';
import React from 'react';
import { useParams } from 'react-router-dom';
import { EventPageHeader, EventPageInfo } from '../../components';

import { gql, useQuery } from '@apollo/client';

import './event-page.scss';

export interface EventPageProps {
  event?: Partial<IEvent>;
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

  const GET_EVENT_BY_ID = gql`
    query findSpecificEvent($eventId: Int!) {
      event(id: $eventId) {
        id
        title
        description
        startDate
        endDate
        restriction
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_EVENT_BY_ID, {
    variables: { eventId },
    skip: !!event,
  });

  if (!loading && data) {
    event = data.event;
  }

  if (error) {
    console.log(error);
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
