import { ISerializedEvent } from '@mull/types';
import { History } from 'history';
import React from 'react';
import { useFriendCountQuery, useOtherUserProfileQuery, User } from '../../../../generated/graphql';
import { sortEventsByDate } from '../../../../utilities';
import { EventCard, MullBackButton } from '../../../components';
import ProfileHeader from '../../../components/profile-header/profile-header';
import './other-user-profile.scss';

export interface OtherUserProfilePageProps {
  history: History;
  prevPage?: string;
  otherUserId: number;
}

export const OtherUserProfilePage = ({
  history,
  prevPage,
  otherUserId,
}: OtherUserProfilePageProps) => {
  const { data: otherUserProfileData, loading: otherUserProfileLoading } = useOtherUserProfileQuery(
    {
      variables: {
        id: otherUserId,
      },
    }
  );
  const {
    data: friendCountData,
    loading: friendCountLoading,
    refetch: friendCountRefetch,
  } = useFriendCountQuery({
    variables: {
      id: otherUserId,
    },
  });

  if (otherUserProfileLoading || friendCountLoading)
    return <div className="page-container">Loading...</div>;

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
        friendCount={friendCountData.friendCount}
        hostingCount={otherUserProfileData.hostingCount}
        user={otherUserProfileData.user as User}
        friendCountRefetch={friendCountRefetch}
      />

      <div className="portfolio-container" data-testid="portfolio-events">
        {eventCards.length > 0 ? (
          eventCards
        ) : (
          <div className="empty-array-msg">No portfolio found</div>
        )}
      </div>
    </div>
  );
};

export default OtherUserProfilePage;
