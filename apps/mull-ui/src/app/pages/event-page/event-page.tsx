import { IEvent } from '@mull/types';
import React from 'react';
import { EventPageHeader, EventPageInfo } from '../../components';

import './event-page.scss';

export interface EventPageProps {
  event: IEvent;
  lastPage: string;
}

export const EventPage = ({ event, lastPage }: EventPageProps) => {
  return (
    <div className="event-page-container">
      <EventPageHeader event={event} lastPage={lastPage} />
      <div className="event-page-info">
        <EventPageInfo event={event} />
      </div>
    </div>
  );
};

export default EventPage;
