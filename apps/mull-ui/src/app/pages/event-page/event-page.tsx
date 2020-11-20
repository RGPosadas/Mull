import { IEvent } from '@mull/types';
import React from 'react';
import { EventPageHeader, EventPageInfo, MullButton } from '../../components';

import './event-page.scss';

export interface EventPageProps {
  event: IEvent;
}

export const EventPage = ({ event }: EventPageProps) => {
  return (
    <div className="event-page-container">
      <EventPageHeader event={event} />
      <div className="event-page-info">
        <EventPageInfo event={event} />
      </div>
    </div>
  );
};

export default EventPage;
