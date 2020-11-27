import { IEvent } from '@mull/types';
import React from 'react';
import { EventPageHeader, EventPageInfo } from '../../components';

import './event-page.scss';

export interface EventPageProps {
  event: IEvent;
  prevPage: string;
  onBackButtonClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onButtonClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const EventPage = ({
  event,
  prevPage,
  onBackButtonClick,
  onButtonClick,
}: EventPageProps) => {
  return (
    <div className="page-container no-padding event-page-container ">
      <EventPageHeader event={event} prevPage={prevPage} />
      <div className="event-page-info">
        <EventPageInfo event={event} onButtonClick={onButtonClick} />
      </div>
    </div>
  );
};

export default EventPage;
