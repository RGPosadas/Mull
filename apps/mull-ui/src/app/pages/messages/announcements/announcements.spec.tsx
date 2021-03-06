import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import { ROUTES } from '../../../../../src/constants';
import { UserProvider } from '../../../context/user.context';
import AnnouncementsPage from './announcements';

describe('AnnouncementsPage', () => {
  const renderHelper = (history) => {
    return (
      <UserProvider value={{ userId: 1, setUserId: jest.fn() }}>
        <MockedProvider>
          <Router history={history}>
            <AnnouncementsPage />
          </Router>
        </MockedProvider>
      </UserProvider>
    );
  };

  it('should render successfully', () => {
    const history = createMemoryHistory();
    history.push(ROUTES.MY_EVENTS.url);

    const { baseElement } = render(renderHelper(history));
    expect(baseElement).toBeTruthy();
  });
});
