import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { History } from 'history';
import React, { useState } from 'react';
import {
  useCreateDirectMessageChannelMutation,
  useFriendsQuery,
  User,
} from '../../../../generated/graphql';
import { ContactRow, CustomTextInput } from '../../../components';
import './direct-message-list.scss';

export interface DirectMessagePageProps {
  history: History;
}
const DirectMessageListPage = ({ history }: DirectMessagePageProps) => {
  const [searchValue, setSearchValue] = useState('');
  const { data, loading } = useFriendsQuery();
  const [createDirectMessageChannel] = useCreateDirectMessageChannelMutation();

  if (loading) return <div className="page-container">Loading...</div>;

  const contactRows = data.friends
    .filter(({ name }) => name.toLowerCase().includes(searchValue.toLowerCase()))
    .map(({ latestPost, directMessageChannel, ...friend }, index) => (
      <ContactRow
        key={'contact-row-' + index}
        user={(friend as unknown) as User}
        lastMessage={latestPost ? latestPost.message : ''}
        icon={faEllipsisH}
        modalButton1Text="View Profile"
        modalButton1OnClick={() => history.push(`/user/${friend.id}`)}
        userInformationOnClick={async () => {
          if (directMessageChannel) history.push(`/messages/dm/${directMessageChannel.id}`);
          else {
            const {
              data: {
                createDirectMessageChannel: { id },
              },
            } = await createDirectMessageChannel({ variables: { toUserId: friend.id } });
            history.push(`/messages/dm/${id}`);
          }
        }}
      />
    ));

  return (
    <div className="direct-messages-container">
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
        <p className="search-results empty-array-msg">No results found</p>
      )}
    </div>
  );
};

export default DirectMessageListPage;
