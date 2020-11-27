import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';

import './event-page-header.scss';

import { IEvent } from '@mull/types';

import MullBackButton from '../mull-back-button/mull-back-button';
import { formatDate } from '../../../utilities';

export interface EventPageHeaderProps {
  event: Partial<IEvent>;
  prevPage: string;
  onBackButtonClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  eventImageURL: string;
}

export const EventPageHeader = ({
  event,
  prevPage,
  onBackButtonClick,
  eventImageURL,
}: EventPageHeaderProps) => {
  const { day: startDay, month: startMonth, time: startTime } = formatDate(event.startDate);
  const { day: endDay, month: endMonth, time: endTime } = formatDate(event.endDate);

  return (
    <div className="event-page-header">
      <MullBackButton onClick={onBackButtonClick}>{prevPage}</MullBackButton>
      <div className="title">{event.title}</div>
      <img className="event-image" src={eventImageURL} alt="Event Page" />

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
