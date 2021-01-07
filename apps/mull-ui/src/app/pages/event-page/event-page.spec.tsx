import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { dummyEvent } from '../../../constants';
import EventPage from './event-page';

describe('EventPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MockedProvider>
        <MemoryRouter initialEntries={['events/1']}>
          <Route path="events/:id">
            <EventPage event={dummyEvent} prevPage="" eventImageURL="" />
          </Route>
        </MemoryRouter>
      </MockedProvider>
    );
    expect(baseElement).toBeTruthy();
  });

  it('should match snapshot', () => {
    const tree = renderer
      .create(
        <MockedProvider>
          <MemoryRouter initialEntries={['events/1']}>
            <Route path="events/:id">
              <EventPage event={dummyEvent} prevPage="" eventImageURL="" />
            </Route>
          </MemoryRouter>
        </MockedProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
