import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ISerializedEvent } from '@mull/types';
import React, { useEffect } from 'react';
import { formatDate, getMediaUrl } from '../../../../utilities';
import { MullBackButton } from '../../../components';
import './event-page-header.scss';

export interface EventPageHeaderProps {
  event: Partial<ISerializedEvent>;
  prevPage: string;
  handleBackButton?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  eventImageURL?: string;
  headerRef: React.MutableRefObject<HTMLDivElement>;
  setHeaderHeight: React.Dispatch<React.SetStateAction<number>>;
}

export const EventPageHeader = ({
  event,
  prevPage,
  handleBackButton,
  eventImageURL,
  headerRef,
  setHeaderHeight,
}: EventPageHeaderProps) => {
  const { day: startDay, month: startMonth, time: startTime } = formatDate(
    new Date(event.startDate)
  );
  const { day: endDay, month: endMonth, time: endTime } = formatDate(new Date(event.endDate));

  const handleHeaderChange = () => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleHeaderChange);
    return () => {
      window.removeEventListener('resize', handleHeaderChange);
    };
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  return (
    <div className="event-page-header-container" ref={headerRef}>
      <MullBackButton onClick={handleBackButton}>{prevPage}</MullBackButton>
      <div className="title" data-testid="event-page-title">
        {event.title}
      </div>
      <img
        className="event-image"
        data-testid="event-page-image"
        src={eventImageURL ? eventImageURL : getMediaUrl(event.id)}
        alt="Event Page"
        // Check header size after image has loaded
        onLoad={handleHeaderChange}
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
