import { faEllipsisH, faSearch, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { mockUser1, mockUser2 } from '../../../../mockdata';
import { CustomTextInput, MullBackButton } from '../../../components';
import ContactRow from '../../../components/contact-row/contact-row';
import './add-friends.scss';
import SearchUsersPage from './search-users';

export const AddFriendsPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="page-container">
      <MullBackButton>Profile</MullBackButton>
      <div className="add-friends-container">
        <h1 className="add-friends-title">Add Friends</h1>
        <CustomTextInput
          title=""
          fieldName="searchValue"
          value=""
          onChange={() => null}
          onClick={() => {
            setOpen(true);
          }}
          hasErrors={null}
          errorMessage={null}
          svgIcon={<FontAwesomeIcon className="input-icon" icon={faSearch} />}
          placeholder={'Find Friends'}
        />
        <SearchUsersPage open={open} setOpen={setOpen} />
        <div>
          <div className="add-friend-individual">
            <h2>Added Me</h2>
            <ContactRow user={mockUser1} icon={faUserPlus}></ContactRow>
          </div>
          <div className="add-friend-individual">
            <h2>Pending Requests</h2>
            <ContactRow user={mockUser2} icon={faEllipsisH}></ContactRow>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFriendsPage;
