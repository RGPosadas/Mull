import { ApolloQueryResult } from '@apollo/client';
import { FriendStatusButton } from '@mull/types';
import React, { useEffect, useState } from 'react';
import {
  Exact,
  FriendCountQuery,
  RelationshipType,
  useAddFriendMutation,
  User,
  useRemoveFriendMutation,
  useRemovePendingRequestMutation,
  useUserRelationshipQuery,
} from '../../../generated/graphql';
import { avatarUrl } from '../../../utilities';
import FriendModal from '../modal/friend-modal/friend-modal';
import { MullButton } from '../mull-button/mull-button';
import { Spinner } from '../spinner/spinner';
import './profile-header.scss';

export function SetUserRelationship(
  otherUser: User,
  friendCountRefetch: (
    variables?: Partial<
      Exact<{
        id: number;
      }>
    >
  ) => Promise<ApolloQueryResult<FriendCountQuery>>
) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [friendStatus, setFriendStatus] = useState<string>('');
  const [addFriend] = useAddFriendMutation();
  const [removeFriend] = useRemoveFriendMutation();
  const [removePendingRequest] = useRemovePendingRequestMutation();
  const {
    data: otherUserRelationshipData,
    loading: otherUserRelationshipLoading,
    refetch: otherUserRelationshipRefetch,
  } = useUserRelationshipQuery({
    variables: {
      userIdB: otherUser.id,
    },
  });

  useEffect(() => {
    if (!otherUserRelationshipLoading) {
      otherUserRelationshipData.getUserRelationship === RelationshipType.Friends
        ? setFriendStatus(FriendStatusButton.FRIENDS)
        : otherUserRelationshipData.getUserRelationship === RelationshipType.PendingRequest
        ? setFriendStatus(FriendStatusButton.PENDING)
        : setFriendStatus(FriendStatusButton.ADD_FRIEND);
    }
    // Ignored since the suggested fix broke the react hooks lifecycle
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [otherUserRelationshipData]);

  if (otherUserRelationshipLoading) return <Spinner />;

  const isFriend = friendStatus === FriendStatusButton.FRIENDS;
  const isPending = friendStatus === FriendStatusButton.PENDING;
  const isAddedMe = otherUserRelationshipData.getUserRelationship === RelationshipType.AddedMe;

  return (
    <div className="friend-status-container">
      <MullButton
        className="friend-status-button"
        altStyle={isFriend}
        onClick={() => {
          friendStatus === FriendStatusButton.ADD_FRIEND
            ? addFriend({ variables: { userIdToAdd: otherUser.id } }).then((data) => {
                if (data.data.addFriend) {
                  if (isAddedMe) {
                    friendCountRefetch();
                    otherUserRelationshipRefetch();
                    setFriendStatus(FriendStatusButton.FRIENDS);
                  } else {
                    setFriendStatus(FriendStatusButton.PENDING);
                  }
                }
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
          isFriend || isAddedMe
            ? removeFriend({ variables: { userIdToRemove: otherUser.id } }).then((data) => {
                if (data.data.removeFriend) {
                  friendCountRefetch();
                  otherUserRelationshipRefetch();
                  setFriendStatus(FriendStatusButton.ADD_FRIEND);
                  setModalOpen(false);
                }
              })
            : isPending
            ? removePendingRequest({ variables: { userIdToRemove: otherUser.id } }).then((data) => {
                if (data.data.removePendingRequest) {
                  setFriendStatus(FriendStatusButton.ADD_FRIEND);
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
  friendCountRefetch?: (
    variables?: Partial<
      Exact<{
        id: number;
      }>
    >
  ) => Promise<ApolloQueryResult<FriendCountQuery>>;
}

export const ProfileHeader = ({
  portfolioCount = 0,
  friendCount = 0,
  hostingCount = 0,
  isCurrentUser = false,
  user = null,
  friendCountRefetch = null,
}: profileHeaderProps) => {
  return (
    <div className="profile-header-container">
      <div className="user-name-container">
        <h1 data-testid="userName" className="profile-header-username">
          {user.name}
        </h1>
        {/* <button className="share-button">
          <FontAwesomeIcon icon={faShareAlt} />
        </button> */}
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
          {isCurrentUser ? null : SetUserRelationship(user, friendCountRefetch)}
        </div>
      </div>
      <p className="profile-header-user-description" data-testid="userDescription">
        {user.description}
      </p>
    </div>
  );
};

export default ProfileHeader;
