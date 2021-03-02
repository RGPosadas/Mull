import React, { useState } from 'react';
import { ChatHeader, CustomTextInput } from '../../components';
import ContactRow from '../../components/contact-row/contact-row';
import './direct-message.scss';

// TODO: Query that returns an array of user profiles related to user
const userData = [
  {
    id: 1,
    name: 'Bob Marley',
    lastMessage: 'hi there',
    picture:
      'https://blog.photofeeler.com/wp-content/uploads/2017/04/are-bumble-profiles-fake-how-many.jpeg',
  },
  {
    id: 2,
    name: 'Shawn Mendes',
    lastMessage: 'meet up soon!',
    picture:
      'https://blog.photofeeler.com/wp-content/uploads/2017/04/are-bumble-profiles-fake-how-many.jpeg',
  },
  {
    id: 3,
    name: 'Justin Bieber',
    lastMessage: 'see you there',
    picture:
      'https://blog.photofeeler.com/wp-content/uploads/2017/04/are-bumble-profiles-fake-how-many.jpeg',
  },
];

const DirectMessagePage = () => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="direct-messages-container">
      <ChatHeader className="top-nav-bar-shadow" eventTitle="Direct Messages" />
      <div className="page-container">
        <CustomTextInput
          title=""
          fieldName="searchValue"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          hasErrors={null}
          errorMessage={null}
          placeholder={'Search'}
        />

        {userData.length > 0 ? (
          userData.map((user, idx) => {
            if (user.name.toLowerCase().includes(searchValue.toLowerCase()) || searchValue === '')
              return (
                <ContactRow
                  key={idx}
                  userId={user.id}
                  userName={user.name}
                  lastMessage={user.lastMessage}
                  userPicture={user.picture}
                />
              );
            return null;
          })
        ) : (
          <p className="search-results">No results found</p>
        )}
      </div>
    </div>
  );
};

export default DirectMessagePage;
