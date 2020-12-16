import React from 'react';

import './event-members.scss';

export interface EventMembersProps {
  profilePictures: string[];
}

export const EventMembers = ({profilePictures}: EventMembersProps) => {
  const profileImages = profilePictures.map((image, index) => <img className="profile-picture" key={index} src={image} alt={`participant_${index+1}`} />);
  return <div className="event-members-div">{profileImages}</div>; 
};

export default EventMembers;
