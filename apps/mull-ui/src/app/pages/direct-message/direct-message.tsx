import React, { useState } from 'react';
import { ChatHeader, CustomTextInput } from '../../components';
import ContactRow from '../../components/contact-row/contact-row';
import './direct-message.scss';

/* eslint-disable-next-line */
export interface DirectMessageProps {}

// const { data: userProfiles, loading } = useUserProfilesQuery();
const userData = [
  {
    name: 'Bob Marley',
    description: 'Singer',
    picture:
      'https://blog.photofeeler.com/wp-content/uploads/2017/04/are-bumble-profiles-fake-how-many.jpeg',
  },
  {
    name: 'Shawn Mendes',
    description: 'Singer',
    picture:
      'https://blog.photofeeler.com/wp-content/uploads/2017/04/are-bumble-profiles-fake-how-many.jpeg',
  },
  {
    name: 'Justin Bieber',
    description: 'Singer',
    picture:
      'https://blog.photofeeler.com/wp-content/uploads/2017/04/are-bumble-profiles-fake-how-many.jpeg',
  },
];

const DirectMessagePage = () => {
  // TODO: update search function for dynamic data
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="direct-messages-container">
      <ChatHeader eventTitle="Direct Messages" />
      <div className="page-container">
        <CustomTextInput
          title=""
          fieldName="searchValue"
          value={searchValue}
          onChange={handleChange}
          hasErrors={null}
          errorMessage={null}
          placeholder={'Search'}
        />

        {userData
          .filter((user) => {
            if (searchValue == '') {
              return user;
            } else if (user.name.toLowerCase().includes(searchValue.toLowerCase())) {
              return user;
            }
          })
          .map((user) => {
            return (
              <ContactRow
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
