import { faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ProfileRelationshipButton } from '@mull/types';
import React, { useEffect, useState } from 'react';
import { MullButton } from '..';
import {
  RelationshipType,
  useAddFriendMutation,
  User,
  useRemoveFriendMutation,
  useRemovePendingRequestMutation,
  useUserRelationshipQuery,
} from '../../../generated/graphql';
import { avatarUrl } from '../../../utilities';
import FriendModal from '../modal/friend-modal/friend-modal';
import './profile-header.scss';

export function GetUserRelationship(otherUser: User) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [friendStatus, setFriendStatus] = useState<string>('');
  const [addFriend] = useAddFriendMutation();
  const [removeFriend] = useRemoveFriendMutation();
  const [removePendingRequest] = useRemovePendingRequestMutation();
  const {
    data: otherUserRelationshipData,
    loading: otherUserRelationshipLoading,
  } = useUserRelationshipQuery({
    variables: {
      userIdB: otherUser.id,
    },
  });

  useEffect(() => {
    if (!otherUserRelationshipLoading) {
      otherUserRelationshipData.getUserRelationship === RelationshipType.Friends
        ? setFriendStatus(ProfileRelationshipButton.FRIENDS)
        : otherUserRelationshipData.getUserRelationship === RelationshipType.PendingRequest
        ? setFriendStatus(ProfileRelationshipButton.PENDING)
        : setFriendStatus(ProfileRelationshipButton.ADD_FRIEND);
    }
    // Ignored since the suggested fix broke the react hooks lifecycle
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [otherUserRelationshipData]);

  if (otherUserRelationshipLoading) return <div className="page-container">Loading...</div>;

  const isFriend = friendStatus === ProfileRelationshipButton.FRIENDS;
  const isPending = friendStatus === ProfileRelationshipButton.PENDING;

  return (
    <div className="friend-status-container">
      <MullButton
        className="friend-status-button"
        altStyle={isFriend}
        data-testid={friendStatus}
        onClick={() => {
          friendStatus === ProfileRelationshipButton.ADD_FRIEND
            ? addFriend({ variables: { userIdToAdd: otherUser.id } }).then((data) => {
                if (data.data.addFriend) setFriendStatus(ProfileRelationshipButton.PENDING);
              })
            : setModalOpen(true);
        }}
      >
        {friendStatus}
      </MullButton>
      <FriendModal
        open={modalOpen}
        setOpen={setModalOpen}
        user={otherUser}
        button1Text={isFriend ? 'Remove Friend' : isPending ? 'Cancel Pending Request' : ''}
        button1OnClick={() =>
          isFriend
            ? removeFriend({ variables: { userIdToRemove: otherUser.id } }).then((data) => {
                if (data.data.removeFriend) {
                  setFriendStatus(ProfileRelationshipButton.ADD_FRIEND);
                  setModalOpen(false);
                }
              })
            : isPending
            ? removePendingRequest({ variables: { userIdToRemove: otherUser.id } }).then((data) => {
                if (data.data.removePendingRequest) {
                  setFriendStatus(ProfileRelationshipButton.ADD_FRIEND);
                  setModalOpen(false);
                }
              })
            : null
        }
      ></FriendModal>
    </div>
  );
}

export interface profileHeaderProps {
  portfolioCount?: number;
  friendCount?: number;
  hostingCount?: number;
  isCurrentUser?: boolean;
  user?: User;
}

export const ProfileHeader = ({
  portfolioCount = 0,
  friendCount = 0,
  hostingCount = 0,
  isCurrentUser = false,
  user = null,
}: profileHeaderProps) => {
  return (
    <div className="profile-header-container">
      <div className="user-name-container">
        <h1 data-testid="userName">{user.name}</h1>
        <button className="share-button">
          <FontAwesomeIcon icon={faShareAlt} />
        </button>
      </div>
      <div className="profile-header">
        <img className="user-profile-picture" src={avatarUrl(user)} alt="user" />
        <div
          className={
            isCurrentUser ? 'profile-side-container for-current-user' : 'profile-side-container'
          }
        >
          <button className="profile-stats" data-testid="portfolioCount">
            {portfolioCount}
            <br />
            Portfolio
          </button>
          <button className="profile-stats" data-testid="friendCount">
            {friendCount}
            <br />
            Friends
          </button>
          <button className="profile-stats" data-testid="hostingCount">
            {hostingCount}
            <br />
            Hosting
          </button>
          {isCurrentUser ? null : GetUserRelationship(user)}
        </div>
      </div>
      <p className="profile-header-user-description" data-testid="userDescription">
        {user.description}
      </p>
    </div>
  );
};

export default ProfileHeader;
