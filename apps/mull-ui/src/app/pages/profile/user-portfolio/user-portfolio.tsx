import { ISerializedEvent } from '@mull/types';
import { usePortfolioEventsQuery } from 'apps/mull-ui/src/generated/graphql';
import React from 'react';
import { EventCard } from '../../../components';
import './user-portfolio.scss';

export const UserPortfolio = ({ history }) => {
  const { data, loading } = usePortfolioEventsQuery({});

  if (loading) return <div className="page-container">Loading...</div>;
  if (data) {
    const events = (data.portfolioEvents as unknown) as Partial<ISerializedEvent>[];
    var eventCards = events.map((event, index) => (
      <EventCard
        key={`user-portfolio-${index}`}
        isJoined={false}
        event={event}
        onClick={() => history.push(`/events/${event.id}`)}
      />
    ));
  }
  return (
    <div className="user-portfolio-container">
      <h1 className="user-portfolio-title">My Portfolio</h1>
      {eventCards && eventCards.length > 0 ? eventCards : <div>No completed events</div>}
    </div>
  );
};

export default UserPortfolio;
