import { EventRestrictionMap, IEvent } from '@mull/types';
import React from 'react';

import { ReactComponent as MessageIcon } from '../../../assets/icons/event-page-icons/message.svg';
import { ReactComponent as LocationIcon } from '../../../assets/icons/event-page-icons/location.svg';
import { ReactComponent as MapIcon } from '../../../assets/icons/event-page-icons/map.svg';
import { ReactComponent as DescriptionIcon } from '../../../assets/icons/event-page-icons/description.svg';
import { ReactComponent as EventRestriction } from '../../../assets/icons/event-page-icons/event-restriction.svg';

import './event-page-info.scss';

export interface EventPageInfoProps {
  event: IEvent;
  className?: string;
}

export const EventPageInfo = ({ event, className = '' }: EventPageInfoProps) => {
  return (
    <div className={`event-page-info-container ${className}`}>
      <div className="info-row">
        {/* TODO: Currently using placeholder. The US will need to actually fetch image from media server */}
        <img
          src="https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png"
          className="row-icon"
          alt="Event"
        ></img>

        <p className="row-text">{event.host.name}</p>

        <MessageIcon className="row-icon" />
      </div>
      <div className="info-row">
        <LocationIcon className="row-icon" />
        <p className="row-text">{event.location.point}</p>
        <MapIcon className="row-icon" />
      </div>
      <div className="info-row">
        <DescriptionIcon className="row-icon" />
        <p className="row-text">{event.description}</p>
      </div>

      <div className="info-row">
        <EventRestriction className="row-icon" />
        <p className="row-text">{EventRestrictionMap[event.restriction]}</p>
      </div>
    </div>
  );
};

export default EventPageInfo;
