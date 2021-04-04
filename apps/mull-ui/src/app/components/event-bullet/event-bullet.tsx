import React from 'react';
import { monthNames } from '../../../constants';
import './event-bullet.scss';
export interface EventBulletProps {
  eventTitle: string;
  eventPicture: string;
  eventDate: Date;
  key: string;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void; //TODO: redirect to the correct DM page
}

export const EventBullet = ({ eventTitle, eventPicture, eventDate, onClick }: EventBulletProps) => {
  return (
    <div>
      <button className="event-button" onClick={onClick}>
        <div className="event-bullet-container">
          <img className="event-bullet-photo" src={eventPicture} alt="event" />
          <div className="event-bullet-date-box">
            <span className="event-box-bold-font">{eventDate.getDate()}</span>
            <span className="event-box-font">{monthNames[eventDate.getMonth()]}</span>
            <span className="event-box-font">
              {eventDate.getHours()}:{eventDate.getMinutes()}
            </span>
          </div>
          <div className="event-title">{eventTitle}</div>
        </div>
      </button>
    </div>
  );
};

export default EventBullet;
