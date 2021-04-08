import { cloneDeep } from 'lodash';
import React, { useContext, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  CreateEventInput,
  Event,
  useEventPageQuery,
  useOwnedEventsQuery,
  User,
  useUserQuery,
} from '../../../generated/graphql';
import { Spinner } from '../../components';
import UserContext from '../../context/user.context';
import { EventPageHeader } from './event-page-header/event-page-header';
import { EventPageInfo } from './event-page-info/event-page-info';
import './event-page.scss';

export interface EventPageProps {
  reviewEvent?: Partial<CreateEventInput>;
  prevPage?: string;
  eventImageURL?: string;
  buttonType?: 'submit' | 'button' | 'reset';
  onBackButtonClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onButtonClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isReview?: boolean;
  isJoined?: boolean;
}

export const EventPage = ({
  reviewEvent,
  prevPage,
  onBackButtonClick,
  onButtonClick,
  eventImageURL,
  isReview = false,
  isJoined = false,
  buttonType,
}: EventPageProps) => {
  const { id } = useParams<{ id: string }>();
  const eventId = parseInt(id);
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const [eventOwner, setEventOwner] = useState<boolean>(false);
  const currentUserId = useContext(UserContext).userId;

  let event = cloneDeep(reviewEvent) as Event;

  const { data: ownedEvents } = useOwnedEventsQuery({});

  if (ownedEvents) {
    !eventOwner &&
      ownedEvents.hostEvents.map((event) => {
        if (event.id === parseInt(id)) {
          setEventOwner(true);
        }
        return null;
      });
  }

  const { loading: loadingEvent, error: errorEvent, data: dataEvent } = useEventPageQuery({
    variables: { eventId },
    skip: !!reviewEvent,
  });

  const { loading: loadingUser, error: errorUser, data: dataUser } = useUserQuery({
    variables: {
      id: currentUserId,
    },
    skip: !reviewEvent,
  });

  if (!loadingEvent && dataEvent) {
    event = cloneDeep(dataEvent.event) as Event;
    isJoined = dataEvent.isParticipant;
  }

  if (!loadingUser && dataUser) {
    event.host = dataUser.user as User;
  }

  if (loadingEvent || loadingUser || !event.host) {
    return <Spinner />;
  }

  return (
    <div className="page-container no-padding event-page-container">
      <EventPageHeader
        headerRef={headerRef}
        event={event}
        prevPage={prevPage}
        handleBackButton={onBackButtonClick}
        eventImageURL={eventImageURL}
        setHeaderHeight={setHeaderHeight}
      />
      <EventPageInfo
        style={{ paddingTop: headerHeight }}
        event={event}
        handleMullButton={onButtonClick}
        eventImageURL={eventImageURL}
        isReview={isReview}
        isJoined={isJoined}
        isEventOwner={eventOwner}
        buttonType={buttonType}
      />
    </div>
  );
};

export default EventPage;
