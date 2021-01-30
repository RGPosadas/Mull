import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { dummyEvent } from '../../../constants';
import { UserProvider } from '../../context/user.context';
import EventPage from './event-page';

describe('EventPage', () => {
  const renderHelper = (event) => {
    return (
      <UserProvider value={{ userId: 1, setUserId: jest.fn() }}>
        <MockedProvider>
          <MemoryRouter initialEntries={['events/1']}>
            <Route path="events/:id">
              <EventPage event={event} prevPage="" eventImageURL="" />
            </Route>
          </MemoryRouter>
        </MockedProvider>
      </UserProvider>
    );
  };

  it('should render successfully', () => {
    const { baseElement } = render(renderHelper(dummyEvent));
    expect(baseElement).toBeTruthy();
  });

  it('should match snapshot', () => {
    const tree = renderer.create(renderHelper(dummyEvent)).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
