import React from 'react';
import {
  useGetTrueFriendsQuery,
  User,
  useRemoveFriendMutation,
} from '../../../../generated/graphql';
import { MullBackButton, Spinner } from '../../../components';
import ContactRow from '../../../components/contact-row/contact-row';
import './myFriends-profile.scss';

const MyFriends = ({ history }) => {
  const [removeFriend] = useRemoveFriendMutation();

  /**
   * sorts an array of users by name
   * @param {User} a
   * @param {User} b
   */
  function compareUser(a: User, b: User) {
    if (a.name.toLocaleUpperCase() < b.name.toLocaleUpperCase()) {
      return -1;
    }
    if (a.name.toLocaleUpperCase() > b.name.toLocaleUpperCase()) {
      return 1;
    }
    return 0;
  }

  /**
   * Returns a map where the key is a letter and the value is
   * an array of users who's name start with the key
   * @param {User[]} friends
   */
  function categorizeUsers(friends: User[]) {
    const orderedNames = new Map<string, User[]>();
    friends.forEach((friend) => {
      const firstLetter = friend.name[0].toLocaleUpperCase();
      if (!orderedNames.has(firstLetter)) {
        orderedNames.set(firstLetter, [friend]);
      } else {
        const usersWithLetter = orderedNames.get(firstLetter);
        usersWithLetter.push(friend);
      }
    });
    return orderedNames;
  }

  const { data, loading, error } = useGetTrueFriendsQuery();

  if (loading) return <Spinner />;

  const mutableFriends = ([...data.getTrueFriends] as unknown) as User[];

  mutableFriends.sort(compareUser);

  const categorizedUsers = categorizeUsers(mutableFriends);

  const finalFriendsList = [];
  categorizedUsers.forEach((value, key) => {
    const currentCategoryContactRows = value.map((friend) => {
      return (
        <ContactRow
          key={friend.id}
          user={friend}
          modalButton1Text="View Profile"
          modalButton2Text="Remove Friend"
          modalButton1OnClick={() => history.push(`/user/${friend.id}`)}
          modalButton2OnClick={async () => {
            await removeFriend({ variables: { userIdToRemove: friend.id } });
            window.location.reload();
          }}
        />
      );
    });
    const currentLetterCategorizedList = (
      <div className="friend-category-container" key={key}>
        <h2 className="friend-category-title">{key}</h2>
        {currentCategoryContactRows}
      </div>
    );
    finalFriendsList.push(currentLetterCategorizedList);
  });

  return (
    <div className="page-container my-friends">
      <MullBackButton>Profile</MullBackButton>
      <h1 className="my-friends-page-title">My Friends</h1>

      {finalFriendsList.length > 0 ? (
        finalFriendsList
      ) : (
        <p className="empty-array-msg">No friends found </p>
      )}
    </div>
  );
};

export default MyFriends;
