import React from 'react';

import { ReactComponent as ClockIcon } from '../../../assets/icons/event-page-icons/ClockIcon.svg';
import { ReactComponent as ToIcon } from '../../../assets/icons/event-page-icons/ToIcon.svg';

import './event-page-header.scss';

import { IEvent } from '@mull/types';

export interface EventPageHeaderProps {
  event: IEvent;
}

export const EventPageHeader = ({ event }: EventPageHeaderProps) => {
  const dateToString = (fakeDate: Date): string => {
    let date = new Date(fakeDate);
    const dateString = Intl.DateTimeFormat('default', {
      month: 'short',
      day: 'numeric',
    }).format(date);
    const timeString = Intl.DateTimeFormat('default', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);

    return `${dateString}\n${timeString}`;
  };

  return (
    <div className="container">
      <h1 className="title">{event.title}</h1>
      {/* TODO: Currently using placeholder. US will need to actually fetch image from media server */}
      <img
        className="event-image"
        src="https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png"
      />

      <div className="event-time">
        <ClockIcon className="clock-icon" />
        <div className="event-time-string">{dateToString(event.startDate)}</div>
        <ToIcon className="to-icon" />
        <div className="event-time-string">
          <div>{dateToString(event.endDate)}</div>
        </div>
      </div>
    </div>
  );
};

export default EventPageHeader;
