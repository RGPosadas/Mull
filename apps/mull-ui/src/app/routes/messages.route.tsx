import React, { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { PrivateRoute } from '../components';
import SwipeableViewsHeader from '../components/navigation/swipeable-view-header/swipeable-view-header';
import DirectMessagePage from '../pages/direct-message/direct-message';
import EventMessageList from '../pages/messages/event-messages/event-message-list';

const MessagesMainRoute = ({ history }) => {
  const [index, setIndex] = useState(0);
  const handleChangeIndex = (index: number) => {
    setIndex(index);
  };
  console.log(index);
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
          <DirectMessagePage />
          <EventMessageList history={history} />
        </SwipeableViews>
      </div>
    </>
  );
};

const MessagesRoute = ({ match }) => (
  <PrivateRoute exact path={match.path} component={MessagesMainRoute} />
);

export default MessagesRoute;
