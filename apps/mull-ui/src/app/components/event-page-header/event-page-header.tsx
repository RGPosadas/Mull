import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';

import './event-page-header.scss';

import { IEvent } from '@mull/types';

import MullBackButton from '../mull-back-button/mull-back-button';
import { formatDate } from 'apps/mull-ui/src/utilities';

export interface EventPageHeaderProps {
  event: IEvent;
  prevPage: string;
}

export const EventPageHeader = ({ event, prevPage }: EventPageHeaderProps) => {
  let { day: startDay, month: startMonth, time: startTime } = formatDate(event.startDate);
  let { day: endDay, month: endMonth, time: endTime } = formatDate(event.endDate);
  return (
    <div className="event-page-header">
      <MullBackButton>{prevPage}</MullBackButton>
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
          <div>{`${startMonth} ${startDay}`}</div>
          <div>{startTime}</div>
        </div>
        <FontAwesomeIcon icon={faCaretRight} className="event-page-icon color-grey" />
        <div className="event-datetime-string" data-testid="end-date-div">
          <div>{`${endMonth} ${endDay}`}</div>
          <div>{endTime}</div>
        </div>
      </div>
    </div>
  );
};

export default EventPageHeader;
