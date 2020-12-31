import React from 'react';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';

import EventPage from './event-page';
import { dummyEvent } from '../../../constants';
import { MemoryRouter, Route } from 'react-router-dom';
import { Router } from 'express';
import { MockedProvider } from '@apollo/client/testing';

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
