import { avatarUrl } from 'apps/mull-ui/src/utilities';
import React from 'react';
import { useGetTrueFriendsQuery, User } from '../../../../generated/graphql';
import ContactRow from '../../../components/contact-row/contact-row';
import './myFriends-profile.scss';

const MyFriends = () => {
  function compareUser(a: User, b: User) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }

  function categorizeUsers(friends: User[]) {
    let orderedNames = new Map<string, User[]>();
    friends.forEach((friend) => {
      const firstLetter = friend.name[0];
      if (!orderedNames.has(firstLetter)) {
        orderedNames.set(firstLetter, [friend]);
      } else {
        let usersWithLetter = orderedNames.get(firstLetter);
        usersWithLetter.push(friend);
      }
    });
    return orderedNames;
  }

  const { data, loading, error } = useGetTrueFriendsQuery();
  if (loading) return <div className="page-container">Loading...</div>;

  let mutableFriends = [...data.getTrueFriends] as User[];

  mutableFriends.sort(compareUser);

  const categorizedUsers = categorizeUsers(mutableFriends);

  let finalFriendsList = [];

  let friendsElement = categorizedUsers.forEach((value, key) => {
    let currentCategoryContactRows = value.map((friend) => (
      <ContactRow
        key={friend.id}
        userId={friend.id}
        userName={friend.name}
        userPicture={avatarUrl(friend)}
      />
    ));
    let currentLetterCategorizedList = (
      <div className="friend-category-container">
        <h2 className="friend-category-title">{key}</h2>
        {currentCategoryContactRows}
      </div>
    );
    finalFriendsList.push(currentLetterCategorizedList);
  });

  return (
    <div className="page-container my-friends">
      <h1 className="my-friends-page-title">My Friends</h1>
      {finalFriendsList}
    </div>
  );
};

export default MyFriends;
