import React from 'react';
import { ROUTES } from '../../../constants';
import { usePostAddedSubscription } from '../../../generated/graphql';
import { ChatHeader, SubNavBar } from '../../components';

export interface MessagePageProps {
  children: React.ReactNode;
}

/**
 * Adds a sub-nav-header and sub-navigation to the top of the page, above the children
 * Children are rendered in between and then adds a sticky chat-input at the bottom of the page.
 */
export const ChatPagesHeaders = ({ children }: MessagePageProps) => {
  // TODO set channel id to right value
  const { data, loading } = usePostAddedSubscription({
    variables: {
      channelId: 1,
    },
  });

  return (
    <div>
      {/* TODO: Replace with actual chatting implementation */}
      {loading ? null : (
        <pre style={{ position: 'absolute', zIndex: 99, top: 200 }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
      <ChatHeader eventTitle="Clean up Rogers Park" />
      <SubNavBar
        routes={[ROUTES.GROUPCHAT, ROUTES.ANNOUNCEMENTS]}
        className="with-header top-nav-bar-shadow"
      />
      {children}
    </div>
  );
};

export default ChatPagesHeaders;
