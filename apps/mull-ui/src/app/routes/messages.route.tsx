import React, { useState } from 'react';
import { RouteChildrenProps } from 'react-router';
import SwipeableViews from 'react-swipeable-views';
import { PrivateRoute } from '../components';
import SwipeableViewsHeader from '../components/navigation/swipeable-view-header/swipeable-view-header';
import DirectMessageListPage from '../pages/direct-message/direct-message-list/direct-message-list';
import AnnouncementsPage from '../pages/messages/announcements/announcements';
import EventMessagesHeader from '../pages/messages/event-messages-header/event-messages-header';
import EventMessageList from '../pages/messages/event-messages/event-message-list';
import GroupChatPage from '../pages/messages/group-chat/group-chat';

const MessagesMainRoute = ({ history }) => {
  const [index, setIndex] = useState(0);
  const handleChangeIndex = (index: number) => {
    setIndex(index);
  };
  return (
    <>
      <SwipeableViewsHeader
        index={index}
        setIndex={handleChangeIndex}
        viewTitles={['Direct Messages', 'Event Messages']}
        className="top-nav-bar-shadow"
      />
      <div className="page-container with-sub-nav">
        <SwipeableViews index={index} onChangeIndex={handleChangeIndex}>
          <DirectMessageListPage history={history} />
          <EventMessageList history={history} />
        </SwipeableViews>
      </div>
    </>
  );
};

const EventMessagesRoutes = ({ match }: RouteChildrenProps) => (
  <PrivateRoute path={`${match.path}/:id`}>
    <EventMessagesHeader>
      <div className="page-container with-sub-nav-and-header with-bottom-chat-input">
        <PrivateRoute
          exact
          path={`${match.path}/:id/announcements`}
          component={AnnouncementsPage}
        />
        <PrivateRoute exact path={`${match.path}/:id/group-chat`} component={GroupChatPage} />
      </div>
    </EventMessagesHeader>
  </PrivateRoute>
);

const MessagesRoute = ({ match }: RouteChildrenProps) => (
  <>
    <PrivateRoute exact path={match.path} component={MessagesMainRoute} />
    <PrivateRoute path={`${match.path}/event`} component={EventMessagesRoutes} />
  </>
);

export default MessagesRoute;
