import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ISerializedEvent } from '@mull/types';
import React from 'react';
import { formatDate, mediaUrl } from '../../../utilities';
import MullBackButton from '../mull-back-button/mull-back-button';
import './event-page-header.scss';

export interface EventPageHeaderProps {
  event: Partial<ISerializedEvent>;
  prevPage: string;
  handleBackButton?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  eventImageURL?: string;
}

export const EventPageHeader = ({
  event,
  prevPage,
  handleBackButton,
  eventImageURL,
}: EventPageHeaderProps) => {
  const { day: startDay, month: startMonth, time: startTime } = formatDate(
    new Date(event.startDate)
  );
  const { day: endDay, month: endMonth, time: endTime } = formatDate(new Date(event.endDate));
  return (
    <div className="event-page-header">
      <MullBackButton onClick={handleBackButton}>{prevPage}</MullBackButton>
      <div className="title">{event.title}</div>
      <img
        className="event-image"
        src={eventImageURL ? eventImageURL : mediaUrl(event)}
        alt="Event Page"
      />

      <div className="event-datetime">
        <FontAwesomeIcon icon={faClock} className="clock-icon event-page-icon color-grey" />

        <div className="event-datetime-string" data-testid="start-date-div">
          <div>{`${startDay} ${startMonth}`}</div>
          <div>{startTime}</div>
        </div>
        <FontAwesomeIcon icon={faCaretRight} className="event-page-icon color-grey" />
        <div className="event-datetime-string" data-testid="end-date-div">
          <div>{`${endDay} ${endMonth}`}</div>
          <div>{endTime}</div>
        </div>
      </div>
    </div>
  );
};

export default EventPageHeader;
