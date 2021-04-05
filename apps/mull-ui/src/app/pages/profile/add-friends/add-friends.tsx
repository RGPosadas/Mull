import { faEllipsisH, faSearch, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { History } from 'history';
import { debounce } from 'lodash';
import React, { useMemo, useState } from 'react';
import { ROUTES } from '../../../../constants';
import {
  RelationshipType,
  useAddFriendMutation,
  useGetRelationshipsQuery,
  useGetStrangersLazyQuery,
  User,
  useRemoveFriendMutation,
} from '../../../../generated/graphql';
import { CustomTextInput, MullBackButton } from '../../../components';
import ContactRow from '../../../components/contact-row/contact-row';
import './add-friends.scss';

export interface AddFriendsPageProps {
  history: History;
}

export const AddFriendsPage = ({ history }: AddFriendsPageProps) => {
  const [searchInput, setSearchInput] = useState<string>('');
  const relData = useGetRelationshipsQuery();
  const [getStrangers, strangerData] = useGetStrangersLazyQuery();
  const [addFriend] = useAddFriendMutation();
  const [removeFriend] = useRemoveFriendMutation();

  const relMap = new Map<RelationshipType, User[]>();

  // useMemo to avoid redefining debounce function every render.
  const startSearch = useMemo(
    () =>
      debounce((searchInput: string) => {
        getStrangers({ variables: { searchInput } });
      }, 500),
    [getStrangers]
  );

  const goToProfile = (id: string) => {
    history.push(ROUTES.USER_BY_ID.replace(':id', id));
  };

  if (relData.loading || relData.error) {
    return <div>something happened: {relData.error}</div>;
  }

  relData.data.getRelationships.forEach((relationship) => {
    if (relMap.has(relationship.type)) {
      relMap.set(relationship.type, [
        ...relMap.get(relationship.type),
        (relationship.user as unknown) as User,
      ]);
    } else {
      relMap.set(relationship.type, [(relationship.user as unknown) as User]);
    }
  });

  return (
    <div className="page-container">
      <MullBackButton>Profile</MullBackButton>
      <div className="add-friends-container">
        <h1>Add Friends</h1>
        <CustomTextInput
          title=""
          fieldName="add-friends-search-input"
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
            if (e.target.value) {
              startSearch(e.target.value);
            }
          }}
          hasErrors={null}
          svgIcon={<FontAwesomeIcon className="input-icon" icon={faSearch} />}
          placeholder="Search for new friends"
        />
        {!searchInput ? (
          <>
            <div className="add-friends-section">
              <h2>Added Me</h2>
              {relMap.get(RelationshipType.AddedMe) &&
                relMap.get(RelationshipType.AddedMe).map((user, i) => (
                  <ContactRow
                    id={`added-me-${user.id}`}
                    key={i}
                    user={user}
                    icon={faUserPlus}
                    modalButton1Text="View Profile"
                    modalButton1OnClick={() => {
                      goToProfile(user.id + '');
                    }}
                    modalButton2Text="Accept Request"
                    modalButton2OnClick={() => {
                      addFriend({ variables: { userIdToAdd: user.id } }).then(() => {
                        window.location.reload();
                      });
                    }}
                  />
                ))}
            </div>
            <div className="add-friends-section">
              <h2>Pending Requests</h2>
              {relMap.get(RelationshipType.PendingRequest) &&
                relMap.get(RelationshipType.PendingRequest).map((user, i) => (
                  <ContactRow
                    id={`pending-request-${user.id}`}
                    key={i}
                    user={user}
                    icon={faEllipsisH}
                    modalButton1Text="View Profile"
                    modalButton1OnClick={() => {
                      goToProfile(user.id + '');
                    }}
                    modalButton2Text="Cancel Request"
                    modalButton2OnClick={() => {
                      removeFriend({ variables: { userIdToRemove: user.id } }).then(() => {
                        window.location.reload();
                      });
                    }}
                  />
                ))}
            </div>
          </>
        ) : (
          <div>
            {strangerData.data
              ? strangerData.data.getStrangers.map((user, i) => (
                  <ContactRow
                    id={`add-friends-search-result-${user.id}`}
                    key={i}
                    user={(user as unknown) as User}
                    icon={faUserPlus}
                    modalButton1Text="View Profile"
                    modalButton1OnClick={() => {
                      goToProfile(user.id + '');
                    }}
                    modalButton2Text="Send friend Request"
                    modalButton2OnClick={() => {
                      addFriend({ variables: { userIdToAdd: user.id } }).then(() => {
                        window.location.reload();
                      });
                    }}
                  />
                ))
              : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddFriendsPage;
