import { faEllipsisH, faSearch, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFriendsQuery } from 'apps/mull-ui/src/generated/graphql';
import React, { useState } from 'react';
import { CustomTextInput, MullBackButton } from '../../../components';
import ContactRow from '../../../components/contact-row/contact-row';
import './add-friends.scss';

export const AddFriendsPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const { data, loading } = useFriendsQuery();

  if (loading) return <div className="page-container">Loading...</div>;

  //   const contactRows = data.friends
  //     .filter(({ name }) => name.toLowerCase().includes(searchValue.toLowerCase()))
  //     .map(({ latestPost, ...friend }, index) => (
  //       <ContactRow
  //         key={'contact-row-' + index}
  //         userId={friend.id}
  //         userName={friend.name}
  //         icon={fa}
  //         // TODO in TASK-63: an onClick event that will create a DM channel if it doesn't exist between the current user and their friend
  //         userPicture={avatarUrl(friend as IUser)}
  //       />
  //     ));

  const searchMode = false;

  return (
    <div className="page-container">
      <MullBackButton>Profile</MullBackButton>
      <div className="add-friends-container">
        <h1 className="add-friends-title">Add Friends</h1>
        <CustomTextInput
          title=""
          fieldName="searchValue"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          hasErrors={null}
          errorMessage={null}
          svgIcon={<FontAwesomeIcon className="input-icon" icon={faSearch} />}
          placeholder={'Find Friends'}
        />
        {/* {contactRows.length > 0 ? (
        <div>{contactRows}</div>
      ) : (
        <p className="search-results">No results found</p>
      )} */}
        {searchMode ? (
          <div>
            <ContactRow userId={213} userName={'John Doe'} icon={faUserPlus}></ContactRow>
            <ContactRow userId={213} userName={'Jamie Doe'} icon={faUserPlus}></ContactRow>
            <ContactRow userId={213} userName={'Jasmine Doe'} icon={faUserPlus}></ContactRow>
          </div>
        ) : (
          <div>
            <div className="add-friend-individual">
              <h2>Added Me</h2>
              <ContactRow userId={213} userName={'Jane Doe'} icon={faUserPlus}></ContactRow>
            </div>
            <div className="add-friend-individual">
              <h2>Pending Requests</h2>
              <ContactRow userId={213} userName={'Donkey Kong'} icon={faEllipsisH}></ContactRow>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddFriendsPage;
