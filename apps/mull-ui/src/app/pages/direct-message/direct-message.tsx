import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { IUser } from '@mull/types';
import React, { useState } from 'react';
import { useFriendsQuery } from '../../../generated/graphql';
import { avatarUrl } from '../../../utilities';
import { ChatHeader, CustomTextInput } from '../../components';
import ContactRow from '../../components/contact-row/contact-row';
import './direct-message.scss';

const DirectMessagePage = () => {
  const [searchValue, setSearchValue] = useState('');
  const { data, loading } = useFriendsQuery();

  if (loading) return <div className="page-container">Loading...</div>;

  const contactRows = data.friends
    .filter(({ name }) => name.toLowerCase().includes(searchValue.toLowerCase()))
    .map(({ latestPost, ...friend }, index) => (
      <ContactRow
        key={'contact-row-' + index}
        userId={friend.id}
        userName={friend.name}
        lastMessage={latestPost ? latestPost.message : ''}
        icon={faEllipsisH}
        // TODO in TASK-63: an onClick event that will create a DM channel if it doesn't exist between the current user and their friend
        userPicture={avatarUrl(friend as IUser)}
      />
    ));

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
        {contactRows.length > 0 ? (
          <div>{contactRows}</div>
        ) : (
          <p className="search-results">No results found</p>
        )}
      </div>
    </div>
  );
};

export default DirectMessagePage;
