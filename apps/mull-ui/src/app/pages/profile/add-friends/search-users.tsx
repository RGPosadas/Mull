import { faSearch, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog } from '@material-ui/core';
import { useFriendsQuery } from 'apps/mull-ui/src/generated/graphql';
import React, { useState } from 'react';
import { CustomTextInput, MullBackButton, TopNavBar } from '../../../components';
import ContactRow from '../../../components/contact-row/contact-row';
import './add-friends.scss';

export interface SearchUsersPageProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SearchUsersPage = ({ open, setOpen }: SearchUsersPageProps) => {
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
        icon={faUserPlus}
      />
    ));

  return (
    <>
      <Dialog fullScreen transitionDuration={5} open={open}>
        <TopNavBar />
        <div className="page-container">
          <MullBackButton onClick={() => setOpen(false)}>Profile</MullBackButton>
          <div className="add-friends-container">
            <h1 className="add-friends-title">Add Friends</h1>
            <CustomTextInput
              title=""
              fieldName="searchValue"
              value={searchValue}
              onChange={(event) => {
                setSearchValue(event.target.value);
              }}
              hasErrors={null}
              errorMessage={null}
              svgIcon={<FontAwesomeIcon className="input-icon" icon={faSearch} />}
              placeholder={'Find Friends'}
            />
            <div>
              {contactRows.length > 0 ? (
                <div>{contactRows}</div>
              ) : (
                <p className="search-results">No results found</p>
              )}
            </div>
            <div></div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default SearchUsersPage;
