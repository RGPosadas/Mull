import { IEvent } from '@mull/types';
import React from 'react';
import { EventPageHeader, EventPageInfo } from '../../components';

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
