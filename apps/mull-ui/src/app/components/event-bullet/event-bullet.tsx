import React from 'react';
import './event-bullet.scss';

/* eslint-disable-next-line */
export interface EventBulletProps {
  eventTitle: string;
  eventPicture: string;
  eventDate: Date;
}

const monthNames = [
  'Jan',
  'Feb',
  'March',
  'April',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];

export const EventBullet = ({ eventTitle, eventPicture, eventDate }: EventBulletProps) => {
  return (
    <div>
      <div className="event-bullet-container">
        <img className="event-photo" src={eventPicture} alt="event"></img>

        <div className="event-bullet-date-box">
          <div className="event-box-day-font">{eventDate.getDate()}</div>
          <div className="event-box-font">{monthNames[eventDate.getMonth()]}</div>
          <div className="event-box-font">
            {eventDate.getHours()}:{eventDate.getMinutes()}
          </div>
        </div>

        <div>{eventTitle}</div>
      </div>
    </div>
  );
};

export default EventBullet;
