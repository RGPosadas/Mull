import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { dummyEvent } from '../../../constants';
import EventCard from './event-card';

describe('EventCard', () => {
  const history = createMemoryHistory();
  it('should render successfully', () => {
    const { baseElement } = render(
      <MockedProvider>
        <Router history={history}>
          <EventCard event={dummyEvent} />
        </Router>
      </MockedProvider>
    );
    expect(baseElement).toBeTruthy();
  });

  it('should match snapshot', () => {
    const tree = renderer
      .create(
        <MockedProvider>
          <Router history={history}>
            <EventCard event={dummyEvent} />
          </Router>
        </MockedProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render dates correctly', () => {
    const dom = render(
      <MockedProvider>
        <Router history={history}>
          <EventCard event={dummyEvent} />
        </Router>
      </MockedProvider>
    );

    const dateDiv = dom.getByTestId('event-card-datetime');
    expect(dateDiv.textContent).toBe('15 JUN01:45PM');
  });
});
