import React, { useState } from 'react';
import { ChatHeader, CustomTextInput } from '../../components';
import ContactRow from '../../components/contact-row/contact-row';
import './direct-message.scss';

/* eslint-disable-next-line */
export interface DirectMessageProps {}

// TODO: Query that returns an array of user profiles related to user
const userData = [
  {
    id: 1,
    name: 'Bob Marley',
    description: 'Singer',
    picture:
      'https://blog.photofeeler.com/wp-content/uploads/2017/04/are-bumble-profiles-fake-how-many.jpeg',
  },
  {
    id: 2,
    name: 'Shawn Mendes',
    description: 'Singer',
    picture:
      'https://blog.photofeeler.com/wp-content/uploads/2017/04/are-bumble-profiles-fake-how-many.jpeg',
  },
  {
    id: 3,
    name: 'Justin Bieber',
    description: 'Singer',
    picture:
      'https://blog.photofeeler.com/wp-content/uploads/2017/04/are-bumble-profiles-fake-how-many.jpeg',
  },
];

const DirectMessagePage = () => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="direct-messages-container">
      <ChatHeader eventTitle="Direct Messages" />
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
        {userData.map((user) => {
          if (user.name.toLowerCase().includes(searchValue.toLowerCase()) || searchValue === '')
            return (
              <ContactRow
                userId={user.id}
                userName={user.name}
                userDescription={user.description}
                userPicture={user.picture}
              />
            );
        })}
      </div>
    </div>
  );
};

export default DirectMessagePage;
