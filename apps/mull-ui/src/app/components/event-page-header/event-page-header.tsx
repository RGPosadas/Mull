import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';

import { faClock } from '@fortawesome/free-regular-svg-icons';

import './event-page-header.scss';

import { IEvent } from '@mull/types';

export interface EventPageHeaderProps {
  event: IEvent;
}

export const EventPageHeader = ({ event }: EventPageHeaderProps) => {
  const dateToString = (date: Date): string => {
    const dateString = Intl.DateTimeFormat('en-us', {
      month: 'short',
      day: 'numeric',
    }).format(date);
    const timeString = Intl.DateTimeFormat('en-us', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);

    return `${dateString}\n${timeString}`;
  };

  return (
    <div className="event-page-header">
      <div className="title">{event.title}</div>
      {/* TODO: Currently using placeholder. The US will need to actually fetch image from media server */}
      <img
        className="event-image"
        src="https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png"
        alt="Event Page"
      />

      <div className="event-datetime">
        <FontAwesomeIcon icon={faClock} className="clock-icon event-page-icon color-grey" />

        <div className="event-datetime-string" data-testid="start-date-div">
          {dateToString(event.startDate)}
        </div>
        <FontAwesomeIcon icon={faCaretRight} className="event-page-icon color-grey" />
        <div className="event-datetime-string" data-testid="end-date-div">
          <div>{dateToString(event.endDate)}</div>
        </div>
      </div>
    </div>
  );
};

export default EventPageHeader;
