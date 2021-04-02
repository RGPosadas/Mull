import { ISerializedEvent } from '@mull/types';
import { History } from 'history';
import React, { useContext } from 'react';
import { useOtherUserProfileQuery, User } from '../../../../generated/graphql';
import { sortEventsByDate } from '../../../../utilities';
import { EventCard, MullBackButton } from '../../../components';
import ProfileHeader from '../../../components/profile-header/profile-header';
import UserContext from '../../../context/user.context';
import './other-user-profile.scss';

export interface OtherUserProfilePageProps {
  history: History;
  prevPage: string;
}

export const OtherUserProfilePage = ({ history, prevPage }: OtherUserProfilePageProps) => {
  const { data: otherUserProfileData, loading: userProfileLoading } = useOtherUserProfileQuery({
    variables: {
      // TODO in TASK-83: get id of other user
      id: 4,
    },
  });
  const currentUserId = useContext(UserContext).userId;

  if (userProfileLoading) return <div className="page-container">Loading...</div>;
  if (currentUserId === otherUserProfileData.user.id) history.push('profile');

  if (otherUserProfileData.portfolioEvents) {
    const events = (otherUserProfileData.portfolioEvents as unknown) as Partial<ISerializedEvent>[];
    const sortedEvents = sortEventsByDate(events);

    var eventCards = sortedEvents.map((event, index) => (
      <EventCard
        key={`user-portfolio-event-${index}`}
        isJoined={true}
        event={event}
        onClick={() => history.push(`/events/${event.id}`)}
      />
    ));
  }

  return (
    <div className="page-container">
      <MullBackButton>{prevPage}</MullBackButton>
      <ProfileHeader
        portfolioCount={otherUserProfileData.portfolioCount}
        friendCount={otherUserProfileData.friendCount}
        hostingCount={otherUserProfileData.hostingCount}
        user={otherUserProfileData.user as User}
      />

      <div className="portfolio-container" data-testid="portfolio-events">
        {eventCards}
      </div>
    </div>
  );
};

export default OtherUserProfilePage;
