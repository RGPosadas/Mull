import { IEvent } from '@mull/types';
import React from 'react';
import { useParams } from 'react-router-dom';
import { EventPageHeader, EventPageInfo } from '../../components';

import { gql, useQuery } from '@apollo/client';

import './event-page.scss';

export interface EventPageProps {
  event: Partial<IEvent>;
  prevPage: string;
  onBackButtonClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onButtonClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  eventImageURL: string;
}

export const EventPage = ({
  event,
  prevPage,
  onBackButtonClick,
  onButtonClick,
  eventImageURL,
}: EventPageProps) => {
  let { id }: any = useParams();
  const eventId = parseInt(id);

  const GET_SPECFICIC_EVENT = gql`
    query findSpecificEvent($eventId: Int!) {
      event(id: $eventId) {
        id
        title
        description
        startDate
        endDate
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_SPECFICIC_EVENT, {
    variables: { eventId },
  });

  return (
    <div className="page-container no-padding event-page-container">
      <EventPageHeader
        event={event}
        prevPage={prevPage}
        handleBackButton={onBackButtonClick}
        eventImageURL={eventImageURL}
      />
      <div className="event-page-info">
        <EventPageInfo event={event} handleMullButton={onButtonClick} />
      </div>
    </div>
  );
};

export default EventPage;
