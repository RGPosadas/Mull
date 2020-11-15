import { IEvent } from '@mull/types';
import { MullButton } from '@mull/ui-lib';
import React from 'react';
import { EventPageHeader, EventPageInfo } from '../../components';

import './event-page.scss';

export interface EventPageProps {
  event: IEvent;
}

export const EventPage = ({ event }: EventPageProps) => {
  return (
    <div className="event-page-container">
      <EventPageHeader event={event} />
      <EventPageInfo event={event} className="event-page-info" />
      <MullButton className="event-page-button" />
    </div>
  );
};

export default EventPage;