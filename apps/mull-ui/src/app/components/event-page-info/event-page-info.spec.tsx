import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';
import { createMemoryHistory, History } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { dummyEvent } from '../../../constants';
import { UserProvider } from '../../context/user.context';
import EventPageInfo from './event-page-info';

describe('EventPageInfo', () => {
  const renderHelper = (history: History) => {
    return (
      <UserProvider value={{ userId: 1, setUserId: jest.fn() }}>
        <MockedProvider>
          <Router history={history}>
            <EventPageInfo isJoined={true} isReview={false} event={dummyEvent} />
          </Router>
        </MockedProvider>
      </UserProvider>
    );
  };

  it('should render successfully', () => {
    const history = createMemoryHistory();
    const { baseElement } = render(renderHelper(history));
    expect(baseElement).toBeTruthy();
  });

  it('should match snapshot', () => {
    const history = createMemoryHistory();
    const tree = renderer.create(renderHelper(history)).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
