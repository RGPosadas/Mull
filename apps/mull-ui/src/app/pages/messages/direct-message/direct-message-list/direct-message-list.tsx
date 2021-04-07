import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { History } from 'history';
import React, { useContext, useState } from 'react';
import {
  Friend,
  Post,
  useCreateDirectMessageChannelMutation,
  useFriendsQuery,
  User,
} from '../../../../../generated/graphql';
import { ContactRow, CustomTextInput } from '../../../../components';
import UserContext from '../../../../context/user.context';
import './direct-message-list.scss';

export interface DirectMessageListPageProps {
  history: History;
}

const DirectMessageListPage = ({ history }: DirectMessageListPageProps) => {
  const [searchValue, setSearchValue] = useState('');
  const { userId } = useContext(UserContext);
  const { data, loading } = useFriendsQuery();
  const [createDirectMessageChannel] = useCreateDirectMessageChannelMutation();

  const buildLastMessage = (latestPost: Post, friend: Partial<Friend>): string => {
    let lastMessage: string;
    if (!latestPost) lastMessage = `Start chatting with ${friend.name}!`;
    else if (latestPost.media)
      lastMessage = `${latestPost.user.id === userId ? 'You' : friend.name} sent an image.`;
    else if (latestPost.message && !latestPost.media)
      lastMessage = `${latestPost.user.id === userId ? 'You:' : ''} ${latestPost.message}`;
    return lastMessage;
  };

  if (loading) return <div className="page-container">Loading...</div>;

  const contactRows = data.friends
    .filter(({ name }) => name.toLowerCase().includes(searchValue.toLowerCase()))
    .map(({ latestPost, directMessageChannel, ...friend }, index) => {
      return (
        <ContactRow
          key={'contact-row-' + index}
          user={(friend as unknown) as User}
          lastMessage={buildLastMessage(latestPost as Post, friend as Partial<Friend>)}
          icon={faEllipsisH}
          userInformationOnClick={async () => {
            if (directMessageChannel) history.push(`/messages/dm/${friend.id}`);
            else {
              await createDirectMessageChannel({ variables: { toUserId: friend.id } });
              history.push(`/messages/dm/${friend.id}`);
            }
          }}
        />
      );
    });

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
