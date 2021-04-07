import { useGetThreeRandomParticipantsQuery, User } from 'apps/mull-ui/src/generated/graphql';
import React from 'react';
import { avatarUrl } from '../../../utilities';
import './event-members.scss';

export interface EventMembersProps {
  eventId: number;
}

export const EventMembers = ({ eventId }: EventMembersProps) => {
  const { data: participantsData } = useGetThreeRandomParticipantsQuery({
    variables: {
      eventId: eventId,
    },
  });
  if (participantsData) {
    const profileImages = participantsData.threeParticipant.map((participant, index) => (
      <img
        className="profile-picture"
        key={index}
        src={avatarUrl(participant as User)}
        alt={`participant_${index + 1}`}
      />
    ));
    return <div className="event-members-div">{profileImages}</div>;
  }
  return null;
};

export default EventMembers;
