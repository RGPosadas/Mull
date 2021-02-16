import { gql, useSubscription } from '@apollo/client';
import React from 'react';
import { ROUTES } from '../../../constants';
import { ChatHeader, ChatInput, SubNavBar } from '../../components';

export interface MessagePageProps {
  children: React.ReactNode;
}
/**
 * Adds a sub-nav-header and sub-navigation to the top of the page, above the children
 * Children are rendered in between and then adds a sticky chat-input at the bottom of the page.
 */

const POSTS = gql`
  subscription PostAdded {
    postAdded {
      message
      createdTime
      id
    }
  }
`;

export const MessagesPage = ({ children }: MessagePageProps) => {
  const { data, loading } = useSubscription(POSTS);
  if (loading) return <div>loading</div>;

  return (
    <div>
      <ChatHeader eventTitle="Clean up Rogers Park" />
      <SubNavBar
        routes={[ROUTES.GROUPCHAT, ROUTES.ANNOUNCEMENTS]}
        className="with-header top-nav-bar-shadow"
      />
      {children}
      <ChatInput />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default MessagesPage;
