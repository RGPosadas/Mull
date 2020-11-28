import { IEvent } from '@mull/types';
import React from 'react';
import { EventPageHeader, EventPageInfo } from '../../components';

import './event-page.scss';

export interface EventPageProps {
  event: IEvent;
  prevPage: string;
}

export const EventPage = ({ event, prevPage }: EventPageProps) => {
  return (
    <div className="page-container no-padding event-page-container ">
      <EventPageHeader event={event} prevPage={prevPage} />
      <div className="event-page-info">
        <EventPageInfo event={event} />
      </div>
    </div>
  );
};

export default EventPage;
